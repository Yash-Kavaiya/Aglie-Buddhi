/**
 * TypingIndicator component - Shows animated dots when agent is typing
 * Requirements: 10.4
 */

import { Bot } from 'lucide-react';

interface TypingIndicatorProps {
  agentName?: string;
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

// Map agent colors to dot colors
const dotColorMap: Record<string, string> = {
  blue: 'bg-blue-400',
  green: 'bg-emerald-400',
  yellow: 'bg-amber-400',
  red: 'bg-red-400',
  cyan: 'bg-cyan-400',
  purple: 'bg-purple-400',
  orange: 'bg-orange-400',
  pink: 'bg-pink-400',
};

export function TypingIndicator({ agentName = 'Agent', agentColor = 'blue' }: TypingIndicatorProps) {
  const gradient = gradientMap[agentColor] || 'from-gray-500 to-gray-600';
  const dotColor = dotColorMap[agentColor] || 'bg-gray-400';

  return (
    <div 
      className="flex gap-4 p-5 bg-white animate-fade-in"
      data-testid="typing-indicator"
    >
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-sm`}>
        <Bot className="h-5 w-5" />
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-sm text-gray-500 mb-2 font-medium">{agentName} is thinking...</span>
        <div className="flex gap-1.5">
          <span className={`w-2.5 h-2.5 ${dotColor} rounded-full animate-bounce`} style={{ animationDelay: '0ms' }} />
          <span className={`w-2.5 h-2.5 ${dotColor} rounded-full animate-bounce`} style={{ animationDelay: '150ms' }} />
          <span className={`w-2.5 h-2.5 ${dotColor} rounded-full animate-bounce`} style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
