import * as React from 'react';
import { createContext, useState, useEffect} from 'react';
import { dtc } from "../../declarations/dtc"
import Journal from './Components/Journal';
import {AuthClient} from "@dfinity/auth-client";

export const AppContext = createContext({});


const App = () => {
    const [greeting, setGreeting] = useState("");
    const [pending, setPending] = useState(false);
    const [authClient, setAuthClient] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        AuthClient.create().then(async (client) => {
            setAuthClient(client);
            setIsAuthenticated(await client.isAuthenticated());
            setIsLoaded(true);
        });
    }, [])

    console.log(AuthClient);

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
        <AppContext.Provider value={{authClient}}>
            <main>
                <Journal/>
                {/* <button id="clickMeBtn" type="submit" disabled={pending}>Click Me!</button> */}
            <section id="greeting">{greeting}</section>
        </main>
        </AppContext.Provider>
    )
}

export default App;