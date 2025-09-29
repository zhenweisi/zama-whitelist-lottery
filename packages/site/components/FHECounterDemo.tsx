// // // "use client";

// // // import { useFhevm } from "@fhevm/react";
// // // import { useInMemoryStorage } from "../hooks/useInMemoryStorage";
// // // import { useMetaMaskEthersSigner } from "../hooks/metamask/useMetaMaskEthersSigner";
// // // import { useFHECounter } from "../hooks/useFHECounter";
// // // import { errorNotDeployed } from "./ErrorNotDeployed";

// // // /*
// // //  * Main FHECounter React component with 3 buttons
// // //  *  - "Decrypt" button: allows you to decrypt the current FHECounter count handle.
// // //  *  - "Increment" button: allows you to increment the FHECounter count handle using FHE operations.
// // //  *  - "Decrement" button: allows you to decrement the FHECounter count handle using FHE operations.
// // //  */
// // // export const FHECounterDemo = () => {
// // //   const { storage: fhevmDecryptionSignatureStorage } = useInMemoryStorage();
// // //   const {
// // //     provider,
// // //     chainId,
// // //     accounts,
// // //     isConnected,
// // //     connect,
// // //     ethersSigner,
// // //     ethersReadonlyProvider,
// // //     sameChain,
// // //     sameSigner,
// // //     initialMockChains,
// // //   } = useMetaMaskEthersSigner();

// // //   //////////////////////////////////////////////////////////////////////////////
// // //   // FHEVM instance
// // //   //////////////////////////////////////////////////////////////////////////////

// // //   const {
// // //     instance: fhevmInstance,
// // //     status: fhevmStatus,
// // //     error: fhevmError,
// // //   } = useFhevm({
// // //     provider,
// // //     chainId,
// // //     initialMockChains,
// // //     enabled: true, // use enabled to dynamically create the instance on-demand
// // //   });

// // //   //////////////////////////////////////////////////////////////////////////////
// // //   // useFHECounter is a custom hook containing all the FHECounter logic, including
// // //   // - calling the FHECounter contract
// // //   // - encrypting FHE inputs
// // //   // - decrypting FHE handles
// // //   //////////////////////////////////////////////////////////////////////////////

// // //   const fheCounter = useFHECounter({
// // //     instance: fhevmInstance,
// // //     fhevmDecryptionSignatureStorage, // is global, could be invoked directly in useFHECounter hook
// // //     eip1193Provider: provider,
// // //     chainId,
// // //     ethersSigner,
// // //     ethersReadonlyProvider,
// // //     sameChain,
// // //     sameSigner,
// // //   });

// // //   //////////////////////////////////////////////////////////////////////////////
// // //   // UI Stuff:
// // //   // --------
// // //   // A basic page containing
// // //   // - A bunch of debug values allowing you to better visualize the React state
// // //   // - 1x "Decrypt" button (to decrypt the latest FHECounter count handle)
// // //   // - 1x "Increment" button (to increment the FHECounter)
// // //   // - 1x "Decrement" button (to decrement the FHECounter)
// // //   //////////////////////////////////////////////////////////////////////////////

// // //   const buttonClass =
// // //     "inline-flex items-center justify-center rounded-xl bg-black px-4 py-4 font-semibold text-white shadow-sm " +
// // //     "transition-colors duration-200 hover:bg-blue-700 active:bg-blue-800 " +
// // //     "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 " +
// // //     "disabled:opacity-50 disabled:pointer-events-none";

// // //   const titleClass = "font-semibold text-black text-lg mt-4";

// // //   if (!isConnected) {
// // //     return (
// // //       <div className="mx-auto">
// // //         <button
// // //           className={buttonClass}
// // //           disabled={isConnected}
// // //           onClick={connect}
// // //         >
// // //           <span className="text-4xl p-6">Connect to MetaMask</span>
// // //         </button>
// // //       </div>
// // //     );
// // //   }

// // //   if (fheCounter.isDeployed === false) {
// // //     return errorNotDeployed(chainId);
// // //   }

