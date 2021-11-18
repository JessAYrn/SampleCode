import * as React from 'react';
import { createContext, useState, useEffect} from 'react';
import { dtc } from "../../declarations/dtc"
import Journal from './Components/Journal';
import {AuthClient} from "@dfinity/auth-client";
import LoginPage from './Components/LoginPage';
import { canisterId, createActor } from '../../declarations/dtc/index';

export const AppContext = createContext({
    authClient: {}, 
    setIsAuthenticated: null,
    actor: undefined});

    console.log("Nothing");


const App = () => {
    const [actor, setActor] = useState(undefined);
    const [greeting, setGreeting] = useState("");
    const [pending, setPending] = useState(false);
    const [authClient, setAuthClient] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(false);

    // login function used when Authenticating the client (aka user)
    useEffect(() => {
        AuthClient.create().then(async (client) => {
            setIsAuthenticated(await client.isAuthenticated());
            setAuthClient(client);
            setIsLoaded(true);
        });
    }, [isLoaded])

    //Creating the canisterActor that enables us to be able to call the functions defined on the backend
    useEffect(() => {
        if(!authClient) return;

        const identity = authClient.getIdentity();
        const actor = createActor(canisterId, {
            agentOptions: {
                identity
            }
        });
        setActor(actor);

    }, [authClient]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (pending) return;
        setPending(true);
        const name = inputRef.current.value.toString();
        const userName = {userName: name};
        const entryKey = {entryKey: 1};
        const entry = { 
            date : name,
            text : name,
            location : name,    
        };

        // Interact with hello actor, calling the greet method
        const greeting = await dtc.updateJournal([], [entry]);
        let msg;
        if(greeting.ok === null){
            msg = "Journal Created";
        } else {
            msg = "Journal Already Exists"
        };
        setGreeting(msg);
        setPending(false);
        return false;
    }

    return (
        <AppContext.Provider value={{authClient, setAuthClient, setIsAuthenticated, actor, setActor, setIsLoaded}}>
            {console.log(isAuthenticated, isLoaded)}

            {
                !!isLoaded &&
                    isAuthenticated ? 
                    <main>
                        <Journal/>
                        <section id="greeting">{greeting}</section>
                    </main> : <LoginPage/> 
            }
            {
                !isLoaded && 
                    <h2> Load Screen </h2>
            }

        </AppContext.Provider>
    )
}

export default App;