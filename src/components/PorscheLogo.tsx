import React from 'react';

interface PorscheLogoProps {
  className?: string;
  size?: number;
}

export function PorscheLogo({ className = '', size = 32 }: PorscheLogoProps) {
  return (
    <svg
      width={size}
      height={size * 1.25}
      viewBox="0 0 100 125"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 filter drop-shadow-md ${className}`}
    >
      {/* Outer Crest Shield Frame */}
      <path
        d="M50 2L5 20V65C5 92.5 50 123 50 123C50 123 95 92.5 95 65V20L50 2Z"
        fill="#D4AF37"
        stroke="#8B6508"
        strokeWidth="3"
      />
      
      {/* Top Black Banner with PORSCHE Text */}
      <path d="M10 22H90V34H10V22Z" fill="#111111" />
      <text
        x="50"
        y="31"
        fill="#D4AF37"
        fontSize="10"
        fontWeight="bold"
        fontFamily="sans-serif"
        textAnchor="middle"
        letterSpacing="2"
      >
        PORSCHE
      </text>

      {/* Top Left & Bottom Right Antler Quadrants (Gold) */}
      <path d="M12 36H48V72H12V36Z" fill="#E6CA65" stroke="#111" strokeWidth="1" />
      <path d="M52 74H88V110H52V74Z" fill="#E6CA65" stroke="#111" strokeWidth="1" />

      {/* Antler Lines */}
      <path d="M16 46C24 44 32 44 44 46M16 56C24 54 32 54 44 56M16 66C24 64 32 64 44 66" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M56 84C64 82 72 82 84 84M56 94C64 92 72 92 84 94M56 104C64 102 72 102 84 104" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />

      {/* Top Right & Bottom Left Red/Black Stripes Quadrants */}
      <path d="M52 36H88V72H52V36Z" fill="#111111" />
      <path d="M52 42H88V50H52V42Z" fill="#D5001C" />
      <path d="M52 58H88V66H52V58Z" fill="#D5001C" />

      <path d="M12 74H48V110H12V74Z" fill="#111111" />
      <path d="M12 80H48V88H12V80Z" fill="#D5001C" />
      <path d="M12 96H48V104H12V96Z" fill="#D5001C" />

      {/* Central Escutcheon Shield (Stuttgart Horse) */}
      <path
        d="M50 48C40 48 35 55 35 68C35 82 50 94 50 94C50 94 65 82 65 68C65 55 60 48 50 48Z"
        fill="#D4AF37"
        stroke="#111"
        strokeWidth="2"
      />
      {/* Rearing Horse Silhouette */}
      <path
        d="M48 58C46 56 47 54 50 54C52 54 53 56 51 58C53 60 55 61 54 64C53 66 51 68 50 72C49 74 48 76 47 78C46 76 45 72 47 70C48 68 47 64 45 62C44 60 46 58 48 58Z"
        fill="#111111"
      />
    </svg>
  );
}
