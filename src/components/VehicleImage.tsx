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
    <div className={`relative overflow-visible ${containerClassName}`}>
      {/* Light Mode Vehicle Image (White Porsche 911 Cutout) */}
      <img
        src={lightSrc}
        alt={`${alt} Light`}
        className={`w-full h-full object-contain transition-opacity duration-500 ease-in-out ${
          theme === 'light' ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-98 absolute inset-0 pointer-events-none'
        } ${className}`}
      />
      {/* Dark Mode Vehicle Image (Black Porsche 911 Cutout) */}
      <img
        src={darkSrc}
        alt={`${alt} Dark`}
        className={`w-full h-full object-contain transition-opacity duration-500 ease-in-out ${
          theme === 'dark' ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-98 absolute inset-0 pointer-events-none'
        } ${className}`}
      />
    </div>
  );
}