// // //   return (
// // //     <div className="grid w-full gap-4">
// // //       <div className="col-span-full mx-20 bg-black text-white">
// // //         <p className="font-semibold  text-3xl m-5">
// // //           FHEVM React Minimal Template -{" "}
// // //           <span className="font-mono font-normal text-gray-400">
// // //             FHECounter.sol
// // //           </span>
// // //         </p>
// // //       </div>
// // //       <div className="col-span-full mx-20 mt-4 px-5 pb-4 rounded-lg bg-white border-2 border-black">
// // //         <p className={titleClass}>Chain Infos</p>
// // //         {printProperty("ChainId", chainId)}
// // //         {printProperty(
// // //           "Metamask accounts",
// // //           accounts
// // //             ? accounts.length === 0
// // //               ? "No accounts"
// // //               : `{ length: ${accounts.length}, [${accounts[0]}, ...] }`
// // //             : "undefined"
// // //         )}
// // //         {printProperty(
// // //           "Signer",
// // //           ethersSigner ? ethersSigner.address : "No signer"
// // //         )}

// // //         <p className={titleClass}>Contract</p>
// // //         {printProperty("FHECounter", fheCounter.contractAddress)}
// // //         {printProperty("isDeployed", fheCounter.isDeployed)}
// // //       </div>
// // //       <div className="col-span-full mx-20">
// // //         <div className="grid grid-cols-2 gap-4">
// // //           <div className="rounded-lg bg-white border-2 border-black pb-4 px-4">
// // //             <p className={titleClass}>FHEVM instance</p>
// // //             {printProperty(
// // //               "Fhevm Instance",
// // //               fhevmInstance ? "OK" : "undefined"
// // //             )}
// // //             {printProperty("Fhevm Status", fhevmStatus)}
// // //             {printProperty("Fhevm Error", fhevmError ?? "No Error")}
// // //           </div>
// // //           <div className="rounded-lg bg-white border-2 border-black pb-4 px-4">
// // //             <p className={titleClass}>Status</p>
// // //             {printProperty("isRefreshing", fheCounter.isRefreshing)}
// // //             {printProperty("isDecrypting", fheCounter.isDecrypting)}
// // //             {printProperty("isIncOrDec", fheCounter.isIncOrDec)}
// // //             {printProperty("canGetCount", fheCounter.canGetCount)}
// // //             {printProperty("canDecrypt", fheCounter.canDecrypt)}
// // //             {printProperty("canIncOrDec", fheCounter.canIncOrDec)}
// // //           </div>
// // //         </div>
// // //       </div>
// // //       <div className="col-span-full mx-20 px-4 pb-4 rounded-lg bg-white border-2 border-black">
// // //         <p className={titleClass}>Count Handle</p>
// // //         {printProperty("countHandle", fheCounter.handle)}
// // //         {printProperty(
// // //           "clear countHandle",
// // //           fheCounter.isDecrypted ? fheCounter.clear : "Not decrypted"
// // //         )}
// // //       </div>
// // //       <div className="grid grid-cols-2 mx-20 gap-4">
// // //         <button
// // //           className={buttonClass}
// // //           disabled={!fheCounter.canDecrypt}
// // //           onClick={fheCounter.decryptCountHandle}
// // //         >
// // //           {fheCounter.canDecrypt
// // //             ? "Decrypt"
// // //             : fheCounter.isDecrypted
// // //               ? `Decrypted clear counter value is ${fheCounter.clear}`
// // //               : fheCounter.isDecrypting
// // //                 ? "Decrypting..."
// // //                 : "Nothing to decrypt"}
// // //         </button>
// // //         <button
// // //           className={buttonClass}
// // //           disabled={!fheCounter.canGetCount}
// // //           onClick={fheCounter.refreshCountHandle}
// // //         >
// // //           {fheCounter.canGetCount
// // //             ? "Refresh Count Handle"
// // //             : "FHECounter is not available"}
// // //         </button>
// // //       </div>
// // //       <div className="grid grid-cols-2 mx-20 gap-4">
// // //         <button
// // //           className={buttonClass}
// // //           disabled={!fheCounter.canIncOrDec}
// // //           onClick={() => fheCounter.incOrDec(+1)}
// // //         >
// // //           {fheCounter.canIncOrDec
// // //             ? "Increment Counter by 1"
// // //             : fheCounter.isIncOrDec
// // //               ? "Running..."
// // //               : "Cannot increment"}
// // //         </button>
// // //         <button
// // //           className={buttonClass}
// // //           disabled={!fheCounter.canIncOrDec}
// // //           onClick={() => fheCounter.incOrDec(-1)}
// // //         >
// // //           {fheCounter.canIncOrDec
// // //             ? "Decrement Counter by 1"
// // //             : fheCounter.isIncOrDec
// // //               ? "Running..."
// // //               : "cannot decrement"}
// // //         </button>
// // //       </div>
// // //       <div className="col-span-full mx-20 p-4 rounded-lg bg-white border-2 border-black">
// // //         {printProperty("Message", fheCounter.message)}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // function printProperty(name: string, value: unknown) {
// // //   let displayValue: string;

