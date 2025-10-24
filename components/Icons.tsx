
import React from 'react';

export const ElixirIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 12 22 12 22C12 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 19.45C12 19.45 5 15.48 5 12C5 8.13 8.13 5 12 5C15.87 5 19 8.13 19 12C19 15.48 12 19.45 12 19.45Z"
      fill="#e539fd"
    />
  </svg>
);
