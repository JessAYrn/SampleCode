import JournalPage from "./JournalPage";
import React, {useEffect, useReducer, useState } from "react";
import journalReducer, {initialState} from "../reducers/journalReducer";
import "./Journal.scss";



const Journal = (props) => {

    const [journalState, dispatch] = useReducer(journalReducer, initialState );

    useEffect(() => {
        console.log(journalState.journal);
    },[journalState])

    const displayJournalTable = () => {

        const highlightRow = (index) => {
            console.log("it works");
        };

        const lowlightRow = (index) => {
            console.log("it really works");
        };


        return(
            <table className={"table"}>
            { journalState.journal.map((page, index) => {
                return(
                    <tr className={"tableRow__"+index} onMouseOver={highlightRow(index)} onMouseLeave={lowlightRow(index)}>
                        <td>{page.date}</td>
                        <td>{page.location}</td>
                        <td>{page.lockTime}</td>
                    </tr>  
                );
            }) }
            </table>
        );
    };

    return(
        <div>
            {displayJournalTable()}
            <JournalPage
                index={0}
                dispatch={dispatch}
                journalPageState={journalState.journal[0]}
            />
        </div>
    )

}

export default Journal;