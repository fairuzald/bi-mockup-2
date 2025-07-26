import React from 'react';

const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  title?: string;
}> = ({ children, className = '', title }) => {
  return (
    <div
      className={`glass-card rounded-2xl shadow-lg shadow-black/5 ${className}`}
    >
      {title && (
        <div className="p-5 border-b border-light-border/50 dark:border-dark-border/50">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};
export default Card;
