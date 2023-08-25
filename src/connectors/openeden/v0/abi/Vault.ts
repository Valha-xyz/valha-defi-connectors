export const VaultABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'transactionFee',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'firstDeposit',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minDeposit',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'maxDeposit',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'maxWithdraw',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'targetReservesLevel',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'onchainServiceFeeRate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'offchainServiceFeeRate',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'firstDeposit',
        type: 'uint256',
      },
    ],
    name: 'SetFirsetDeposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'firstDeposit',
        type: 'uint256',
      },
    ],
    name: 'SetFirstDeposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'maxDeposit',
        type: 'uint256',
      },
    ],
    name: 'SetMaxDeposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'maxWithdraw',
        type: 'uint256',
      },
    ],
    name: 'SetMaxWithdraw',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'minDeposit',
        type: 'uint256',
      },
    ],
    name: 'SetMinDeposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'offchainServiceFeeRate',
        type: 'uint256',
      },
    ],
    name: 'SetOffchainServiceFeeRate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'onchainServiceFeeRate',
        type: 'uint256',
      },
    ],
    name: 'SetOnchainServiceFeeRate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'targetReservesLevel',
        type: 'uint256',
      },
    ],
    name: 'SetTargetReservesLevel',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'transactionFee',
        type: 'uint256',
      },
    ],
    name: 'SetTransactionFee',
    type: 'event',
  },
  {
    inputs: [],
    name: 'getFirstDeposit',
    outputs: [
      {
        internalType: 'uint256',
        name: 'firstDeposit',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMaxWithdraw',
    outputs: [
      {
        internalType: 'uint256',
        name: 'maxWithdraw',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMinMaxDeposit',
    outputs: [
      {
        internalType: 'uint256',
        name: 'minDeposit',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'maxDeposit',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getOnchainAndOffChainServiceFeeRate',
    outputs: [
      {
        internalType: 'uint256',
        name: 'onchainFeeRate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'offchainFeeRate',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTargetReservesLevel',
    outputs: [
      {
        internalType: 'uint256',
        name: 'targetReservesLevel',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTransactionFee',
    outputs: [
      {
        internalType: 'uint256',
        name: 'txFee',
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
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'firstDeposit',
        type: 'uint256',
      },
    ],
    name: 'setFirstDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'maxDeposit',
        type: 'uint256',
      },
    ],
    name: 'setMaxDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'maxWithdraw',
        type: 'uint256',
      },
    ],
    name: 'setMaxWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'minDeposit',
        type: 'uint256',
      },
    ],
    name: 'setMinDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'offchainServiceFeeRate',
        type: 'uint256',
      },
    ],
    name: 'setOffchainServiceFeeRate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'onchainServiceFeeRate',
        type: 'uint256',
      },
    ],
    name: 'setOnchainServiceFeeRate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'targetReservesLevel',
        type: 'uint256',
      },
    ],
    name: 'setTargetReservesLevel',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'transactionFee',
        type: 'uint256',
      },
    ],
    name: 'setTransactionFee',
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
