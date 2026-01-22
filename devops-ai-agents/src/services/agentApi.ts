/**
 * Agent API Client for DevOps AI Agents
 * Handles communication with AI backend and provides mock responses for development
 * Requirements: 2.2, 3.2, 4.2, 5.2, 6.2, 7.2, 8.2, 9.2
 */

import type { AgentType, Message } from '../types';
import { agents } from '../data/agents';

export interface AgentApiResponse {
  success: boolean;
  message?: Message;
  error?: string;
}

export interface AgentApiConfig {
  baseUrl?: string;
  timeout?: number;
  useMock?: boolean;
}

const DEFAULT_CONFIG: AgentApiConfig = {
  baseUrl: '/api',
  timeout: 30000,
  useMock: true, // Use mock responses by default for development
};

/**
 * Mock response templates for each agent type
 * These provide contextual responses based on the agent's specialization
 */
const mockResponseTemplates: Record<AgentType, string[]> = {
  cicd: [
    'For CI/CD pipelines, I recommend using GitHub Actions or GitLab CI. Here\'s a basic workflow:\n\n```yaml\nname: CI Pipeline\non: [push, pull_request]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - name: Build\n        run: npm ci && npm run build\n```',
    'Blue-green deployments minimize downtime. You can implement this with:\n\n```yaml\ndeployment:\n  strategy:\n    blueGreen:\n      activeService: app-blue\n      previewService: app-green\n```',
  ],
  infrastructure: [
    'Here\'s a Terraform module for an AWS VPC:\n\n```hcl\nresource "aws_vpc" "main" {\n  cidr_block = var.vpc_cidr\n  enable_dns_hostnames = true\n  tags = {\n    Name = var.vpc_name\n  }\n}\n```',
    'For state management in Terraform, use remote backends like S3:\n\n```hcl\nterraform {\n  backend "s3" {\n    bucket = "terraform-state"\n    key    = "prod/terraform.tfstate"\n    region = "us-east-1"\n  }\n}\n```',
  ],
  monitoring: [
    'Here\'s a Prometheus alerting rule for high CPU:\n\n```yaml\ngroups:\n  - name: cpu_alerts\n    rules:\n      - alert: HighCPU\n        expr: cpu_usage > 80\n        for: 5m\n        labels:\n          severity: warning\n```',
    'For structured logging, use JSON format:\n\n```json\n{\n  "timestamp": "2024-01-15T10:30:00Z",\n  "level": "INFO",\n  "service": "api",\n  "message": "Request processed",\n  "duration_ms": 45\n}\n```',
  ],
  security: [
    'For secrets management, use HashiCorp Vault or AWS Secrets Manager:\n\n```bash\n# Store a secret\nvault kv put secret/myapp/config api_key="your-key"\n\n# Retrieve in application\nvault kv get -field=api_key secret/myapp/config\n```',
    'Add security scanning to your CI pipeline:\n\n```yaml\nsecurity-scan:\n  stage: test\n  script:\n    - trivy image --severity HIGH,CRITICAL $IMAGE\n    - snyk test --severity-threshold=high\n```',
  ],
  container: [
    'Here\'s an optimized multi-stage Dockerfile:\n\n```dockerfile\nFROM node:18-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\n\nFROM node:18-alpine\nWORKDIR /app\nCOPY --from=builder /app/node_modules ./node_modules\nCOPY . .\nUSER node\nCMD ["node", "server.js"]\n```',
    'For Kubernetes deployments, use rolling updates:\n\n```yaml\napiVersion: apps/v1\nkind: Deployment\nspec:\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxSurge: 1\n      maxUnavailable: 0\n```',
  ],
  cloud: [
    'For cross-account IAM roles in AWS:\n\n```json\n{\n  "Version": "2012-10-17",\n  "Statement": [{\n    "Effect": "Allow",\n    "Principal": {"AWS": "arn:aws:iam::ACCOUNT_ID:root"},\n    "Action": "sts:AssumeRole"\n  }]\n}\n```',
    'AWS Lambda vs Azure Functions comparison:\n- Lambda: Better AWS integration, 15-min timeout\n- Azure Functions: Better .NET support, consumption plan\n- Both support Node.js, Python, and event-driven architectures',
  ],
  config: [
    'Here\'s an Ansible playbook for nginx:\n\n```yaml\n- name: Install and configure nginx\n  hosts: webservers\n  become: yes\n  tasks:\n    - name: Install nginx\n      apt:\n        name: nginx\n        state: present\n    - name: Start nginx\n      service:\n        name: nginx\n        state: started\n        enabled: yes\n```',
    'Chef cookbook structure best practices:\n\n```\ncookbooks/myapp/\n├── recipes/\n│   └── default.rb\n├── templates/\n│   └── config.erb\n├── attributes/\n│   └── default.rb\n└── metadata.rb\n```',
  ],
  incident: [
    'Incident response runbook template:\n\n1. **Detection**: Alert triggered at [TIME]\n2. **Triage**: Assess severity (P1-P4)\n3. **Communication**: Notify stakeholders\n4. **Investigation**: Check logs, metrics, recent changes\n5. **Mitigation**: Apply fix or rollback\n6. **Resolution**: Confirm service restored\n7. **Post-mortem**: Schedule within 48 hours',
    'For high CPU troubleshooting:\n\n```bash\n# Check top processes\ntop -o %CPU\n\n# Check for runaway processes\nps aux --sort=-%cpu | head -10\n\n# Check system load\nuptime\ncat /proc/loadavg\n```',
  ],
};

