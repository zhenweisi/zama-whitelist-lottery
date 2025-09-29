# 🎟️ Zama Whitelist Lottery

A **privacy-preserving on-chain lottery dApp** powered by **Zama Fully Homomorphic Encryption (FHE)**.  
Only users who pass whitelist verification can participate. All submitted random numbers remain encrypted on-chain until the lottery ends, ensuring fairness and privacy.

---

## ✨ Features

- 🔐 **Privacy by Design**: Random numbers encrypted with Zama FHE  
- ✅ **Whitelist Verification**: Only wallets holding a specific NFT can participate  
- 🏆 **Fair Lottery**: Results are computed on-chain and verifiable  
- 💰 **Prize Pool**: Entry fees are pooled and awarded to the winner  
- 📊 **Leaderboard**: Tracks winners and rewards  
- 🎨 **Modern UI**: Built with React + Tailwind + shadcn/ui  
- 🔗 **Web3 Native**: Integrated with MetaMask / RainbowKit  

---

## ⚡ Runtime Modes

The frontend **automatically switches between modes**:

- **On-chain Mode** (default): If Sepolia RPC is available, the app connects to the blockchain.  
- **Mock Mode** (automatic fallback): If RPC is unavailable, the app automatically falls back to mock data.  
  → Ensures the UI is always runnable, even without RPC or wallet setup.  

---

## 🎮 Game Flow

1. **Whitelist Check**: Verify if the user’s wallet is whitelisted (via NFT ownership)  
2. **Submit Random Number**: Encrypted with FHE and stored on-chain  
3. **Wait for Reveal**: Once all players submit or time expires, numbers are decrypted  
4. **Winner Selection**: The unique random number wins the prize pool  

---

## 📝 Whitelist Mechanism

Whitelist verification is based on **NFT ownership**.  
Only wallets holding the designated NFT are eligible to participate.

- **Whitelist Contract**: Deployed on Sepolia Testnet  
- **Logic**: Frontend queries the contract to check NFT ownership  
- **Contract Interface**: `isWhitelisted(address user) → bool`  
- **Security**: Verification is fully on-chain and cannot be bypassed  

Example snippet:
```solidity
function isWhitelisted(address user) public view returns (bool) {
    return IERC721(whitelistNFT).balanceOf(user) > 0;
}
```
## 🔐 Zama FHE Integration

- **Client-side Encryption**: Numbers encrypted before submission  
- **On-chain Storage**: Encrypted values stored as `euint32`  
- **On-chain Computation**: Winner determined using FHE without revealing inputs  
- **Privacy Guarantee**: Even contract deployers cannot see player choices  

---

## 🔮 Next Steps / Future Work

- 🎁 **NFT Rewards**: Distribute special NFTs to winners as proof of victory  
- 🔄 **Multi-round Lotteries**: Support multiple rounds and progressive jackpots  
- 🌐 **Mainnet Deployment**: Deploy on Ethereum mainnet or other L2 networks  
- 📱 **Mobile Optimization**: Improve UI/UX for mobile devices  
- 🛡️ **Advanced Security**: Add auditing and monitoring for smart contracts  
- 🤝 **Community Features**: Enable DAO-style governance for lottery rules  

---

## 🚀 Installation & Run

### Prerequisites
- Node.js 18+  
- npm  
- MetaMask or compatible wallet  
- Sepolia ETH for gas fees  

### Steps
```bash
# Clone the repository
git clone https://github.com/zhenweisi/zama-whitelist-lottery.git
cd zama-whitelist-lottery/packages/site

# Install dependencies
npm install

# Start development server
npm run dev
The app will run at http://localhost:3000

⚠️ Note: You must run npm run dev inside packages/site, otherwise the project will not start.
