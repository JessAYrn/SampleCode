import React, {useRef, useState} from 'react';

const ImageUpload = (props) => {
    const {
        label,
        disabled
    } = props;
    let inputRef = useRef();
    const [imageSrc, setImageSrc]  =useState('');

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
        <div className={'imageDiv__' + label}>
            <label className={'ImageLabelDiv'}>
                {label}
            </label>
            <input id={'uploadedImaged'} type="file" className={'image'} ref={inputRef} onChange={handleUpload}/>
            <div className={"imagePreview"} id={"imagePreview"}>
                <img src={imageSrc} alt="image preview" className="imagePreview__image"/>
                
                <span className="imagePreview__default-display">
                    Image Preview
                </span>
            </div>
        </div>
    );
}

export default ImageUpload;