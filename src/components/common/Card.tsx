import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  bodyClassName?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  bodyClassName = 'p-6',
  onClick,
}) => {
  return (
    <div
      className={`glass-card rounded-2xl shadow-lg shadow-black/5 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
    >
      {title && (
        <div className="p-5 border-b border-light-border/50 dark:border-dark-border/50">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </div>
  );
};

export default Card;
