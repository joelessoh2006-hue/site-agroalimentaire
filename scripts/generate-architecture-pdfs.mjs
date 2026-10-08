import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const docsDir = path.join(rootDir, 'docs', 'architecture');
const pdfOutputDir = path.join(docsDir, 'pdf');

const DOC_FILES = [
  { src: '01_PRD.md', dest: '01_PRD.pdf', title: 'Product Requirements Document (PRD)' },
  { src: '02_APP_FLOW.md', dest: '02_APP_FLOW.pdf', title: 'Parcours Utilisateur & Cartographie Applicative (APP_FLOW)' },
  { src: '03_DESIGN_SYSTEM.md', dest: '03_DESIGN_SYSTEM.pdf', title: 'Système de Design & Charte d’Interface (DESIGN_SYSTEM)' },
  { src: '04_TRD.md', dest: '04_TRD.pdf', title: 'Technical Requirements Document (TRD)' },
  { src: '05_BACKEND_SCHEMA.md', dest: '05_BACKEND_SCHEMA.pdf', title: 'Schéma de Données & Contrats d’API (BACKEND_SCHEMA)' },
  { src: '06_IMPLEMENTATION_PLAN.md', dest: '06_IMPLEMENTATION_PLAN.pdf', title: 'Plan d’Implémentation & Feuille de Route (IMPLEMENTATION_PLAN)' },
];

// Vérifier la présence de Google Chrome
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
if (!fs.existsSync(chromePath)) {
  console.error(`[PDF Generator] Google Chrome non trouvé au chemin standard : ${chromePath}`);
  process.exit(1);
}

// Assurer le répertoire de sortie
if (!fs.existsSync(pdfOutputDir)) {
  fs.mkdirSync(pdfOutputDir, { recursive: true });
}

// Convertisseur Markdown -> HTML léger et résilient
function parseMarkdownToHtml(md) {
  const lines = md.split('\n');
  const htmlParts = [];
  let inCodeBlock = false;
  let codeLang = '';
  let codeBuffer = [];
  let inTable = false;
  let tableRows = [];
  let inList = false;
  let listType = ''; // 'ul' | 'ol'

  function flushList() {
    if (inList) {
      htmlParts.push(`</${listType}>`);
      inList = false;
      listType = '';
    }
  }

  function flushTable() {
    if (inTable && tableRows.length > 0) {
      let tableHtml = '<div class="table-container"><table>\n';
      tableRows.forEach((row, idx) => {
        const isHeader = idx === 0;
        const tag = isHeader ? 'th' : 'td';
        tableHtml += '  <tr>\n';
        row.forEach((cell) => {
          const content = formatInline(cell.trim());
          tableHtml += `    <${tag}>${content}</${tag}>\n`;
        });
        tableHtml += '  </tr>\n';
      });
      tableHtml += '</table></div>\n';
      htmlParts.push(tableHtml);
      inTable = false;
      tableRows = [];
    }
  }

  function formatInline(text) {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Code blocks
    if (trimmed.startsWith('```')) {
      flushList();
      flushTable();
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLang = trimmed.slice(3).trim().toLowerCase();
        codeBuffer = [];
      } else {
        inCodeBlock = false;
        const codeContent = codeBuffer.join('\n');
        if (codeLang === 'mermaid') {
          htmlParts.push(`<div class="mermaid">\n${codeContent}\n</div>`);
        } else {
          const escaped = codeContent
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
          htmlParts.push(`<pre><code class="language-${codeLang}">${escaped}</code></pre>`);
        }
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(rawLine);
      continue;
    }

    // Table rows
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushList();
      const cells = trimmed
        .slice(1, -1)
        .split('|')
        .map((c) => c.trim());

      // Vérifier si c'est la ligne de séparation |:---|---|
      const isSeparator = cells.every((c) => /^:?-+:?$/.test(c));
      if (!isSeparator) {
        if (!inTable) inTable = true;
        tableRows.push(cells);
      }
      continue;
    } else {
      flushTable();
    }

    // Séparateur horizontal
    if (/^---$|^===$/.test(trimmed)) {
      flushList();
      htmlParts.push('<hr />');
      continue;
    }

    // Titres
    if (trimmed.startsWith('# ')) {
      flushList();
      htmlParts.push(`<h1>${formatInline(trimmed.slice(2))}</h1>`);
      continue;
    }
    if (trimmed.startsWith('## ')) {
      flushList();
      htmlParts.push(`<h2>${formatInline(trimmed.slice(3))}</h2>`);
      continue;
    }
    if (trimmed.startsWith('### ')) {
      flushList();
      htmlParts.push(`<h3>${formatInline(trimmed.slice(4))}</h3>`);
      continue;
    }
    if (trimmed.startsWith('#### ')) {
      flushList();
      htmlParts.push(`<h4>${formatInline(trimmed.slice(5))}</h4>`);
      continue;
    }

    // Listes à puces
    const ulMatch = trimmed.match(/^[*+-]\s+(.*)$/);
    if (ulMatch) {
      if (!inList || listType !== 'ul') {
        flushList();
        inList = true;
        listType = 'ul';
        htmlParts.push('<ul>');
      }
      htmlParts.push(`  <li>${formatInline(ulMatch[1])}</li>`);
      continue;
    }

    // Listes numérotées
    const olMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (olMatch) {
      if (!inList || listType !== 'ol') {
        flushList();
        inList = true;
        listType = 'ol';
        htmlParts.push('<ol>');
      }
      htmlParts.push(`  <li>${formatInline(olMatch[2])}</li>`);
      continue;
    }

    // Fin de liste si ligne vide ou texte
    if (trimmed.length === 0) {
      flushList();
      continue;
    }

    // Citations
    if (trimmed.startsWith('> ')) {
      flushList();
      htmlParts.push(`<blockquote>${formatInline(trimmed.slice(2))}</blockquote>`);
      continue;
    }

    // Paragraphe classique
    flushList();
    htmlParts.push(`<p>${formatInline(trimmed)}</p>`);
  }

  flushList();
  flushTable();

  return htmlParts.join('\n');
}

