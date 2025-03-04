
import React from 'react';
import { cn } from '@/lib/utils';

interface AsymmetricLayoutProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'diagonal' | 'offset' | 'overlapping';
}

const AsymmetricLayout = ({ 
  children, 
  className,
  variant = 'offset'
}: AsymmetricLayoutProps) => {
  const variantClasses = {
    'diagonal': 'transform -rotate-2 overflow-visible',
    'offset': 'grid grid-cols-12 gap-6',
    'overlapping': 'relative'
  };

  if (variant === 'diagonal') {
    return (
      <div className={cn(variantClasses[variant], className)}>
        <div className="transform rotate-2">{children}</div>
      </div>
    );
  }

  if (variant === 'overlapping') {
    return (
      <div className={cn(variantClasses[variant], className)}>
        {children}
      </div>
    );
  }

  // Default to offset
  return (
    <div className={cn(variantClasses[variant], className)}>
      {children}
    </div>
  );
};

export const AsymmetricItem = ({ 
  children, 
  className,
  colSpan = 6,
  colStart = 'auto',
  zIndex = 10,
  offset = false,
}: {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
  colStart?: number | 'auto';
  zIndex?: number;
  offset?: boolean;
}) => {
  return (
    <div 
      className={cn(
        colStart !== 'auto' ? `col-start-${colStart}` : '',
        `col-span-12 md:col-span-${colSpan}`,
        offset && "transform translate-y-12",
        className
      )}
      style={{ zIndex }}
    >
      {children}
    </div>
  );
};

export default AsymmetricLayout;
