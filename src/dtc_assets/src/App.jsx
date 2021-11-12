import * as React from 'react';
import { dtc } from "../../declarations/dtc"
import Journal from './Components/Journal';

const App = () => {
    const [greeting, setGreeting] = React.useState("");
    const [pending, setPending] = React.useState(false);

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
        <main>
            <img src="dtc-logo-black.png" alt="TDTC logo" />
                <Journal/>
                {/* <button id="clickMeBtn" type="submit" disabled={pending}>Click Me!</button> */}
            <section id="greeting">{greeting}</section>
        </main>
    )
}

export default App;