import React, {useState} from 'react';
import "./InputBox.scss";


const InputBox = (props) => {
    const inputRef = React.useRef();
    let textValue; 
    const [disabledOrEnabled,setDisabledOrEnabled] = useState("enabled");
    const {
        label,
        maxLength,
        rows,
        columns,
        disabled,
        divClassName
        // dispatchAction //the action that is to take place in order to dispatch the field change to the redux store
    } = props;

    const onBlur = () => {
        textValue = inputRef.current.value;
        setDisabledOrEnabled("disabled");


    };
    const onFocus = () => {
        setDisabledOrEnabled("enabled");
        
    };

    return(
        <div className={'inputBox'}>
            <div className={'label-element-div '}>
                <label className={"label__"+disabledOrEnabled} htmlFor='Label'> {label}  &nbsp; </label>
            </div>
            <div className={`input-element-div + ${divClassName || " "}`}>
            <textarea
                rows={rows}
                cols={columns}
                maxLength={maxLength}
                className={disabledOrEnabled}
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