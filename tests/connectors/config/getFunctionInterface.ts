import { Interface } from "ethers/lib/utils";


export function getFunctionInterface(abi:any, func: string){
	const abiInterface = new Interface(abi);
    const functionInterface = abiInterface.getFunction(func);
    return functionInterface;
}