/**
 * Generate a mock response based on agent type and user message
 */
function generateMockResponse(agentId: AgentType, userMessage: string): string {
  const agent = agents.find((a) => a.id === agentId);
  const templates = mockResponseTemplates[agentId];
  
  // Select a random template or generate a contextual response
  const randomIndex = Math.floor(Math.random() * templates.length);
  const template = templates[randomIndex];
  
  // Add a contextual prefix based on the user's question
  const prefix = `Based on your question about "${userMessage.slice(0, 50)}${userMessage.length > 50 ? '...' : ''}", here's my recommendation as your ${agent?.name || 'DevOps Agent'}:\n\n`;
  
  return prefix + template;
}

/**
 * Simulate network delay for mock responses
 */
function simulateNetworkDelay(minMs: number = 300, maxMs: number = 1500): Promise<void> {
  const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise((resolve) => setTimeout(resolve, delay));
}

/**
 * Send a message to an AI agent and get a response
 * 
 * @param agentId - The type of agent to send the message to
 * @param content - The message content
 * @param config - Optional configuration overrides
 * @returns Promise resolving to the agent's response
 */
export async function sendMessageToAgent(
  agentId: AgentType,
  content: string,
  config: AgentApiConfig = {}
): Promise<AgentApiResponse> {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  
  // Validate input
  if (!content || content.trim().length === 0) {
    return {
      success: false,
      error: 'Message content cannot be empty',
    };
  }

  // Use mock responses for development
  if (mergedConfig.useMock) {
    try {
      await simulateNetworkDelay();
      
      const responseContent = generateMockResponse(agentId, content);
      
      const message: Message = {
        id: crypto.randomUUID(),
        role: 'agent',
        content: responseContent,
        timestamp: new Date(),
        agentId,
      };
      
      return {
        success: true,
        message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // Real API call (for future implementation)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), mergedConfig.timeout);

    const response = await fetch(`${mergedConfig.baseUrl}/agents/${agentId}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: content }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    const message: Message = {
      id: data.id || crypto.randomUUID(),
      role: 'agent',
      content: data.content || data.message,
      timestamp: new Date(data.timestamp || Date.now()),
      agentId,
    };

    return {
      success: true,
      message,
    };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return {
        success: false,
        error: 'Request timed out',
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to communicate with agent',
    };
  }
}

/**
 * Create an agent API client with pre-configured settings
 */
export function createAgentApiClient(config: AgentApiConfig = {}) {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  
  return {
    sendMessage: (agentId: AgentType, content: string) =>
      sendMessageToAgent(agentId, content, mergedConfig),
    
    config: mergedConfig,
  };
}

// Export default client instance
export const agentApi = createAgentApiClient();
