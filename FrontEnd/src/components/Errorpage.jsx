import {useRouteError} from "react-router-dom"
export default function Errorpage(){
    const error = useRouteError();
    console.error();
    return (
        <div>
            Error
            <p>{error.message || error.statusText}</p>
        </div>
    )
} 