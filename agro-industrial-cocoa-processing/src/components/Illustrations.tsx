import React from 'react';

export const CocoaPodSchematic: React.FC<{ className?: string }> = ({ className = 'w-full h-48' }) => {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Background technical grid */}
      <defs>
        <pattern id="techGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E4DDD3" strokeWidth="0.5" strokeOpacity="0.6" />
        </pattern>
        <linearGradient id="podGrad" x1="50" y1="50" x2="350" y2="190" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C29958" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#4A2C21" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#221510" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      <rect width="400" height="240" fill="url(#techGrid)" rx="6" />

      {/* Axis markers */}
      <line x1="20" y1="120" x2="380" y2="120" stroke="#C29958" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.6" />
      <line x1="200" y1="20" x2="200" y2="220" stroke="#C29958" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.6" />

      {/* Cocoa Pod Contour */}
      <path
        d="M 60 120 C 80 70, 180 45, 270 65 C 330 80, 360 115, 365 120 C 360 125, 330 160, 270 175 C 180 195, 80 170, 60 120 Z"
        fill="url(#podGrad)"
        stroke="#4A2C21"
        strokeWidth="1.8"
      />

      {/* Longitudinal Ridges (Sillons) */}
      <path d="M 60 120 Q 200 80 365 120" stroke="#C29958" strokeWidth="1.2" fill="none" />
      <path d="M 60 120 Q 200 160 365 120" stroke="#C29958" strokeWidth="1.2" fill="none" />
      <path d="M 75 110 Q 200 60 345 115" stroke="#4A2C21" strokeWidth="0.8" strokeDasharray="2 2" fill="none" />
      <path d="M 75 130 Q 200 180 345 125" stroke="#4A2C21" strokeWidth="0.8" strokeDasharray="2 2" fill="none" />

      {/* Beans in Mucilage (Fèves dans la pulpe) */}
      <ellipse cx="160" cy="115" rx="14" ry="9" transform="rotate(-15 160 115)" fill="#F8F4EE" stroke="#4A2C21" strokeWidth="1" />
      <ellipse cx="190" cy="110" rx="14" ry="9" transform="rotate(-5 190 110)" fill="#F8F4EE" stroke="#4A2C21" strokeWidth="1" />
      <ellipse cx="220" cy="112" rx="14" ry="9" transform="rotate(10 220 112)" fill="#F8F4EE" stroke="#4A2C21" strokeWidth="1" />
      <ellipse cx="250" cy="120" rx="13" ry="8.5" transform="rotate(20 250 120)" fill="#F8F4EE" stroke="#4A2C21" strokeWidth="1" />
      <ellipse cx="175" cy="132" rx="13" ry="8.5" transform="rotate(-10 175 132)" fill="#F8F4EE" stroke="#4A2C21" strokeWidth="1" />
      <ellipse cx="205" cy="130" rx="13" ry="8.5" transform="rotate(5 205 130)" fill="#F8F4EE" stroke="#4A2C21" strokeWidth="1" />
      <ellipse cx="235" cy="133" rx="12" ry="8" transform="rotate(15 235 133)" fill="#F8F4EE" stroke="#4A2C21" strokeWidth="1" />

      {/* Stem / Pédoncule */}
      <path d="M 60 120 Q 40 122 30 118" stroke="#221510" strokeWidth="3" strokeLinecap="round" />

      {/* Technical Labels */}
      <text x="30" y="35" fontFamily="Space Grotesk" fontSize="9" fontWeight="600" fill="#4A2C21" letterSpacing="0.08em">THEOBROMA CACAO L. // MORPHOLOGIE FÈVES</text>
      <text x="30" y="48" fontFamily="Hanken Grotesk" fontSize="8" fill="#5D5753">Teneur lipidique cotylédon : 53.0 - 55.5% · Indice de fermentation &gt; 85%</text>

      {/* Precision dimension indicators */}
      <line x1="60" y1="205" x2="365" y2="205" stroke="#5D5753" strokeWidth="0.8" />
      <polyline points="65,202 60,205 65,208" stroke="#5D5753" strokeWidth="0.8" fill="none" />
      <polyline points="360,202 365,205 360,208" stroke="#5D5753" strokeWidth="0.8" fill="none" />
      <text x="212" y="218" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fill="#5D5753">CALIBRE INDUSTRIEL : 85-100 FÈVES / 100g</text>
    </svg>
  );
};