// // //   if (typeof value === "boolean") {
// // //     return printBooleanProperty(name, value);
// // //   } else if (typeof value === "string" || typeof value === "number") {
// // //     displayValue = String(value);
// // //   } else if (typeof value === "bigint") {
// // //     displayValue = String(value);
// // //   } else if (value === null) {
// // //     displayValue = "null";
// // //   } else if (value === undefined) {
// // //     displayValue = "undefined";
// // //   } else if (value instanceof Error) {
// // //     displayValue = value.message;
// // //   } else {
// // //     displayValue = JSON.stringify(value);
// // //   }
// // //   return (
// // //     <p className="text-black">
// // //       {name}:{" "}
// // //       <span className="font-mono font-semibold text-black">{displayValue}</span>
// // //     </p>
// // //   );
// // // }

// // // function printBooleanProperty(name: string, value: boolean) {
// // //   if (value) {
// // //     return (
// // //       <p className="text-black">
// // //         {name}:{" "}
// // //         <span className="font-mono font-semibold text-green-500">true</span>
// // //       </p>
// // //     );
// // //   }

// // //   return (
// // //     <p className="text-black">
// // //       {name}:{" "}
// // //       <span className="font-mono font-semibold text-red-500">false</span>
// // //     </p>
// // //   );
// // // }
// "use client";

// import { useEffect, useState } from "react";
// import { ethers } from "ethers";
// import { useMetaMaskEthersSigner } from "../hooks/metamask/useMetaMaskEthersSigner";
// import { useFHECounter } from "../hooks/useFHECounter";
// import { FHECounterABI } from "../abi/FHECounterABI";
// import { FHECounterAddresses } from "../abi/FHECounterAddresses";

// export default function FHECounterDemo() {
//   const signer = useMetaMaskEthersSigner();
//   const [participants, setParticipants] = useState<string[]>([]);
//   const [winner, setWinner] = useState<string>("");
//   const [chainId, setChainId] = useState<number | null>(null);

//   const [fheInstance, setFheInstance] = useState<any>(null);
//   const [ethProvider, setEthProvider] = useState<any>(null);

//   useEffect(() => {
//     if (typeof window !== "undefined" && window.ethereum) {
//       setFheInstance((window as any).fhevmInstance);
//       setEthProvider((window as any).ethereum);

//       window.ethereum.request({ method: "eth_chainId" }).then((id: string) => {
//         setChainId(parseInt(id, 16));
//       });

//       window.ethereum.on("chainChanged", (id: string) => {
//         setChainId(parseInt(id, 16));
//         setParticipants([]);
//         setWinner("");
//       });
//     }
//   }, []);

//   const { enterLottery, commitRandom, decryptWinner, decrypted, message } =
//     useFHECounter({
//       instance: fheInstance,
//       chainId: chainId || undefined,
//       ethersSigner: signer,
//       ethersReadonlyProvider: null,
//       provider: ethProvider,
//     });

//   const contractAddress =
//     chainId && FHECounterAddresses[chainId.toString()]
//       ? FHECounterAddresses[chainId.toString()].address
//       : null;

//   useEffect(() => {
//     if (!contractAddress || contractAddress === "0x0000000000000000000000000000000000000000")
//       return;
//     if (typeof window === "undefined") return;

//     const load = async () => {
//       try {
//         const provider = new ethers.BrowserProvider((window as any).ethereum);
//         const contract = new ethers.Contract(contractAddress, FHECounterABI, provider);

//         const ps = await contract.getParticipants();
//         setParticipants(ps);

//         const w = await contract.getWinner();
//         setWinner(w);
//       } catch (err) {
//         console.error("加载失败:", err);
//       }
//     };

//     load();
//   }, [contractAddress, decrypted]);

//   const invalidNetwork =
//     !contractAddress ||
//     contractAddress === "0x0000000000000000000000000000000000000000";

//   return (
//     <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
//       <h2>🎲 FHE Lottery Demo</h2>

//       <p>🌐 当前网络: {chainId || "未连接"}</p>
//       <p>👥 当前参与者数量: {participants.length}</p>
//       <p>🏆 当前赢家: {winner || "尚未开奖"}</p>
//       <p
//         style={{
//           color: message.includes("✅") ? "green" : message.includes("❌") ? "red" : "black",
//         }}
//       >
//         📢 状态: {invalidNetwork ? "❌ 当前网络未部署合约，请切换到 Sepolia" : message}
//       </p>

