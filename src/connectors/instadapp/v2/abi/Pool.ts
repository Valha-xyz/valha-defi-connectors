export const PoolABI = [
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
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256'
      }
    ],
    name: 'Deposit',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint8', name: 'status', type: 'uint8' }
    ],
    name: 'LogChangeStatus',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' }
    ],
    name: 'LogCollectRevenue',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'ethAmount',
        type: 'uint256'
      }
    ],
    name: 'LogEthSweep',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint8', name: 'protocol', type: 'uint8' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'withdrawAmount',
        type: 'uint256'
      }
    ],
    name: 'LogFillVaultAvailability',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'iTokenAmount',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'route',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'deleverageWethAmount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'withdrawStETHAmount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'userNetDeposit',
        type: 'uint256'
      }
    ],
    name: 'LogImportV1ETHVault',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint8', name: 'protocol', type: 'uint8' },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'route',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'wstETHflashAmt',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'ethAmountBorrow',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'vaults',
        type: 'address[]'
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'vaultAmts',
        type: 'uint256[]'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'swapMode',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'unitAmt',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'vaultSwapAmt',
        type: 'uint256'
      }
    ],
    name: 'LogLeverage',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint8',
        name: 'protocolFrom',
        type: 'uint8'
      },
      {
        indexed: true,
        internalType: 'uint8',
        name: 'protocolTo',
        type: 'uint8'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'route',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'wstETHflashAmount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'wETHBorrowAmount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'withdrawAmount',
        type: 'uint256'
      }
    ],
    name: 'LogRefinance',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'oldAggrMaxVaultRatio',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'aggrMaxVaultRatio',
        type: 'uint256'
      }
    ],
    name: 'LogUpdateAggrMaxVaultRatio',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'exchangePriceBefore',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'exchangePriceAfter',
        type: 'uint256'
      }
    ],
    name: 'LogUpdateExchangePrice',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'revenueFeePercentage',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'withdrawalFeePercentage',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'withdrawFeeAbsoluteMin',
        type: 'uint256'
      }
    ],
    name: 'LogUpdateFees',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'oldLimit',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'newLimit',
        type: 'uint256'
      }
    ],
    name: 'LogUpdateLeverageMaxUnitAmountLimit',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint8',
        name: 'protocolId',
        type: 'uint8'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newRiskRatio',
        type: 'uint256'
      }
    ],
    name: 'LogUpdateMaxRiskRatio',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'rebalancer',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'bool',
        name: 'isRebalancer',
        type: 'bool'
      }
    ],
    name: 'LogUpdateRebalancer',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'oldSecondaryAuth',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'secondaryAuth',
        type: 'address'
      }
    ],
    name: 'LogUpdateSecondaryAuth',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'oldTreasury',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newTreasury',
        type: 'address'
      }
    ],
    name: 'LogUpdateTreasury',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint8', name: 'protocol', type: 'uint8' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'depositAmount',
        type: 'uint256'
      }
    ],
    name: 'LogVaultToProtocolDeposit',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'wethAmount',
        type: 'uint256'
      }
    ],
    name: 'LogWethSweep',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'payer',
        type: 'address'
      },
      { indexed: true, internalType: 'uint256', name: 'fee', type: 'uint256' }
    ],
    name: 'LogWithdrawFeeCollected',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256'
      }
    ],
    name: 'Withdraw',
    type: 'event'
  },
  {
    inputs: [{ internalType: 'address', name: 'auth_', type: 'address' }],
    name: 'addDSAAuth',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'aggrMaxVaultRatio',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'asset',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint8', name: 'status_', type: 'uint8' }],
    name: 'changeVaultStatus',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amount_', type: 'uint256' }],
    name: 'collectRevenue',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'shares', type: 'uint256' }],
    name: 'convertToAssets',
    outputs: [{ internalType: 'uint256', name: 'assets', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'assets', type: 'uint256' }],
    name: 'convertToShares',
    outputs: [{ internalType: 'uint256', name: 'shares', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'subtractedValue', type: 'uint256' }
    ],
    name: 'decreaseAllowance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'assets_', type: 'uint256' },
      { internalType: 'address', name: 'receiver_', type: 'address' }
    ],
    name: 'deposit',
    outputs: [{ internalType: 'uint256', name: 'shares_', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'exchangePrice',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint8', name: 'protocolId_', type: 'uint8' },
      { internalType: 'uint256', name: 'withdrawAmount_', type: 'uint256' }
    ],
    name: 'fillVaultAvailability',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getNetAssets',
    outputs: [
      { internalType: 'uint256', name: 'totalAssets_', type: 'uint256' },
      { internalType: 'uint256', name: 'totalDebt_', type: 'uint256' },
      { internalType: 'uint256', name: 'netAssets_', type: 'uint256' },
      { internalType: 'uint256', name: 'aggregatedRatio_', type: 'uint256' },
      {
        components: [
          {
            components: [
              { internalType: 'uint256', name: 'stETH', type: 'uint256' },
              { internalType: 'uint256', name: 'wETH', type: 'uint256' }
            ],
            internalType: 'struct IHelpersRead.ProtocolAssetsInStETH',
            name: 'aaveV2',
            type: 'tuple'
          },
          {
            components: [
              { internalType: 'uint256', name: 'wstETH', type: 'uint256' },
              { internalType: 'uint256', name: 'wETH', type: 'uint256' }
            ],
            internalType: 'struct IHelpersRead.ProtocolAssetsInWstETH',
            name: 'aaveV3',
            type: 'tuple'
          },
          {
            components: [
              { internalType: 'uint256', name: 'wstETH', type: 'uint256' },
              { internalType: 'uint256', name: 'wETH', type: 'uint256' }
            ],
            internalType: 'struct IHelpersRead.ProtocolAssetsInWstETH',
            name: 'compoundV3',
            type: 'tuple'
          },
          {
            components: [
              { internalType: 'uint256', name: 'wstETH', type: 'uint256' },
              { internalType: 'uint256', name: 'wETH', type: 'uint256' }
            ],
            internalType: 'struct IHelpersRead.ProtocolAssetsInWstETH',
            name: 'euler',
            type: 'tuple'
          },
          {
            components: [
              { internalType: 'uint256', name: 'stETH', type: 'uint256' },
              { internalType: 'uint256', name: 'wETH', type: 'uint256' }
            ],
            internalType: 'struct IHelpersRead.ProtocolAssetsInStETH',
            name: 'morphoAaveV2',
            type: 'tuple'
          },
          {
            components: [
              { internalType: 'uint256', name: 'stETH', type: 'uint256' },
              { internalType: 'uint256', name: 'wstETH', type: 'uint256' },
              { internalType: 'uint256', name: 'wETH', type: 'uint256' }
            ],
            internalType: 'struct IHelpersRead.IdealBalances',
            name: 'vaultBalances',
            type: 'tuple'
          },
          {
            components: [
              { internalType: 'uint256', name: 'stETH', type: 'uint256' },
              { internalType: 'uint256', name: 'wstETH', type: 'uint256' },
              { internalType: 'uint256', name: 'wETH', type: 'uint256' }
            ],
            internalType: 'struct IHelpersRead.IdealBalances',
            name: 'dsaBalances',
            type: 'tuple'
          }
        ],
        internalType: 'struct IHelpersRead.NetAssetsHelper',
        name: 'assets_',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint8', name: 'protocolId_', type: 'uint8' }],
    name: 'getProtocolRatio',
    outputs: [{ internalType: 'uint256', name: 'ratio_', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getRatioAaveV2',
    outputs: [
      { internalType: 'uint256', name: 'stEthAmount_', type: 'uint256' },
      { internalType: 'uint256', name: 'ethAmount_', type: 'uint256' },
      { internalType: 'uint256', name: 'ratio_', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'stEthPerWsteth_', type: 'uint256' }
    ],
    name: 'getRatioAaveV3',
    outputs: [
      { internalType: 'uint256', name: 'wstEthAmount_', type: 'uint256' },
      { internalType: 'uint256', name: 'stEthAmount_', type: 'uint256' },
      { internalType: 'uint256', name: 'ethAmount_', type: 'uint256' },
      { internalType: 'uint256', name: 'ratio_', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'stEthPerWsteth_', type: 'uint256' }
    ],
    name: 'getRatioCompoundV3',
    outputs: [
      { internalType: 'uint256', name: 'wstEthAmount_', type: 'uint256' },
      { internalType: 'uint256', name: 'stEthAmount_', type: 'uint256' },
      { internalType: 'uint256', name: 'ethAmount_', type: 'uint256' },
      { internalType: 'uint256', name: 'ratio_', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'stEthPerWsteth_', type: 'uint256' }
    ],
    name: 'getRatioEuler',
    outputs: [
      { internalType: 'uint256', name: 'wstEthAmount_', type: 'uint256' },
      { internalType: 'uint256', name: 'stEthAmount_', type: 'uint256' },
      { internalType: 'uint256', name: 'ethAmount_', type: 'uint256' },
      { internalType: 'uint256', name: 'ratio_', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getRatioMorphoAaveV2',
    outputs: [
      { internalType: 'uint256', name: 'stEthAmount_', type: 'uint256' },
      { internalType: 'uint256', name: 'stEthAmountPool_', type: 'uint256' },
      { internalType: 'uint256', name: 'stEthAmountP2P_', type: 'uint256' },
      { internalType: 'uint256', name: 'ethAmount_', type: 'uint256' },
      { internalType: 'uint256', name: 'ethAmountPool_', type: 'uint256' },
      { internalType: 'uint256', name: 'ethAmountP2P_', type: 'uint256' },
      { internalType: 'uint256', name: 'ratio_', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'stETHAmount_', type: 'uint256' }
    ],
    name: 'getWithdrawFee',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'route_', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'deleverageWETHAmount_',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'withdrawStETHAmount_',
        type: 'uint256'
      },
      { internalType: 'address', name: 'receiver_', type: 'address' }
    ],
    name: 'importPosition',
    outputs: [{ internalType: 'uint256', name: 'shares_', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'addedValue', type: 'uint256' }
    ],
    name: 'increaseAllowance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'string', name: 'name_', type: 'string' },
      { internalType: 'string', name: 'symbol_', type: 'string' },
      { internalType: 'address', name: 'asset_', type: 'address' },
      { internalType: 'address', name: 'secondaryAuth_', type: 'address' },
      { internalType: 'address', name: 'treasury_', type: 'address' },
      { internalType: 'address[]', name: 'rebalancers_', type: 'address[]' },
      { internalType: 'uint256[]', name: 'maxRiskRatio_', type: 'uint256[]' },
      {
        internalType: 'uint256',
        name: 'withdrawalFeePercentage_',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'withdrawFeeAbsoluteMin_',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'revenueFeePercentage_',
        type: 'uint256'
      },
      { internalType: 'uint256', name: 'aggrMaxVaultRatio_', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'leverageMaxUnitAmountLimit_',
        type: 'uint256'
      }
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'isRebalancer',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint8', name: 'protocolId_', type: 'uint8' },
      { internalType: 'uint256', name: 'route_', type: 'uint256' },
      { internalType: 'uint256', name: 'wstETHflashAmount_', type: 'uint256' },
      { internalType: 'uint256', name: 'wETHBorrowAmount_', type: 'uint256' },
      { internalType: 'address[]', name: 'vaults_', type: 'address[]' },
      { internalType: 'uint256[]', name: 'vaultAmounts_', type: 'uint256[]' },
      { internalType: 'uint256', name: 'swapMode_', type: 'uint256' },
      { internalType: 'uint256', name: 'unitAmount_', type: 'uint256' },
      { internalType: 'bytes', name: 'oneInchData_', type: 'bytes' }
    ],
    name: 'leverage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'leverageMaxUnitAmountLimit',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'maxDeposit',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'maxMint',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'maxRedeem',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    name: 'maxRiskRatio',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'maxWithdraw',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'shares_', type: 'uint256' },
      { internalType: 'address', name: 'receiver_', type: 'address' }
    ],
    name: 'mint',
    outputs: [{ internalType: 'uint256', name: 'assets_', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'assets', type: 'uint256' }],
    name: 'previewDeposit',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'shares', type: 'uint256' }],
    name: 'previewMint',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'shares', type: 'uint256' }],
    name: 'previewRedeem',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'assets', type: 'uint256' }],
    name: 'previewWithdraw',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'shares_', type: 'uint256' },
      { internalType: 'address', name: 'receiver_', type: 'address' },
      { internalType: 'address', name: 'owner_', type: 'address' }
    ],
    name: 'redeem',
    outputs: [
      { internalType: 'uint256', name: 'assetsAfterFee_', type: 'uint256' }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newAggrMaxVaultRatio_',
        type: 'uint256'
      }
    ],
    name: 'reduceAggrMaxVaultRatio',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint8[]', name: 'protocolId_', type: 'uint8[]' },
      { internalType: 'uint256[]', name: 'newRiskRatio_', type: 'uint256[]' }
    ],
    name: 'reduceMaxRiskRatio',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint8', name: 'fromProtocolId_', type: 'uint8' },
      { internalType: 'uint8', name: 'toProtocolId_', type: 'uint8' },
      { internalType: 'uint256', name: 'route_', type: 'uint256' },
      { internalType: 'uint256', name: 'wstETHflashAmount_', type: 'uint256' },
      { internalType: 'uint256', name: 'wETHBorrowAmount_', type: 'uint256' },
      { internalType: 'uint256', name: 'withdrawAmount_', type: 'uint256' }
    ],
    name: 'refinance',
    outputs: [
      { internalType: 'uint256', name: 'ratioFromProtocol_', type: 'uint256' },
      { internalType: 'uint256', name: 'ratioToProtocol_', type: 'uint256' }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'revenue',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'revenueExchangePrice',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'revenueFeePercentage',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'secondaryAuth',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'to_', type: 'address' },
      { internalType: 'bytes', name: 'calldata_', type: 'bytes' },
      { internalType: 'uint256', name: 'value_', type: 'uint256' },
      { internalType: 'uint256', name: 'operation_', type: 'uint256' }
    ],
    name: 'spell',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'sweepEthToSteth',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'sweepWethToSteth',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalAssets',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'treasury',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newAggrMaxVaultRatio_',
        type: 'uint256'
      }
    ],
    name: 'updateAggrMaxVaultRatio',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'updateExchangePrice',
    outputs: [
      { internalType: 'uint256', name: 'newExchangePrice_', type: 'uint256' },
      { internalType: 'uint256', name: 'newRevenue_', type: 'uint256' }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'revenueFeePercent_', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'withdrawalFeePercent_',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'withdrawFeeAbsoluteMin_',
        type: 'uint256'
      }
    ],
    name: 'updateFees',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'newLimit_', type: 'uint256' }],
    name: 'updateLeverageMaxUnitAmountLimit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint8[]', name: 'protocolId_', type: 'uint8[]' },
      { internalType: 'uint256[]', name: 'newRiskRatio_', type: 'uint256[]' }
    ],
    name: 'updateMaxRiskRatio',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'rebalancer_', type: 'address' },
      { internalType: 'bool', name: 'isRebalancer_', type: 'bool' }
    ],
    name: 'updateRebalancer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'secondaryAuth_', type: 'address' }
    ],
    name: 'updateSecondaryAuth',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'newTreasury_', type: 'address' }
    ],
    name: 'updateTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'vaultDSA',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint8', name: 'protocolId_', type: 'uint8' },
      { internalType: 'uint256', name: 'depositAmount_', type: 'uint256' }
    ],
    name: 'vaultToProtocolDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'assets_', type: 'uint256' },
      { internalType: 'address', name: 'receiver_', type: 'address' },
      { internalType: 'address', name: 'owner_', type: 'address' }
    ],
    name: 'withdraw',
    outputs: [{ internalType: 'uint256', name: 'shares_', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'withdrawFeeAbsoluteMin',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'withdrawalFeePercentage',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  { stateMutability: 'payable', type: 'receive' }
]
