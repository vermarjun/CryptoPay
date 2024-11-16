import { useEffect, useState } from "react";
import { mnemonicToSeed } from "bip39";
import {derivePath} from "ed25519-hd-key"
import nacl from "tweetnacl"
import {Keypair} from "@solana/web3.js"
import {Wallet, HDNodeWallet} from "ethers"
import bs58 from "bs58";
import { Outlet, useNavigate } from "react-router-dom";
import sol from "/sol.png"
import eth from "/eth.png"
import { useRef } from "react";
import {motion} from "framer-motion"
import Sidebar from "./Sidebar";
import Header from "./Header";

export function DisplayWallets({wallets, setCopied, navigate}){
    function clicked(accountNumber){
        navigate(`wallet/${accountNumber}`);
    }
    return (
        <>
            {
                wallets.map((w, index)=>{
                    return(
                        <div onClick={()=>clicked(index+1)} key={index} className="hover:cursor-pointer hover:shadow-lg transition-all hover:shadow-gray-400 p-4 shadow-lg mb-4 border-gray-200 rounded-xl">
                            {/* <div className="w-full border border-gray-700"></div> */}
                            <p className="font-medium text-lg mb-3">{w.accountName}</p>
                            <input onClick={() => {navigator.clipboard.writeText(w.publicKey); setCopied(true); const timer = setTimeout(()=>{setCopied(false); clearTimeout(timer)}, 2000)}} type="text" readOnly={true} value={w.publicKey.slice(0,6)+"***********"+w.publicKey.slice(-6)} className="bg-gray-200 p-1 pl-2 rounded-lg" />
                            {/* <input onClick={() => {navigator.clipboard.writeText(w.privateKey)}} readOnly={true} className=" rounded-lg p-1 mt-2" type="password" value={w.privateKey}/> */}
                        </div> 
                    )
                })
            }
        </>
    )
}

