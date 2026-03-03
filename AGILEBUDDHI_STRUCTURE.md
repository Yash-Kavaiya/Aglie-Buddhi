# AgileBuddhi - Project Structure & Tech Stack

## Project Structure

```
agile-buddhi/
├── .github/
│   └── workflows/
│       ├── deploy.yml
│       ├── test.yml
│       └── lint.yml
│
├── apps/
│   ├── web/                    # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/            # App router pages
│   │   │   │   ├── (auth)/
│   │   │   │   │   ├── login/
│   │   │   │   │   └── register/
│   │   │   │   ├── (dashboard)/
│   │   │   │   │   ├── layout.tsx
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── crm/
│   │   │   │   │   ├── sales/
│   │   │   │   │   ├── inventory/
│   │   │   │   │   ├── projects/
│   │   │   │   │   ├── hr/
│   │   │   │   │   ├── accounting/
│   │   │   │   │   ├── marketing/
│   │   │   │   │   └── helpdesk/
│   │   │   │   ├── settings/
│   │   │   │   └── api/
│   │   │   │       └── [...routes]/
│   │   │   ├── components/
│   │   │   │   ├── ui/             # Base UI components
│   │   │   │   ├── layout/          # Layout components
│   │   │   │   ├── forms/           # Form components
│   │   │   │   ├── charts/          # Chart components
│   │   │   │   ├── ai/              # AI-specific components
│   │   │   │   └── modules/         # Module-specific components
│   │   │   ├── hooks/               # Custom React hooks
│   │   │   ├── lib/                # Utilities
│   │   │   │   ├── api.ts          # API client
│   │   │   │   ├── auth.ts         # Auth utilities
│   │   │   │   ├── utils.ts        # General utilities
│   │   │   │   └── constants.ts    # App constants
│   │   │   ├── stores/             # Zustand stores
│   │   │   ├── types/             # TypeScript types
│   │   │   └── styles/            # Global styles
│   │   ├── public/
│   │   │   ├── fonts/
│   │   │   ├── icons/
│   │   │   └── images/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── next.config.js
│   │   ├── tailwind.config.ts
│   │   └── postcss.config.js
│   │
│   ├── api-gateway/             # FastAPI gateway
│   │   ├── app/
│   │   │   ├── api/
│   │   │   │   └── v1/
│   │   │   │       ├── auth/
│   │   │   │       ├── tenants/
│   │   │   │       ├── modules/
│   │   │   │       ├── ai/
│   │   │   │       └── webhooks/
│   │   │   ├── core/
│   │   │   │   ├── config.py
│   │   │   │   ├── security.py
│   │   │   │   ├── exceptions.py
│   │   │   │   └── middleware.py
│   │   │   ├── models/
│   │   │   │   ├── schemas/       # Pydantic schemas
│   │   │   │   └── database.py
│   │   │   └── services/
│   │   ├── tests/
│   │   ├── requirements.txt
│   │   ├── pyproject.toml
│   │   └── uvicorn.conf.py
│   │
│   ├── ai-engine/               # AI microservices
│   │   ├── agents/
│   │   │   ├── base.py
│   │   │   ├── crm_agent.py
│   │   │   ├── sales_agent.py
│   │   │   ├── inventory_agent.py
│   │   │   └── ...
│   │   ├── llm/
│   │   │   ├── gateway.py
│   │   │   ├── prompts/
│   │   │   └── chains/
│   │   ├── vector/
│   │   │   ├── store.py
│   │   │   └── embeddings.py
│   │   ├── rag/
│   │   │   ├── pipeline.py
│   │   │   └── document_loader.py
│   │   └── requirements.txt
│   │
│   └── services/                # Business logic microservices
│       ├── crm-service/
│       ├── sales-service/
│       ├── inventory-service/
│       ├── project-service/
│       ├── hr-service/
│       ├── accounting-service/
│       ├── marketing-service/
│       └── helpdesk-service/
│
├── packages/
│   ├── ui/                      # Shared UI components
│   │   ├── src/
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   ├── Table/
│   │   │   └── ...
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── database/               # Shared database utilities
│   │   ├── migrations/
│   │   ├── models/
│   │   ├── repositories/
│   │   └── package.json
│   │
│   ├── config/                 # Shared config
│   │   └── package.json
│   │
│   └── tsconfig/              # TypeScript configs
│       ├── base.json
│       ├── nextjs.json
│       └── node18.json
│
├── infrastructure/
│   ├── docker/
│   │   ├── Dockerfile.web
│   │   ├── Dockerfile.api
│   │   ├── Dockerfile.ai
│   │   ├── docker-compose.yml
│   │   └── docker-compose.prod.yml
│   │
│   ├── kubernetes/
│   │   ├── base/
│   │   │   ├── deployments/
│   │   │   ├── services/
│   │   │   └── configmaps/
│   │   ├── dev/
│   │   └── prod/
│   │
│   └── terraform/
│       ├── modules/
│       │   ├── vpc/
│       │   ├── ecs/
│       │   ├── rds/
│       │   ├── redis/
│       │   ├── s3/
│       │   └── cloudflare/
│       ├── dev/
│       ├── prod/
│       └── main.tf
│
├── scripts/
│   ├── setup.sh
│   ├── db-migrate.sh
│   └── deploy.sh
│
├── .env.example
├── .eslintrc.js
├── .prettierrc
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── README.md
└── LICENSE
```

