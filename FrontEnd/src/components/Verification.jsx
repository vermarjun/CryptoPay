import axios from "axios"
import { useRef, useState } from "react"
import {API_URL} from "../main.jsx"
import { useNavigate } from "react-router-dom"


function Verification(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(false);
    const dropDownOptions = [
        {label:"5 Minutes", value:1},
        {label:"10 Minutes", value:2},
        {label:"30 Minutes", value:3},
        {label:"Never", value:4},
    ]
    const Password = useRef("");
    async function click(){
        if (Password.current.value == "") Password.current.focus();
        else {
            setLoading(true);
            const token = localStorage.getItem("accessToken");
            let response;
            if (token){
                response = await axios.post(`${API_URL}/signin`, {
                    password: Password.current.value,
                    token:localStorage.getItem("accessToken"),
                })
            } else {
                response = await axios.post(`${API_URL}/signup`, {
                    password: Password.current.value
                })
            }
            setLoading(false);
            if (response.data.accessToken == "invalid"){
                setErr(true);
            } else {
                localStorage.setItem("accessToken", response.data.accessToken);
                // if seed phrase exists in local storage 
                const seed = localStorage.getItem("Mnemonic");
                if (seed){
                    // then redirect to DASHBOARD
                    navigate("/dashboard", {replace:true});
                } else {
                    // else redirect to Setupwallet 
                    navigate("/setupwallet", {replace:true});
                }
            }
        }
    }
    function handleSelect(event){
        console.log(dropDownOptions[event.target.value-1].label);
        localStorage.setItem("InactivityTimer", dropDownOptions[event.target.value-1].label);
    }
    return (
        <div className="w-screen h-screen">
            <input type="password" ref={Password} className="border-4" placeholder="Enter Password"/>
            <p className={`${!err?"hidden":"text-red-600"}`}>Wrong Password</p>
            <button className={`${loading?"animate-ping":"animate-none"} bg-blue-400`} onClick={click}>Enter</button>
            <select onChange={handleSelect}>
                {
                    dropDownOptions.map((option, index)=>{
                        return <option key={index} value={option.value}>{option.label}</option>
                    })
                }
            </select>
        </div>
    )
}

export default Verification;