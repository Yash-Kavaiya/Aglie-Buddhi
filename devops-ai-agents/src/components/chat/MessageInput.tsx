/**
 * MessageInput component for submitting messages to agents
 * Requirements: 10.1
 */

import { useState, useCallback, type FormEvent, type KeyboardEvent } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface MessageInputProps {
  onSubmit: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  agentColor?: string;
}

// Map agent colors to gradient classes
const gradientMap: Record<string, string> = {
  blue: 'from-blue-500 to-blue-600',
  green: 'from-emerald-500 to-emerald-600',
  yellow: 'from-amber-500 to-amber-600',
  red: 'from-red-500 to-red-600',
  cyan: 'from-cyan-500 to-cyan-600',
  purple: 'from-purple-500 to-purple-600',
  orange: 'from-orange-500 to-orange-600',
  pink: 'from-pink-500 to-pink-600',
};

export function MessageInput({ 
  onSubmit, 
  disabled = false, 
  placeholder = 'Type your message...',
  agentColor = 'blue'
}: MessageInputProps) {
  const [value, setValue] = useState('');
  const gradient = gradientMap[agentColor] || 'from-blue-500 to-blue-600';

  const handleSubmit = useCallback((e?: FormEvent) => {
    e?.preventDefault();
    
    const trimmedValue = value.trim();
    if (!trimmedValue || disabled) {
      return;
    }

    onSubmit(trimmedValue);
    setValue('');
  }, [value, disabled, onSubmit]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  const isSubmitDisabled = disabled || !value.trim();

  return (
    <div className="border-t border-gray-200/80 bg-white/80 backdrop-blur-sm p-4">
      <form onSubmit={handleSubmit} className="flex gap-3 items-end">
        {/* AI indicator */}
        <div className={`hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-sm`}>
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        
        {/* Input container */}
        <div className="flex-1 relative">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 pr-12 text-sm focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200 placeholder:text-gray-400"
            aria-label="Message input"
          />
          
          {/* Character hint */}
          {value.length > 0 && (
            <span className="absolute right-14 bottom-3 text-xs text-gray-400">
              Press Enter to send
            </span>
          )}
        </div>
        
        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={`flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 disabled:opacity-40 disabled:shadow-none disabled:scale-100 disabled:cursor-not-allowed transition-all duration-200`}
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
      
      {/* Helper text */}
      <p className="mt-2 text-xs text-center text-gray-400">
        AI responses are generated and may not always be accurate
      </p>
    </div>
  );
}
