import logo from "/logo.png"
import qr from "/qr.png"
import send from "/send.png"

export default function Header({navigate}){
    return (
        <div className="h-24 w-full bg-neutral-900 fixed flex justify-between items-center p-10">
            <div className="flex items-center space-x-2">
                <img src={logo} alt="" />
                <p className="text-3xl text-gray-200 font-bold font-mono">CryptoPay</p>
            </div>
            {/* <div> */}
                <div className="flex justify-center gap-10 items-center">
                    <button className="">
                        <img src={send} className="h-10" alt="" />
                        <p className="text-sm text-white font-semibold">Send</p>
                    </button>
                    <button className="">
                        <img src={qr} className="ml-1 h-10" alt="" />
                        <p className="text-sm text-white font-semibold">Recieve</p>
                    </button>
                <button onClick={()=>navigate("/", {replace:true})} className="transition-all inline-flex justify-center bg-red-600 p-2 rounded-full px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500">Logout</button>
                </div>
            {/* </div> */}
        </div>
    )
}
