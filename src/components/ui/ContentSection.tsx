
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
  titleAlignment?: 'left' | 'center';
  titleSize?: 'default' | 'large';
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
  imageCopyright?: string;
}

const ContentSection = ({
  id,
  title,
  subtitle,
  children,
  className,
  fullWidth = false,
  background = 'white',
  titleAlignment = 'center',
  titleSize = 'default',
  imageUrl,
  imageAlt = '',
  imageCaption,
  imageCopyright,
}: ContentSectionProps) => {
  const backgroundClasses = {
    'white': 'bg-white',
    'light': 'bg-gray-50',
    'accent': 'bg-institutional-50',
  };
  
  const hasImage = Boolean(imageUrl);
  
  return (
    <section 
      id={id} 
      className={cn(
        "flex flex-col relative",
        hasImage ? "pt-0" : "py-20", 
        backgroundClasses[background],
        className
      )}
    >
      {hasImage && (
        <div className="w-full order-1">
          <figure aria-labelledby={`figcaption-${id}`} className="relative w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <img 
              src={imageUrl} 
              alt={imageAlt}
              className="w-full h-[500px] md:h-[600px] object-cover"
            />
            {imageCopyright && (
              <p className="m-0 absolute bottom-4 right-4 z-20">
                <small className="text-white text-xs opacity-80">{imageCopyright}</small>
              </p>
            )}
            {imageCaption && (
              <figcaption 
                id={`figcaption-${id}`} 
                className="absolute bottom-0 left-0 right-0 p-4 text-white text-sm z-20"
              >
                <span className="block md:hidden">{imageCaption}</span>
                <span className="hidden md:block">{imageCaption}</span>
              </figcaption>
            )}
          </figure>
        </div>
      )}
      
      <div className={cn(
        "container-content relative",
        hasImage ? "-mt-12 md:-mt-24 order-2 mb-20" : ""
      )}>
        <div className={cn(
          "max-w-3xl px-4",
          hasImage ? "bg-white p-4 md:p-6 shadow-md" : "",
          titleAlignment === 'center' ? 'text-center mx-auto' : 'text-left',
          hasImage ? "mb-8" : "mb-12"
        )}>
          <h2 className={cn(
            "section-heading animate-fade-up",
            titleSize === 'large' && "text-4xl sm:text-5xl font-bold",
            hasImage && "mt-2"
          )}>
            {title}
          </h2>
          {subtitle && (
            <p className="section-subheading animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {subtitle}
            </p>
          )}
        </div>
        <div className={fullWidth ? 'w-full' : 'px-4'}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
