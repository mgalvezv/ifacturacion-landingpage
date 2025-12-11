import React from 'react';

interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
  /** Si es true, la animación se ve siempre (además de hover) */
  active?: boolean;
}

const MagicCard: React.FC<MagicCardProps> = ({ children, className, active }) => {
  return (
    <div className={`magic-card ${active ? 'magic-card--active' : ''} ${className ?? ''}`}>
      {children}
    </div>
  );
};

export default MagicCard;
