import React, {useState, useMemo} from 'react';


const InputBox = (props) => {
    const inputRef = React.useRef();
    const textValue = inputRef.current.value.toString();
    const [disabled, setDisabled] = useSate(true);
    const {
        label
        // dispatchAction //the action that is to take place in order to dispatch the field change to the redux store
    } = props;

    const onBlur = () => {
        setDisabled(true);


    };
    const onFocus = () => {
        setDisabled(false);
    };

    return(
        <div className={label}>
            <label htmlFor='Label'> `${label}`  &nbsp;</label>
            <input 
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