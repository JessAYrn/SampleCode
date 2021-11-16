import React, {useContext} from "react";
import { AppContext } from "../App";
import "./LoginPage.scss";


const LoginPage = (props) => {
    const { authClient, setIsAuthenticated } = useContext(AppContext);
    console.log(process.env.II_URL);

    return(

        <div>
            <div className={'loginPageDiv'}>
            <img className={'logoImg'}src="dtc-logo-black.png" alt="Logo"/>
            <button className={'loginButtonDiv'} onClick={async () => {
                (authClient) ? await authClient.login({identityProvider : process.env.II_URL}).then((res) => { 
                    console.log(res);
                }) : () => {}
                (setIsAuthenticated) ? setIsAuthenticated(true) : () => {};
            }}> Log In Using Internet Identity </button>
            </div>
        </div>
    );

}

export default LoginPage; 