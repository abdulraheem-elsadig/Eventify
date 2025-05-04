# 🗓️ Eventify

> **Modern Event Discovery & Management Platform**

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://eventify-wine-phi.vercel.app/)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/abdulraheem-elsadig/Eventify)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Styled with Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

A modern, responsive event discovery platform built with **Next.js** (Pages Router), **Tailwind CSS**, and optimized with **Static Site Generation (SSG)**. Browse events with powerful filtering options and real-time status indicators.

![Eventify Screenshot](https://eventify-wine-phi.vercel.app/og-image.png)

## ✨ Features

### Core Functionality

- **Advanced Filtering System** - Search events by title, category, location, and date range
- **Dynamic Status Indicators** - Real-time countdowns based on event status:
  - ⏳ **Upcoming events**: "Starting in 2 days : 5 hours : 30 minutes"
  - 🔄 **Ongoing events**: "Ending in 6 hours : 15 minutes"
  - 🛑 **Expired events**: "Expired" badge

### Technical Features

- 📆 **Interactive date selection** powered by shadcn/ui components
- 🔁 **Automatic data updates** via Incremental Static Regeneration (ISR)
- 📱 **Fully responsive design** adapts to any device
- ⚡ **Performance optimized** with Static Site Generation (SSG)
- 🧩 **Modular components** for maintainability and reuse

## 🚀 Tech Stack

| Technology                               | Purpose                                 |
| ---------------------------------------- | --------------------------------------- |
| [Next.js](https://nextjs.org/)           | React framework with Pages Router & SSG |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework             |
| [shadcn/ui](https://ui.shadcn.com/)      | Accessible component library            |
| [Day.js](https://day.js.org/)            | Lightweight date/time manipulation      |
| [Lucide Icons](https://lucide.dev/)      | Modern SVG icon system                  |

## 📦 Installation & Setup

### Prerequisites

- Node.js (v18+)
- Package manager (npm, yarn, or pnpm)

### Clone & Install

```bash
# Clone repository
git clone https://github.com/abdulraheem-elsadig/Eventify.git

# Navigate to project directory
cd Eventify

# Install dependencies
npm install
# or with yarn/pnpm
yarn install
pnpm install
```

### Development

```bash
# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

### Production

```bash
# Build for production
npm run build
# Start production server
npm start

# Or with yarn/pnpm
yarn build && yarn start
pnpm build && pnpm start
```

## 🔁 Data Revalidation

Eventify uses **Incremental Static Regeneration (ISR)** to keep event data fresh without sacrificing performance:

- Pages are statically generated at build time
- On page access, Next.js checks if data needs refreshing
- Changed data triggers background revalidation
- Users always see up-to-date information

### Debugging Data Status

During development, check your browser console for revalidation logs:

```
[revalidate] No change for path /events/1.
[revalidate] Path /events/2 was revalidated due to data change.
```
