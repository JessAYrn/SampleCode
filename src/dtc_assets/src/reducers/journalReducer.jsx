export const types ={
    CHANGE_FILE_1: "CHANGE_FILE_1",
    CHANGE_FILE_2: "CHANGE_FILE_2",
    CHANGE_FILE_3: "CHANGE_FILE_3",
    CHANGE_FILE_4: 'CHANGE_FILE_4',
    CHANGE_COVER_IMAGE: "CHANGE_COVER_IMAGE",
    CHANGE_DATE: "CHANGE_DATE",
    CHANGE_LOCATION: "CHANGE_LOCATION",
    CHANGE_ENTRY: "CHANGE_ENTRY",
    CHANGE_LOCK_TIME: "CHANGE_LOCK_TIME",
    ADD_JOURNAL_PAGE: "ADD_JOURNAL_PAGE",
    CHANGE_DOB: "CHANGE_DOB",
    CHANGE_POB: "CHANGE_POB",
    CHANGE_PREFACE: "CHANGE_PREFACE",
    CHANGE_DEDICATIONS: "CHANGE_DEDICATIONS",
    CHANGE_NAME: "CHANGE_NAME"
}

export const initialState = {
    bio: {
        name: '',
        dob: '',
        pob: '',
        dedications: '',
        preface:''
    },
    journal: [
        {
            coverImage: {},
            file1: {},
            file2: {},
            file3: {},
            file4: {},
            date: 'test',
            location: 'test',
            entry: '',
            lockTime: 'test'
        },
        {
            coverImage: {},
            file1: {},
            file2: {},
            file3: {},
            file4: {},
            date: 'test',
            location: 'test',
            entry: '',
            lockTime: 'test'
        }
    ]

}

const freshPage = {
    coverImage: {},
            file1: {},
            file2: {},
            file3: {},
            file4: {},
            date: 'test',
            location: 'test',
            entry: '',
            lockTime: 'test'
}

const changeValue = (state = initialState, action) => {

    const {actionType, payload, index } = action;

    let updatedJournalPage;
    

    switch (actionType){
        case types.CHANGE_FILE_1:
            updatedJournalPage = {
                ... state.journal[index],
                file1: payload
            }
            state.journal[index] = updatedJournalPage;
            return {
                ...state
            }
        case types.CHANGE_FILE_2:
            updatedJournalPage = {
                ... state.journal[index],
                file2: payload
            }
            state.journal[index] = updatedJournalPage;
            return {
                ...state
            }
        case types.CHANGE_FILE_3:
            updatedJournalPage = {
                ... state.journal[index],
                file3: payload
            }
            state.journal[index] = updatedJournalPage;
            return {
                ...state
            }
        case types.CHANGE_FILE_4:
            updatedJournalPage = {
                ... state.journal[index],
                file4: payload
            }
            state.journal[index] = updatedJournalPage;
            return {
                ...state
            }
        case types.CHANGE_COVER_IMAGE:
            updatedJournalPage = {
                ... state.journal[index],
                coverImage: payload
            }
            state.journal[index] = updatedJournalPage;
            return {
                ...state
            }
        case types.CHANGE_DATE:
            updatedJournalPage = {
                ... state.journal[index],
                date: payload
            }
            state.journal[index] = updatedJournalPage;
            return {
                ...state
            }
        case types.CHANGE_LOCATION:
            updatedJournalPage = {
                ... state.journal[index],
                location: payload
            }
            state.journal[index] = updatedJournalPage;
            return {
                ...state
            }
        case types.CHANGE_ENTRY:
            updatedJournalPage = {
                ... state.journal[index],
                entry: payload
            }
            state.journal[index] = updatedJournalPage;
            return {
                ...state
            }
        case types.CHANGE_LOCK_TIME:
            updatedJournalPage = {
                ... state.journal[index],
                lockTime: payload
            }
            state.journal[index] = updatedJournalPage;
            return {
                ...state
            }
        case types.ADD_JOURNAL_PAGE:
            state.journal.push(freshPage);
            return {
                ...state
            }
        case types.CHANGE_NAME:
            state.bio = {
                ...state.bio,
                name: payload
            }
            return {
                ...state
            }
        case types.CHANGE_DOB:
            state.bio = {
                ...state.bio,
                dob: payload
            }
            return {
                ...state
            }
        case types.CHANGE_POB:
            state.bio = {
                ...state.bio,
                pob: payload
            }
            return {
                ...state
            }
        case types.CHANGE_PREFACE:
            state.bio = {
                ...state.bio,
                preface: payload
            }
            return {
                ...state
            }
        case types.CHANGE_DEDICATIONS:
        state.bio = {
            ...state.bio,
            dedications: payload
        }
        return {
            ...state
        }
        default:
            return {
                 ...state
            }

    }

}

export default changeValue;