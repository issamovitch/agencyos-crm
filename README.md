# AgencyOS CRM & ERP Solution

![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)
![Next-Auth](https://img.shields.io/badge/Next--Auth-81D4FA?logo=next.js&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Status](https://img.shields.io/badge/status-beta-orange)

AgencyOS is a comprehensive, enterprise-grade CRM and ERP platform designed for modern agencies. Built with the latest Next.js App Router, it provides a seamless, high-performance experience for managing clients, employees, projects, and finances in a single unified interface.

## 🚀 Key Modules

### 💼 CRM (Customer Relationship Management)
- **Lead & Opportunity Tracking:** Full lifecycle management from initial contact to closed-won.
- **Account Management:** Centralized database for client information, contacts, and history.
- **Sales Pipeline:** Visual stages to manage and forecast revenue effectively.

### 👥 HRM (Human Resource Management)
- **Employee Directory:** Manage staff profiles, roles, and documentation.
- **Timekeeping & Attendance:** Integrated system for tracking work hours and verification.
- **Payroll & PaySlips:** Automated data collection for generating accurate payroll reports.
- **Request System:** Streamlined handling of vacations, sick leaves, and document requests.

### 📋 Project Management
- **Kanban Boards:** Interactive task management with drag-and-drop functionality (powered by `react-beautiful-dnd`).
- **Task Collaboration:** Comments, file attachments, and priority levels for team efficiency.
- **Workflow Definitions:** Custom runtime definitions to automate repetitive processes.

### 🧾 Financial & Document Management
- **Invoice Tracking:** Manage incoming and outgoing invoices with status monitoring.
- **Document Center:** Secure storage for contracts, IDs, and project-related files (S3/UploadThing integration).
- **AI Integration:** Leveraging OpenAI/GPT for intelligent data processing and automation.

## 🛠️ Technical Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Server Actions)
- **Language:** [TypeScript](https://www.typescriptlang.org/) for type-safety
- **Database:** [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Radix UI](https://www.radix-ui.com/) (Shadcn UI)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) & [Jotai](https://jotai.org/)
- **Data Fetching:** [TanStack Query (React Query)](https://tanstack.com/query/latest) & [SWR](https://swr.vercel.app/)
- **Internationalization:** [Next-intl](https://next-intl-docs.vercel.app/) (Supporting English, German, Czech, Ukrainian, Korean)
- **Forms:** [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation

## 📂 Project Structure

```text
├── actions/             # Next.js Server Actions (Type-safe DB operations)
├── app/[locale]/        # I18n routed App Router pages
├── components/          # Reusable UI components (Shadcn + Custom)
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and shared configurations (Prisma, Auth)
├── prisma/              # Database schema and migration files
├── public/              # Static assets
├── store/               # Global state management (Zustand)
└── types/               # Global TypeScript definitions
```

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Environment variables configured (see `.env.example`)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/issamovitch/agencyos-crm.git
   cd agencyos-crm
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Database Setup:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

## 🌐 Internationalization
The project is fully localized using `next-intl`. To add a new language, update the `messages/` directory and include the locale in `middleware.tsx`.

## 📄 License
This project is proprietary and confidential. Licensed under the [MIT License](LICENSE.md).
