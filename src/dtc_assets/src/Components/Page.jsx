import React, {useContext, useState, useCallback } from "react";
import { useContext } from "../../../../dist/dtc_assets";
import { AppContext } from "../App";
import FileUpload from "./Fields/FileUpload";

const CHUNK_SIZE = 700000;

const Page = (props) => {

    const {actor, authClient, setAuthClient, setActor, setIsLoaded} = useContext(AppContext);
    const [file, setFile] = useState(null);

    const uploadChunk = async (fileId, chunkId, fileChunk) => {
        const arrayBuffer = await fileChunk.arrayBuffer();
        console.log('ArrayBuffer: ', arrayBuffer );
        const uint8Array = Array.from(new Uint8Array(arrayBuffer));
        console.log("Uint8Array being sent to backend: ",uint8Array);
        actor.createPageEntryFile(
            fileId, 
            chunkId, 
            uint8Array
        );

    };

    const mapAndSendFileToApi = async (fileId, file) => {
        const fileSize = file.size;

        const chunks = Math.ceil(fileSize/CHUNK_SIZE);
        let chunk = 0;

        let promises = [];


        while(chunk <= chunks - 1){    
            
            const from = chunk * CHUNK_SIZE;
            const to = from + CHUNK_SIZE;

            const fileChunk = (to < fileSize -1) ? file.slice(from,to ) : file.slice(from);

            const chunkId = `chunk-number-${chunk}`;
            promises.push(uploadChunk(fileId, chunkId, fileChunk));

            chunk += 1;
        };

        await Promise.all(promises).then((result) => console.log(result));    
    };



    const handleSubmit = useCallback(async () => {
        await mapAndSendFileToApi("test1", file);

    }, [file])


    return(
        <div>
            <FileUpload
                value={file}
                setValue={setFile}
            />
            <div>
                <button type="submit" onClick={handleSubmit}> Submit </button>
            </div>


            
            
        </div>
    );

};

export default Page;