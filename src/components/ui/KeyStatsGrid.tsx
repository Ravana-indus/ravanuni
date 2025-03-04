
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatItemProps {
  value: string | number;
  label: string;
  icon?: LucideIcon;
  color?: 'primary' | 'secondary' | 'accent';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const StatItem = ({ 
  value, 
  label, 
  icon: Icon, 
  color = 'primary',
  size = 'medium',
  className 
}: StatItemProps) => {
  const colorClasses = {
    'primary': 'text-institutional',
    'secondary': 'text-gray-900',
    'accent': 'text-institutional-light',
  };

  const sizeClasses = {
    'small': {
      value: 'text-3xl md:text-4xl font-bold',
      label: 'text-sm font-medium',
    },
    'medium': {
      value: 'text-4xl md:text-5xl font-bold',
      label: 'text-base md:text-lg font-medium',
    },
    'large': {
      value: 'text-5xl md:text-6xl font-bold',
      label: 'text-lg md:text-xl font-medium',
    },
  };

  return (
    <div className={cn("flex flex-col items-center p-6", className)}>
      {Icon && <Icon className={cn(colorClasses[color], "mb-4 h-8 w-8")} />}
      <div className={cn(colorClasses[color], sizeClasses[size].value, "mb-2")}>{value}</div>
      <div className={cn("text-gray-600", sizeClasses[size].label)}>{label}</div>
    </div>
  );
};

interface KeyStatsGridProps {
  stats: {
    value: string | number;
    label: string;
    icon?: LucideIcon;
    color?: 'primary' | 'secondary' | 'accent';
  }[];
  columns?: 2 | 3 | 4;
  style?: 'grid' | 'flex' | 'staggered';
  className?: string;
  itemClassName?: string;
}

const KeyStatsGrid = ({ 
  stats, 
  columns = 4, 
  style = 'grid',
  className,
  itemClassName
}: KeyStatsGridProps) => {
  const getGridColumns = () => {
    return {
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    }[columns];
  };

  const renderStats = () => {
    switch (style) {
      case 'grid':
        return (
          <div className={cn(`grid ${getGridColumns()} gap-6 md:gap-8`, className)}>
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
                color={stat.color}
                className={cn(
                  "glass-card hover:shadow-elegant transition-shadow duration-300",
                  itemClassName
                )}
              />
            ))}
          </div>
        );
      case 'flex':
        return (
          <div className={cn("flex flex-wrap justify-center gap-6 md:gap-8", className)}>
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
                color={stat.color}
                className={cn(
                  "glass-card hover:shadow-elegant transition-shadow duration-300 flex-1 min-w-[180px]",
                  itemClassName
                )}
              />
            ))}
          </div>
        );
      case 'staggered':
        return (
          <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-6", className)}>
            {stats.map((stat, index) => {
              // Create staggered layout positions
              const positions = [
                "md:col-span-5 md:col-start-1",
                "md:col-span-6 md:col-start-7",
                "md:col-span-4 md:col-start-2",
                "md:col-span-5 md:col-start-7",
              ];
              const position = positions[index % positions.length];
              
              return (
                <StatItem
                  key={index}
                  value={stat.value}
                  label={stat.label}
                  icon={stat.icon}
                  color={stat.color}
                  className={cn(
                    "glass-card hover:shadow-elegant transition-shadow duration-300",
                    position,
                    itemClassName
                  )}
                />
              );
            })}
          </div>
        );
    }
  };

  return renderStats();
};

export default KeyStatsGrid;
