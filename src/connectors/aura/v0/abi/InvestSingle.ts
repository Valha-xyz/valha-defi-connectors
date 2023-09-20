export const InvestSingleABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_bVault",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "bVault",
    "outputs": [
      {
        "internalType": "contract IVault",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_rewardPoolAddress",
        "type": "address"
      },
      {
        "internalType": "contract IERC20",
        "name": "_inputToken",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_inputAmount",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "_balancerPoolId",
        "type": "bytes32"
      },
      {
        "components": [
          {
            "internalType": "contract IAsset[]",
            "name": "assets",
            "type": "address[]"
          },
          {
            "internalType": "uint256[]",
            "name": "maxAmountsIn",
            "type": "uint256[]"
          },
          {
            "internalType": "bytes",
            "name": "userData",
            "type": "bytes"
          },
          {
            "internalType": "bool",
            "name": "fromInternalBalance",
            "type": "bool"
          }
        ],
        "internalType": "struct IVault.JoinPoolRequest",
        "name": "_request",
        "type": "tuple"
      }
    ],
    "name": "depositSingle",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]