function DeleteWalletWarning({setRemoveModal, navigate}){
    function remove(){
        localStorage.removeItem("Mnemonic");
        localStorage.removeItem("ethWallets");
        localStorage.removeItem("solanaWallets");
        localStorage.removeItem("accessToken");
        setRemoveModal(false);
        navigate("/", {replace:true});
    }
    function cancel(){
        setRemoveModal(false);
    }
    return (
        <>
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                </svg>
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <h3 className="text-base font-semibold text-gray-900" id="modal-title">Remove Wallet</h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">Are you sure you want to remove your Wallet? All of your data will be removed.</p>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button onClick={remove} type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Remove</button>
                            <button onClick={cancel} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
function AddAccount({setCreateWallet, newSolanaAccount, newEthAccount}){
    const accountName = useRef("");
    const [createEth, setEth] = useState(false);
    const [createSol, setSol] = useState(false);
    const [selectBc, setSelectBc] = useState(false);
    function cancel(){
        setCreateWallet(false);
    }
    function create(){
        if (accountName.current.value==""){
            accountName.current.focus();
        }
        else if (createEth){
            newEthAccount(accountName.current.value);
            setCreateWallet(false);
        } else if (createSol){
            newSolanaAccount(accountName.current.value)
            setCreateWallet(false);
        } else {
            setSelectBc(true);
            setTimeout(()=>{
                setSelectBc(false);
            }, 2000);
        }
    }
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                <h3 className="text-base font-semibold text-gray-900" id="modal-title">Create New Account</h3>
                                <div className="mt-2">
                                    <input type="text" className="w-full p-2 rounded-lg bg-gray-100" placeholder="Account Name" ref={accountName}/>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="px-4 py-3 sm:flex justify-between sm:px-6">
                                <div>
                                    <div className="px-4 flex justify-between">
                                        <div className="w-16">
                                            <img src={sol} onClick={()=>{setEth(false), setSol(!createSol)}} alt="Solana" className={`transition-all h-20 hover:cursor-pointer py-3 border-blue-400 hover:border-b-4 ${createSol?"border-b-4":""}`}/>
                                        </div>
                                        <div className="w-16">
                                            <img src={eth} onClick={()=>{setEth(!createEth), setSol(false)}} alt="Ethereum" className={`transition-all h-20 hover:border-b-4 py-3 border-blue-400 hover:cursor-pointer ${createEth?"border-b-4":""}`}/>
                                        </div>
                                    </div>
                                    <p className={`px-4 ${selectBc?"text-red-600":"hidden"} text-sm font-semibold`}>*Select a Blockchain</p>   
                                </div>
                                <div className="flex items-center">
                                    <button onClick={cancel} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                                    <button onClick={create} className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">Create Account</button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export function NoAccount(){
    return (
        <div>
            <p>You have 0 active accounts, create one to transact in crypto</p>
        </div>
    )
}
function Herosection(){
    return (
        <div className="w-5/6 h-">

        </div>
    )
}

function Copied(){
    return(
        <motion.div 
        initial={{
            opacity: 0.5
        }}
        animate={{
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }}
        exit={{
            opacity: 0.5,
            transition: { duration: 0.5 }
        }} className="transition-all h-12 w-60 bg-black fixed right-10 bottom-10 rounded-xl flex justify-center items-center">
            <p className="text-sm font-light text-rose-50 text-center">Public Key copied to clipboard!</p>
        </motion.div>
    )
}

export function DashBoard(){
    const sw = JSON.parse(localStorage.getItem("solanaWallets")) || [];
    const ew = JSON.parse(localStorage.getItem("ethWallets")) || [];
    const [solanaWallets, setSolanaWallets] = useState(sw);
    const [ethWallets, setEthWallets] = useState(ew);
    const [removeModal, setRemoveModal] = useState(false);

    async function newSolanaAccount(accountName){
        const mnemonic = localStorage.getItem("Mnemonic");
        const seed = await mnemonicToSeed(mnemonic);
        const path = `m/44'/501'/${solanaWallets.length}'/0'`;
        const derivedSeed = derivePath(path, seed.toString('hex')).key;
        const privateKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const publicKey = Keypair.fromSecretKey(privateKey).publicKey.toBase58();
        setSolanaWallets([...solanaWallets, {"accountName":accountName,"publicKey":publicKey, "privateKey":bs58.encode(privateKey)}]);
        localStorage.setItem("solanaWallets",JSON.stringify([...solanaWallets, {"accountName":accountName,"publicKey": publicKey, "privateKey": bs58.encode(privateKey)}]));
    }    
    async function newEthAccount(accountName){
        const mnemonic = localStorage.getItem("Mnemonic");
        const seed = await mnemonicToSeed(mnemonic);
        const path = `m/44'/60'/${ethWallets.length}'/0'`;
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(path);
        const privateKey = child.privateKey;
        const wallet = new Wallet(privateKey);
        const publicKey = wallet.address;
        setEthWallets([...ethWallets, {"accountName":accountName,"publicKey":publicKey, "privateKey":privateKey}]);
        localStorage.setItem("ethWallets",JSON.stringify([...ethWallets, {"accountName":accountName,"publicKey":publicKey, "privateKey":privateKey}]));
    }
    function RemoveWallet(){
        setRemoveModal(true);
    }
    const wallets = [...solanaWallets,...ethWallets];
    const [createWallet, setCreateWallet] = useState(false);
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex">
            </div>
            <Header navigate={navigate}/>
            <Sidebar navigate={navigate} setCopied={setCopied} wallets={wallets} setCreateWallet={setCreateWallet} RemoveWallet={RemoveWallet}/>
            <Outlet/>
            {
                removeModal?<DeleteWalletWarning navigate={navigate} setRemoveModal={setRemoveModal}/>:""
            }
            {
                createWallet?<AddAccount setCreateWallet={setCreateWallet} newSolanaAccount={newSolanaAccount} newEthAccount={newEthAccount}/>:""
            }
            {
                copied?<Copied/>:""
            }
        </div>    
    )
}

export default DashBoard;