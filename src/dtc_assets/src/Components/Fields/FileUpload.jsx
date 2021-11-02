import React, {useRef, useState} from 'react';
import InputBox from './InputBox';
import "./FileUpload.scss";

const FileUpload = (props) => {
    const {
        label,
        disabled
    } = props;
    let inputRef = useRef();
    const [fileSrc, setFileSrc]  = useState("../../../assets/AddImageIcon.png");
    const [fileType, setFileType] = useState("image");

    const displayUploadedFile = (inputFile) => {
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
            reader.onload = () => {
                resolve(reader.result);
            }
            reader.readAsDataURL(inputFile)
        
        });
    }; 

    const handleUpload = async () => {
        const file = inputRef.current.files[0];
        try{
            if(file.type.includes("image")){
                setFileType("image");
            } else if(file.type.includes("video")){
                setFileType("video");
            }
            setFileSrc(await displayUploadedFile(file));
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
                        <video width="240" height="320" controls className="imagePreview__video">
                            <source src={fileSrc} type="video/mp4"/>
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
                <input id={'uploadedImaged'} type="file" className={'imageInputButton'} ref={inputRef} onChange={handleUpload}/>
            </div>
        </div>
    );
}

export default FileUpload;