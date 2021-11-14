import React, {useContext} from "react";
import { AppContext } from "../App";
import "./LoginPage.scss";


const LoginPage = (props) => {
    const { authClient } = useContext(AppContext);

    return(

        <div>
            <div className={'loginPageDiv'}>
            <img className={'logoImg'}src="dtc-logo-black.png" alt="Logo"/>
            <button className={'loginButtonDiv'} onClick={async () => {
                (authClient) ? await authClient.login() : () => {}
            }}> Log In Using Internet Identity </button>
            </div>
        </div>
    );

}

export default LoginPage; 