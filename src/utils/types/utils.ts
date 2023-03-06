export interface AssetInfo {
  position_token: string | string[] | null // token needed to approve
  position_token_type: 'ERC-20' | 'ERC-721' | 'CUSTOM' | null // token type to approve
  // amount that will be use in the ERC20 approve tx of the position token if it is an ERC20
  // Or that will be passed as msg.value if the position_token is 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE
  amount?: string | string[] | null
  approval_address?: string | string[] | null // address to approve to execute the interaction
}

export interface TxInfo {
  abi: any // JSON file that represent a contract ABI
  interaction_address: string | string[] // contract to interact with to interact with poolAddress
  method_name: string // method to interact with the pool
  args: any[] // arguments to pass to the smart contracts to trigger 'method_name',
  amountPositions?: number[]
}
