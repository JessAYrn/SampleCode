export const types = {
    CHANGE_DATE: "CHANGE_DATE",
    CHANGE_LOCATION: "CHANGE_LOCATION",
    CHANGE_ENTRY: "CHANGE_ENTRY",
    CHANGE_LOCK_TIME: "CHANGE_LOCK_TIME",
    ADD_PAGE: "ADD_PAGE",
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
    page: [
        {
            date: 'test',
            location: 'test',
            entry: '',
            lockTime: 'test'
        },
        {
            date: 'test',
            location: 'test',
            entry: '',
            lockTime: 'test'
        }
    ]

}

const freshPage = {
    date: 'test',
    location: 'test',
    entry: '',
    lockTime: 'test'
}

const changeValue = (state = initialState, action) => {

    const {actionType, payload, index } = action;

    let updatedPage;
    

    switch (actionType){
        case types.CHANGE_DATE:
            updatedPage = {
                ... state.page[index],
                date: payload
            }
            state.page[index] = updatedPage;
            return {
                ...state
            }
        case types.CHANGE_LOCATION:
            updatedPage = {
                ... state.page[index],
                location: payload
            }
            state.page[index] = updatedPage;
            return {
                ...state
            }
        case types.CHANGE_ENTRY:
            updatedPage = {
                ... state.page[index],
                entry: payload
            }
            state.page[index] = updatedPage;
            return {
                ...state
            }
        case types.CHANGE_LOCK_TIME:
            updatedPage = {
                ... state.page[index],
                lockTime: payload
            }
            state.page[index] = updatedPage;
            return {
                ...state
            }
        case types.ADD_PAGE:
            state.page.push(freshPage);
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