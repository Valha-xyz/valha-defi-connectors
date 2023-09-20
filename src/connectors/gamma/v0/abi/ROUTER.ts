export const ROUTERABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_clearance',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'clearance',
    outputs: [
      {
        internalType: 'contract IClearing',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'deposit0',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'deposit1',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'pos',
        type: 'address',
      },
      {
        internalType: 'uint256[4]',
        name: 'minIn',
        type: 'uint256[4]',
      },
    ],
    name: 'deposit',
    outputs: [
      {
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'pos',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_deposit',
        type: 'uint256',
      },
    ],
    name: 'getDepositAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amountStart',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountEnd',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newClearance',
        type: 'address',
      },
    ],
    name: 'transferClearance',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
