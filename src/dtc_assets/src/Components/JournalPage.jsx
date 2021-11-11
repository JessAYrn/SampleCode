import React, {useReducer, useEffect} from "react";
import FileUpload from "./Fields/FileUpload";
import InputBox from "./Fields/InputBox";
import Slider from "./Fields/Slider";
import {types} from "../reducers/journalReducer";
import "./JournalPage.scss";


const JournalPage = (props) => {

    const {
        journalReducerDispatchFunction,
        index,
        journalPageData
    } = props
    

    return (
        <div className={"journalPageContainer"}>
            <Slider
                min={3}
                max={120}
                dispatch={journalReducerDispatchFunction}
                dispatchAction={types.CHANGE_LOCK_TIME}
                index={index}
                value={journalPageData.file4}
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
                dispatch={journalReducerDispatchFunction}
                dispatchAction={types.CHANGE_FILE_1}
                index={index}
                value={journalPageData.file1}
            />
            <FileUpload
                label={'file2'}
                dispatch={journalReducerDispatchFunction}
                dispatchAction={types.CHANGE_FILE_2}
                index={index}
                value={journalPageData.file2}
            />
            <FileUpload
                label={'file3'}
                dispatch={journalReducerDispatchFunction}
                dispatchAction={types.CHANGE_FILE_3}
                index={index}
                value={journalPageData.file3}
            />
            <FileUpload
                label={'file4'}
                dispatch={journalReducerDispatchFunction}
                dispatchAction={types.CHANGE_FILE_4}
                index={index}
                value={journalPageData.file4}
            />
            </div>
            
        </div>
    )
};

export default JournalPage;

