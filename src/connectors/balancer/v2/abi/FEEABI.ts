export const FEEABI = [
  {
    "inputs": [
      { "internalType": "contract IVault", "name": "_vault", "type": "address" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newFlashLoanFeePercentage",
        "type": "uint256"
      }
    ],
    "name": "FlashLoanFeePercentageChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newSwapFeePercentage",
        "type": "uint256"
      }
    ],
    "name": "SwapFeePercentageChanged",
    "type": "event"
  },
  {
    "inputs": [
      { "internalType": "bytes4", "name": "selector", "type": "bytes4" }
    ],
    "name": "getActionId",
    "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAuthorizer",
    "outputs": [
      { "internalType": "contract IAuthorizer", "name": "", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC20[]",
        "name": "tokens",
        "type": "address[]"
      }
    ],
    "name": "getCollectedFeeAmounts",
    "outputs": [
      { "internalType": "uint256[]", "name": "feeAmounts", "type": "uint256[]" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getFlashLoanFeePercentage",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getSwapFeePercentage",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "newFlashLoanFeePercentage",
        "type": "uint256"
      }
    ],
    "name": "setFlashLoanFeePercentage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "newSwapFeePercentage",
        "type": "uint256"
      }
    ],
    "name": "setSwapFeePercentage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "vault",
    "outputs": [
      { "internalType": "contract IVault", "name": "", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC20[]",
        "name": "tokens",
        "type": "address[]"
      },
      { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" },
      { "internalType": "address", "name": "recipient", "type": "address" }
    ],
    "name": "withdrawCollectedFees",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]