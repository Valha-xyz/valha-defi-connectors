export const MiningABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "convertCrvToCvx",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "cvx",
    "outputs": [
      {
        "internalType": "contract ICvx",
        "name": "",
        "type": "ICvx"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]