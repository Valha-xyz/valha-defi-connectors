
import { BigNumber, ethers } from "ethers";
import { InteractionsReturnObject } from "src/utils/types/connector-types";
import functions from "./index";

const placeHolderAddress = ethers.constants.AddressZero;

const testData = {
	pool: {
        "name": "BinanceCZ - Wrapped Ether LP",
        "chain": "ethereum",
        "underlying_tokens": [
            "0xbef81556ef066ec840a540595c8d12f516b6378f",
            "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
        ],
        "pool_address": "0x0001fcbba8eb491c3ccfeddc5a5caba1a98c4c28",
        "investing_address": "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
        "staking_address": null,
        "boosting_address": null,
        "distributor_address": null,
        "rewards_tokens": null,
        "metadata": {
            "fee": "10000"
        }
    },
    amounts: {
	  amount: "4",
	  amountsDesired: ["5","6"],
	  amountsMinimum: ["0.9","0.9"]
	},
    addresses: {
	  userAddress: placeHolderAddress,
	  receiverAddress: placeHolderAddress
	},
	options: {
		deadline: 1000000000000000,
		rangeToken: "978",
		ranges: undefined,
		lockupTimestamp: undefined
	}
}


async function verifyPositionsDesired(data: InteractionsReturnObject){

	// Now we build the interaction from this data
	const contract = new ethers.Contract(data.txInfo.interaction_address, data.txInfo.abi);

	const txData = await contract.populateTransaction[data.txInfo.method_name](...data.txInfo.args);


	// We assert the amountPositions is right
	console.log(txData.data)
	const amountPositionsGood = data.txInfo.amountPositions.map((position, i)=> {
		const amount = txData.data.slice(10 + position*64,10 + (position + 1)*64)
		const inputAmount = ethers.utils.parseEther(testData.amounts.amountsDesired[i])
		console.log(amount, inputAmount.toString())
		return BigNumber.from(ethers.utils.stripZeros(`0x${amount}`)).eq(inputAmount)
	})
	console.log("All elements should be true if the positions are good", amountPositionsGood)
}

async function verifyPositionsAmount(data: InteractionsReturnObject){

	// Now we build the interaction from this data
	const contract = new ethers.Contract(data.txInfo.interaction_address, data.txInfo.abi);

	const txData = await contract.populateTransaction[data.txInfo.method_name](...data.txInfo.args);


	// We assert the amountPositions is right
	const amount = txData.data.slice(10 + data.txInfo.amountPositions[0]*64,10 + (data.txInfo.amountPositions[0] + 1)*64)

	// For uniswap, the pool address has 0 decimals
	const inputAmount = testData.amounts.amount
	const amountPositionsGood = BigNumber.from(ethers.utils.stripZeros(`0x${amount}`)).eq(inputAmount)
	console.log(txData.data)
	console.log("All elements should be true if the positions are good", [amountPositionsGood])
}

async function main(){

	functions.initialize(testData.pool, testData.amounts, testData.addresses, testData.options)
		.then(data=> verifyPositionsDesired(data))

	functions.redeem(testData.pool, testData.amounts, testData.addresses, testData.options)
		.then(data=> verifyPositionsAmount(data))

	functions.deposit(testData.pool, testData.amounts, testData.addresses, testData.options)
		.then(data=> verifyPositionsDesired(data))

	functions.claim_rewards(testData.pool, testData.amounts, testData.addresses, testData.options)
		.then(data=> verifyPositionsDesired(data))
}

main();