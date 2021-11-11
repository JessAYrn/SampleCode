import JournalPage from "./JournalPage";
import React, {useEffect, useReducer, useState } from "react";
import journalReducer, {initialState} from "../reducers/journalReducer";
import "./Journal.scss";



const Journal = (props) => {

    const [journalState, dispatch] = useReducer(journalReducer, initialState);
    const [pageIsVisibleArray, setPageIsVisibleArray] = useState(journalState.journal.map((page) => false));

    useEffect(() => {
        console.log(journalState.journal);
        console.log(pageIsVisibleArray);
    },[journalState])

    const displayJournalTable = () => {

        const openPage = (e, index) => {
            setPageIsVisibleArray(pageIsVisibleArray.map((page, mapIndex) => {
                console.log(index, ' and ',mapIndex)
                if(index === mapIndex){
                    return true;
                } else {
                    return false;
                }
            }))
        };


        return(
            <table className={"table"}>
            { journalState.journal.map((page, index) => {
                return(
                    <tr className={"tableRow "+index}>
                        <td className={"tableCell "+index}>{page.date}</td>
                        <td className={"tableCell "+index}>{page.location}</td>
                        <td className={"tableCell "+index}>{page.lockTime}</td>
                        <td className={"tableCell "+index}> <button onClick={(e) => openPage(e, index)}> open </button> </td>
                    </tr>  
                );
            }) }
            </table>
        );
    };

    const getIndexOfVisiblePage = () => {
        return pageIsVisibleArray.findIndex(page => page === true);
    }

    return(
        <div>
            {console.log(getIndexOfVisiblePage())}
            { (getIndexOfVisiblePage() < 0) ? 
                displayJournalTable() : 
                <JournalPage
                index={getIndexOfVisiblePage()}
                journalPageData={journalState.journal[getIndexOfVisiblePage()]}
                journalReducerDispatchFunction={dispatch}
            /> }
            
            
            
        </div>
    )

}

export default Journal;