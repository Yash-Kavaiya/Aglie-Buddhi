import { clsx } from 'clsx';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  iconColor?: string;
  progress?: number;
  progressLabel?: string;
}

export function KPICard({ 
  title, 
  value, 
  change, 
  changeLabel = 'vs last period',
  icon: Icon,
  iconColor = 'text-nvidia-green',
  progress,
  progressLabel 
}: KPICardProps) {
  const getTrendIcon = () => {
    if (!change) return <Minus className="w-4 h-4" />;
    return change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />;
  };

  const getTrendColor = () => {
    if (!change) return 'text-gray-400';
    return change > 0 ? 'text-neon-green' : 'text-accent-red';
  };

  return (
    <div className="card card-interactive group">
      <div className="flex items-start justify-between mb-4">
        <div className={clsx('p-2.5 rounded-lg bg-surface-gunmetal group-hover:bg-nvidia-green/10 transition-colors', iconColor)}>
          <Icon className="w-5 h-5" />
        </div>
        {change !== undefined && (
          <div className={clsx('flex items-center gap-1 text-sm font-medium', getTrendColor())}>
            {getTrendIcon()}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <p className="text-2xl font-bold text-white font-display">{value}</p>
      
      {change !== undefined && (
        <p className="text-xs text-gray-500 mt-1">{changeLabel}</p>
      )}
      
      {progress !== undefined && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-gray-400">{progressLabel || 'Progress'}</span>
            <span className="text-nvidia-green font-medium">{progress}%</span>
          </div>
          <div className="h-1.5 bg-surface-gunmetal rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-nvidia-green to-neon-green rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
