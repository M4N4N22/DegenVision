# DegenVision

Leverage real-time on-chain wallet activity and AI-powered insights to make strategic predictions.  
Test your foresight against the market and climb the leaderboard — powered by **Linera** microchains for true real-time decentralization.

---

## 🎯 Overview

**DegenVision** is a **real-time decentralized prediction platform** built on **Linera**, designed for the new era of instant microsettlements and parallel markets.

It enables users to predict outcomes on **live blockchain data** — such as price movements, gas usage, whale activity, and token inflows — and earn **instant on-chain rewards** when their predictions are correct. Each prediction market runs independently on **Linera microchains**, allowing hundreds of live markets to exist simultaneously without congestion or gas spikes.

> ⚙️ Built with Next.js 14 + TypeScript + WebSockets + Linera + Nodit + TailwindCSS

---

## 🔗 Live Demo

👉 [https://degen-vision.vercel.app](https://degen-vision.vercel.app)  
🎥 [Watch Demo on YouTube](https://youtu.be/OjhgfhWQIBA?si=Eo2R5THuv66o6vqP)

---

## 🚀 Features

### ✅ Live Now (Wave 1)
| Game | Description |
|------|-------------|
| **📈 ETH Up or Down** | Predict whether ETH price will go up or down within 30 seconds to 1 hour. Instant resolution on-chain. |
| **🐋 Whale Watch** | Predict the total size of the next 10 large USDT whale transactions (≥ 2,000 USDT). Earn multipliers for accuracy! |

### ⏳ Coming Soon (Wave 2)
| Game | Description |
|------|-------------|
| **⛽ Gas Gambit** | Forecast upcoming Ethereum block congestion by estimating gas usage. |
| **🪙 Token War** | Predict which token will dominate net inflows or outflows in the next window. |
| **⚔️ Multi-Market View** | Track multiple live predictions and markets across categories at once. |

---

## 💡 Powered by Linera + Nodit

DegenVision merges **Linera’s scalable microchain architecture** with **Nodit’s real-time blockchain data** to create prediction markets that feel as fast as Web2 but settle entirely on-chain.

### 🧱 Linera Microchains  
Each prediction market operates on its own **independent microchain**, offering:
- Instant execution and local finality  
- Zero congestion across markets  
- Scalable parallel market creation  
- True real-time experience for sub-minute predictions  

### 🔍 Real-Time Data Streams (Nodit)  
Using **Nodit Streams API**, DegenVision tracks:
- Whale transactions  
- Token inflows/outflows  
- Network gas congestion  
- Market volatility and sentiment

### 🧠 AI Context via MCP  
Through **Nodit’s Model Context Protocol (MCP)**, DegenVision enriches predictions with:
- Market context and wallet activity  
- Gas and mempool behavior  
- Token flow dynamics for enhanced foresight  

---

## 🛠️ Stack

| Tech | Usage |
|------|-------|
| **Linera Protocol** | Parallel microchains for independent prediction markets |
| **Next.js 14 (App Router)** | Frontend + backend routes |
| **TailwindCSS + ShadCN** | Reactive UI components |
| **Nodit Streams + MCP** | Blockchain data feeds + contextual AI |
| **WebSockets** | Real-time odds and leaderboard updates |
| **Redis + BullMQ** | Off-chain event queueing and data sync |
| **TypeScript** | Type safety across app logic |

---

## ⚙️ Architecture

1. Each **prediction market** (e.g., “ETH Up or Down”) is a **Linera microchain**.
2. The **coordinator system** manages active markets, pushes live updates via WebSockets, and triggers instant settlements.
3. **Blockchain streams** from Nodit feed live data into each market instance.
4. Predictions are submitted → validated → instantly resolved on their microchain.
5. Payouts occur automatically without global congestion.

This architecture ensures sub-second updates and fair, verifiable outcomes for every prediction event.

---

## 🎮 Why DegenVision?

Current prediction markets are slow, congested, and unscalable.  
**DegenVision** changes that by merging **parallel on-chain computation (Linera)** with **real-time data streaming (Nodit)** — creating a new class of **live, decentralized prediction experiences**.

- **Instant market resolution** — no block delays  
- **Independent scalability** — thousands of live markets  
- **AI-driven foresight** — context-aware predictions  
- **Verifiable outcomes** — transparent on-chain results  

> 💡 DegenVision is what happens when you combine **DeFi speed**, **AI intelligence**, and **Web3 composability** into one real-time experience.

---

## 📂 Project Structure



```
/degenvision
├── app/ # Next.js App Router (layouts, routes)
├── components/ # Reusable ShadCN + custom UI components
├── config/ # Global app config
├── hooks/ # Custom React hooks (usePrediction, etc.)
├── lib/ # Utility + Linera + Nodit integration logic
├── public/ # Static assets (logos, icons)
├── styles/ # Tailwind and global styles
├── types/ # TypeScript types
├── ws/ # WebSocket + market coordinator
├── nodit-mcp-listen.mjs # MCP model listener for AI enrichment
├── package.json # Dependencies and scripts
└── README.md # You’re reading it!
```
---


---

## 🧩 What’s Next

- 🔗 Complete **Linera smart contract integration** for live settlement  
- 🧠 Expand into **sports**, **politics**, **weather**, and **AI inference** predictions  
- 🧰 Launch **creator tools** for user-generated markets  
- 🖥️ Build **multi-market dashboards** with live filtering and tracking  
- 🧬 Evolve into the **universal real-time prediction layer** for Web3  

---

## 🏁 Summary

**DegenVision** showcases what **Linera** makes possible — **real-time, parallel, low-latency decentralized applications** that combine **AI, data, and on-chain logic** to bring the excitement of live speculation to the blockchain.

> 🔮 “Real-time markets. Real data. Real ownership.”  
> DegenVision — the future of decentralized predictions.

---

