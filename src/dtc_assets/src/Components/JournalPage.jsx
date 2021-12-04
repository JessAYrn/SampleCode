import React, {useState, useContext, useEffect, useCallback} from "react";
import FileUpload from "./Fields/FileUpload";
import InputBox from "./Fields/InputBox";
import Slider from "./Fields/Slider";
import {types} from "../reducers/journalReducer";
import  {AppContext} from "../App";
import "./JournalPage.scss";

const CHUNK_SIZE = 1024 * 1024;

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
        
        await actor.readEntry({entryKey: 1}).then((result) => { console.log(result)});
    }, [actor, file1, file2]);



    const mapAndSendFileToApi = async (fileKey, file) => {
        const fileSize = file.size;
        const fileKeyAsApiObject = (fileKey) ? {fileKey}: [];

        const chunks = Math.ceil(fileSize/CHUNK_SIZE);
        let chunk = 0;

        let fileAsByteArray;

        await file.arrayBuffer().then((arrayBuffer) => {
            fileAsByteArray = [...new Uint8Array(arrayBuffer)];
            console.log("file: ",fileAsByteArray);
        });



        while(chunk <= chunks){    
            // await file.arrayBuffer().then((arrayBuffer) => {
            //     blob = new Blob([...new Uint8Array(arrayBuffer)], {type: file.file1.type });
            // });
            
            const from = chunk * CHUNK_SIZE;
            const to = from + CHUNK_SIZE;

            const fileChunkAsByteArray = fileAsByteArray.slice(from,to);
            const fileChunkAsBlob = new Blob(fileChunkAsByteArray, {type: file.type});
            console.log(fileChunkAsByteArray);

            const fileChunkByteArrayAsApiObject = {file: fileChunkAsBlob}

            //TODO: make updateFiles method in backend and update the updateJournal method to only accept primative data from JournalPage

            // await actor.updateFiles(fileKeyAsApiObject, fileChunkByteArrayAsApiObject).then((result) => {
            //     console.log(result);
            // });

            chunk += 1;
        }
    
    };



    const handleSubmit = useCallback(async () => {
        await mapAndSendFileToApi(null, file1);
        await mapAndSendFileToApi(null, file2);

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

