import React, {useState} from 'react';
import "./InputBox.scss";


const InputBox = (props) => {
    const inputRef = React.useRef();
    console.log(inputRef);
    let textValue; 
    const [className,setClassName] = useState("enabled");
    const {
        label,
        disabled
        // dispatchAction //the action that is to take place in order to dispatch the field change to the redux store
    } = props;

    const onBlur = () => {
        textValue = inputRef.current.value;
        setClassName("disabled");


    };
    const onFocus = () => {
        setClassName("enabled");
        
    };

    return(
        <div className={"inputBox " + label}>
            <label htmlFor='Label'> {label}  &nbsp;</label>
            <input 
                className={className}
                type="text" 
                alt={label} 
                ref={inputRef} 
                disabled={disabled} 
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </div>

        
    )
}; 

export default InputBox;