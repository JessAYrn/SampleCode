import React, {useState, useContext, useEffect, useCallback} from "react";
import FileUpload from "./Fields/FileUpload";
import InputBox from "./Fields/InputBox";
import Slider from "./Fields/Slider";
import {types} from "../reducers/journalReducer";
import  {AppContext} from "../App";
import "./JournalPage.scss";
import { mapAndSendJournalPageRequestToApi } from "../mappers/journalPageMappers";


const JournalPage = (props) => {

    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);

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
        console.log(file1);
        console.log(file2);
        await actor.readEntry({entryKey: 1}).then((result) => { console.log(result)});
    }, [actor, file1, file2]);

    const handleSubmit = useCallback(async () => {
        await mapAndSendJournalPageRequestToApi( null, journalPageData, {file1: file1, file2: file2}, actor);

    }, [journalPageData, file1, file2])
    

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
                value={file1}
                setValue={setFile1}
                index={index}
            />
            <FileUpload
                label={'file2'}
                value={file2}
                setValue={setFile2}
                index={index}
            />
            </div>
            <div>
                <button type="submit" onClick={handleSubmit}> Submit </button>
            </div>
            
        </div>
    )
};

export default JournalPage;

