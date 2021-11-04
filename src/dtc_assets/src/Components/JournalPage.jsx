import React from "react";
import FileUpload from "./Fields/FileUpload";
import InputBox from "./Fields/InputBox";
import Slider from "./Fields/Slider";
import "./JournalPage.scss";


const JournalPage = (props) => {
   
    return (
        <div className={"journalPageContainer"}>
            <Slider
                min={3}
                max={120}
            />
            <InputBox
                label={"Date: "}
            />
            <InputBox
                label={"Location: "}
            />
            <InputBox
                label={"Entry: "}
            />
            <FileUpload
                label={'file1'}
            />
            <FileUpload
                label={'file2'}
            />
            <FileUpload
                label={'file3'}
            />
        </div>
    )
};

export default JournalPage;