//       <div style={{ marginTop: "1rem" }}>
//         <button onClick={enterLottery} disabled={!signer || invalidNetwork}>
//           报名参加抽奖
//         </button>
//       </div>

//       <div style={{ marginTop: "1rem" }}>
//         <button
//           onClick={() => commitRandom(Math.floor(Math.random() * 1000))}
//           disabled={!signer || invalidNetwork}
//         >
//           提交随机数
//         </button>
//       </div>

//       <div style={{ marginTop: "1rem" }}>
//         <button
//           onClick={() => decryptWinner(participants)}
//           disabled={!signer || participants.length === 0 || invalidNetwork}
//         >
//           解密并计算赢家
//         </button>
//       </div>

//       {decrypted && (
//         <div style={{ marginTop: "1rem", color: "green" }}>
//           🎉 解密结果: {decrypted}
//         </div>
//       )}
//     </div>
//   );
// }
// "use client";
// "use client";
// import { useEffect, useState } from "react";
// import { ethers } from "ethers";
// import { useMetaMaskEthersSigner } from "../hooks/metamask/useMetaMaskEthersSigner";
// import { useFHECounter } from "../hooks/useFHECounter";
// import { FHECounterABI } from "../abi/FHECounterABI";
// import { FHECounterAddresses } from "../abi/FHECounterAddresses";

// // ✅ 白名单代币地址（你需要替换）
// const TOKEN_CONTRACT_ADDRESS = "0x1350674f9b185D6822B2D40e38d78E652D2AF23C";
// const ERC20_ABI = ["function balanceOf(address owner) view returns (uint256)"];

// export default function FHECounterDemo() {
//   const signer = useMetaMaskEthersSigner();
//   const [participants, setParticipants] = useState<string[]>([]);
//   const [winner, setWinner] = useState<string>("");
//   const [chainId, setChainId] = useState<number | null>(null);
//   const [walletAddress, setWalletAddress] = useState<string>("");
//   const [isWhitelisted, setIsWhitelisted] = useState<boolean>(false);
//   const [fheInstance, setFheInstance] = useState<any>(null);
//   const [ethProvider, setEthProvider] = useState<any>(null);

//   const {
//     enterLottery,
//     commitRandom,
//     decryptWinner,
//     decrypted,
//     message,
//     mockMode,
//   } = useFHECounter({
//     instance: fheInstance,
//     chainId: chainId || undefined,
//     ethersSigner: signer,
//     ethersReadonlyProvider: null,
//     provider: ethProvider,
//   });

//   const contractAddress =
//     chainId && FHECounterAddresses[chainId.toString()]
//       ? FHECounterAddresses[chainId.toString()].address
//       : null;

//   useEffect(() => {
//     if (typeof window !== "undefined" && window.ethereum) {
//       setEthProvider((window as any).ethereum);
//       setFheInstance((window as any).fhevmInstance);

//       window.ethereum.request({ method: "eth_chainId" }).then((id: string) => {
//         setChainId(parseInt(id, 16));
//       });

//       window.ethereum.on("chainChanged", (id: string) => {
//         setChainId(parseInt(id, 16));
//         setParticipants([]);
//         setWinner("");
//       });

//       window.ethereum.request({ method: "eth_accounts" }).then((accounts: string[]) => {
//         if (accounts.length > 0) setWalletAddress(accounts[0]);
//       });

//       window.ethereum.on("accountsChanged", (accounts: string[]) => {
//         setWalletAddress(accounts[0] || "");
//       });
//     }
//   }, []);

//   useEffect(() => {
//     const checkWhitelist = async () => {
//       if (!walletAddress || !ethProvider || !chainId) return;
//       try {
//         const provider = new ethers.BrowserProvider(ethProvider);
//         const tokenContract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, ERC20_ABI, provider);
//         const balance = await tokenContract.balanceOf(walletAddress);
//         setIsWhitelisted(balance > 0);
//       } catch (err) {
//         console.warn("白名单判断失败:", err);
//         setIsWhitelisted(false);
//       }
//     };
//     checkWhitelist();
//   }, [walletAddress, ethProvider, chainId]);

//   useEffect(() => {
//     if (!contractAddress || contractAddress === "0x0000000000000000000000000000000000000000")
//       return;
//     if (typeof window === "undefined") return;

//     const load = async () => {
//       try {
//         const provider = new ethers.BrowserProvider((window as any).ethereum);
//         const contract = new ethers.Contract(contractAddress, FHECounterABI, provider);