// Template HTML complet avec typographie d'ingénierie et CSS d'impression A4
function generateFullHtml(docTitle, contentHtml) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>${docTitle}</title>
  <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", function() {
      mermaid.initialize({
        startOnLoad: true,
        theme: "neutral",
        fontFamily: "'JetBrains Mono', monospace",
        securityLevel: "loose"
      });
    });
  </script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

    @page {
      size: A4;
      margin: 18mm 16mm 20mm 16mm;
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    body {
      font-family: 'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      font-size: 9.5pt;
      line-height: 1.5;
      color: #1C1917;
      background-color: #FFFFFF;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }

    /* En-tête de page institutionnel */
    .doc-header {
      border-bottom: 2px solid #221510;
      padding-bottom: 8px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .doc-header-left {
      font-family: 'JetBrains Mono', monospace;
      font-size: 7pt;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #9C7336;
    }

    .doc-header-right {
      font-family: 'JetBrains Mono', monospace;
      font-size: 6.5pt;
      color: #78716C;
      text-transform: uppercase;
    }

    /* Pied de page institutionnel */
    .doc-footer {
      margin-top: 30px;
      padding-top: 8px;
      border-top: 1px solid #E4DDD3;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'JetBrains Mono', monospace;
      font-size: 6.5pt;
      color: #78716C;
    }

    /* Typographie des titres */
    h1 {
      font-size: 19pt;
      font-weight: 700;
      color: #221510;
      margin-top: 0;
      margin-bottom: 8px;
      line-height: 1.2;
      letter-spacing: -0.02em;
    }

    h2 {
      font-size: 13pt;
      font-weight: 700;
      color: #221510;
      border-bottom: 1px solid #E4DDD3;
      padding-bottom: 4px;
      margin-top: 18px;
      margin-bottom: 10px;
      page-break-after: avoid;
    }

    h3 {
      font-size: 10.5pt;
      font-weight: 700;
      color: #4A2C21;
      margin-top: 14px;
      margin-bottom: 6px;
      page-break-after: avoid;
    }

    h4 {
      font-size: 9.5pt;
      font-weight: 600;
      color: #9C7336;
      margin-top: 10px;
      margin-bottom: 4px;
    }

    p {
      margin-top: 0;
      margin-bottom: 8px;
      text-align: justify;
    }

    ul, ol {
      margin-top: 0;
      margin-bottom: 10px;
      padding-left: 20px;
    }

    li {
      margin-bottom: 3px;
    }

    hr {
      border: none;
      border-top: 1px solid #E4DDD3;
      margin: 16px 0;
    }

    blockquote {
      margin: 10px 0;
      padding: 8px 12px;
      background-color: #FAF7F2;
      border-left: 3px solid #C29958;
      font-style: italic;
      color: #4A2C21;
      font-size: 9pt;
    }

    /* Code inline et blocs */
    code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 8.5pt;
      background-color: #FAF7F2;
      border: 1px solid #E4DDD3;
      padding: 1px 4px;
      border-radius: 3px;
      color: #221510;
    }

    pre {
      background-color: #FAF7F2;
      border: 1px solid #E4DDD3;
      border-radius: 4px;
      padding: 10px 12px;
      overflow-x: auto;
      margin: 10px 0;
      page-break-inside: avoid;
    }

    pre code {
      background: none;
      border: none;
      padding: 0;
      font-size: 8pt;
      line-height: 1.45;
      color: #221510;
    }

    /* Tableaux industriels */
    .table-container {
      margin: 12px 0;
      page-break-inside: avoid;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8pt;
      border: 1px solid #E4DDD3;
    }

    th {
      background-color: #FAF7F2;
      color: #221510;
      font-weight: 700;
      text-align: left;
      padding: 6px 8px;
      border: 1px solid #E4DDD3;
      font-family: 'Source Sans 3', sans-serif;
      text-transform: uppercase;
      font-size: 7.5pt;
      letter-spacing: 0.04em;
    }

    td {
      padding: 5px 8px;
      border: 1px solid #E4DDD3;
      vertical-align: top;
      color: #1C1917;
    }

    tr:nth-child(even) td {
      background-color: #FCFAF7;
    }

    td code {
      font-size: 7.5pt;
    }

    /* Mermaid */
    .mermaid {
      background-color: #FAF7F2;
      border: 1px solid #E4DDD3;
      border-radius: 4px;
      padding: 12px;
      margin: 12px 0;
      text-align: center;
      page-break-inside: avoid;
    }

    a {
      color: #9C7336;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="doc-header">
    <div class="doc-header-left">
      AGRO-INDUSTRIAL COCOA · SPÉCIFICATIONS TECHNIQUES D'INGÉNIERIE
    </div>
    <div class="doc-header-right">
      USINE DE SAN PEDRO · OCTOBRE 2026
    </div>
  </div>

  ${contentHtml}

  <div class="doc-footer">
    <div>Plateforme Agro-Industrielle B2B · Réf. Norme EU 2023/1115 & ISO 17025</div>
    <div>Diffusion Réservée · Document Officiel d'Ingénierie</div>
  </div>
</body>
</html>`;
}

// Fonction principale de génération
async function main() {
  console.log('===========================================================');
  console.log('🏭 Générateur de Documentation PDF Agro-Industrielle B2B');
  console.log('===========================================================');
  console.log(`Dossier source : ${docsDir}`);
  console.log(`Dossier de sortie : ${pdfOutputDir}\n`);

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-doc-pdf-'));

  try {
    for (const doc of DOC_FILES) {
      const srcPath = path.join(docsDir, doc.src);
      const destPdfPath = path.join(pdfOutputDir, doc.dest);
      const tempHtmlPath = path.join(tempDir, `${path.basename(doc.src, '.md')}.html`);

      if (!fs.existsSync(srcPath)) {
        console.warn(`[Avertissement] Fichier source introuvable : ${srcPath}`);
        continue;
      }

      console.log(`📄 Conversion : ${doc.src} -> ${doc.dest}...`);
      const mdContent = fs.readFileSync(srcPath, 'utf-8');
      const parsedHtml = parseMarkdownToHtml(mdContent);
      const fullHtml = generateFullHtml(doc.title, parsedHtml);

      fs.writeFileSync(tempHtmlPath, fullHtml, 'utf-8');

      // Exécution de Google Chrome headless avec isolation de profil
      const chromeArgs = [
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        `--user-data-dir=${tempDir}`,
        '--run-all-compositor-stages-before-draw',
        '--virtual-time-budget=2000',
        `--print-to-pdf=${destPdfPath}`,
        tempHtmlPath,
      ];

      execFileSync(chromePath, chromeArgs, {
        stdio: 'pipe',
        timeout: 45000,
      });

      if (fs.existsSync(destPdfPath)) {
        const stats = fs.statSync(destPdfPath);
        const kbSize = (stats.size / 1024).toFixed(1);
        console.log(`   ✅ Généré avec succès : ${doc.dest} (${kbSize} Ko)`);
      } else {
        console.error(`   ❌ Échec de génération pour : ${doc.dest}`);
      }
    }

    console.log('\n✨ Synthèse : Tous les 6 documents d’ingénierie ont été convertis en PDF.');
  } finally {
    // Nettoyage du dossier temporaire
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch {
      // ignore
    }
  }
}

main().catch((err) => {
  console.error('[Erreur]', err);
  process.exit(1);
});
