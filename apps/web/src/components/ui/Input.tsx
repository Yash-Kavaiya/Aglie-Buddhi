import { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={clsx(
              'w-full bg-surface-void border rounded-md px-4 py-3 text-white placeholder:text-surface-slate/50',
              'transition-all duration-200 outline-none',
              icon && 'pl-10',
              error 
                ? 'border-accent-red focus:border-accent-red focus:shadow-[0_0_0_3px_rgba(255,68,68,0.15)]' 
                : 'border-surface-slate hover:border-surface-slate/80 focus:border-nvidia-green focus:shadow-[0_0_0_3px_rgba(118,185,0,0.15)]',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-accent-red">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
