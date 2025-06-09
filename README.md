# DegenVision

Leverage real-time on-chain wallet activity and AI-powered insights to make strategic predictions.  
Test your foresight against the market and climb the leaderboard.



## 🎯 Overview

**DegenVision** is a real-time, prediction-based web application built during a hackathon with a mission to **gamify on-chain activity** and provide **AI-powered market foresight**.

Harnessing the power of **Nodit’s live blockchain data streams** and its **Model Context Protocol (MCP)**, DegenVision creates a unique engagement loop where users can:
- Watch live wallet and token movements
- Predict the outcomes of short-term on-chain events
- Compete on a global leaderboard
- Earn recognition for accuracy and speed

> ⚙️ Built with Next.js 14 App Router + TypeScript + WebSockets + Nodit + TailwindCSS

---

## 🔗 Live Demo

👉 [https://degen-vision.vercel.app](https://degen-vision.vercel.app)  
🎥 [Watch Demo on YouTube](https://youtu.be/OjhgfhWQIBA?si=Eo2R5THuv66o6vqP)
---

## 🚀 Features

### ✅ Live Now (Wave 1)
| Game | Description |
|------|-------------|
| **📈 ETH Up or Down** | Predict whether ETH price will go up or down. Choose your timeframe from 30 seconds to 1 hour. |
| **🐋 Whale Watch** | Predict the sum of the next 10 large USDT whale transactions (≥ 2,000 USDT). Choose your range and win multipliers if your guess is right! |

### ⏳ Coming Soon (Wave 2)
| Game | Description |
|------|-------------|
| **⛽ Gas Gambit** | Predict Ethereum network congestion by estimating gas usage in upcoming blocks. Test your mempool intuition. |
| **🪙 Token War** | Predict which token will dominate net inflows or outflows. Stay ahead of shifts in market sentiment. |

---

## 💡 Powered by Nodit in a Fresh Way

DegenVision is not just another prediction game — it redefines Web3 engagement by combining **data**, **intelligence**, and **interactivity**:

### 🔍 Real-Time Streams  
Utilizing **Nodit Streams API**, we subscribe to **Ethereum's live transaction flow**, including whale movements and token transfers.

### 🧠 AI-Powered Predictions  
With **Nodit's Model Context Protocol (MCP)**, predictions aren't blind guesses. We build smart predictions powered by:
- Market context and wallet behavior
- Gas trends and network load
- Token flow dynamics

### 🧩 Modular, Server-Side Intelligence  
The app connects to a **custom backend** that:
- Subscribes to Nodit WebSocket feeds
- Processes and filters transaction types (e.g. native ETH, stablecoin whales)
- Interfaces with MCP to get prediction context
- Exposes APIs to the frontend for live rendering and prediction handling

---

## 🛠️ Stack

| Tech | Usage |
|------|-------|
| **Next.js 14 (App Router)** | Full-stack React app with Server Actions |
| **TailwindCSS + ShadCN** | UI components and styling |
| **Nodit Streams + MCP** | Real-time chain data + prediction context |
| **WebSockets** | Live updates for leaderboard and data stream |
| **PostgreSQL + Prisma** | User and prediction data storage |
| **Node.js API Routes** | Server-side processing of chain events |

---

## 🧪 How It Works

1. **Users choose a game** (e.g., ETH price prediction)
2. **Live on-chain data** is streamed from Nodit to our server
3. Users make a prediction → our backend evaluates it against **real-time data**
4. The result is stored and shown live on leaderboard with win/loss status

---

## 🎮 Why DegenVision?

Web3 is flooded with passive tools and dashboards. **We turn data into gameplay**.  
Using **Nodit** not just for consumption but **for creation of game mechanics** around real on-chain events brings:

- **More Web3 engagement**
- **Smarter user predictions**
- **A natural feedback loop between wallet activity and human intuition**

> 📈 Whether you're a trader, degen, or builder — DegenVision makes real-time crypto thrilling and rewarding.

---

## 📂 Project Structure

```
/degenvision
├── app/                   # Next.js App Router (pages, layouts, routing)
├── components/            # Reusable UI components (ShadCN + custom)
├── config/                # App-wide configs (e.g., theme, constants)
├── hooks/                 # Custom React hooks (e.g., usePrediction)
├── lib/                   # Utility functions, Nodit API logic
├── public/                # Static assets (e.g., images, icons)
├── styles/                # Tailwind and global styles
├── types/                 # TypeScript type definitions
├── nodit-mcp-listen.mjs   # MCP model listener using Nodit
├── components.json        # ShadCN UI config
├── next.config.mjs        # Next.js configuration
├── tailwind.config.js     # TailwindCSS theme and setup
├── eslint.config.js       # ESLint config
├── tsconfig.json          # TypeScript config
├── pnpm-lock.yaml         # pnpm lock file
├── package.json           # Dependencies and scripts
└── README.md              # You're reading it!
```
---

## 🛠️ Tech Stack

| Tech        | Purpose                              |
|-------------|--------------------------------------|
| **Next.js** | App framework with App Router        |
| **TailwindCSS + ShadCN** | Design system & UI     |
| **Nodit Streams API** | Live blockchain insights   |
| **Nodit MCP** | AI + market context enrichment     |
| **TypeScript** | Strong types across the codebase |
| **WebSocket** | Real-time data communication       |
| **pnpm**     | Package management                  |

---