//         const ps = await contract.getParticipants();
//         setParticipants(ps);

//         const w = await contract.getWinner();
//         setWinner(w);
//       } catch (err) {
//         console.error("加载失败:", err);
//       }
//     };

//     load();
//   }, [contractAddress, decrypted]);

//   const invalidNetwork =
//     !contractAddress ||
//     contractAddress === "0x0000000000000000000000000000000000000000";

//   return (
//     <div style={{ padding: "1.5rem", border: "1px solid #ccc", borderRadius: "8px", background: "#f9f9f9" }}>
//       <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>🎲 ZAMA - FHE Lottery Demo</h2>

//       <p>🌐 当前网络: {chainId || "未连接"}</p>
//       <p>👛 当前地址: {walletAddress || "未连接"}</p>
//       <p>🟢 白名单资格: {isWhitelisted ? "✅ 持有代币" : "❌ 无资格"}</p>
//       <p>🔐 加密模块状态: {mockMode ? "🧪 Mock 模式" : fheInstance ? "✅ 已初始化" : "⚠️ 未初始化"}</p>
//       <p>👥 当前参与者数量: {participants.length}</p>
//       <p>🏆 当前赢家: {winner || "尚未开奖"}</p>
//       <p
//         style={{
//           color: message.includes("✅") ? "green" : message.includes("❌") ? "red" : "black",
//         }}
//       >
//         📢 状态提示: {invalidNetwork ? "❌ 当前网络未部署合约，请切换到 Sepolia" : message}
//       </p>

//       <div style={{ marginTop: "1rem" }}>
//         <button onClick={enterLottery} disabled={!signer || invalidNetwork || !isWhitelisted}>
//           📝 报名参加抽奖
//         </button>
//       </div>

//       <div style={{ marginTop: "1rem" }}>
//         <button
//           onClick={() => commitRandom(Math.floor(Math.random() * 1000))}
//           disabled={!signer || invalidNetwork || !isWhitelisted}
//         >
//           🎲 提交随机数
//         </button>
//       </div>

//       <div style={{ marginTop: "1rem" }}>
//         <button
//           onClick={() => decryptWinner(participants)}
//           disabled={!signer || participants.length === 0 || invalidNetwork}
//         >
//           🧮 解密并计算赢家
//         </button>
//       </div>

//       {decrypted && (
//         <div style={{ marginTop: "1rem", color: "green" }}>
//           🎉 解密结果: {decrypted}
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useMetaMaskEthersSigner } from "../hooks/metamask/useMetaMaskEthersSigner";
import { useFHECounter } from "../hooks/useFHECounter";
import { FHECounterABI } from "../abi/FHECounterABI";
import { FHECounterAddresses } from "../abi/FHECounterAddresses";

const TOKEN_CONTRACT_ADDRESS = "0x1350674f9b185D6822B2D40e38d78E652D2AF23C";
const ERC20_ABI = ["function balanceOf(address owner) view returns (uint256)"];

