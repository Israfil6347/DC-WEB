import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <div
      className="mb-10 p-6 text-onSurface  "
      style={{ minHeight: window.innerHeight - 700 }}
    >
      {children}
    </div>
  );
};

export default PageContainer;
