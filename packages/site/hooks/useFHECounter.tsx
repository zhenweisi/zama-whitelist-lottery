
"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { FHECounterABI } from "../abi/FHECounterABI";
import { FHECounterAddresses } from "../abi/FHECounterAddresses";

const sepoliaConfig = {
  chainId: 11155111,
  networkUrl: "https://eth-sepolia.public.blastapi.io",
  kmsContractAddress: "0x1364cBBf2cDF5032C47d8226a6f6FBD2AFCDacAC",
  aclContractAddress: "0x687820221192C5B662b25367F70076A37bc79b6c",
  inputVerifierContractAddress: "0xbc91f3daD1A5F19F8390c400196e58073B6a0BC4",
  verifyingContractAddressDecryption: "0xb6E160B1ff80D67Bfe90A85eE06Ce0A2613607D1",
  verifyingContractAddressInputVerification: "0x7048C39f048125eDa9d678AEbaDfB22F7900a29F",
  gatewayChainId: 55815,
  relayerUrl: "https://relayer.testnet.zama.cloud",
};

export function useFHECounter({ instance, chainId, ethersSigner }: any) {
  const [message, setMessage] = useState("");
  const [decrypted, setDecrypted] = useState<string>("");
  const [mockMode, setMockMode] = useState(false);

  function getContract() {
    if (!chainId) throw new Error("chainId 未定义");
    const addr = FHECounterAddresses[chainId.toString()]?.address;
    if (!addr || addr === "0x0000000000000000000000000000000000000000") {
      throw new Error("当前网络未部署合约");
    }
    return new ethers.Contract(addr, FHECounterABI, ethersSigner);
  }

  async function ensureInstance() {
    if (instance) return instance;
    if (typeof window === "undefined") throw new Error("FHE 只能在浏览器端初始化");

    const cached = (window as any).fhevmInstance;
    if (cached && typeof cached.encrypt32 === "function") return cached;
    if (mockMode) return null;

    try {
      const sdk = await import("@fhevm/sdk");
      const createInstance = sdk.createInstance;
      const created = await createInstance(sepoliaConfig);

      if (!created || typeof created.encrypt32 !== "function") {
        console.warn("⚠️ SDK 初始化返回无效对象");
        setMockMode(true);
        return null;
      }

      (window as any).fhevmInstance = created;
      return created;
    } catch (err) {
      console.warn("⚠️ SDK 初始化失败:", err);
      setMockMode(true);
      return null;
    }
  }

  async function enterLottery() {
    if (mockMode) {
      setMessage("✅ [Mock] 已报名参加抽奖");
      return;
    }
    try {
      const contract = getContract();
      const tx = await contract.enterLottery();
      await tx.wait();
      setMessage("✅ 报名成功");
    } catch (err: any) {
      setMessage("❌ 报名失败: " + (err.message || String(err)));
    }
  }

  async function commitRandom(rand: number) {
    if (mockMode) {
      setMessage(`✅ [Mock] 随机数 ${rand} 已提交`);
      return;
    }
    try {
      const inst = await ensureInstance();
      if (!inst) {
        setMessage("⚠️ FHE 实例未初始化，已切换到 Mock 模式");
        return;
      }

      const contract = getContract();
      const encrypted = inst.encrypt32(rand);
      const tx = await contract.commitRandom(encrypted.handles[0], encrypted.proof);
      await tx.wait();
      setMessage("✅ 随机数已提交");
    } catch (err: any) {
      console.error("提交随机数失败:", err);
      setMessage("❌ 提交失败: " + (err.message || String(err)));
    }
  }

  async function decryptWinner(participants: string[]) {
    if (mockMode) {
      const winner = participants[Math.floor(Math.random() * participants.length)] || "0x0000";
      setDecrypted(winner);
      setMessage("✅ [Mock] 解密完成，赢家: " + winner);
      return;
    }
    try {
      const inst = await ensureInstance();
      if (!inst || typeof inst.decrypt !== "function") {
        setMessage("⚠️ FHE 解密模块未初始化，已切换到 Mock 模式");
        setMockMode(true);
        return;
      }

      const contract = getContract();
      const encWinner = await contract.getWinner();
      const dec = inst.decrypt(encWinner);
      setDecrypted(dec.toString());
      setMessage("✅ 解密完成");
    } catch (err: any) {
      console.error("解密失败:", err);
      setMessage("❌ 解密失败: " + (err.message || String(err)));
    }
  }

  return { enterLottery, commitRandom, decryptWinner, decrypted, message, mockMode };
}
