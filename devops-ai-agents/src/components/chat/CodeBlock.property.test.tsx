/**
 * Property-based tests for CodeBlock component
 * **Feature: devops-ai-agents-frontend, Property 11: Code block syntax highlighting**
 * **Validates: Requirements 2.4, 3.4, 4.4, 5.4, 6.4, 7.4, 8.4, 9.4**
 */

import { describe, it, expect, vi } from 'vitest';
import * as fc from 'fast-check';
import { render } from '@testing-library/react';
import { CodeBlock } from './CodeBlock';
import { parseMessageContent } from './ChatMessage';

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
});

const supportedLanguages = [
  'javascript',
  'typescript',
  'python',
  'yaml',
  'bash',
  'json',
  'docker',
  'hcl',
  'js',
  'ts',
  'py',
  'yml',
  'sh',
  'shell',
  'dockerfile',
  'tf',
  'terraform',
];

describe('Property 11: Code block syntax highlighting', () => {
  it('for any code string and language, the code block renders with syntax highlighting elements', { timeout: 30000 }, () => {
    fc.assert(
      fc.property(
        // Use only printable ASCII characters and spaces (no special whitespace like \r \n \t)
        fc.stringMatching(/^[a-zA-Z0-9_\-\(\)\{\}\[\]:;=<>,.'"\/ ]+$/).filter(s => s.trim().length > 0 && s.length <= 200),
        fc.constantFrom(...supportedLanguages),
        (code, language) => {
          const { unmount, container } = render(<CodeBlock code={code} language={language} />);

          // Verify the code block has the syntax highlighting wrapper
          const codeElement = container.querySelector('code');
          const hasCodeElement = codeElement !== null;
          
          // Verify the code element has a language class
          const hasLanguageClass = codeElement?.className.includes('language-') ?? false;

          // Verify the code content is present
          const hasCodeContent = codeElement?.textContent?.includes(code.trim()) ?? false;

          unmount();
          return hasCodeElement && hasLanguageClass && hasCodeContent;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('for any code block in markdown format, parseMessageContent extracts it correctly', { timeout: 30000 }, () => {
    fc.assert(
      fc.property(
        fc.stringMatching(/^[a-zA-Z0-9_\-\s]+$/).filter(s => s.trim().length > 0 && s.length <= 100),
        fc.constantFrom('javascript', 'python', 'yaml', 'bash', 'json'),
        (code, language) => {
          const markdownContent = `Here is some code:\n\`\`\`${language}\n${code}\n\`\`\`\nEnd of code.`;
          
          const parts = parseMessageContent(markdownContent);
          
          // Should have at least one code part
          const hasCodePart = parts.some(p => p.type === 'code');
          
          // The code part should contain the code content
          const codePart = parts.find(p => p.type === 'code');
          const hasCorrectCode = codePart?.content === code.trim();
          const hasCorrectLanguage = codePart?.language === language;

          return hasCodePart && hasCorrectCode && hasCorrectLanguage;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('for any message with code blocks, the rendered output contains syntax-highlighted elements', { timeout: 30000 }, () => {
    fc.assert(
      fc.property(
        fc.stringMatching(/^[a-zA-Z0-9_\-\s]+$/).filter(s => s.trim().length > 0 && s.length <= 50),
        fc.constantFrom('javascript', 'python', 'yaml'),
        (code, language) => {
          const { unmount, container } = render(<CodeBlock code={code} language={language} />);

          // Verify the code-block wrapper class exists
          const hasCodeBlockWrapper = container.querySelector('.code-block') !== null;
          
          // Verify pre and code elements exist
          const hasPreElement = container.querySelector('pre') !== null;
          const hasCodeElement = container.querySelector('code') !== null;

          unmount();
          return hasCodeBlockWrapper && hasPreElement && hasCodeElement;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('for any code block, a copy button is present', { timeout: 30000 }, () => {
    fc.assert(
      fc.property(
        fc.stringMatching(/^[a-zA-Z0-9]+$/).filter(s => s.length > 0 && s.length <= 50),
        (code) => {
          const { unmount, container } = render(<CodeBlock code={code} />);

          // Verify copy button exists
          const copyButton = container.querySelector('button[aria-label="Copy code"]');
          const hasCopyButton = copyButton !== null;

          unmount();
          return hasCopyButton;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('for any language alias, it normalizes to the correct Prism language', { timeout: 30000 }, () => {
    const languageAliases: Array<[string, string]> = [
      ['js', 'javascript'],
      ['ts', 'typescript'],
      ['py', 'python'],
      ['yml', 'yaml'],
      ['sh', 'bash'],
      ['shell', 'bash'],
      ['dockerfile', 'docker'],
      ['tf', 'hcl'],
      ['terraform', 'hcl'],
    ];

    fc.assert(
      fc.property(
        fc.constantFrom(...languageAliases),
        ([alias, expected]) => {
          const { unmount, container } = render(<CodeBlock code="test code" language={alias} />);

          const codeElement = container.querySelector('code');
          const hasCorrectClass = codeElement?.className.includes(`language-${expected}`) ?? false;

          unmount();
          return hasCorrectClass;
        }
      ),
      { numRuns: 100 }
    );
  });
});
