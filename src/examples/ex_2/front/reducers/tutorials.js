import {
    RETRIEVE_TUTORIALS,
    RETRIEVE_TUTORIAL_BY_ID,
    RETRIEVE_TUTORIAL_BY_TITLE,
    RETRIEVE_TUTORIAL_BY_STATUS,
    CREATE_TUTORIAL,
    UPDATE_TUTORIAL,
    DELETE_TUTORIAL,
    DELETE_ALL_TUTORIALS,
    RESET_TUTORIAL
} from "../actions/types";

const INITIAL_STATE_1 = []
const INITIAL_STATE_2 = {}

const tutorialsReducer = (tutorials = INITIAL_STATE_1, action) => {
    // debugger
    //payload is an array of objects of data-model ===> [{},{},...]
    const { type, payload } = action;
    switch (type) {
        case RETRIEVE_TUTORIALS:
            return payload;

        case RETRIEVE_TUTORIAL_BY_TITLE:
            return payload;

        case RETRIEVE_TUTORIAL_BY_STATUS:
            return payload;

        case RESET_TUTORIAL:
            return INITIAL_STATE_1;

        default:
            return tutorials;
    }
}

const tutorialReducer = (tutorial = INITIAL_STATE_2, action) => {
    // debugger
    //payload is a object of data-model and meta data ===> {data:{} ,error ,message ,success}
    const { type, payload } = action;
    switch (type) {

        case RETRIEVE_TUTORIAL_BY_ID:
            return payload;

        case CREATE_TUTORIAL:
            return payload;

        case UPDATE_TUTORIAL:
            return payload;

        case DELETE_TUTORIAL:
            return payload;

        case DELETE_ALL_TUTORIALS:
            return payload;

        case RESET_TUTORIAL:
            return INITIAL_STATE_2;

        default:
            return tutorial;
    }
}


export {
    tutorialsReducer,
    tutorialReducer
}