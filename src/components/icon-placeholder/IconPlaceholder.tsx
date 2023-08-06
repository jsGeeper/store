import React from 'react';

type Variant = 'primary' | 'secondary' | 'tertiary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
interface IconPlaceholderProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: Variant;
  pointer?: boolean;
}

const IconPlaceholder = ({ children, onClick, variant = 'primary', pointer }: IconPlaceholderProps) => {
  let outerStyle, innerStyle;

  switch (variant) {
    case 'primary':
      outerStyle = {
        backgroundColor: '#F2F4F7'
      };
      innerStyle = {};
      break;
    default:
      outerStyle = {
        backgroundColor: '#F2F4F7'
      };
      innerStyle = {
        backgroundColor: '#4CA30D'
      };
      break;
  }

  return (
    <button id='iconPlaceholder' onClick={onClick} style={{ ...outerStyle, cursor: pointer ? 'pointer' : '' }}>
      <span>{children}</span>
    </button>
  );
};

export default IconPlaceholder;
