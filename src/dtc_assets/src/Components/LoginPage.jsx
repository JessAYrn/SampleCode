import React, {useContext} from "react";
import { AppContext } from "../App";
import "./LoginPage.scss";


const LoginPage = (props) => {
    const { authClient, setIsLoaded } = useContext(AppContext);

    return(

        <div>
            <div className={'loginPageDiv'}>
            <img className={'logoImg'}src="dtc-logo-black.png" alt="Logo"/>
            <button className={'loginButtonDiv'} onClick={async () => {
                await authClient.login({identityProvider : process.env.II_URL});
                setIsLoaded(false);
            }}> Log In Using Internet Identity </button>
            </div>
        </div>
    );

}

export default LoginPage; 