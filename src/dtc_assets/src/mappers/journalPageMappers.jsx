import { dtc } from "../../../declarations/dtc";

export const mapAndSendJournalPageRequestToApi = async (key, pageData, files, actor) => {

    const journalEntry = {
        date: pageData.date,
        text: pageData.entry,
        lockTime: pageData.lockTime * 2.592 * 10**15,
        timeTillUnlock: pageData.lockTime * 2.592 * 10**15,
        location: pageData.location,
        entryTitle: "test"
    };

    const journalFile = {
        file1: (files.file1) ? files.file1 : [],
        file2: (files.file2) ? files.file2 : []
    };

    
    const entry = (journalEntry, journalFile);
    const entryKey = (key) ? {entryKey: key}: [];

    console.log(actor);

    await actor.updateJournal(entryKey, entry).then((result) => {
        console.log(result);
    });

};