import React from 'react';

interface PageBodyProps {
  children: React.ReactNode;
  className?: string; 
}

const PageBody: React.FC<PageBodyProps> = ({ children, className = '' }) => {
  return (
    <div className={`container mx-auto px-4 sm:px-6 lg:px-8 mt-2 mb-2 ${className}`}>
      <div className="bg-white shadow rounded-lg p-6 md:p-8">
        {children}
      </div>
    </div>
  );
};

export default PageBody;
