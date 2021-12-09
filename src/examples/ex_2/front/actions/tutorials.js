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
} from "./types";

import tutorialService from "../services/TutorialService";

const fetchAllTutorials = () => async (dispatch) => {
    try {
        // debugger
        const result = await tutorialService.fetchAllTutorials();
        // console.log("xxxxxx",result.data)
        //modify name of object_id
        // const data = result.data?.map(item => {
        //     item.id = item._id;
        //     delete item._id;
        //     return item;
        // });
        // console.log("xxxxxx",data)
        dispatch({
            type: RETRIEVE_TUTORIALS,
            payload: result.data
        });
    } catch (error) {
        console.log(error)
    }
}


const findTutorialsByTitle = (title) => async (dispatch) => {
    try {
        // debugger
        let data = { title: title, status: -1 };
        const result = await tutorialService.findTutorialByTitle(data);
        // debugger
        dispatch({
            type: RETRIEVE_TUTORIAL_BY_TITLE,
            payload: result.data
        });
    } catch (error) {
        console.log(error)
    }
}

const findTutorialsByStatus = (status) => async (dispatch) => {
    try {
        let data = { title: "", status: status };
        const result = await tutorialService.findTutorialByStatus(data);
        dispatch({
            type: RETRIEVE_TUTORIAL_BY_STATUS,
            payload: result.data
        });
    } catch (error) {
        console.log(error)
    }
}

const fetchTutorialById = (id) => async (dispatch) => {
    // debugger
    try {
        const result = await tutorialService.fetchTutorialById(id);
        dispatch({
            type: RETRIEVE_TUTORIAL_BY_ID,
            payload: result
        });
    } catch (error) {
        console.log(error)
    }
}


const createNewTutorial = (data) => async (dispatch) => {
    try {
        const result = await tutorialService.createNewTutorial(data);
        dispatch({
            type: CREATE_TUTORIAL,
            payload: result
        });
        // return Promise.resolve(result.data);
    } catch (error) {
        console.log(error)
        // return Promise.reject(error);
    }
}


const updateTutorial = (data) => async (dispatch) => {
    try {
        // debugger;
        const result = await tutorialService.updateTutorial(data);
        // debugger;
        dispatch({
            type: UPDATE_TUTORIAL,
            payload: result
        });
    } catch (error) {
        console.log(error)
    }
}


const removeTutorialById = (id) => async (dispatch) => {
    // debugger
    try {
        const result = await tutorialService.removeTutorial(id);
        // debugger
        dispatch({
            type: DELETE_TUTORIAL,
            payload: result,
        });
    } catch (error) {
        console.log(error);
    }
};


const removeAllTutorials = () => async (dispatch) => {
    try {
        // debugger
        const result = await tutorialService.removeAllTutorials();
        // debugger
        // console.log("xxxxxx", result.data)
        dispatch({
            type: DELETE_ALL_TUTORIALS,
            payload: result,
        });
    } catch (error) {
        console.log(error);;
    }
};

const resetTutorials = () => async (dispatch) => {
    dispatch({
        type: RESET_TUTORIAL
    });
};



export {
    fetchAllTutorials,
    fetchTutorialById,
    findTutorialsByTitle,
    findTutorialsByStatus,
    createNewTutorial,
    updateTutorial,
    removeTutorialById,
    removeAllTutorials,
    resetTutorials
};