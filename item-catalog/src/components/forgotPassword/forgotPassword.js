import { useEffect } from "react"
import "./forgotPassword.css"

const ForgotPassword = (props) => {

    useEffect(
        () => {
            document.title = props.title
        },
    [props])

    return (<></>)
}

export default ForgotPassword