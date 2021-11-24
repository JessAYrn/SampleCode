import React, {useReducer, useContext, useEffect} from "react";
import FileUpload from "./Fields/FileUpload";
import InputBox from "./Fields/InputBox";
import Slider from "./Fields/Slider";
import {types} from "../reducers/journalReducer";
import  {AppContext} from "../App";
import "./JournalPage.scss";


const JournalPage = (props) => {

    const {
        journalReducerDispatchFunction,
        index,
        journalPageData,
        closePage
    } = props;

    const { 
        actor 
    } = useContext(AppContext);

    useEffect( async () => {
        console.log('fire');
        await actor.readEntry({entryKey: 1}).then((result) => { console.log(result)});
    }, [actor]);
    

    return (
        <div className={"journalPageContainer"}>
            <div className={"logoDiv"}>
                <img className={'backButtonImg'} src="back-icon.png" alt="Back Button" onClick={(e) => closePage(e)}/>
                <img className={'logoImg'}src="dtc-logo-black.png" alt="Logo" />
            </div>
            <Slider
                min={3}
                max={120}
                dispatch={journalReducerDispatchFunction}
                dispatchAction={types.CHANGE_LOCK_TIME}
                index={index}
                value={journalPageData.lockTime}
            />
            <div className={"journalText"} >
            <InputBox
                label={"Date: "}
                rows={"1"}
                dispatch={journalReducerDispatchFunction}
                dispatchAction={types.CHANGE_DATE}
                index={index}
                value={journalPageData.date}
            />
            <InputBox
                label={"Location: "}
                rows={"1"}
                dispatch={journalReducerDispatchFunction}
                dispatchAction={types.CHANGE_LOCATION}
                index={index}
                value={journalPageData.location}
            />
            <InputBox
                divClassName={"entry"}
                label={"Entry: "}
                rows={"59"}
                dispatch={journalReducerDispatchFunction}
                dispatchAction={types.CHANGE_ENTRY}
                index={index}
                value={journalPageData.entry}
            />
            </div>
            <div className={"journalImages"}>
            <FileUpload
                label={'file1'}
                index={index}
            />
            <FileUpload
                label={'file2'}
                index={index}
            />
            </div>
            
        </div>
    )
};

export default JournalPage;

