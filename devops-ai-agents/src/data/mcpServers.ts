/**
 * MCP Server configurations for DevOps AI Agents
 * Defines available MCP servers and their agent compatibility
 */

import type { MCPServer, AgentType } from '../types';

export const mcpServers: MCPServer[] = [
  // Version Control MCPs
  {
    id: 'github',
    name: 'GitHub',
    description: 'Access repositories, pull requests, issues, and actions workflows',
    icon: 'Github',
    category: 'version-control',
    status: 'disconnected',
    capabilities: ['read_repos', 'manage_prs', 'view_actions', 'create_issues'],
    supportedAgents: ['cicd', 'security', 'incident'],
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    description: 'Manage GitLab projects, pipelines, and merge requests',
    icon: 'GitBranch',
    category: 'version-control',
    status: 'disconnected',
    capabilities: ['read_projects', 'manage_pipelines', 'view_ci'],
    supportedAgents: ['cicd', 'security'],
  },

  // Cloud Provider MCPs
  {
    id: 'aws',
    name: 'AWS',
    description: 'Manage AWS resources, CloudFormation, and services',
    icon: 'Cloud',
    category: 'cloud-provider',
    status: 'disconnected',
    capabilities: ['manage_ec2', 'manage_s3', 'cloudformation', 'iam'],
    supportedAgents: ['infrastructure', 'cloud', 'security', 'monitoring'],
  },
  {
    id: 'azure',
    name: 'Azure',
    description: 'Access Azure resources, ARM templates, and DevOps',
    icon: 'Cloud',
    category: 'cloud-provider',
    status: 'disconnected',
    capabilities: ['manage_resources', 'arm_templates', 'azure_devops'],
    supportedAgents: ['infrastructure', 'cloud', 'cicd'],
  },
  {
    id: 'gcp',
    name: 'Google Cloud',
    description: 'Manage GCP resources, GKE, and Cloud Build',
    icon: 'Cloud',
    category: 'cloud-provider',
    status: 'disconnected',
    capabilities: ['manage_compute', 'gke', 'cloud_build', 'iam'],
    supportedAgents: ['infrastructure', 'cloud', 'container'],
  },

  // Monitoring MCPs
  {
    id: 'prometheus',
    name: 'Prometheus',
    description: 'Query metrics, manage alerts, and view targets',
    icon: 'Activity',
    category: 'monitoring',
    status: 'disconnected',
    capabilities: ['query_metrics', 'manage_alerts', 'view_targets'],
    supportedAgents: ['monitoring', 'incident'],
  },
  {
    id: 'grafana',
    name: 'Grafana',
    description: 'Access dashboards, create visualizations, and manage alerts',
    icon: 'BarChart3',
    category: 'monitoring',
    status: 'disconnected',
    capabilities: ['view_dashboards', 'create_panels', 'manage_alerts'],
    supportedAgents: ['monitoring', 'incident'],
  },
  {
    id: 'datadog',
    name: 'Datadog',
    description: 'Monitor infrastructure, APM, and log management',
    icon: 'Activity',
    category: 'monitoring',
    status: 'disconnected',
    capabilities: ['view_metrics', 'apm', 'log_management', 'synthetics'],
    supportedAgents: ['monitoring', 'incident', 'security'],
  },

  // Security MCPs
  {
    id: 'vault',
    name: 'HashiCorp Vault',
    description: 'Manage secrets, encryption, and access control',
    icon: 'KeyRound',
    category: 'security',
    status: 'disconnected',
    capabilities: ['manage_secrets', 'encryption', 'pki', 'auth'],
    supportedAgents: ['security', 'config', 'infrastructure'],
  },
  {
    id: 'snyk',
    name: 'Snyk',
    description: 'Security scanning for code, containers, and dependencies',
    icon: 'Shield',
    category: 'security',
    status: 'disconnected',
    capabilities: ['code_scan', 'container_scan', 'dependency_scan'],
    supportedAgents: ['security', 'cicd', 'container'],
  },

  // Container MCPs
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    description: 'Manage K8s clusters, deployments, and resources',
    icon: 'Box',
    category: 'container',
    status: 'disconnected',
    capabilities: ['manage_deployments', 'view_pods', 'manage_services', 'helm'],
    supportedAgents: ['container', 'infrastructure', 'monitoring'],
  },
  {
    id: 'docker',
    name: 'Docker',
    description: 'Manage containers, images, and Docker Compose',
    icon: 'Container',
    category: 'container',
    status: 'disconnected',
    capabilities: ['manage_containers', 'build_images', 'compose'],
    supportedAgents: ['container', 'cicd'],
  },

  // Database MCPs
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    description: 'Query and manage PostgreSQL databases',
    icon: 'Database',
    category: 'database',
    status: 'disconnected',
    capabilities: ['query', 'schema_management', 'backup'],
    supportedAgents: ['infrastructure', 'incident'],
  },

  // Notification MCPs
  {
    id: 'slack',
    name: 'Slack',
    description: 'Send notifications and manage channels',
    icon: 'MessageSquare',
    category: 'notification',
    status: 'disconnected',
    capabilities: ['send_messages', 'manage_channels', 'webhooks'],
    supportedAgents: ['incident', 'monitoring', 'cicd'],
  },
  {
    id: 'pagerduty',
    name: 'PagerDuty',
    description: 'Manage incidents, on-call schedules, and escalations',
    icon: 'Bell',
    category: 'notification',
    status: 'disconnected',
    capabilities: ['create_incidents', 'manage_oncall', 'escalations'],
    supportedAgents: ['incident', 'monitoring'],
  },

  // Documentation MCPs
  {
    id: 'confluence',
    name: 'Confluence',
    description: 'Access and manage documentation and wikis',
    icon: 'FileText',
    category: 'documentation',
    status: 'disconnected',
    capabilities: ['read_pages', 'create_pages', 'search'],
    supportedAgents: ['config', 'incident'],
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Access Notion workspaces, databases, and pages',
    icon: 'BookOpen',
    category: 'documentation',
    status: 'disconnected',
    capabilities: ['read_pages', 'create_pages', 'manage_databases'],
    supportedAgents: ['config', 'incident'],
  },

  // Configuration MCPs
  {
    id: 'terraform',
    name: 'Terraform',
    description: 'Manage Terraform state, plans, and modules',
    icon: 'Layers',
    category: 'cloud-provider',
    status: 'disconnected',
    capabilities: ['plan', 'apply', 'state_management', 'modules'],
    supportedAgents: ['infrastructure', 'config', 'cloud'],
  },
  {
    id: 'ansible',
    name: 'Ansible',
    description: 'Execute playbooks and manage configurations',
    icon: 'Settings',
    category: 'cloud-provider',
    status: 'disconnected',
    capabilities: ['run_playbooks', 'inventory', 'roles'],
    supportedAgents: ['config', 'infrastructure'],
  },
];

/**
 * Get MCP servers available for a specific agent
 */
export function getMCPServersForAgent(agentId: AgentType): MCPServer[] {
  return mcpServers.filter(server => server.supportedAgents.includes(agentId));
}

/**
 * Get MCP server by ID
 */
export function getMCPServerById(serverId: string): MCPServer | undefined {
  return mcpServers.find(server => server.id === serverId);
}

/**
 * Get category display name
 */
export function getCategoryDisplayName(category: string): string {
  const names: Record<string, string> = {
    'version-control': 'Version Control',
    'cloud-provider': 'Cloud & Infrastructure',
    'monitoring': 'Monitoring & Observability',
    'security': 'Security',
    'container': 'Containers & Orchestration',
    'database': 'Databases',
    'notification': 'Notifications',
    'documentation': 'Documentation',
  };
  return names[category] || category;
}
