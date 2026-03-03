import { clsx } from 'clsx';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'ai' | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  const variants = {
    success: 'bg-neon-green/15 text-neon-green border border-neon-green/30',
    warning: 'bg-accent-amber/15 text-accent-amber border border-accent-amber/30',
    error: 'bg-accent-red/15 text-accent-red border border-accent-red/30',
    info: 'bg-accent-blue/15 text-accent-blue border border-accent-blue/30',
    ai: 'bg-gradient-to-r from-accent-purple/20 to-accent-blue/20 text-accent-purple border border-accent-purple/30',
    default: 'bg-surface-gunmetal text-gray-300 border border-surface-slate',
  };

  return (
    <span className={clsx('inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wide', variants[variant], className)}>
      {variant === 'ai' && <span className="mr-1">✨</span>}
      {children}
    </span>
  );
}
