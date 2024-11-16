import { useRef } from "react"

export default function Importwallet(){
    const inputValue = useRef("");
    // console.log(inputValue.current.value);
    return (
        <div>
            <input type="text" placeholder="Enter Your 12 word Seed phrase" ref={inputValue}/>
            <button onClick={submit}>Submit</button>
        </div>
    )
} 