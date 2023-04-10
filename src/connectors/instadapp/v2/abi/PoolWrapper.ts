export const PoolWrapperABI = [
  {
    inputs: [{ internalType: 'address', name: 'vault_', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  { inputs: [], name: 'EthVaultWrapper__OutputInsufficient', type: 'error' },
  {
    inputs: [],
    name: 'EthVaultWrapper__UnexpectedWithdrawAmount',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'bytes', name: 'swapCalldata_', type: 'bytes' },
      { internalType: 'uint256', name: 'minStEthIn_', type: 'uint256' },
      { internalType: 'address', name: 'receiver_', type: 'address' },
    ],
    name: 'deposit',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amount_', type: 'uint256' }],
    name: 'getWithdrawSwapAmount',
    outputs: [
      { internalType: 'uint256', name: 'stEthSwapAmount_', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amount_', type: 'uint256' },
      { internalType: 'bytes', name: 'swapCalldata_', type: 'bytes' },
      { internalType: 'uint256', name: 'minEthOut_', type: 'uint256' },
      { internalType: 'address', name: 'receiver_', type: 'address' },
    ],
    name: 'withdraw',
    outputs: [{ internalType: 'uint256', name: 'ethAmount_', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { stateMutability: 'payable', type: 'receive' },
];
