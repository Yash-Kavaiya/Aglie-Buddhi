/**
 * Property-based tests for ChatMessage component
 * **Feature: devops-ai-agents-frontend, Property 5: Agent response visual distinction**
 * **Validates: Requirements 10.3**
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { render, screen } from '@testing-library/react';
import { ChatMessage } from './ChatMessage';
import type { Message, AgentType } from '../../types';

const agentTypes: AgentType[] = [
  'cicd',
  'infrastructure',
  'monitoring',
  'security',
  'container',
  'cloud',
  'config',
  'incident',
];

// Arbitrary for generating valid messages
const messageArbitrary = fc.record({
  id: fc.uuid(),
  role: fc.constantFrom('user' as const, 'agent' as const),
  content: fc.string({ minLength: 1, maxLength: 500 }),
  timestamp: fc.date({ min: new Date('2020-01-01'), max: new Date('2030-01-01') }),
  agentId: fc.constantFrom(...agentTypes),
});

describe('Property 5: Agent response visual distinction', () => {
  it('for any message, user messages have a different CSS class than agent messages', { timeout: 30000 }, () => {
    fc.assert(
      fc.property(messageArbitrary, (message: Message) => {
        const { unmount, container } = render(<ChatMessage message={message} />);

        const messageElement = container.querySelector('[data-role]');
        const role = messageElement?.getAttribute('data-role');
        const classList = messageElement?.className || '';

        // Verify the role attribute matches the message role
        const hasCorrectRole = role === message.role;

        // Verify user and agent messages have distinct CSS classes
        const hasUserClass = classList.includes('chat-message-user');
        const hasAgentClass = classList.includes('chat-message-agent');

        // User messages should have user class, agent messages should have agent class
        const hasCorrectClass = message.role === 'user' 
          ? hasUserClass && !hasAgentClass 
          : hasAgentClass && !hasUserClass;

        unmount();
        return hasCorrectRole && hasCorrectClass;
      }),
      { numRuns: 100 }
    );
  });

  it('for any user message, the message displays "You" as the sender', { timeout: 30000 }, () => {
    fc.assert(
      fc.property(
        messageArbitrary.filter((m) => m.role === 'user'),
        (message: Message) => {
          const { unmount } = render(<ChatMessage message={message} />);

          const senderElement = screen.getByText('You');
          const hasSender = senderElement !== null;

          unmount();
          return hasSender;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('for any agent message, the message displays "Agent" as the sender', { timeout: 30000 }, () => {
    fc.assert(
      fc.property(
        messageArbitrary.filter((m) => m.role === 'agent'),
        (message: Message) => {
          const { unmount } = render(<ChatMessage message={message} />);

          const senderElement = screen.getByText('Agent');
          const hasSender = senderElement !== null;

          unmount();
          return hasSender;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('for any message, the message content is displayed', { timeout: 30000 }, () => {
    fc.assert(
      fc.property(
        // Use simple alphanumeric content without leading/trailing spaces
        fc.record({
          id: fc.uuid(),
          role: fc.constantFrom('user' as const, 'agent' as const),
          content: fc.stringMatching(/^[a-zA-Z0-9][a-zA-Z0-9 ]{0,98}[a-zA-Z0-9]$/).filter(s => s.length >= 2),
          timestamp: fc.date({ min: new Date('2020-01-01'), max: new Date('2030-01-01') }),
          agentId: fc.constantFrom(...agentTypes),
        }),
        (message: Message) => {
          const { unmount, container } = render(<ChatMessage message={message} />);

          // Check if the content appears somewhere in the rendered output
          const hasContent = container.textContent?.includes(message.content) ?? false;

          unmount();
          return hasContent;
        }
      ),
      { numRuns: 100 }
    );
  });
});
