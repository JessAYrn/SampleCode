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
            <div className={"journalText"} >
            <InputBox
                label={"Date: "}
                rows={"1"}
            />
            <InputBox
                label={"Location: "}
                rows={"1"}
            />
            <InputBox
                divClassName={"entry"}
                label={"Entry: "}
                rows={"49"}
            />
            </div>
            <div className={"journalImages"}>
            <FileUpload
                label={'file1'}
            />
            <FileUpload
                label={'file2'}
            />
            <FileUpload
                label={'file3'}
            />
            <FileUpload
                label={'file4'}
            />
            </div>
            
        </div>
    )
};

export default JournalPage;

