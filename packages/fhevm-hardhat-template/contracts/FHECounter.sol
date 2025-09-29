// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {FHE, euint32, externalEuint32} from "@fhevm/solidity/lib/FHE.sol";
import {SepoliaConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

interface IERC721 {
    function balanceOf(address owner) external view returns (uint256);
}

contract FHECounter is SepoliaConfig {
    // 白名单 NFT 地址（Sepolia 示例，替换为你实际的）
    address public constant WHITELIST_NFT = 0x1350674f9b185D6822B2D40e38d78E652D2AF23C;

    // 报名用户
    address[] private participants;
    mapping(address => bool) public hasEntered;

    // 加密随机数
    euint32 private _encryptedRand;

    // 中奖者
    address public winner;

    // 事件
    event Entered(address indexed user);
    event RandomCommitted(address indexed committer);
    event WinnerSet(address indexed winner);

    modifier onlyWhitelisted() {
        require(IERC721(WHITELIST_NFT).balanceOf(msg.sender) > 0, "Not whitelisted");
        _;
    }

    /// 检查是否在白名单
    function isWhitelisted(address user) external view returns (bool) {
        return IERC721(WHITELIST_NFT).balanceOf(user) > 0;
    }

    /// 报名参加抽奖
    function enterLottery() external onlyWhitelisted {
        require(!hasEntered[msg.sender], "Already entered");
        hasEntered[msg.sender] = true;
        participants.push(msg.sender);
        emit Entered(msg.sender);
    }

    /// 提交加密随机数（前端用 SDK encrypt32 生成）
    function commitRandom(externalEuint32 input, bytes calldata proof) external {
        _encryptedRand = FHE.fromExternal(input, proof);
        FHE.allowThis(_encryptedRand);
        FHE.allow(_encryptedRand, msg.sender);
        emit RandomCommitted(msg.sender);
    }

    /// 返回加密随机数（前端/relayer 解密用）
    function getEncryptedRand() external view returns (euint32) {
        return _encryptedRand;
    }

    /// 设置中奖者（前端/relayer 解密后调用）
    function setWinner(address _winner) external onlyWhitelisted {
        require(winner == address(0), "Winner already set");
        winner = _winner;
        emit WinnerSet(_winner);
    }

    /// 查询中奖者
    function getWinner() external view returns (address) {
        return winner;
    }

    /// 查询所有参与者
    function getParticipants() external view returns (address[] memory) {
        return participants;
    }
}
