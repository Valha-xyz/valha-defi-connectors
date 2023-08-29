 export const ROUTERABI = [
    {
      "inputs": [
        {
          "internalType": "contract IWETH",
          "name": "_weth",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "contract IArrakisVaultV1",
          "name": "pool",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount0Max",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1Max",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount0Min",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1Min",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountSharesMin",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "addLiquidity",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "mintAmount",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract IGauge",
          "name": "gauge",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount0Max",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1Max",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount0Min",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1Min",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountSharesMin",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "addLiquidityAndStake",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "mintAmount",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract IArrakisVaultV1",
          "name": "pool",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount0Max",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1Max",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount0Min",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1Min",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountSharesMin",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "addLiquidityETH",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "mintAmount",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract IGauge",
          "name": "gauge",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount0Max",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1Max",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount0Min",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1Min",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountSharesMin",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "addLiquidityETHAndStake",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "mintAmount",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract IArrakisVaultV1",
          "name": "pool",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "burnAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount0Min",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1Min",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "removeLiquidity",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        },
        {
          "internalType": "uint128",
          "name": "liquidityBurned",
          "type": "uint128"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract IGauge",
          "name": "gauge",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "burnAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount0Min",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1Min",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "removeLiquidityAndUnstake",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        },
        {
          "internalType": "uint128",
          "name": "liquidityBurned",
          "type": "uint128"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract IArrakisVaultV1",
          "name": "pool",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "burnAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount0Min",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1Min",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "removeLiquidityETH",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        },
        {
          "internalType": "uint128",
          "name": "liquidityBurned",
          "type": "uint128"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract IGauge",
          "name": "gauge",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "burnAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount0Min",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1Min",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "removeLiquidityETHAndUnstake",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        },
        {
          "internalType": "uint128",
          "name": "liquidityBurned",
          "type": "uint128"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unpause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "weth",
      "outputs": [
        {
          "internalType": "contract IWETH",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]