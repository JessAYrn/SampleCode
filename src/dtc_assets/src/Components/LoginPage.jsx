import React, {useContext} from "react";
import { AppContext } from "../App";
import "./LoginPage.scss";


const LoginPage = (props) => {
    const { authClient, setIsLoaded, loginAttempted, setLoginAttempted } = useContext(AppContext);

    return(

        <div>
            <div className={'loginPageDiv'}>
            <img className={'logoImg'}src="dtc-logo-black.png" alt="Logo"/>
            <button className={`loginButtonDiv__${(loginAttempted) ? "open" : 'closed'}`} onClick={async () => {
                setLoginAttempted(!loginAttempted);
                setIsLoaded(false);
                if(loginAttempted){
                    location.reload();
                } else {
                    await authClient.login({identityProvider : process.env.II_URL});
                }
            }}> {(loginAttempted) ? 'Open Journal' : 'Log In Using Internet Identity'} </button>
            </div>
        </div>
    );

}

export default LoginPage; 