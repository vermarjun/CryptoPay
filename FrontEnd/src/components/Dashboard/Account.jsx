import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { useAsyncError, useParams } from "react-router-dom";
export default function Account(){
    const walletId = useParams().walletId-1;
    const [accountName, setAccountName] = useState("Account Name");
    const [balance, setBalance] = useState('0.00');
    async function getEthBalace(address) {
        const response = await axios.post(import.meta.env.VITE_ALCHEMY_RPC_URL,
            {
                "jsonrpc": "2.0",
                "id": 1,
                "method": "eth_getBalance",
                "params": [address, "latest"]
            },
            {
            headers: {
                "Content-Type": "application/json",
            }
            }
        );
        if (response.data) {
            const hexValue = response.data.result;
            let decimalValue = BigInt(hexValue).toString(10);
            decimalValue /= 1e18;
            if (decimalValue != 0) {
                const formattedNumber = parseFloat(decimalValue).toFixed(4);
            }
            (decimalValue == 0)?setBalance('0.00'):setBalance(JSON.stringify(decimalValue));
        }
    }
    async function getSolBalance(address) {
        setBalance("Solana Balance");
    }
    useEffect(()=>{
        const sw = JSON.parse(localStorage.getItem("solanaWallets")) || [];
        const ew = JSON.parse(localStorage.getItem("ethWallets")) || [];
        const wallets = [...sw,...ew];
        setAccountName(wallets[walletId].accountName);
        const address = wallets[walletId].publicKey;
        (address.slice(0,2) == "0x")?getEthBalace(address):getSolBalance(address);
    }, [walletId])
    return (
        <div className="fixed right-0 pl-10 bottom-0 w-5/6 h-5/6 -z-50">
            <div className="gap-2 fixed right-10 w-fit p-2 rounded-lg bg-gray-300 flex justify-center items-center">
                <p className="text-neutral-800 text-base font-semibold">
                    {accountName}
                </p>
            </div>
            <div className="w-full h-full">
                <div className="w-full h-3/6 flex justify-center">
                <div className="w-3/6">
                    <div className="w-full h-full flex justify-center items-center">
                    <div className="space-y-5">
                        <span className="text-9xl font-sans font-semibold text-center">{balance}</span>
                        <span className="pl-2 text-8xl font-sans font-semibold text-center">$</span>
                        <div className="flex justify-center items-center gap-2">
                            <span className="text-center text-green-600 font-semibold text-sm"></span>
                            <span className="text-center text-green-600 font-semibold text-sm">+₹0.00</span>
                            <div className="h-7 w-12 bg-green-600 rounded-lg flex justify-center items-center">
                                <p className="text-sm font-semibold text-white">+0%</p>
                            </div>
                        </div>
                                <button className="w-full bg-gray-300 px-2 py-1 rounded-full transition-all hover:bg-gray-400">Get Faucets</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}