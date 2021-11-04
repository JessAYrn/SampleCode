import React, {useRef, useState} from 'react';


const Slider = (props) => {
    const {
        min,
        max,
        value
    } = props;

    const inputRef = useRef();

    const [silderValue, setSliderValue] = useState('');

    const displayValue = () => {
        setSliderValue(inputRef.current.value);
    }
    


    return(
        <div>
            <input type="range" min={min} max={max} className="slider" value={silderValue || "3"} id="myRange" ref={inputRef} onChange={displayValue}/>
            {`Lock for ${silderValue || '3'} months`} 
        </div>
    )
};

export default Slider;