export default function FHECounterDemo() {
  const signer = useMetaMaskEthersSigner();
  const [participants, setParticipants] = useState<string[]>([]);
  const [winner, setWinner] = useState<string>("");
  const [chainId, setChainId] = useState<number | null>(null);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isWhitelisted, setIsWhitelisted] = useState<boolean>(false);
  const [fheInstance, setFheInstance] = useState<any>(null);
  const [ethProvider, setEthProvider] = useState<any>(null);

  const {
    enterLottery,
    commitRandom,
    decryptWinner,
    decrypted,
    message,
    mockMode,
  } = useFHECounter({
    instance: fheInstance,
    chainId: chainId || undefined,
    ethersSigner: signer,
    ethersReadonlyProvider: null,
    provider: ethProvider,
  });

  const contractAddress =
    chainId && FHECounterAddresses[chainId.toString()]
      ? FHECounterAddresses[chainId.toString()].address
      : null;

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      setEthProvider((window as any).ethereum);
      setFheInstance((window as any).fhevmInstance);

      window.ethereum.request({ method: "eth_chainId" }).then((id: string) => {
        setChainId(parseInt(id, 16));
      });

      window.ethereum.on("chainChanged", (id: string) => {
        setChainId(parseInt(id, 16));
        setParticipants([]);
        setWinner("");
      });

      window.ethereum.request({ method: "eth_accounts" }).then((accounts: string[]) => {
        if (accounts.length > 0) setWalletAddress(accounts[0]);
      });

      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setWalletAddress(accounts[0] || "");
      });
    }
  }, []);

  useEffect(() => {
    const checkWhitelist = async () => {
      if (!walletAddress || !ethProvider || !chainId) return;
      try {
        const provider = new ethers.BrowserProvider(ethProvider);
        const tokenContract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, ERC20_ABI, provider);
        const balance = await tokenContract.balanceOf(walletAddress);
        setIsWhitelisted(balance > 0);
      } catch (err) {
        console.warn("白名单判断失败:", err);
        setIsWhitelisted(false);
      }
    };
    checkWhitelist();
  }, [walletAddress, ethProvider, chainId]);

  useEffect(() => {
    if (!contractAddress || contractAddress === "0x0000000000000000000000000000000000000000")
      return;
    if (typeof window === "undefined") return;

    const load = async () => {
      try {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const contract = new ethers.Contract(contractAddress, FHECounterABI, provider);

        const ps = await contract.getParticipants();
        setParticipants(ps);

        const w = await contract.getWinner();
        setWinner(w);
      } catch (err) {
        console.error("加载失败:", err);
      }
    };

    load();
  }, [contractAddress, decrypted]);

  const invalidNetwork =
    !contractAddress ||
    contractAddress === "0x0000000000000000000000000000000000000000";

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6 font-sans">
      {/* 🎯 标题区 */}
      <div className="bg-yellow-100 p-4 rounded-lg text-center shadow-md">
        <h1 className="text-2xl font-bold">🎲 ZAMA - FHE Lottery Demo</h1>
        <p className="text-sm text-gray-600">FHE Lottery DApp</p>
      </div>

      {/* 🌐 网络状态区 */}
      <div className="bg-gray-100 p-4 rounded-md text-sm space-y-1">
        <p>🔗 钱包地址: {walletAddress || "未连接"}</p>
        <p>🆔 Chain ID: {chainId || "未连接"}</p>
        <p>📦 合约地址: {contractAddress || "未部署"}</p>
        <p>🟢 白名单资格: {isWhitelisted ? "✅ 持有代币" : "❌ 无资格"}</p>
        <p>🔐 加密模块状态: {mockMode ? "🧪 Mock 模式" : fheInstance ? "✅ 已初始化" : "⚠️ 未初始化"}</p>
      </div>

      {/* 🎮 抽奖配置区 */}
      <div className="bg-white border p-4 rounded-md shadow-sm text-sm space-y-1">
        <p>🧾 当前期数: {chainId}</p>
        <p>🆔 当前期数ID: {winner || "尚未开奖"}</p>
        <p>👥 当前参与者数量: {participants.length}</p>
        <p>🎯 当前号码: 0x0000000000000000000000000000000000000000</p>
      </div>

      {/* 🧮 操作按钮区 */}
      <div className="space-y-2">
        <button
          onClick={enterLottery}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-50"
          disabled={!signer || invalidNetwork || !isWhitelisted}
        >
          📝 报名参加抽奖
        </button>
        <button
          onClick={() => commitRandom(Math.floor(Math.random() * 1000))}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded disabled:opacity-50"
          disabled={!signer || invalidNetwork || !isWhitelisted}
        >
          🎲 提交随机数
        </button>
        <button
          onClick={() => decryptWinner(participants)}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded disabled:opacity-50"
          disabled={!signer || participants.length === 0 || invalidNetwork}
        >
          🧮 解密并计算赢家
        </button>
      </div>

      {/* 📢 状态反馈区 */}
      <p className={`mt-4 p-2 rounded text-sm ${
        message.includes("✅") ? "text-green-600 bg-green-100" :
        message.includes("❌") ? "text-red-600 bg-red-100" :
        "text-gray-700 bg-gray-100"
      }`}>
        📢 状态提示: {invalidNetwork ? "❌ 当前网络未部署合约，请切换到 Sepolia" : message || "等待操作..."}
      </p>

      {/* 🧪 Debug 区（可选） */}
      <details className="bg-gray-50 p-4 rounded-md border border-dashed text-sm">
        <summary className="cursor-pointer font-semibold">🔍 技术调试信息</summary>
        <p>mockMode: {String(mockMode)}</p>
        <p>SDK 初始化状态: {fheInstance ? "✅ 已初始化" : "⚠️ 未初始化"}</p>
        <p>当前参与者数量: {participants.length}</p>
      </details>

      {decrypted && (
        <div className="mt-4 text-green-600 font-semibold">
          🎉 解密结果: {decrypted}
        </div>
      )}
    </div>
  );
}
