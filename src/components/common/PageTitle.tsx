import React from 'react';

const PageTitle: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-extrabold">{title}</h1>
      <p className="text-light-text_secondary dark:text-dark-text_secondary mt-1 max-w-2xl">
        {subtitle}
      </p>
    </div>
  );
};
export default PageTitle;
