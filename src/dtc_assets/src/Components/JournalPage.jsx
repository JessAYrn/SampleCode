import React, {useReducer, useEffect} from "react";
import FileUpload from "./Fields/FileUpload";
import InputBox from "./Fields/InputBox";
import Slider from "./Fields/Slider";
import journalReducer, {types, initialState} from "../reducers/journalReducer";
import "./JournalPage.scss";


const JournalPage = (props) => {
   
    const [journalPageState, dispatch] = useReducer(journalReducer, initialState );

    useEffect(() => {
        console.log(journalPageState.journal);
    },[journalPageState])

    return (
        <div className={"journalPageContainer"}>
            <Slider
                min={3}
                max={120}
                dispatch={dispatch}
                dispatchAction={types.CHANGE_LOCK_TIME}
                index={0}
                value={journalPageState.journal[0].file4}
            />
            <div className={"journalText"} >
            <InputBox
                label={"Date: "}
                rows={"1"}
                dispatch={dispatch}
                dispatchAction={types.CHANGE_DATE}
                index={0}
                value={journalPageState.journal[0].date}
            />
            <InputBox
                label={"Location: "}
                rows={"1"}
                dispatch={dispatch}
                dispatchAction={types.CHANGE_LOCATION}
                index={0}
                value={journalPageState.journal[0].location}
            />
            <InputBox
                divClassName={"entry"}
                label={"Entry: "}
                rows={"59"}
                dispatch={dispatch}
                dispatchAction={types.CHANGE_ENTRY}
                index={0}
                value={journalPageState.journal[0].entry}
            />
            </div>
            <div className={"journalImages"}>
            <FileUpload
                label={'file1'}
                dispatch={dispatch}
                dispatchAction={types.CHANGE_FILE_1}
                index={0}
                value={journalPageState.journal[0].file1}
            />
            <FileUpload
                label={'file2'}
                dispatch={dispatch}
                dispatchAction={types.CHANGE_FILE_2}
                index={0}
                value={journalPageState.journal[0].file2}
            />
            <FileUpload
                label={'file3'}
                dispatch={dispatch}
                dispatchAction={types.CHANGE_FILE_3}
                index={0}
                value={journalPageState.journal[0].file3}
            />
            <FileUpload
                label={'file4'}
                dispatch={dispatch}
                dispatchAction={types.CHANGE_FILE_4}
                index={0}
                value={journalPageState.journal[0].file4}
            />
            </div>
            
        </div>
    )
};

export default JournalPage;

