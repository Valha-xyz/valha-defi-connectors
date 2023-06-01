export const RewardsABI = [
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "action",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "pauseState",
        "type": "bool"
      }
    ],
    "name": "ActionPaused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "contract QiToken",
        "name": "qiToken",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "action",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "pauseState",
        "type": "bool"
      }
    ],
    "name": "ActionPaused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "rewardToken",
        "type": "uint8"
      },
      {
        "indexed": true,
        "internalType": "contract QiToken",
        "name": "qiToken",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newBorrowRewardSpeed",
        "type": "uint256"
      }
    ],
    "name": "BorrowRewardSpeedUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "contributor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newSpeed",
        "type": "uint256"
      }
    ],
    "name": "ContributorQiSpeedUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint8",
        "name": "tokenType",
        "type": "uint8"
      },
      {
        "indexed": true,
        "internalType": "contract QiToken",
        "name": "qiToken",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "borrower",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "qiDelta",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "qiBorrowIndex",
        "type": "uint256"
      }
    ],
    "name": "DistributedBorrowerReward",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint8",
        "name": "tokenType",
        "type": "uint8"
      },
      {
        "indexed": true,
        "internalType": "contract QiToken",
        "name": "qiToken",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "borrower",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "qiDelta",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "qiBorrowIndex",
        "type": "uint256"
      }
    ],
    "name": "DistributedSupplierReward",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "error",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "info",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "detail",
        "type": "uint256"
      }
    ],
    "name": "Failure",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "contract QiToken",
        "name": "qiToken",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "MarketEntered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "contract QiToken",
        "name": "qiToken",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "MarketExited",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "contract QiToken",
        "name": "qiToken",
        "type": "address"
      }
    ],
    "name": "MarketListed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "contract QiToken",
        "name": "qiToken",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newBorrowCap",
        "type": "uint256"
      }
    ],
    "name": "NewBorrowCap",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "oldBorrowCapGuardian",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "newBorrowCapGuardian",
        "type": "address"
      }
    ],
    "name": "NewBorrowCapGuardian",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "oldCloseFactorMantissa",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newCloseFactorMantissa",
        "type": "uint256"
      }
    ],
    "name": "NewCloseFactor",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "contract QiToken",
        "name": "qiToken",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "oldCollateralFactorMantissa",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newCollateralFactorMantissa",
        "type": "uint256"
      }
    ],
    "name": "NewCollateralFactor",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "oldLiquidationIncentiveMantissa",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newLiquidationIncentiveMantissa",
        "type": "uint256"
      }
    ],
    "name": "NewLiquidationIncentive",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "oldPauseGuardian",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "newPauseGuardian",
        "type": "address"
      }
    ],
    "name": "NewPauseGuardian",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "contract PriceOracle",
        "name": "oldPriceOracle",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "contract PriceOracle",
        "name": "newPriceOracle",
        "type": "address"
      }
    ],
    "name": "NewPriceOracle",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "QiGranted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "rewardToken",
        "type": "uint8"
      },
      {
        "indexed": true,
        "internalType": "contract QiToken",
        "name": "qiToken",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newSupplyRewardSpeed",
        "type": "uint256"
      }
    ],
    "name": "SupplyRewardSpeedUpdated",
    "type": "event"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "contract Unitroller",
        "name": "unitroller",
        "type": "address"
      }
    ],
    "name": "_become",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "_borrowGuardianPaused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "_grantQi",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "_mintGuardianPaused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "newBorrowCapGuardian",
        "type": "address"
      }
    ],
    "name": "_setBorrowCapGuardian",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "contract QiToken",
        "name": "qiToken",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "state",
        "type": "bool"
      }
    ],
    "name": "_setBorrowPaused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "newCloseFactorMantissa",
        "type": "uint256"
      }
    ],
    "name": "_setCloseFactor",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "contract QiToken",
        "name": "qiToken",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "newCollateralFactorMantissa",
        "type": "uint256"
      }
    ],
    "name": "_setCollateralFactor",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "newLiquidationIncentiveMantissa",
        "type": "uint256"
      }
    ],
    "name": "_setLiquidationIncentive",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "contract QiToken[]",
        "name": "qiTokens",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "newBorrowCaps",
        "type": "uint256[]"
      }
    ],
    "name": "_setMarketBorrowCaps",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "contract QiToken",
        "name": "qiToken",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "state",
        "type": "bool"
      }
    ],
    "name": "_setMintPaused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "newPauseGuardian",
        "type": "address"
      }
    ],
    "name": "_setPauseGuardian",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "contract PriceOracle",
        "name": "newOracle",
        "type": "address"
      }
    ],
    "name": "_setPriceOracle",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint8",
        "name": "rewardType",
        "type": "uint8"
      },
      {
        "internalType": "contract QiToken",
        "name": "qiToken",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "supplyRewardSpeed",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "borrowRewardSpeed",
        "type": "uint256"
      }
    ],
    "name": "_setRewardSpeed",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bool",
        "name": "state",
        "type": "bool"
      }
    ],
    "name": "_setSeizePaused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bool",
        "name": "state",
        "type": "bool"
      }
    ],
    "name": "_setTransferPaused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "contract QiToken",
        "name": "qiToken",
        "type": "address"
      }
    ],
    "name": "_supportMarket",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "accountAssets",
    "outputs": [
      {
        "internalType": "contract QiToken",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "admin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "allMarkets",
    "outputs": [
      {
        "internalType": "contract QiToken",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "qiToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "borrower",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "borrowAmount",
        "type": "uint256"
      }
    ],
    "name": "borrowAllowed",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "borrowCapGuardian",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "borrowCaps",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "borrowGuardianPaused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "borrowRewardSpeeds",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "qiToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "borrower",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "borrowAmount",
        "type": "uint256"
      }
    ],
    "name": "borrowVerify",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "contract QiToken",
        "name": "qiToken",
        "type": "address"
      }
    ],
    "name": "checkMembership",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint8",
        "name": "rewardType",
        "type": "uint8"
      },
      {
        "internalType": "address payable",
        "name": "holder",
        "type": "address"
      }
    ],
    "name": "claimReward",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint8",
        "name": "rewardType",
        "type": "uint8"
      },
      {
        "internalType": "address payable",
        "name": "holder",
        "type": "address"
      },
      {
        "internalType": "contract QiToken[]",
        "name": "qiTokens",
        "type": "address[]"
      }
    ],
    "name": "claimReward",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint8",
        "name": "rewardType",
        "type": "uint8"
      },
      {
        "internalType": "address payable[]",
        "name": "holders",
        "type": "address[]"
      },
      {
        "internalType": "contract QiToken[]",
        "name": "qiTokens",
        "type": "address[]"
      },
      {
        "internalType": "bool",
        "name": "borrowers",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "suppliers",
        "type": "bool"
      }
    ],
    "name": "claimReward",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "closeFactorMantissa",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "comptrollerImplementation",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address[]",
        "name": "qiTokens",
        "type": "address[]"
      }
    ],
    "name": "enterMarkets",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "qiTokenAddress",
        "type": "address"
      }
    ],
    "name": "exitMarket",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "getAccountLiquidity",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getAllMarkets",
    "outputs": [
      {
        "internalType": "contract QiToken[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "getAssetsIn",
    "outputs": [
      {
        "internalType": "contract QiToken[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getBlockTimestamp",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "qiTokenModify",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "redeemTokens",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "borrowAmount",
        "type": "uint256"
      }
    ],
    "name": "getHypotheticalAccountLiquidity",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "initialIndexConstant",
    "outputs": [
      {
        "internalType": "uint224",
        "name": "",
        "type": "uint224"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "isComptroller",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "qiTokenBorrowed",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "qiTokenCollateral",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "liquidator",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "borrower",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "repayAmount",
        "type": "uint256"
      }
    ],
    "name": "liquidateBorrowAllowed",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "qiTokenBorrowed",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "qiTokenCollateral",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "liquidator",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "borrower",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "actualRepayAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "seizeTokens",
        "type": "uint256"
      }
    ],
    "name": "liquidateBorrowVerify",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "qiTokenBorrowed",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "qiTokenCollateral",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "actualRepayAmount",
        "type": "uint256"
      }
    ],
    "name": "liquidateCalculateSeizeTokens",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "liquidationIncentiveMantissa",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "markets",
    "outputs": [
      {
        "internalType": "bool",
        "name": "isListed",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "collateralFactorMantissa",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isQied",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "maxAssets",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "qiToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "minter",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "mintAmount",
        "type": "uint256"
      }
    ],
    "name": "mintAllowed",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "mintGuardianPaused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "qiToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "minter",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "actualMintAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "mintTokens",
        "type": "uint256"
      }
    ],
    "name": "mintVerify",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "oracle",
    "outputs": [
      {
        "internalType": "contract PriceOracle",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "pauseGuardian",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "pendingAdmin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "pendingComptrollerImplementation",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "qiAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "qiToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "redeemer",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "redeemTokens",
        "type": "uint256"
      }
    ],
    "name": "redeemAllowed",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "qiToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "redeemer",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "redeemAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "redeemTokens",
        "type": "uint256"
      }
    ],
    "name": "redeemVerify",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "qiToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "payer",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "borrower",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "repayAmount",
        "type": "uint256"
      }
    ],
    "name": "repayBorrowAllowed",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "qiToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "payer",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "borrower",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "actualRepayAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "borrowerIndex",
        "type": "uint256"
      }
    ],
    "name": "repayBorrowVerify",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "rewardAccrued",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "rewardAvax",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "rewardBorrowState",
    "outputs": [
      {
        "internalType": "uint224",
        "name": "index",
        "type": "uint224"
      },
      {
        "internalType": "uint32",
        "name": "timestamp",
        "type": "uint32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "rewardBorrowerIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "rewardQi",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "rewardSupplierIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "rewardSupplyState",
    "outputs": [
      {
        "internalType": "uint224",
        "name": "index",
        "type": "uint224"
      },
      {
        "internalType": "uint32",
        "name": "timestamp",
        "type": "uint32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "qiTokenCollateral",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "qiTokenBorrowed",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "liquidator",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "borrower",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "seizeTokens",
        "type": "uint256"
      }
    ],
    "name": "seizeAllowed",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "seizeGuardianPaused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "qiTokenCollateral",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "qiTokenBorrowed",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "liquidator",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "borrower",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "seizeTokens",
        "type": "uint256"
      }
    ],
    "name": "seizeVerify",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "newQiAddress",
        "type": "address"
      }
    ],
    "name": "setQiAddress",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "supplyRewardSpeeds",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "qiToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "src",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "dst",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "transferTokens",
        "type": "uint256"
      }
    ],
    "name": "transferAllowed",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "transferGuardianPaused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "qiToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "src",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "dst",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "transferTokens",
        "type": "uint256"
      }
    ],
    "name": "transferVerify",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
