export const BatchABI = [
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      {
        components: [
          {
            internalType: 'enum DepositActionType',
            name: 'actionType',
            type: 'uint8',
          },
          { internalType: 'uint16', name: 'currencyId', type: 'uint16' },
          {
            internalType: 'uint256',
            name: 'depositActionAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'withdrawAmountInternalPrecision',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'withdrawEntireCashBalance',
            type: 'bool',
          },
          { internalType: 'bool', name: 'redeemToUnderlying', type: 'bool' },
        ],
        internalType: 'struct BalanceAction[]',
        name: 'actions',
        type: 'tuple[]',
      },
    ],
    name: 'batchBalanceAction',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      {
        components: [
          {
            internalType: 'enum DepositActionType',
            name: 'actionType',
            type: 'uint8',
          },
          { internalType: 'uint16', name: 'currencyId', type: 'uint16' },
          {
            internalType: 'uint256',
            name: 'depositActionAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'withdrawAmountInternalPrecision',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'withdrawEntireCashBalance',
            type: 'bool',
          },
          { internalType: 'bool', name: 'redeemToUnderlying', type: 'bool' },
          { internalType: 'bytes32[]', name: 'trades', type: 'bytes32[]' },
        ],
        internalType: 'struct BalanceActionWithTrades[]',
        name: 'actions',
        type: 'tuple[]',
      },
    ],
    name: 'batchBalanceAndTradeAction',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      {
        components: [
          {
            internalType: 'enum DepositActionType',
            name: 'actionType',
            type: 'uint8',
          },
          { internalType: 'uint16', name: 'currencyId', type: 'uint16' },
          {
            internalType: 'uint256',
            name: 'depositActionAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'withdrawAmountInternalPrecision',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'withdrawEntireCashBalance',
            type: 'bool',
          },
          { internalType: 'bool', name: 'redeemToUnderlying', type: 'bool' },
          { internalType: 'bytes32[]', name: 'trades', type: 'bytes32[]' },
        ],
        internalType: 'struct BalanceActionWithTrades[]',
        name: 'actions',
        type: 'tuple[]',
      },
      { internalType: 'bytes', name: 'callbackData', type: 'bytes' },
    ],
    name: 'batchBalanceAndTradeActionWithCallback',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      {
        components: [
          { internalType: 'uint16', name: 'currencyId', type: 'uint16' },
          { internalType: 'bool', name: 'depositUnderlying', type: 'bool' },
          { internalType: 'bytes32[]', name: 'trades', type: 'bytes32[]' },
        ],
        internalType: 'struct BatchLend[]',
        name: 'actions',
        type: 'tuple[]',
      },
    ],
    name: 'batchLend',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLibInfo',
    outputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pauseGuardian',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pauseRouter',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
];
