import React from 'react';

interface PorscheLogoProps {
  className?: string;
  size?: number;
}

export function PorscheLogo({ className = '', size = 32 }: PorscheLogoProps) {
  return (
    <img
      src="/porsche-crest-logo.png"
      alt="Porsche Crest Logo"
      style={{ width: `${size}px`, height: 'auto' }}
      className={`object-contain shrink-0 filter drop-shadow-md ${className}`}
    />
  );
}
