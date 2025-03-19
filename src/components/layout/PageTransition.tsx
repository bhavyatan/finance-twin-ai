
import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type PageTransitionProps = {
  children: React.ReactNode;
};

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const pageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Add entrance animation when component mounts or route changes
    if (pageRef.current) {
      pageRef.current.style.opacity = '0';
      pageRef.current.style.transform = 'translateY(10px)';
      
      // Trigger animation after a small delay to ensure DOM has updated
      const timer = setTimeout(() => {
        if (pageRef.current) {
          pageRef.current.style.opacity = '1';
          pageRef.current.style.transform = 'translateY(0)';
        }
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [location]);
  
  return (
    <div 
      ref={pageRef}
      className="transition-all duration-500 ease-out pt-16"
      style={{ opacity: 0, transform: 'translateY(10px)' }}
    >
      {children}
    </div>
  );
};

export default PageTransition;
