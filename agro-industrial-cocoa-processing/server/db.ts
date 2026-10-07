import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chemins locaux de persistance
const DB_PATH = path.resolve(__dirname, 'leads.db');
const JSON_BACKUP_PATH = path.resolve(__dirname, 'leads.json');

export interface B2BLeadRecord {
  id: string; // Ex: "RFQ-2026-116246"
  created_at: string; // ISO 8601
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  country: string;
  incoterm: string;
  products_requested: string; // JSON Array stringifié des produits
  order_volume: string;
  is_sample_request: number; // 1 = true, 0 = false (SQLite format)
  status: 'nouveau' | 'contacté' | 'devis_envoyé' | 'échantillon_expédié' | 'clôturé';
  vat_number?: string;
  destination_port?: string;
  project_description?: string;
  ip_address?: string;
  request_type?: string;
}

// Initialisation de la base SQLite
let db: Database.Database | null = null;

try {
  db = new Database(DB_PATH);
  // Activation du mode WAL pour haute performance et concurrences non bloquantes
  db.pragma('journal_mode = WAL');
  db.pragma('synchronous = NORMAL');

  // Création de la table avec tous les champs requis
  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      created_at TEXT NOT NULL,
      company_name TEXT NOT NULL,
      contact_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      country TEXT NOT NULL,
      incoterm TEXT,
      products_requested TEXT NOT NULL,
      order_volume TEXT,
      is_sample_request INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'nouveau',
      vat_number TEXT,
      destination_port TEXT,
      project_description TEXT,
      ip_address TEXT,
      request_type TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
    CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
    CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
  `);
  console.log('[SQLite DB] Base de données relationnelle initialisée avec succès (leads.db).');
} catch (err) {
  console.error('[SQLite DB] Erreur lors de l’initialisation de SQLite:', err);
}

// Client Supabase optionnel (si configuré dans les variables d'environnement)
let supabase: SupabaseClient | null = null;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (supabaseUrl && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('[Supabase Cloud] Client Supabase initialisé pour réplication cloud.');
  } catch (err) {
    console.warn('[Supabase Cloud] Impossible d’initialiser le client Supabase:', err);
  }
}

/**
 * Sauvegarde de secours en fichier JSON (Garantie Zéro Perte)
 */
function appendToJsonBackup(record: B2BLeadRecord): void {
  try {
    let list: B2BLeadRecord[] = [];
    if (fs.existsSync(JSON_BACKUP_PATH)) {
      const content = fs.readFileSync(JSON_BACKUP_PATH, 'utf-8');
      if (content.trim()) {
        list = JSON.parse(content);
      }
    }
    list.unshift(record);
    fs.writeFileSync(JSON_BACKUP_PATH, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('[DB Backup] Erreur d’écriture dans leads.json:', err);
  }
}

/**
 * Insère un nouveau prospect dans la base de données relationnelle
 * avec réplication de sécurité miroir et cloud si disponible.
 */
export async function saveLeadToDatabase(record: B2BLeadRecord): Promise<void> {
  // 1. Sauvegarde dans SQLite relationnelle
  if (db) {
    try {
      const stmt = db.prepare(`
        INSERT INTO leads (
          id, created_at, company_name, contact_name, email, phone,
          country, incoterm, products_requested, order_volume,
          is_sample_request, status, vat_number, destination_port,
          project_description, ip_address, request_type
        ) VALUES (
          @id, @created_at, @company_name, @contact_name, @email, @phone,
          @country, @incoterm, @products_requested, @order_volume,
          @is_sample_request, @status, @vat_number, @destination_port,
          @project_description, @ip_address, @request_type
        )
      `);

      stmt.run({
        id: record.id,
        created_at: record.created_at,
        company_name: record.company_name,
        contact_name: record.contact_name,
        email: record.email,
        phone: record.phone || '',
        country: record.country,
        incoterm: record.incoterm || '',
        products_requested: record.products_requested,
        order_volume: record.order_volume || '',
        is_sample_request: record.is_sample_request,
        status: record.status || 'nouveau',
        vat_number: record.vat_number || '',
        destination_port: record.destination_port || '',
        project_description: record.project_description || '',
        ip_address: record.ip_address || '',
        request_type: record.request_type || '',
      });
      console.log(`[SQLite DB] Prospect persistant enregistré avec ID: ${record.id}`);
    } catch (sqlErr) {
      console.error('[SQLite DB] Échec de requête SQL INSERT:', sqlErr);
    }
  }

  // 2. Sauvegarde miroir JSON (redondance anti-perte)
  appendToJsonBackup(record);

  // 3. Réplication Cloud Supabase asynchrone (optionnelle)
  if (supabase) {
    try {
      const { error } = await supabase.from('leads').insert({
        id: record.id,
        created_at: record.created_at,
        company_name: record.company_name,
        contact_name: record.contact_name,
        email: record.email,
        phone: record.phone,
        country: record.country,
        incoterm: record.incoterm,
        products_requested: JSON.parse(record.products_requested),
        order_volume: record.order_volume,
        is_sample_request: Boolean(record.is_sample_request),
        status: record.status,
      });
      if (error) {
        console.warn('[Supabase Cloud] Erreur insertion cloud (non bloquant):', error.message);
      } else {
        console.log(`[Supabase Cloud] Lead ${record.id} synchronisé avec succès.`);
      }
    } catch (cloudErr) {
      console.warn('[Supabase Cloud] Exception réplication cloud:', cloudErr);
    }
  }
}

/**
 * Récupère les prospects enregistrés avec pagination sécurisée (anti-DDoS / inondation)
 */
export function getAllLeads(limit: number = 50, offset: number = 0): B2BLeadRecord[] {
  // Plafond strict : 100 enregistrements au maximum par page
  const safeLimit = Math.min(Math.max(1, Math.floor(Number(limit) || 50)), 100);
  const safeOffset = Math.max(0, Math.floor(Number(offset) || 0));

  if (db) {
    try {
      const stmt = db.prepare('SELECT * FROM leads ORDER BY created_at DESC LIMIT ? OFFSET ?');
      return stmt.all(safeLimit, safeOffset) as B2BLeadRecord[];
    } catch (err) {
      console.error('[SQLite DB] Erreur de lecture des leads:', err);
    }
  }

  // Fallback JSON si SQLite indisponible
  if (fs.existsSync(JSON_BACKUP_PATH)) {
    try {
      const all: B2BLeadRecord[] = JSON.parse(fs.readFileSync(JSON_BACKUP_PATH, 'utf-8'));
      return all.slice(safeOffset, safeOffset + safeLimit);
    } catch {
      return [];
    }
  }
  return [];
}

/**
 * Recherche un prospect par son identifiant unique
 */
export function getLeadById(id: string): B2BLeadRecord | null {
  if (db) {
    try {
      const stmt = db.prepare('SELECT * FROM leads WHERE id = ?');
      const row = stmt.get(id);
      return (row as B2BLeadRecord) || null;
    } catch (err) {
      console.error('[SQLite DB] Erreur de recherche lead par id:', err);
    }
  }
  return null;
}

export type LeadStatus =
  | 'nouveau'
  | 'contacté'
  | 'devis_envoyé'
  | 'échantillon_expédié'
  | 'clôturé';

export function normalizeLeadStatus(status: string): LeadStatus | null {
  if (!status) return null;
  const s = status.toLowerCase().trim();
  if (s === 'nouveau' || s === 'new') return 'nouveau';
  if (s === 'contacte' || s === 'contacté' || s === 'contacted') return 'contacté';
  if (s === 'devis_envoye' || s === 'devis_envoyé' || s === 'quote_sent') return 'devis_envoyé';
  if (s === 'echantillon_expedie' || s === 'échantillon_expédié' || s === 'sample_shipped') return 'échantillon_expédié';
  if (s === 'cloture' || s === 'clôturé' || s === 'closed') return 'clôturé';
  return null;
}

/**
 * Met à jour le statut d'un prospect (ex: 'nouveau' -> 'contacté' -> 'devis_envoyé')
 */
export function updateLeadStatus(id: string, statusInput: string): boolean {
  const normalizedStatus = normalizeLeadStatus(statusInput);
  if (!normalizedStatus) return false;

  if (db) {
    try {
      const stmt = db.prepare('UPDATE leads SET status = ? WHERE id = ?');
      const info = stmt.run(normalizedStatus, id);
      return info.changes > 0;
    } catch (err) {
      console.error('[SQLite DB] Erreur de mise à jour du statut:', err);
    }
  }
  return false;
}
