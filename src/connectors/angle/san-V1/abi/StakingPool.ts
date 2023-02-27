export const StakingABI = [
  {
    name: 'Deposit',
    inputs: [
      { name: 'provider', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'Withdraw',
    inputs: [
      { name: 'provider', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'UpdateLiquidityLimit',
    inputs: [
      { name: 'user', type: 'address', indexed: false },
      { name: 'original_balance', type: 'uint256', indexed: false },
      { name: 'original_supply', type: 'uint256', indexed: false },
      { name: 'working_balance', type: 'uint256', indexed: false },
      { name: 'working_supply', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'CommitOwnership',
    inputs: [{ name: 'admin', type: 'address', indexed: false }],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'ApplyOwnership',
    inputs: [{ name: 'admin', type: 'address', indexed: false }],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'Transfer',
    inputs: [
      { name: '_from', type: 'address', indexed: true },
      { name: '_to', type: 'address', indexed: true },
      { name: '_value', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'Approval',
    inputs: [
      { name: '_owner', type: 'address', indexed: true },
      { name: '_spender', type: 'address', indexed: true },
      { name: '_value', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'RewardDataUpdate',
    inputs: [
      { name: '_token', type: 'address', indexed: true },
      { name: '_amount', type: 'uint256', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [],
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'initialize',
    inputs: [
      { name: '_staking_token', type: 'address' },
      { name: '_admin', type: 'address' },
      { name: '_ANGLE', type: 'address' },
      { name: '_voting_escrow', type: 'address' },
      { name: '_veBoost_proxy', type: 'address' },
      { name: '_distributor', type: 'address' }
    ],
    outputs: [],
    gas: 548461
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'decimals',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
    gas: 2418
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'user_checkpoint',
    inputs: [{ name: 'addr', type: 'address' }],
    outputs: [{ name: '', type: 'bool' }],
    gas: 3493693
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'claimed_reward',
    inputs: [
      { name: '_addr', type: 'address' },
      { name: '_token', type: 'address' }
    ],
    outputs: [{ name: '', type: 'uint256' }],
    gas: 2976
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'claimable_reward',
    inputs: [
      { name: '_user', type: 'address' },
      { name: '_reward_token', type: 'address' }
    ],
    outputs: [{ name: '', type: 'uint256' }],
    gas: 26704
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'set_rewards_receiver',
    inputs: [{ name: '_receiver', type: 'address' }],
    outputs: [],
    gas: 35613
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'claim_rewards',
    inputs: [],
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'claim_rewards',
    inputs: [{ name: '_addr', type: 'address' }],
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'claim_rewards',
    inputs: [
      { name: '_addr', type: 'address' },
      { name: '_receiver', type: 'address' }
    ],
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'kick',
    inputs: [{ name: 'addr', type: 'address' }],
    outputs: [],
    gas: 3514457
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'deposit',
    inputs: [{ name: '_value', type: 'uint256' }],
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'deposit',
    inputs: [
      { name: '_value', type: 'uint256' },
      { name: '_addr', type: 'address' }
    ],
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'deposit',
    inputs: [
      { name: '_value', type: 'uint256' },
      { name: '_addr', type: 'address' },
      { name: '_claim_rewards', type: 'bool' }
    ],
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'withdraw',
    inputs: [{ name: '_value', type: 'uint256' }],
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'withdraw',
    inputs: [
      { name: '_value', type: 'uint256' },
      { name: '_claim_rewards', type: 'bool' }
    ],
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'transfer',
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'bool' }],
    gas: 14116306
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'transferFrom',
    inputs: [
      { name: '_from', type: 'address' },
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'bool' }],
    gas: 14154256
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'approve',
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'bool' }],
    gas: 39391
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'increaseAllowance',
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_added_value', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'bool' }],
    gas: 41935
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'decreaseAllowance',
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_subtracted_value', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'bool' }],
    gas: 41959
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'add_reward',
    inputs: [
      { name: '_reward_token', type: 'address' },
      { name: '_distributor', type: 'address' }
    ],
    outputs: [],
    gas: 112973
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'set_reward_distributor',
    inputs: [
      { name: '_reward_token', type: 'address' },
      { name: '_distributor', type: 'address' }
    ],
    outputs: [],
    gas: 40723
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'deposit_reward_token',
    inputs: [
      { name: '_reward_token', type: 'address' },
      { name: '_amount', type: 'uint256' }
    ],
    outputs: [],
    gas: 3585370
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'commit_transfer_ownership',
    inputs: [{ name: 'addr', type: 'address' }],
    outputs: [],
    gas: 40082
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'accept_transfer_ownership',
    inputs: [],
    outputs: [],
    gas: 39930
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'ANGLE',
    inputs: [],
    outputs: [{ name: '', type: 'address' }],
    gas: 2988
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'voting_escrow',
    inputs: [],
    outputs: [{ name: '', type: 'address' }],
    gas: 3018
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'veBoost_proxy',
    inputs: [],
    outputs: [{ name: '', type: 'address' }],
    gas: 3048
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'staking_token',
    inputs: [],
    outputs: [{ name: '', type: 'address' }],
    gas: 3078
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'decimal_staking_token',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
    gas: 3108
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'balanceOf',
    inputs: [{ name: 'arg0', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
    gas: 3353
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'totalSupply',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
    gas: 3168
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'allowance',
    inputs: [
      { name: 'arg0', type: 'address' },
      { name: 'arg1', type: 'address' }
    ],
    outputs: [{ name: '', type: 'uint256' }],
    gas: 3628
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'name',
    inputs: [],
    outputs: [{ name: '', type: 'string' }],
    gas: 13458
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'symbol',
    inputs: [],
    outputs: [{ name: '', type: 'string' }],
    gas: 11211
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'working_balances',
    inputs: [{ name: 'arg0', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
    gas: 3503
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'working_supply',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
    gas: 3318
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'integrate_checkpoint_of',
    inputs: [{ name: 'arg0', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
    gas: 3563
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'reward_count',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
    gas: 3378
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'reward_tokens',
    inputs: [{ name: 'arg0', type: 'uint256' }],
    outputs: [{ name: '', type: 'address' }],
    gas: 3453
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'reward_data',
    inputs: [{ name: 'arg0', type: 'address' }],
    outputs: [
      { name: 'token', type: 'address' },
      { name: 'distributor', type: 'address' },
      { name: 'period_finish', type: 'uint256' },
      { name: 'rate', type: 'uint256' },
      { name: 'last_update', type: 'uint256' },
      { name: 'integral', type: 'uint256' }
    ],
    gas: 14883
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'rewards_receiver',
    inputs: [{ name: 'arg0', type: 'address' }],
    outputs: [{ name: '', type: 'address' }],
    gas: 3683
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'reward_integral_for',
    inputs: [
      { name: 'arg0', type: 'address' },
      { name: 'arg1', type: 'address' }
    ],
    outputs: [{ name: '', type: 'uint256' }],
    gas: 3928
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'admin',
    inputs: [],
    outputs: [{ name: '', type: 'address' }],
    gas: 3528
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'future_admin',
    inputs: [],
    outputs: [{ name: '', type: 'address' }],
    gas: 3558
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'initialized',
    inputs: [],
    outputs: [{ name: '', type: 'bool' }],
    gas: 3588
  }
]
