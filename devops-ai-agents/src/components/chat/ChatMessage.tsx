/**
 * ChatMessage component for displaying individual messages
 * Requirements: 10.3
 */

import type { Message } from '../../types';
import { User, Bot } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

interface ChatMessageProps {
  message: Message;
  agentColor?: string;
}

function formatTimestamp(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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

/**
 * Parse message content and extract code blocks
 * Returns an array of content parts (text or code blocks)
 */
function parseMessageContent(content: string): Array<{ type: 'text' | 'code'; content: string; language?: string }> {
  const parts: Array<{ type: 'text' | 'code'; content: string; language?: string }> = [];
  const codeBlockRegex = /```(\w*)\n?([\s\S]*?)```/g;
  
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Add text before the code block
    if (match.index > lastIndex) {
      const textContent = content.slice(lastIndex, match.index).trim();
      if (textContent) {
        parts.push({ type: 'text', content: textContent });
      }
    }

    // Add the code block
    parts.push({
      type: 'code',
      content: match[2].trim(),
      language: match[1] || undefined,
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text after the last code block
  if (lastIndex < content.length) {
    const textContent = content.slice(lastIndex).trim();
    if (textContent) {
      parts.push({ type: 'text', content: textContent });
    }
  }

  // If no parts were added, treat the entire content as text
  if (parts.length === 0) {
    parts.push({ type: 'text', content });
  }

  return parts;
}

export function ChatMessage({ message, agentColor = 'blue' }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const contentParts = parseMessageContent(message.content);
  const gradient = gradientMap[agentColor] || 'from-gray-500 to-gray-600';

  return (
    <div
      className={`flex gap-4 p-5 animate-fade-in transition-colors ${
        isUser 
          ? 'bg-gradient-to-r from-blue-50/50 to-indigo-50/30' 
          : 'bg-white hover:bg-gray-50/50'
      }`}
      data-role={message.role}
    >
      {/* Avatar */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm ${
          isUser 
            ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white' 
            : `bg-gradient-to-br ${gradient} text-white`
        }`}
      >
        {isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
      </div>
      
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className={`font-semibold text-sm ${isUser ? 'text-blue-900' : 'text-gray-900'}`}>
            {isUser ? 'You' : 'AI Agent'}
          </span>
          <span className="text-xs text-gray-400 font-medium">
            {formatTimestamp(message.timestamp)}
          </span>
        </div>
        
        {/* Content */}
        <div className={`text-sm leading-relaxed space-y-3 ${isUser ? 'text-gray-800' : 'text-gray-700'}`}>
          {contentParts.map((part, index) => (
            part.type === 'code' ? (
              <CodeBlock key={index} code={part.content} language={part.language} />
            ) : (
              <p key={index} className="whitespace-pre-wrap break-words">{part.content}</p>
            )
          ))}
        </div>
      </div>
    </div>
  );
}

export { parseMessageContent };
