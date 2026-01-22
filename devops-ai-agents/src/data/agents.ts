/**
 * Agent configuration data for all 8 DevOps AI Agents
 * Requirements: 1.2, 2.3, 3.3, 4.3, 5.3, 6.3, 7.3, 8.3, 9.3
 */

import type { Agent } from '../types';

export const agents: Agent[] = [
  {
    id: 'cicd',
    name: 'CI/CD Agent',
    description: 'Pipeline configuration and deployment automation',
    icon: 'GitBranch',
    color: 'blue',
    specialization: 'Continuous Integration and Continuous Deployment',
    examplePrompts: [
      'How do I set up a GitHub Actions workflow?',
      'Create a Jenkins pipeline for a Node.js app',
      'Best practices for blue-green deployments',
    ],
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure Agent',
    description: 'Infrastructure as Code and provisioning',
    icon: 'Server',
    color: 'green',
    specialization: 'Infrastructure as Code and Cloud Provisioning',
    examplePrompts: [
      'Write a Terraform module for an AWS VPC',
      'How to manage state in Terraform?',
      'CloudFormation vs Terraform comparison',
    ],
  },
  {
    id: 'monitoring',
    name: 'Monitoring Agent',
    description: 'Observability, logging, and metrics',
    icon: 'Activity',
    color: 'yellow',
    specialization: 'Observability, Logging, and Metrics',
    examplePrompts: [
      'Set up Prometheus alerting rules',
      'Best practices for structured logging',
      'Create a Grafana dashboard for API metrics',
    ],
  },
  {
    id: 'security',
    name: 'Security Agent',
    description: 'DevSecOps and security practices',
    icon: 'Shield',
    color: 'red',
    specialization: 'DevSecOps and Security Best Practices',
    examplePrompts: [
      'How to implement secrets management?',
      'Security scanning in CI/CD pipelines',
      'Container security best practices',
    ],
  },
  {
    id: 'container',
    name: 'Container Agent',
    description: 'Docker, Kubernetes, and orchestration',
    icon: 'Box',
    color: 'cyan',
    specialization: 'Containerization and Orchestration',
    examplePrompts: [
      'Optimize a Dockerfile for production',
      'Kubernetes deployment strategies',
      'How to set up Helm charts?',
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud Agent',
    description: 'AWS, Azure, GCP management',
    icon: 'Cloud',
    color: 'purple',
    specialization: 'Cloud Platform Management',
    examplePrompts: [
      'Compare AWS Lambda vs Azure Functions',
      'Set up cross-account IAM roles',
      'GCP networking best practices',
    ],
  },
  {
    id: 'config',
    name: 'Config Agent',
    description: 'Ansible, Terraform, Chef configuration',
    icon: 'Settings',
    color: 'orange',
    specialization: 'Configuration Management',
    examplePrompts: [
      'Write an Ansible playbook for nginx',
      'Chef cookbook structure best practices',
      'Puppet vs Ansible comparison',
    ],
  },
  {
    id: 'incident',
    name: 'Incident Agent',
    description: 'Incident response and troubleshooting',
    icon: 'AlertTriangle',
    color: 'pink',
    specialization: 'Incident Response and Troubleshooting',
    examplePrompts: [
      'Create an incident response runbook',
      'How to perform a post-mortem?',
      'Troubleshoot high CPU usage',
    ],
  },
];
