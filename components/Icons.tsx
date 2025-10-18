
import React from 'react';

export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const SaunaIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3C7.58 3 4 4.79 4 7V17.75C4 18.44 4.56 19 5.25 19H6V21H8V19H16V21H18V19H18.75C19.44 19 20 18.44 20 17.75V7C20 4.79 16.42 3 12 3ZM12 5C14.76 5 17 6.34 17 8H7C7 6.34 9.24 5 12 5ZM6 17V10H18V17H6Z" />
        <path d="M9 12H11V15H9V12Z" />
    </svg>
);
