# ChainMeet 💜

**The Web3 Dating App** - Find your perfect match on-chain with NFT profiles, crypto gifting, and decentralized trust.

## 🌟 Features

### 🎨 Web3 Identity & Verification
- **NFT Profile Pictures**: Display your NFTs with stunning hexagon frames
- **ENS Integration**: Show your ENS name and social identities (Farcaster, Lens)
- **ZK Proofs**: Verify age and assets without revealing sensitive data
- **Verified Badges**: Build trust with on-chain verification shields

### 💖 Enhanced Social Interactions
- **Super Like**: Stand out with gradient-powered super likes
- **Crypto Gifting**: Send ETH/USDC gifts (coffee ☕, roses 🌹, diamonds 💎)
- **Date Scheduler**: Propose dates with calendar export (.ics)
- **AI Matchmaker**: Get compatibility scores and AI-generated icebreakers

### 🛡️ Trust, Safety & Gating
- **Stake-to-Chat**: Anti-spam protection with refundable ETH stakes
- **Token Gates**: Filter matches by token holdings (USDC, WETH, custom tokens)
- **Reputation System**: Rate interactions and build on-chain trust scores

### 👑 Premium & Growth
- **Gold Membership NFT**: Unlock unlimited swipes, advanced filters, and exclusive badges
- **Referral Program**: Earn rewards by inviting friends
- **Global Map**: Discover nearby matches with privacy-preserving location fuzzing
- **Video Calling**: Connect face-to-face with WebRTC-powered calls

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Web3**:
  - [Reown AppKit](https://reown.com/) (WalletConnect v3)
  - [Wagmi v3](https://wagmi.sh/)
  - [Viem](https://viem.sh/)
  - [Alchemy SDK](https://www.alchemy.com/) for NFT data
- **Backend**: [Supabase](https://supabase.com/) (PostgreSQL + Auth)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Maps**: Leaflet + OpenStreetMap

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Supabase account
- Reown (WalletConnect) Project ID
- Alchemy API key (for NFT features)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jeremiah-eth/ChainMeet.git
   cd ChainMeet
   ```

2. **Install dependencies**:
   ```bash
   bun install
   # or npm install
   ```

3. **Set up environment variables**:
   
   Create a `.env` file in the root directory:
   ```env
   # Reown (WalletConnect) Project ID
   NEXT_PUBLIC_PROJECT_ID=your_reown_project_id

   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Alchemy (for NFT features)
   NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
   ```

4. **Set up the database**:
   
   Run the SQL schema in your Supabase project:
   ```bash
   # Copy schema.sql contents to Supabase SQL Editor
   ```

5. **Run the development server**:
   ```bash
   bun dev
   # or npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📁 Project Structure

```
ChainMeet/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── feed/              # Main swipe feed
│   │   ├── matches/           # Matches list
│   │   ├── messages/          # Chat interface
│   │   └── profile/           # User profile
│   ├── components/
│   │   ├── call/              # Video calling components
│   │   ├── feed/              # Feed & profile cards
│   │   ├── map/               # Map view
│   │   ├── messaging/         # Chat, gifts, dates
│   │   ├── onboarding/        # Wallet connect & setup
│   │   ├── profile/           # Profile editing & NFTs
│   │   └── shared/            # Reusable UI components
│   ├── context/               # React contexts (VideoCall)
│   ├── hooks/                 # Custom hooks (staking, gifts)
│   ├── lib/                   # Utilities & services
│   │   ├── aiMatching.ts      # AI compatibility
│   │   ├── calendar.ts        # ICS export
│   │   ├── ens.ts             # ENS resolution
│   │   ├── nft.ts             # NFT fetching
│   │   ├── referrals.ts       # Referral system
│   │   └── zkProof.ts         # ZK verification
│   └── types/                 # TypeScript types
├── schema.sql                 # Database schema
└── package.json
```

## 🎯 Key Features Implementation

### NFT Profile Pictures
Users can select any NFT from their wallet as their profile picture, displayed in a unique hexagonal frame with verification badge.

### Crypto Gifting
Send on-chain gifts during conversations:
- ☕ Coffee (0.001 ETH)
- 🍕 Pizza (0.005 ETH)
- 🌹 Rose (0.01 ETH)
- 💎 Diamond (0.05 ETH)

### Stake-to-Chat
Anti-spam mechanism requiring users to stake ETH before sending first message. Stake is:
- Returned if recipient replies
- Slashed if reported for spam

### AI Matchmaker
- Calculates compatibility based on interests and bio
- Generates personalized icebreaker messages
- Shows match score with reasons

## 🔐 Security & Privacy

- **Wallet-based auth**: No passwords, just wallet signatures
- **Location fuzzing**: Approximate locations for privacy
- **Stake-based spam protection**: Economic disincentive for bad actors
- **ZK proofs**: Verify attributes without revealing data
- **On-chain reputation**: Transparent trust scores

## 📜 Scripts

- `dev`: Run development server
- `build`: Build for production
- `start`: Start production server
- `lint`: Run ESLint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see LICENSE file for details

## 🔗 Links

- [Live Demo](#) (Coming soon)
- [Documentation](#) (Coming soon)
- [Twitter](#) (Coming soon)

---

Built with 💜 by the ChainMeet team
