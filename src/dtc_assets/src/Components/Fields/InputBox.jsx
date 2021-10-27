import React, {useState} from 'react';
import "./InputBox.scss";


const InputBox = (props) => {
    const inputRef = React.useRef();
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
            <div className={'label-element-div'}>
                <label className={"label__"+className} htmlFor='Label'> {label}  &nbsp; </label>
            </div>
            <div className={"input-element-div"}>
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
        </div>

        
    )
}; 

export default InputBox;