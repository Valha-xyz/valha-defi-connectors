module.exports = {
  masterChefABI: [
    {
      inputs: [
        {
          internalType: 'contract IMasterChef',
          name: '_MASTER_CHEF',
          type: 'address'
        },
        { internalType: 'contract IBEP20', name: '_CAKE', type: 'address' },
        { internalType: 'uint256', name: '_MASTER_PID', type: 'uint256' },
        { internalType: 'address', name: '_burnAdmin', type: 'address' }
      ],
      stateMutability: 'nonpayable',
      type: 'constructor'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'pid',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'allocPoint',
          type: 'uint256'
        },
        {
          indexed: true,
          internalType: 'contract IBEP20',
          name: 'lpToken',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'bool',
          name: 'isRegular',
          type: 'bool'
        }
      ],
      name: 'AddPool',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'pid',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'Deposit',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'pid',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'EmergencyWithdraw',
      type: 'event'
    },
    { anonymous: false, inputs: [], name: 'Init', type: 'event' },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address'
        }
      ],
      name: 'OwnershipTransferred',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'pid',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'allocPoint',
          type: 'uint256'
        }
      ],
      name: 'SetPool',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'boostContract',
          type: 'address'
        }
      ],
      name: 'UpdateBoostContract',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'pid',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'oldMultiplier',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newMultiplier',
          type: 'uint256'
        }
      ],
      name: 'UpdateBoostMultiplier',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'oldAdmin',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newAdmin',
          type: 'address'
        }
      ],
      name: 'UpdateBurnAdmin',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'burnRate',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'regularFarmRate',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'specialFarmRate',
          type: 'uint256'
        }
      ],
      name: 'UpdateCakeRate',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'pid',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'lastRewardBlock',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'lpSupply',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'accCakePerShare',
          type: 'uint256'
        }
      ],
      name: 'UpdatePool',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address'
        },
        { indexed: false, internalType: 'bool', name: 'isValid', type: 'bool' }
      ],
      name: 'UpdateWhiteList',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'pid',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'Withdraw',
      type: 'event'
    },
    {
      inputs: [],
      name: 'ACC_CAKE_PRECISION',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'BOOST_PRECISION',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'CAKE',
      outputs: [{ internalType: 'contract IBEP20', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'CAKE_RATE_TOTAL_PRECISION',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'MASTERCHEF_CAKE_PER_BLOCK',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'MASTER_CHEF',
      outputs: [
        { internalType: 'contract IMasterChef', name: '', type: 'address' }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'MASTER_PID',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'MAX_BOOST_PRECISION',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: '_allocPoint', type: 'uint256' },
        { internalType: 'contract IBEP20', name: '_lpToken', type: 'address' },
        { internalType: 'bool', name: '_isRegular', type: 'bool' },
        { internalType: 'bool', name: '_withUpdate', type: 'bool' }
      ],
      name: 'add',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'boostContract',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'burnAdmin',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'bool', name: '_withUpdate', type: 'bool' }],
      name: 'burnCake',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'bool', name: '_isRegular', type: 'bool' }],
      name: 'cakePerBlock',
      outputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'cakePerBlockToBurn',
      outputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'cakeRateToBurn',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'cakeRateToRegularFarm',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'cakeRateToSpecialFarm',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: '_pid', type: 'uint256' },
        { internalType: 'uint256', name: '_amount', type: 'uint256' }
      ],
      name: 'deposit',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: '_pid', type: 'uint256' }],
      name: 'emergencyWithdraw',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: '_user', type: 'address' },
        { internalType: 'uint256', name: '_pid', type: 'uint256' }
      ],
      name: 'getBoostMultiplier',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'harvestFromMasterChef',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'contract IBEP20',
          name: 'dummyToken',
          type: 'address'
        }
      ],
      name: 'init',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'lastBurnedBlock',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      name: 'lpToken',
      outputs: [{ internalType: 'contract IBEP20', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'massUpdatePools',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: '_pid', type: 'uint256' },
        { internalType: 'address', name: '_user', type: 'address' }
      ],
      name: 'pendingCake',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      name: 'poolInfo',
      outputs: [
        { internalType: 'uint256', name: 'accCakePerShare', type: 'uint256' },
        { internalType: 'uint256', name: 'lastRewardBlock', type: 'uint256' },
        { internalType: 'uint256', name: 'allocPoint', type: 'uint256' },
        { internalType: 'uint256', name: 'totalBoostedShare', type: 'uint256' },
        { internalType: 'bool', name: 'isRegular', type: 'bool' }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'poolLength',
      outputs: [{ internalType: 'uint256', name: 'pools', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: '_pid', type: 'uint256' },
        { internalType: 'uint256', name: '_allocPoint', type: 'uint256' },
        { internalType: 'bool', name: '_withUpdate', type: 'bool' }
      ],
      name: 'set',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'totalRegularAllocPoint',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'totalSpecialAllocPoint',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: '_newBoostContract', type: 'address' }
      ],
      name: 'updateBoostContract',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: '_user', type: 'address' },
        { internalType: 'uint256', name: '_pid', type: 'uint256' },
        { internalType: 'uint256', name: '_newMultiplier', type: 'uint256' }
      ],
      name: 'updateBoostMultiplier',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'address', name: '_newAdmin', type: 'address' }],
      name: 'updateBurnAdmin',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: '_burnRate', type: 'uint256' },
        { internalType: 'uint256', name: '_regularFarmRate', type: 'uint256' },
        { internalType: 'uint256', name: '_specialFarmRate', type: 'uint256' },
        { internalType: 'bool', name: '_withUpdate', type: 'bool' }
      ],
      name: 'updateCakeRate',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: '_pid', type: 'uint256' }],
      name: 'updatePool',
      outputs: [
        {
          components: [
            {
              internalType: 'uint256',
              name: 'accCakePerShare',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'lastRewardBlock',
              type: 'uint256'
            },
            { internalType: 'uint256', name: 'allocPoint', type: 'uint256' },
            {
              internalType: 'uint256',
              name: 'totalBoostedShare',
              type: 'uint256'
            },
            { internalType: 'bool', name: 'isRegular', type: 'bool' }
          ],
          internalType: 'struct MasterChefV2.PoolInfo',
          name: 'pool',
          type: 'tuple'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: '_user', type: 'address' },
        { internalType: 'bool', name: '_isValid', type: 'bool' }
      ],
      name: 'updateWhiteList',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: '', type: 'uint256' },
        { internalType: 'address', name: '', type: 'address' }
      ],
      name: 'userInfo',
      outputs: [
        { internalType: 'uint256', name: 'amount', type: 'uint256' },
        { internalType: 'uint256', name: 'rewardDebt', type: 'uint256' },
        { internalType: 'uint256', name: 'boostMultiplier', type: 'uint256' }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'whiteList',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: '_pid', type: 'uint256' },
        { internalType: 'uint256', name: '_amount', type: 'uint256' }
      ],
      name: 'withdraw',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ],
  lpTokenABI: [
    {
      inputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'spender',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256'
        }
      ],
      name: 'Approval',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount0',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount1',
          type: 'uint256'
        },
        { indexed: true, internalType: 'address', name: 'to', type: 'address' }
      ],
      name: 'Burn',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount0',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount1',
          type: 'uint256'
        }
      ],
      name: 'Mint',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount0In',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount1In',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount0Out',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount1Out',
          type: 'uint256'
        },
        { indexed: true, internalType: 'address', name: 'to', type: 'address' }
      ],
      name: 'Swap',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint112',
          name: 'reserve0',
          type: 'uint112'
        },
        {
          indexed: false,
          internalType: 'uint112',
          name: 'reserve1',
          type: 'uint112'
        }
      ],
      name: 'Sync',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address'
        },
        { indexed: true, internalType: 'address', name: 'to', type: 'address' },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256'
        }
      ],
      name: 'Transfer',
      type: 'event'
    },
    {
      constant: true,
      inputs: [],
      name: 'DOMAIN_SEPARATOR',
      outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'MINIMUM_LIQUIDITY',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'PERMIT_TYPEHASH',
      outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        { internalType: 'address', name: '', type: 'address' },
        { internalType: 'address', name: '', type: 'address' }
      ],
      name: 'allowance',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'spender', type: 'address' },
        { internalType: 'uint256', name: 'value', type: 'uint256' }
      ],
      name: 'approve',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'address', name: 'to', type: 'address' }],
      name: 'burn',
      outputs: [
        { internalType: 'uint256', name: 'amount0', type: 'uint256' },
        { internalType: 'uint256', name: 'amount1', type: 'uint256' }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'decimals',
      outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'factory',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'getReserves',
      outputs: [
        { internalType: 'uint112', name: '_reserve0', type: 'uint112' },
        { internalType: 'uint112', name: '_reserve1', type: 'uint112' },
        { internalType: 'uint32', name: '_blockTimestampLast', type: 'uint32' }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: '_token0', type: 'address' },
        { internalType: 'address', name: '_token1', type: 'address' }
      ],
      name: 'initialize',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'kLast',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'address', name: 'to', type: 'address' }],
      name: 'mint',
      outputs: [
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'name',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'nonces',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'owner', type: 'address' },
        { internalType: 'address', name: 'spender', type: 'address' },
        { internalType: 'uint256', name: 'value', type: 'uint256' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
        { internalType: 'uint8', name: 'v', type: 'uint8' },
        { internalType: 'bytes32', name: 'r', type: 'bytes32' },
        { internalType: 'bytes32', name: 's', type: 'bytes32' }
      ],
      name: 'permit',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'price0CumulativeLast',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'price1CumulativeLast',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'address', name: 'to', type: 'address' }],
      name: 'skim',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'uint256', name: 'amount0Out', type: 'uint256' },
        { internalType: 'uint256', name: 'amount1Out', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'bytes', name: 'data', type: 'bytes' }
      ],
      name: 'swap',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'symbol',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [],
      name: 'sync',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'token0',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'token1',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'totalSupply',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'value', type: 'uint256' }
      ],
      name: 'transfer',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'from', type: 'address' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'value', type: 'uint256' }
      ],
      name: 'transferFrom',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ]
}
