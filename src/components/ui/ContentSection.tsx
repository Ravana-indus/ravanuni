
import React from 'react';
import { cn } from '@/lib/utils';

interface ContentSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  titleAlignment?: 'left' | 'center';
  titleSize?: 'default' | 'large';
  background?: 'white' | 'light' | 'accent';
}

const ContentSection = ({
  id,
  title,
  subtitle,
  children,
  className,
  fullWidth = false,
  titleAlignment = 'center',
  titleSize = 'default',
  background = 'white',
}: ContentSectionProps) => {
  const getBgColor = () => {
    switch (background) {
      case 'light':
        return 'bg-gray-50';
      case 'accent':
        return 'bg-accent/20';
      case 'white':
      default:
        return 'bg-white';
    }
  };

  return (
    <section 
      id={id} 
      className={cn(
        "py-20", 
        getBgColor(),
        className
      )}
    >
      <div className={fullWidth ? 'w-full' : 'container-content'}>
        <div className={cn(
          "mb-12 max-w-3xl px-4",
          titleAlignment === 'center' ? 'text-center mx-auto' : 'text-left'
        )}>
          <h2 className={cn(
            "section-heading animate-fade-up",
            titleSize === 'large' && "text-4xl sm:text-5xl font-bold"
          )}>
            {title}
          </h2>
          {subtitle && (
            <p className="section-subheading animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};

export default ContentSection;
