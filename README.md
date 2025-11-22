# ChainMeet

ChainMeet is a Web3-enabled application built with Next.js, designed to facilitate on-chain interactions and meetings.

## Features

- **Wallet Connection**: Integrated with Reown AppKit (formerly WalletConnect) and Wagmi for seamless wallet connections (MetaMask, Coinbase Wallet, etc.).
- **Supabase Integration**: Uses Supabase for backend services and data persistence.
- **Modern UI**: Built with React 19, Tailwind CSS, and Next.js 16.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: CSS / Tailwind
- **Web3**:
  - [Reown AppKit](https://reown.com/)
  - [Wagmi](https://wagmi.sh/)
  - [Viem](https://viem.sh/)
- **Backend**: [Supabase](https://supabase.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ChainMeet
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Supabase and Reown Project ID credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_PROJECT_ID=your_reown_project_id
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `dev`: Runs the development server.
- `build`: Builds the application for production.
- `start`: Starts the production server.
- `lint`: Runs ESLint.