---

## Tech Stack Details

### Frontend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.x | React framework with App Router |
| React | 18.x | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.x | Utility-first CSS |
| Zustand | 4.x | Lightweight state management |
| TanStack Query | 5.x | Server state management |
| React Hook Form | 7.x | Form handling |
| Zod | 3.x | Schema validation |
| React Hook Form Resolvers | 2.x | Zod + React Hook Form |
| date-fns | 3.x | Date utilities |
| Recharts | 2.x | Charting library |
| React Query | 5.x | Data fetching |
| Socket.io Client | 4.x | Real-time |
| Framer Motion | 11.x | Animations |
| Lucide React | 0.x | Icons |
| React Select | 5.x | Select component |
| React Datepicker | 6.x | Date picker |
| React Popper | 2.x | Positioning |
| TipTap | 2.x | Rich text editor |

### Backend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Python | 3.11+ | Runtime |
| FastAPI | 0.109+ | Web framework |
| Pydantic | 2.x | Data validation |
| SQLAlchemy | 2.x | ORM |
| Alembic | 1.13+ | Migrations |
| asyncpg | 0.29+ | Async PostgreSQL |
| Celery | 5.x | Task queue |
| Redis | 7.x | Cache & broker |
| RabbitMQ | 3.12+ | Message queue |
| Python-Jose | 3.x | JWT handling |
| Passlib | 1.7.x | Password hashing |
| Python Multipart | 0.0.x | File uploads |
| Uvicorn | 0.27+ | ASGI server |
| Gunicorn | 21.x | WSGI server |

### AI Stack

| Technology | Purpose |
|------------|---------|
| OpenAI API | Primary LLM (GPT-4) |
| Anthropic Claude | Alternative LLM |
| LangChain | AI orchestration |
| LangSmith | AI observability |
| Pinecone | Vector database |
| Sentence Transformers | Embeddings |
| Weaviate | Alternative vector DB |
| Hugging Face | Model hub |

### Infrastructure Stack

| Technology | Purpose |
|------------|---------|
| AWS ECS Fargate | Container orchestration |
| AWS RDS PostgreSQL | Primary database |
| AWS ElastiCache Redis | Caching |
| AWS S3 | File storage |
| AWS CloudFront | CDN |
| AWS Route 53 | DNS |
| AWS Certificate Manager | SSL |
| Cloudflare | DNS & DDoS protection |
| GitHub Actions | CI/CD |
| Terraform | IaC |
| Datadog | Monitoring |
| Sentry | Error tracking |