export const IndustrialPressDiagram: React.FC<{ className?: string }> = ({ className = 'w-full h-48' }) => {
  return (
    <svg viewBox="0 0 420 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Background frame */}
      <rect width="420" height="220" fill="#FCFAF7" rx="6" stroke="#E4DDD3" strokeWidth="1" />

      {/* Flow arrows */}
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#C29958" />
        </marker>
      </defs>

      {/* Section 1: Masse de Cacao Input */}
      <rect x="25" y="60" width="75" height="100" fill="#221510" rx="4" />
      <text x="62" y="100" textAnchor="middle" fontFamily="Space Grotesk" fontSize="9" fontWeight="700" fill="#F8F4EE">LIQUEUR</text>
      <text x="62" y="114" textAnchor="middle" fontFamily="Hanken Grotesk" fontSize="8" fill="#E4DDD3">100% PURE</text>
      <text x="62" y="128" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fill="#C29958">54% MG</text>

      {/* Pipe 1 */}
      <line x1="100" y1="110" x2="145" y2="110" stroke="#4A2C21" strokeWidth="4" />
      <line x1="110" y1="110" x2="135" y2="110" stroke="#C29958" strokeWidth="2" markerEnd="url(#arrow)" />

      {/* Section 2: Presse Hydraulique 450 bar */}
      <rect x="145" y="45" width="125" height="130" fill="#FFFFFF" stroke="#4A2C21" strokeWidth="1.5" rx="4" />
      <rect x="155" y="55" width="105" height="24" fill="#F1EDE7" rx="2" />
      <text x="207" y="70" textAnchor="middle" fontFamily="Space Grotesk" fontSize="8.5" fontWeight="700" fill="#221510" letterSpacing="0.06em">PRESSE HYDRAULIQUE</text>

      {/* Cylinder simulation */}
      <rect x="160" y="88" width="95" height="40" fill="#F8F4EE" stroke="#E4DDD3" rx="2" />
      <line x1="185" y1="88" x2="185" y2="128" stroke="#C29958" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="210" y1="88" x2="210" y2="128" stroke="#C29958" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="235" y1="88" x2="235" y2="128" stroke="#C29958" strokeWidth="1" strokeDasharray="2 2" />
      <text x="207" y="148" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fill="#2E5A36" fontWeight="600">P = 450 BAR · 98°C</text>

      {/* Separation Forks */}
      {/* Upper fork -> Beurre */}
      <path d="M 270 85 L 305 85 L 320 65" stroke="#C29958" strokeWidth="3" fill="none" />
      <rect x="320" y="45" width="80" height="42" fill="#F8F4EE" stroke="#C29958" strokeWidth="1.2" rx="4" />
      <text x="360" y="62" textAnchor="middle" fontFamily="Space Grotesk" fontSize="8.5" fontWeight="700" fill="#221510">BEURRE (PPP)</text>
      <text x="360" y="76" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7.5" fill="#5D5753">MG &gt; 99.85%</text>

      {/* Lower fork -> Tourteau */}
      <path d="M 270 135 L 305 135 L 320 155" stroke="#4A2C21" strokeWidth="3" fill="none" />
      <rect x="320" y="135" width="80" height="42" fill="#4A2C21" rx="4" />
      <text x="360" y="152" textAnchor="middle" fontFamily="Space Grotesk" fontSize="8.5" fontWeight="700" fill="#F8F4EE">TOURTEAU</text>
      <text x="360" y="166" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7.5" fill="#C29958">MG 10-12% / 20-22%</text>

      {/* Bottom annotation */}
      <text x="25" y="200" fontFamily="Space Grotesk" fontSize="8" fontWeight="600" fill="#4A2C21" letterSpacing="0.08em">SÉPARATION MÉCANIQUE ISOTHERME SANS SOLVANT CHIMIQUE</text>
      <text x="395" y="200" textAnchor="end" fontFamily="JetBrains Mono" fontSize="8" fill="#2E5A36">ISO 22000 AUDITED</text>
    </svg>
  );
};
