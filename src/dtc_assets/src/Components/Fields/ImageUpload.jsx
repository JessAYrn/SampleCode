import React, {useRef, useState} from 'react';

const ImageUpload = (props) => {
    const {
        label,
        disabled
    } = props;
    
    const inputRef = useRef();
    let image;
    let imageSrc = '';
    const reader = new FileReader();

    const onUpload = () => {
        image =inputRef.current.files[0];
        console.log(1);
        if(image){
            return new Promise((resolve,reject) => {
                console.log(2);
                reader.onerror = () => {
                    reader.abort();
                    reject(new DOMException("Problem parsing input file."));
                };
                //TODO: figure out why the eventListeners aren't firing for reader
                reader.addEventListener("load", function(){
                    console.log(3);
                    resolve(reader.result);
                    imageSrc = reader.result;
                    reader.readAsDataURL(image);
                }) ;
            })
            
        } else {}
    };
    

    return(
        <div className={'imageDiv__' + label}>
            <label className={'ImageLabelDiv'}>
                {label}
            </label>
            <input id={'uploadedImaged'} type="file" className={'image'} ref={inputRef} onChange={onUpload}/>
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