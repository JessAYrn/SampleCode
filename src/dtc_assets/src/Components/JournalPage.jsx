import React, {useReducer, useEffect} from "react";
import FileUpload from "./Fields/FileUpload";
import InputBox from "./Fields/InputBox";
import Slider from "./Fields/Slider";
import {types} from "../reducers/journalReducer";
import "./JournalPage.scss";


const JournalPage = (props) => {

    const {
        dispatch,
        index,
        journalPageState
    } = props

    return (
        <div className={"journalPageContainer"}>
            <Slider
                min={3}
                max={120}
                dispatch={dispatch}
                dispatchAction={types.CHANGE_LOCK_TIME}
                index={index}
                value={journalPageState.file4}
            />
            <div className={"journalText"} >
            <InputBox
                label={"Date: "}
                rows={"1"}
                dispatch={dispatch}
                dispatchAction={types.CHANGE_DATE}
                index={index}
                value={journalPageState.date}
            />
            <InputBox
                label={"Location: "}
                rows={"1"}
                dispatch={dispatch}
                dispatchAction={types.CHANGE_LOCATION}
                index={index}
                value={journalPageState.location}
            />
            <InputBox
                divClassName={"entry"}
                label={"Entry: "}
                rows={"59"}
                dispatch={dispatch}
                dispatchAction={types.CHANGE_ENTRY}
                index={index}
                value={journalPageState.entry}
            />
            </div>
            <div className={"journalImages"}>
            <FileUpload
                label={'file1'}
                dispatch={dispatch}
                dispatchAction={types.CHANGE_FILE_1}
                index={index}
                value={journalPageState.file1}
            />
            <FileUpload
                label={'file2'}
                dispatch={dispatch}
                dispatchAction={types.CHANGE_FILE_2}
                index={index}
                value={journalPageState.file2}
            />
            <FileUpload
                label={'file3'}
                dispatch={dispatch}
                dispatchAction={types.CHANGE_FILE_3}
                index={index}
                value={journalPageState.file3}
            />
            <FileUpload
                label={'file4'}
                dispatch={dispatch}
                dispatchAction={types.CHANGE_FILE_4}
                index={index}
                value={journalPageState.file4}
            />
            </div>
            
        </div>
    )
};

export default JournalPage;

