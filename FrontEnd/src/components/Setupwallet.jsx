import { useNavigate } from "react-router-dom" 

function Setupwallet(){
    const navigate = useNavigate();
    function Create(){
        navigate('/createwallet',{replace:true});
    }
    function Import(){
        navigate('/importwallet',{replace:true});
    }
    return (
        <div>
            <p>YOU DONT HAVE ANY WALLET GENERATE A WALLET, You can either create new wallet or import an existing wallet using your secret phrase</p>
            <button onClick={Create} className="bg-blue-400 p-2 m-2">Create Wallet</button>
            <button onClick={Import} className="bg-blue-400 p-2">Import Wallet</button>
        </div>
    )
}

export default Setupwallet;