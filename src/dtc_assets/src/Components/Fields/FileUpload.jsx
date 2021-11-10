import React, {useRef, useState, useEffect} from 'react';
import InputBox from './InputBox';
import "./FileUpload.scss";
import { useEffect } from '../../../../../dist/dtc_assets';

const FileUpload = (props) => {
    const {
        label,
        disabled,
        dispatchAction,
        dispatch,
        index,
        value
    } = props;
    let inputRef = useRef();

    const displayUploadedFile = (inputFile) => {
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
            reader.onload = () => {
                resolve(reader.result);
            }
            reader.readAsDataURL(inputFile)
        
        });
    }; 

    const [fileSrc, setFileSrc]  = useState("../../../assets/AddImageIcon.png");
    const [fileType, setFileType] = useState("image");

    useEffect( async () => {
        if(value){
            setFileSrc(await displayUploadedFile(value));
        }
    },[value]);


    const handleUpload = async () => {
        const file = inputRef.current.files[0] || value;
        try{
            if(file.type.includes("image")){
                setFileType("image");
            } else if(file.type.includes("video")){
                setFileType("video");
            }
            setFileSrc(await displayUploadedFile(file));
            dispatch({
                payload: file,
                actionType: dispatchAction,
                index: index
            });
        } catch(e) {
            console.warn(e.message);
        }
    };

    return(
        <div className={'imageDiv'}>
            <div className={"imagePreview"} id={"imagePreview"}>
                
                { 
                    (fileType === "image") ? 
                        <img src={fileSrc} alt="image preview" className="imagePreview__image"/> :
                        <video width="320" height="240" controls className="imagePreview__video">
                            <source src={fileSrc} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'/>
                            <source src={fileSrc} type='video/ogg; codecs="theora, vorbis"'/>
                            <source src={fileSrc} type='video/webm'/>
                            Your browser does not support the video tag.
                        </video>                
                }
                <InputBox
                    maxLength="34"
                    label={""} 
                />
                {
                    !fileSrc && 
                    <span className="imagePreview__default-display">
                        Image Preview
                    </span>   
                }
                <input id={'uploadedImaged'} type="file" className={'imageInputButton'} ref={inputRef} onLoad={handleUpload} onChange={handleUpload}/>
            </div>
        </div>
    );
}

export default FileUpload;