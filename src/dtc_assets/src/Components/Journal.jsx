import JournalPage from "./JournalPage";
import React, {useEffect, useReducer, useState } from "react";
import journalReducer, {initialState, types} from "../reducers/journalReducer";
import "./Journal.scss";



const Journal = (props) => {

    const [journalState, dispatch] = useReducer(journalReducer, initialState);
    const [pageIsVisibleArray, setPageIsVisibleArray] = useState(journalState.journal.map((page) => false));
    const [newPageAdded, setNewPageAdded] = useState(false);

    useEffect(() => {
        console.log(journalState.journal);
        console.log(pageIsVisibleArray);
        setPageIsVisibleArray(journalState.journal.map((page, index) => { 

            if((index === journalState.journal.length -1) && newPageAdded){
                setNewPageAdded(false);
                return true;
            } else {
                return false;
            }
        }));
    },[journalState.journal.length])

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

        const addJournalPage = () => {
            dispatch({
                actionType: types.ADD_JOURNAL_PAGE
            });
            setNewPageAdded(true);
            openPage(null, journalState.journal.length - 1);
        }

        return(
            <div>
                <img src="dtc-logo-black.png" alt="TDTC logo" />
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
                <div className={'addNewEntryButtonDiv'}>
                    <button className={'addNewEntryButton'} onClick={addJournalPage}> Create New Entry </button>
                </div>
            </div>
        );
    };

    const getIndexOfVisiblePage = () => {
        return pageIsVisibleArray.findIndex(page => page === true);
    }
    const closePage = (e, index) => {
        setPageIsVisibleArray(pageIsVisibleArray.map((page, mapIndex) => {
                return false;
        }))
    };

    return(
        <div>
            { (getIndexOfVisiblePage() < 0) ? 
                displayJournalTable() : 
                <JournalPage
                closePage={closePage}
                index={getIndexOfVisiblePage()}
                journalPageData={journalState.journal[getIndexOfVisiblePage()]}
                journalReducerDispatchFunction={dispatch}
            /> }
            
            
            
        </div>
    )

}

export default Journal;