import { DisplayWallets } from "./Dashboard";
import { NoAccount } from "./Dashboard";

export default function Sidebar({setCreateWallet ,RemoveWallet, wallets, setCopied, navigate}){
    function newAccount(){
        setCreateWallet(true); 
    }
    return (
        <div className="fixed left-0 w-1/6 h-screen">
            <div className="bottom-0 absolute h-5/6 w-full">
                <div className="absolute top-0 p-2 space-y-2 overflow-y-scroll h-5/6">
                {
                    (wallets.length == 0)?<NoAccount/>:<DisplayWallets setCopied={setCopied} wallets={wallets} navigate={navigate}/>
                }  
                </div>
                <div className="w-full absolute bottom-0 py-2 flex justify-center items-center bg-white">
                    <div className="space-y-4 py-2 w-5/6">
                        <button onClick={newAccount} className="transition-all inline-flex justify-center bg-blue-500 p-2 rounded-full w-full px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600">New Account</button>
                        <button onClick={RemoveWallet} className="transition-all inline-flex justify-center bg-red-500 p-2 rounded-full w-full px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600">Remove Wallet</button>
                    </div>
                </div>
            </div>
        </div>
    )
}