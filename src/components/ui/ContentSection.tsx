
import React from 'react';
import { cn } from '@/lib/utils';

interface ContentSectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  background?: 'white' | 'light' | 'accent';
  layout?: 'standard' | 'asymmetrical' | 'offset';
  hideHeading?: boolean;
  alignment?: 'left' | 'center' | 'right';
  overlap?: boolean;
}

const ContentSection = ({
  id,
  title,
  subtitle,
  children,
  className,
  fullWidth = false,
  background = 'white',
  layout = 'standard',
  hideHeading = false,
  alignment = 'center',
  overlap = false,
}: ContentSectionProps) => {
  const backgroundClasses = {
    'white': 'bg-white',
    'light': 'bg-gray-50',
    'accent': 'bg-institutional-50',
  };
  
  const alignmentClasses = {
    'left': 'text-left',
    'center': 'text-center',
    'right': 'text-right',
  };

  const layoutClasses = {
    'standard': '',
    'asymmetrical': 'relative overflow-hidden',
    'offset': 'relative',
  };
  
  return (
    <section 
      id={id} 
      className={cn(
        "py-20", 
        backgroundClasses[background],
        layoutClasses[layout],
        overlap && "relative z-10",
        className
      )}
    >
      <div className={cn(
        fullWidth ? 'w-full' : 'container-content',
        layout === 'asymmetrical' && 'relative z-10',
      )}>
        {!hideHeading && title && (
          <div className={cn(
            "mb-12 max-w-3xl mx-auto px-4",
            alignmentClasses[alignment],
            alignment === 'left' ? 'ml-0' : alignment === 'right' ? 'mr-0' : ''
          )}>
            <h2 className="section-heading animate-fade-up">{title}</h2>
            {subtitle && <p className="section-subheading animate-fade-up" style={{ animationDelay: '0.2s' }}>{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default ContentSection;
