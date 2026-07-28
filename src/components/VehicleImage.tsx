import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface VehicleImageProps {
  lightSrc: string;
  darkSrc: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export function VehicleImage({ lightSrc, darkSrc, alt, className = '', containerClassName = '' }: VehicleImageProps) {
  const { theme } = useTheme();

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Light Mode Vehicle Image (White/Silver Studio) */}
      <img
        src={lightSrc}
        alt={`${alt} Light Studio`}
        className={`w-full h-full object-cover transition-opacity duration-600 ease-in-out ${
          theme === 'light' ? 'opacity-100 scale-100' : 'opacity-0 scale-98 absolute inset-0 pointer-events-none'
        } ${className}`}
      />
      {/* Dark Mode Vehicle Image (Jet Black / Mission Control Cinematic) */}
      <img
        src={darkSrc}
        alt={`${alt} Dark Cinematic`}
        className={`w-full h-full object-cover transition-opacity duration-600 ease-in-out ${
          theme === 'dark' ? 'opacity-100 scale-100' : 'opacity-0 scale-98 absolute inset-0 pointer-events-none'
        } ${className}`}
      />
    </div>
  );
}
