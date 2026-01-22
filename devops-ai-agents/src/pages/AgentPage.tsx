/**
 * AgentPage component - Dedicated page for each AI Agent
 * Requirements: 2.1, 2.3, 3.1, 3.3, 4.1, 4.3, 5.1, 5.3, 6.1, 6.3, 7.1, 7.3, 8.1, 8.3, 9.1, 9.3
 */

import { useParams, Navigate } from 'react-router-dom';
import { useMemo } from 'react';
import { ChatInterface } from '../components/chat/ChatInterface';
import { agents } from '../data/agents';
import type { AgentType } from '../types';

export function AgentPage() {
  const { agentId } = useParams<{ agentId: string }>();

  // Find the agent based on URL parameter
  const agent = useMemo(() => {
    return agents.find((a) => a.id === agentId);
  }, [agentId]);

  // Handle invalid agent IDs with redirect to dashboard
  if (!agent) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-full flex flex-col" data-testid="agent-page">
      <ChatInterface agentId={agent.id as AgentType} agent={agent} />
    </div>
  );
}