---

## Database Schema Overview

### Core Tables
- `tenants` - Multi-tenant organization
- `users` - User accounts
- `user_sessions` - Active sessions
- `roles` - Role definitions
- `permissions` - Permission definitions
- `audit_logs` - Activity logging

### CRM Module Tables
- `crm_leads` - Lead records
- `crm_opportunities` - Sales opportunities
- `crm_contacts` - Contact persons
- `crm_companies` - Company records

### Sales Module Tables
- `sales_orders` - Customer orders
- `sales_quotes` - Sales quotations
- `sales_products` - Product catalog
- `sales_pricelists` - Pricing rules

### Inventory Module Tables
- `inv_warehouses` - Warehouse locations
- `inv_products` - Product inventory
- `inv_stock_levels` - Current stock
- `inv_moves` - Stock movements
- `inv_transfers` - Inter-warehouse transfers

### Project Module Tables
- `proj_projects` - Project definitions
- `proj_tasks` - Task items
- `proj_milestones` - Project milestones
- `proj_time_entries` - Time tracking

### HR Module Tables
- `hr_employees` - Employee records
- `hr_departments` - Department structure
- `hr_leave_requests` - Leave management
- `hr_attendance` - Attendance tracking

### Accounting Module Tables
- `acc_accounts` - Chart of accounts
- `acc_journals` - Accounting journals
- `acc_entries` - Journal entries
- `acc_invoices` - Customer invoices
- `acc_bills` - Vendor bills

### Marketing Module Tables
- `mkt_campaigns` - Marketing campaigns
- `mkt_templates` - Email templates
- `mkt_audiences` - Target audiences

### Helpdesk Module Tables
- `hd_tickets` - Support tickets
- `hd_knowledge_base` - KB articles
- `hd_sla_rules` - SLA configurations

---

## API Endpoints Overview

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout
- `POST /api/v1/auth/refresh` - Refresh token
- `GET /api/v1/auth/me` - Current user

### Tenant Management
- `GET /api/v1/tenants` - List tenants
- `POST /api/v1/tenants` - Create tenant
- `GET /api/v1/tenants/{id}` - Get tenant
- `PUT /api/v1/tenants/{id}` - Update tenant
- `DELETE /api/v1/tenants/{id}` - Delete tenant

### Module CRUD (Pattern)
- `GET /api/v1/{module}` - List entities
- `POST /api/v1/{module}` - Create entity
- `GET /api/v1/{module}/{id}` - Get entity
- `PUT /api/v1/{module}/{id}` - Update entity
- `DELETE /api/v1/{module}/{id}` - Delete entity

### AI Endpoints
- `POST /api/v1/ai/chat` - AI chat
- `POST /api/v1/ai/analyze` - Analyze data
- `GET /api/v1/ai/insights/{module}` - Get insights
- `POST /api/v1/ai/forecast/{module}` - Get forecast

---

## Environment Variables

```bash
# Application
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/agilebuddhi

# Redis
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

# AI
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
PINECONE_API_KEY=...
PINECONE_ENVIRONMENT=us-east-1

# Storage
S3_BUCKET=agilebuddhi-files
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1

# External Services
SLACK_CLIENT_ID=...
SLACK_CLIENT_SECRET=...
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- Docker & Docker Compose
- PostgreSQL 15+
- Redis 7+

### Quick Start

```bash
# Clone repository
git clone https://github.com/agilebuddhi/agile-buddhi.git
cd agile-buddhi

# Install dependencies
pnpm install

# Setup environment
cp .env.example .env

# Start development services
docker-compose up -d

# Run migrations
cd apps/api-gateway
alembic upgrade head

# Start development servers
pnpm dev
```

### Development URLs
- Web App: http://localhost:3000
- API Gateway: http://localhost:8000
- API Docs: http://localhost:8000/docs
- Mailhog: http://localhost:8025

---

*Project Structure v1.0*
