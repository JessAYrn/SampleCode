import JournalPage from "./JournalPage";
import React, {useEffect, useReducer } from "react";
import journalReducer, {initialState} from "../reducers/journalReducer";



const Journal = (props) => {

    const [journalState, dispatch] = useReducer(journalReducer, initialState );

    useEffect(() => {
        console.log(journalState.journal);
    },[journalState])


    return(
        <JournalPage
            index={0}
            dispatch={dispatch}
            journalState={journalState}
        />
    )

}

export default Journal;