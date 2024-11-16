import { useRef, useState } from "react"
import {generateMnemonic, mnemonicToSeed} from "bip39"
import { useNavigate } from "react-router-dom";

export default function Createwallet(){
    const navigate = useNavigate();
    const [mnemonic, setMnemonic] = useState("");
    async function clickHandler() {
        const mn = generateMnemonic();
        console.log(mn);
        setMnemonic(mn);
        localStorage.setItem("Mnemonic", mn);
    }
    function Next(){
        navigate('/dashboard',{replace:true});
    }
    return (
        <div>
            <input type="text" className="w-5/6" value={mnemonic} readOnly={true}/>
            <button onClick={clickHandler} className={`${mnemonic==""?"bg-blue-400":"hidden"}`}>Genrate Mnemonic</button>
            <p className={`${(mnemonic=="")?"hidden":"text-green-500"}`}>Save This Phrase</p>
            <button onClick={Next} className={`${(mnemonic=="")?"hidden":"bg-blue-400"}`}>Continue</button>
        </div>
    )
} 