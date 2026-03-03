import { clsx } from 'clsx';
import Image from 'next/image';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy' | 'away';
  className?: string;
}

export function Avatar({ src, alt, name, size = 'md', status, className }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const statusColors = {
    online: 'bg-neon-green',
    offline: 'bg-gray-500',
    busy: 'bg-accent-red',
    away: 'bg-accent-amber',
  };

  const statusSizes = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={clsx('relative inline-flex', className)}>
      <div
        className={clsx(
          'rounded-full overflow-hidden bg-surface-gunmetal flex items-center justify-center font-semibold text-gray-300',
          sizes[size]
        )}
      >
        {src ? (
          <Image src={src} alt={alt || name || 'Avatar'} fill className="object-cover" />
        ) : name ? (
          getInitials(name)
        ) : (
          <span>👤</span>
        )}
      </div>
      {status && (
        <span
          className={clsx(
            'absolute bottom-0 right-0 rounded-full border-2 border-surface-void',
            statusColors[status],
            statusSizes[size]
          )}
        />
      )}
    </div>
  );
}
