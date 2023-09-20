export const poolABI = [
    {
        "inputs":
        [
            {
                "internalType": "address",
                "name": "_token",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_locker",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_minter",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_maxTime",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs":
        [
            {
                "indexed": true,
                "internalType": "address",
                "name": "caller",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "lock",
                "type": "bool"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "stake",
                "type": "bool"
            }
        ],
        "name": "Deposited",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs":
        [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newFee",
                "type": "uint256"
            }
        ],
        "name": "FeesChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs":
        [
            {
                "indexed": true,
                "internalType": "address",
                "name": "newGovernance",
                "type": "address"
            }
        ],
        "name": "GovernanceChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs":
        [
            {
                "indexed": true,
                "internalType": "address",
                "name": "caller",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "IncentiveReceived",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs":
        [
            {
                "indexed": true,
                "internalType": "address",
                "name": "newSdToken",
                "type": "address"
            }
        ],
        "name": "SdTokenOperatorChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs":
        [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "TokenLocked",
        "type": "event"
    },
    {
        "inputs":
        [],
        "name": "FEE_DENOMINATOR",
        "outputs":
        [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs":
        [
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "_lock",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "_stake",
                "type": "bool"
            },
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "deposit",
        "outputs":
        [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs":
        [
            {
                "internalType": "bool",
                "name": "_lock",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "_stake",
                "type": "bool"
            },
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "depositAll",
        "outputs":
        [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs":
        [],
        "name": "gauge",
        "outputs":
        [
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
        "inputs":
        [],
        "name": "governance",
        "outputs":
        [
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
        "inputs":
        [],
        "name": "incentiveToken",
        "outputs":
        [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs":
        [],
        "name": "lockIncentive",
        "outputs":
        [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs":
        [],
        "name": "lockToken",
        "outputs":
        [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs":
        [],
        "name": "locker",
        "outputs":
        [
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
        "inputs":
        [],
        "name": "minter",
        "outputs":
        [
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
        "inputs":
        [],
        "name": "relock",
        "outputs":
        [
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
        "inputs":
        [
            {
                "internalType": "uint256",
                "name": "_lockIncentive",
                "type": "uint256"
            }
        ],
        "name": "setFees",
        "outputs":
        [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs":
        [
            {
                "internalType": "address",
                "name": "_gauge",
                "type": "address"
            }
        ],
        "name": "setGauge",
        "outputs":
        [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs":
        [
            {
                "internalType": "address",
                "name": "_governance",
                "type": "address"
            }
        ],
        "name": "setGovernance",
        "outputs":
        [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs":
        [
            {
                "internalType": "bool",
                "name": "_relock",
                "type": "bool"
            }
        ],
        "name": "setRelock",
        "outputs":
        [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs":
        [
            {
                "internalType": "address",
                "name": "_operator",
                "type": "address"
            }
        ],
        "name": "setSdTokenOperator",
        "outputs":
        [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs":
        [],
        "name": "token",
        "outputs":
        [
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
        "inputs":
        [],
        "name": "unlockTime",
        "outputs":
        [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
] as const;