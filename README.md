# DermaAsist

**"Upload. Analyze. Care."**

AI-powered skin-condition assessment and care-support platform designed for Indian users.

![DermaAsist](https://img.shields.io/badge/DermaAsist-v1.0.0-0D9488?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=flat-square)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Prisma-336791?style=flat-square)

---

## ⚕️ Medical Disclaimer

> **DermaAsist provides AI-based skin assessment for informational and care-support purposes only.
> It is NOT a substitute for examination, diagnosis, or treatment by a qualified healthcare professional.
> If your symptoms are severe, rapidly worsening, or concerning, seek professional medical attention immediately.**

---

## ✨ Core Features (USPs)

1. **Routine Reminders** — Create skincare/medication reminders with recurring schedules
2. **Family Account** — Manage up to 4 family members with separate profiles and histories
3. **Bilingual Support** — Full English and Hindi (हिंदी) support across all features
4. **Indian User Focus** — Architecture supporting Indian dermatology AI models

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Radix UI |
| **Backend** | Node.js, Express, TypeScript |
| **Database** | PostgreSQL with Prisma ORM |
| **Authentication** | JWT (access + refresh tokens), bcrypt |
| **AI Service** | Modular abstraction layer (mock service included) |
| **i18n** | react-i18next (English + Hindi) |
| **PDF** | @react-pdf/renderer |
| **Styling** | Tailwind CSS + custom design system |

## 📋 Prerequisites

- **Node.js** v18+ and npm
- **PostgreSQL** v14+ (running locally or remote)

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/Atharv-aiml/DermaAsist.git
cd DermaAsist

# Install all dependencies across workspaces
npm install
```

### 2. Database Setup

```bash
# Setup environment configuration
cp .env.example backend/.env

# Generate Prisma client
npm run db:generate

# Push schema to SQLite database (default)
npm run db:push

# Seed demo data
npm run db:seed
```

### 3. Run Development Servers

```bash
# From root directory - runs both frontend and backend concurrently
npm run dev

# Or run separately:
npm run dev:frontend   # Frontend on http://localhost:5173
npm run dev:backend    # Backend on http://localhost:3001
```

### 4. Demo Credentials

| User | Email | Password | Role |
|------|-------|----------|------|
| Rahul Sharma | rahul@example.com | Demo@1234 | User |
| Admin | admin@dermaasist.com | Admin@1234 | Admin |

## 📁 Project Structure

```
dermaasist/
├── frontend/                   # React Frontend (Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/             # 20+ Radix UI components (with index.ts barrel export)
│   │   │   ├── layout/         # Header, Footer, MobileNav, Logo, AppLayout
│   │   │   ├── landing/        # 12 Landing page sections
│   │   │   └── common/         # ErrorBoundary, LoadingScreen, ProtectedRoute
│   │   ├── pages/              # 17 page components
│   │   ├── context/            # AuthContext, FamilyContext
│   │   ├── hooks/              # Custom hooks (with index.ts barrel export)
│   │   ├── services/           # Axios API services (with index.ts barrel export)
│   │   ├── i18n/               # Localization (English + Hindi)
│   │   ├── types/              # TypeScript type definitions
│   │   └── App.tsx             # Router + providers
│   └── tailwind.config.ts      # Design tokens
│
├── backend/                    # Node.js + Express Backend
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema
│   │   ├── seed.ts             # Database seeder
│   │   └── dev.db              # SQLite development database
│   └── src/
│       ├── lib/
│       │   └── prisma.ts       # Centralized Prisma Client singleton
│       ├── routes/             # Express API routes
│       ├── services/           # Business logic + AI service layer
│       ├── middleware/         # Auth, audit, upload, validation, rateLimit
│       └── utils/              # Error classes, password/token helpers, schemas
│
├── scripts/                    # Utility and testing scripts (test_upload.mjs)
├── .editorconfig               # Consistent code styling
├── .env.example                # Unified environment variable template
├── .gitignore                  # Comprehensive git ignore rules
├── package.json                # Root workspace configuration
└── README.md
```



## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout |
| POST | `/api/auth/forgot-password` | Request password reset |
| POST | `/api/auth/reset-password` | Reset password |
| GET | `/api/auth/me` | Get current user |

### Profile
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile` | Get profile |
| PUT | `/api/profile` | Update profile |
| PUT | `/api/profile/password` | Change password |

### Assessments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/assessments` | Create assessment |
| POST | `/api/assessments/:id/image` | Upload skin image |
| POST | `/api/assessments/:id/questionnaire` | Submit questionnaire |
| POST | `/api/assessments/:id/analyze` | Trigger AI analysis |
| GET | `/api/assessments` | List assessments |
| GET | `/api/assessments/:id` | Get assessment detail |

### Family
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/family` | Create family |
| GET | `/api/family` | Get family |
| POST | `/api/family/members` | Add member |
| PUT | `/api/family/members/:id` | Update member |
| DELETE | `/api/family/members/:id` | Remove member |

### Reminders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/reminders` | Create reminder |
| GET | `/api/reminders` | List reminders |
| GET | `/api/reminders/today` | Today's reminders |
| PUT | `/api/reminders/:id` | Update reminder |
| DELETE | `/api/reminders/:id` | Delete reminder |
| POST | `/api/reminders/:id/complete` | Mark completed |

### Admin (Admin only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/stats` | Dashboard stats |
| GET | `/api/admin/model` | AI model info |
| GET | `/api/admin/health` | System health |

## 🤖 AI Model Architecture

DermaAsist uses a modular AI abstraction layer:

```
Frontend → Backend API → Assessment Service → AI Model Service → Result Generator
```

### Switching AI Providers

Set the `AI_PROVIDER` environment variable:

```env
AI_PROVIDER=mock              # Development (default)
AI_PROVIDER=fastapi           # Python/FastAPI model
AI_PROVIDER=huggingface       # Hugging Face model
AI_PROVIDER=external_api      # External AI API
AI_PROVIDER=custom_model      # Custom dermatology model
```

The `SkinAssessmentModel` interface ensures any provider implements:
- `analyzeImage()` — Image quality and feature analysis
- `analyzeSymptoms()` — Symptom parsing and risk identification
- `generateAssessment()` — Condition matching with confidence scores
- `calculateRisk()` — Red flag and urgency detection
- `getRecommendations()` — Care recommendation generation

### Mock AI Service

The included mock service returns realistic data:
- 10 common skin conditions with symptom-based matching
- Confidence scores (65-92%)
- Red flag detection
- 3-5 care recommendations per assessment
- Realistic 2-4 second processing delay

## 🌐 Internationalization

| Language | Code | Coverage |
|----------|------|----------|
| English | `en` | 300+ keys |
| Hindi | `hi` | 300+ keys |

All UI elements are translatable: navigation, buttons, forms, questionnaires, error messages, AI results, reminders, settings, and help text.

## 🔒 Security

- **Authentication**: JWT with access (15min) + refresh (7d) tokens
- **Passwords**: bcrypt hashing (12 rounds)
- **Headers**: Helmet.js security headers
- **CORS**: Configurable origin whitelist
- **Rate Limiting**: 100 req/15min general, 5 req/15min for auth
- **Validation**: Zod schema validation on all inputs
- **File Upload**: Type validation (JPG/PNG/WebP only), 10MB max
- **Access Control**: Role-based (user/admin), user-scoped queries
- **Audit Logging**: Sensitive actions logged to audit_logs table
- **No Secrets in Frontend**: All keys via environment variables

## 📊 Database Schema

14 models: `User`, `Family`, `FamilyMember`, `SkinAssessment`, `SkinImage`, `QuestionnaireAnswer`, `AIResult`, `Recommendation`, `RoutineReminder`, `ReminderCompletion`, `Notification`, `Appointment`, `Report`, `AuditLog`

## 🧪 Environment Variables

See `server/.env.example` for all configuration options:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/dermacon-in
JWT_SECRET=your-secret-key
AI_PROVIDER=mock
PORT=3001
```

## 📱 Responsive Design

- **Mobile-first** design with dedicated mobile layout
- **Bottom navigation** on mobile (Home, Check, History, Family, Profile)
- **Touch-optimized** camera interface for smartphone use
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

## 📄 License

This project is proprietary. All rights reserved.

---

**Built with ❤️ for Indian users** | DermaAsist © 2026
