import React, {useRef, useState} from 'react';
import InputBox from './InputBox';
import "./ImageUpload.scss";

const ImageUpload = (props) => {
    const {
        label,
        disabled
    } = props;
    let inputRef = useRef();
    const [imageSrc, setImageSrc]  = useState("../../../assets/AddImageIcon.png");

    const displayUploadedImage = (inputImage) => {
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
            reader.onload = () => {
                resolve(reader.result);
            }
            reader.readAsDataURL(inputImage)
        
        });
    }; 

    const handleUpload = async () => {
        const image = inputRef.current.files[0];
        try{
            setImageSrc(await displayUploadedImage(image));
        } catch(e) {
            console.warn(e.message);
        }
    };

    return(
        <div className={'imageDiv'}>
            <div className={"imagePreview"} id={"imagePreview"}>
                <img src={imageSrc} alt="image preview" className="imagePreview__image"/>
                <InputBox
                    label={""} 
                />
                {/* <video width="320" height="240" controls>
                    <source src={imageSrc} type="video/mp4"/>
                    <source src={imageSrc} type="video/ogg"/>
                        Your browser does not support the video tag.
                </video>                */}
                {
                    !imageSrc && 
                    <span className="imagePreview__default-display">
                        Image Preview
                    </span>   
                }
                <input id={'uploadedImaged'} type="file" className={'imageInputButton'} ref={inputRef} onChange={handleUpload}/>
            </div>
        </div>
    );
}

export default ImageUpload;