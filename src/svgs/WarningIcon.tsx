import * as React from 'react';
export const WarningIcon: React.FC = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width={56} height={56} fill='none'>
    <rect width={48} height={48} x={4} y={4} fill='#FEF0C7' rx={24} />
    <path
      stroke='#DC6803'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M28 24v4m0 4h.01m-1.72-13.14L17.82 33a1.998 1.998 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3l-8.47-14.14a2 2 0 0 0-3.42 0Z'
    />
    <rect width={48} height={48} x={4} y={4} stroke='#FFFAEB' strokeWidth={8} rx={24} />
  </svg>
);
