import React, {useContext} from "react";
import { AppContext } from "../App";
import "./LoginPage.scss";


const LoginPage = (props) => {
    const {    
            authClient, 
            setIsLoaded, 
            loginAttempted, 
            setLoginAttempted, 
            actor,
            isAuthenticated
        } = useContext(AppContext);

        const handleClick = async () => {

            setIsLoaded(false);

            if(loginAttempted){
                actor.readPage().then((result) => {
                    if("err" in result){
                        actor.create({userName: "JesseTheGreat"}).then((result) => {
                            if("err" in result){
                                alert("No Internet Identity Detected");
                            };
                        });
                    } else {
                        console.log(result);
                    }
                });
                
            } else {

                await authClient.login({identityProvider : process.env.II_URL});
                setLoginAttempted(!loginAttempted);
            }
        };


    return(

        <div>
            <div className={'loginPageDiv'}>
            <button className={`loginButtonDiv__${(loginAttempted) ? "open" : 'closed'}`} onClick={handleClick}> {(loginAttempted) ? 'Enter' : 'Log In Using Internet Identity'} </button>
            </div>
        </div>
    );

}

export default LoginPage; 