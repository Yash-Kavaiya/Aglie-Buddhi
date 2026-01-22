/**
 * ChatInterface component combining all chat elements
 * Requirements: 2.1, 10.1, 10.2, 10.4
 */

import { useEffect, useRef, useState } from 'react';
import type { Agent, AgentType } from '../../types';
import { useChat } from '../../hooks/useChat';
import { MessageInput } from './MessageInput';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { MessageSquare, Sparkles, ArrowRight } from 'lucide-react';
import { MCPSettingsModal, MCPStatusBadge } from '../mcp';

interface ChatInterfaceProps {
  agentId: AgentType;
  agent: Agent;
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

export function ChatInterface({ agentId, agent }: ChatInterfaceProps) {
  const { messages, isLoading, sendMessage } = useChat(agentId);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isMCPModalOpen, setIsMCPModalOpen] = useState(false);
  const gradient = gradientMap[agent.color] || 'from-gray-500 to-gray-600';

  // Auto-scroll to new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    await sendMessage(content);
  };

  const handleExampleClick = (prompt: string) => {
    sendMessage(prompt);
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-white">
      {/* Agent Header - Enhanced */}
      <div className={`relative border-b border-gray-200/80 px-6 py-4 bg-gradient-to-r ${gradient} overflow-hidden`}>
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">{agent.name}</h2>
              <p className="text-sm text-white/80">{agent.specialization}</p>
            </div>
          </div>
          
          {/* MCP Status Badge */}
          <MCPStatusBadge 
            agentId={agentId} 
            onClick={() => setIsMCPModalOpen(true)}
            variant="light"
          />
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto"
      >
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            {/* Empty state icon */}
            <div className={`relative mb-6`}>
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
                <MessageSquare className="h-10 w-10 text-white" />
              </div>
              <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center ring-4 ring-gray-50`}>
                <Sparkles className="h-3 w-3 text-white" />
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Start a conversation
            </h3>
            <p className="text-gray-500 mb-8 max-w-md">
              Ask the {agent.name} anything about {agent.specialization.toLowerCase()}.
            </p>
            
            {/* Example Prompts - Enhanced */}
            <div className="w-full max-w-lg space-y-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Try one of these examples
              </p>
              {agent.examplePrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(prompt)}
                  className="group w-full text-left px-5 py-4 rounded-xl bg-white border border-gray-200/80 hover:border-gray-300 hover:shadow-md transition-all duration-200 flex items-center gap-3"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 opacity-80 group-hover:opacity-100 transition-opacity`}>
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="flex-1 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                    {prompt}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-100/50">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} agentColor={agent.color} />
            ))}
            
            {/* Typing indicator */}
            {isLoading && (
              <TypingIndicator agentName={agent.name} agentColor={agent.color} />
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message Input */}
      <MessageInput
        onSubmit={handleSendMessage}
        disabled={isLoading}
        placeholder={`Ask the ${agent.name}...`}
        agentColor={agent.color}
      />

      {/* MCP Settings Modal */}
      <MCPSettingsModal
        isOpen={isMCPModalOpen}
        onClose={() => setIsMCPModalOpen(false)}
        agentId={agentId}
        agentName={agent.name}
        agentColor={agent.color}
      />
    </div>
  );
}
