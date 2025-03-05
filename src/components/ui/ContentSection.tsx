import React from 'react';
import { cn } from '@/lib/utils';

interface ContentSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  background?: 'white' | 'light' | 'accent';
}

const ContentSection = ({
  id,
  title,
  subtitle,
  children,
  className,
  fullWidth = false,
  background = 'white',
}: ContentSectionProps) => {
  // We'll keep this for backwards compatibility but only use it for hero section
  const backgroundClasses = {
    'white': 'bg-white',
    'light': 'bg-gray-50',
    'accent': 'bg-institutional-50',
  };
  
  return (
    <section 
      id={id} 
      className={cn(
        "py-20", 
        // Force bg-white for all sections except when specifically overridden with className
        "bg-white",
        className
      )}
    >
      <div className={fullWidth ? 'w-full' : 'container-content'}>
        <div className="mb-12 text-center max-w-3xl mx-auto px-4">
          <h2 className="section-heading animate-fade-up">{title}</h2>
          {subtitle && <p className="section-subheading animate-fade-up" style={{ animationDelay: '0.2s' }}>{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
};

export default ContentSection;
