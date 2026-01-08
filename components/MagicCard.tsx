import React, { memo } from 'react';

interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
  /** Si es true, la animación se ve siempre (además de hover) */
  active?: boolean;
}

const MagicCard: React.FC<MagicCardProps> = memo(({ children, className, active }) => {
  return (
    <div className={`magic-card ${active ? 'magic-card--active' : ''} ${className ?? ''}`}>
      {children}
    </div>
  );
});

MagicCard.displayName = 'MagicCard';

export default MagicCard;
