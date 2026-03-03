import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'ai';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-nvidia-green text-surface-void hover:bg-nvidia-green-light hover:shadow-glow active:bg-nvidia-green-dark',
      secondary: 'bg-transparent border border-nvidia-green text-nvidia-green hover:bg-nvidia-green/10 hover:shadow-glow-sm',
      ghost: 'bg-transparent text-gray-400 hover:text-white hover:bg-surface-gunmetal',
      danger: 'bg-accent-red text-white hover:bg-accent-red/90',
      ai: 'relative overflow-hidden bg-gradient-to-r from-accent-purple to-accent-blue text-white hover:shadow-ai-glow',
    };
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-6 py-3 text-base',
    };

    return (
      <button
        ref={ref}
        className={clsx(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {variant === 'ai' && !loading && (
          <span className="mr-2">✨</span>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
