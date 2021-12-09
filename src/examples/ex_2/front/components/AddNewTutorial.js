import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import DrpTutorialStatus from './DrpTutorialStatus';
// import svc from '../services/TutorialService';
import { createNewTutorial } from '../actions/tutorials';
import { resetTutorials } from '../actions/tutorials';
import {
    TYPES_EMPTY,
    TYPES_INVALID_ID,
    ERROR_TYPES_EMPTY,
    ERROR_TYPES_INVALID_ID,
    defaultValue4TutorialState
} from '../constants';


const AddNewTutorial = () => {

    let newTutorial = useSelector(state => state?.tutorial);
    let initTutorial = defaultValue4TutorialState(newTutorial);

    const [tutorial, setTutorial] = useState(initTutorial);
    const [formErrors, setFormErrors] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const refForm = useRef(null);
    const dispatch = useDispatch();

    //clear redux state from previous step 
    //for example when in edit mode user switch to add mode, data must be clear
    useLayoutEffect(() => {
        dispatch(resetTutorials());
        setTutorial(defaultValue4TutorialState());
        newTutorial = null;
    }, []);


    useEffect(() => {
        if (newTutorial && newTutorial.data) {
            setTutorial(newTutorial);
        }
    }, [newTutorial]);



    useEffect(() => {
        reSetBorders();
    }, [formErrors]);


    useEffect(() => {
        let timeout = 0;
        if (formSubmitted && (tutorial.error || tutorial.message)) {
            timeout = setTimeout(() => { setFormSubmitted(false); }, 5000)
        }
        return () => {
            if (timeout > 0) {
                clearTimeout(timeout);
                redirectToHomePage();
            }
        }

    });


    const redirectToHomePage = () => {
        window.location.href = "http://localhost:4000/tutorials";
    }

    const reSetBorders = () => {
        if (formErrors && formErrors.length > 0) {
            let inputs = refForm.current.getElementsByClassName('formInput');
            if (inputs) {
                for (let input of inputs) {
                    //check falsy values
                    if (input.value === "" || input.value == 0) {
                        input.classList.add("redborder");
                    } else {
                        if (input.classList.contains("redborder")) {
                            input.classList.remove("redborder");
                        }
                    }
                }
            }
        }
    }

    //pass event from child component to parent component
    const drpStatusChangeHandler = e => {
        const { value, name } = e.target; //e.target.options;
        // setTutorial({ ...tutorial, "status": value });
        let tData = { ...tutorial.data };
        tData.status = value;
        setTutorial({ ...tutorial, data: tData });

        if (formErrors && formErrors.length > 0) {
            reSetBorders();
            setFormErrors(null);
        }

        setFormSubmitted(false);
    }

    const inputChangeHandler = e => {
        const { value, name } = e.target; //e.target.options;
        let tData = { ...tutorial.data };
        tData[name] = value;
        setTutorial({ ...tutorial, data: tData });
        // setTutorial({ ...tutorial, ["data" + [name]]: value });
        if (formErrors && formErrors.length > 0) {
            reSetBorders();
            setFormErrors(null);
        }

        setFormSubmitted(false);
    }

    const formOnSubmitHandler = async e => {
        e.preventDefault();
        if (formErrors && formErrors.length > 0) {
            reSetBorders();
            setFormErrors(null);
        }
        if (!isValidTutorial()) return;

        setFormSubmitted(true);
        dispatch(createNewTutorial(tutorial.data));

        // const res = await svc.createNewTutorial(tutorial.data);
        // setTutorial(res);
    }

    const isValidTutorial = () => {
        let isValid = true;
        let errorList = []
        let keys = ["_id", "title", "description", "status"];
        let tutorialData = tutorial.data;
        Object.keys(tutorialData).map(k => {
            ////if (status===0)
            if (k === keys[3] && Number(tutorialData[k]) <= 0) {
                if (!errorList.some(err => err.targetElmentId === k && err.errType === TYPES_INVALID_ID)) {
                    errorList.push({
                        targetElmentId: k,
                        errType: TYPES_INVALID_ID,
                        errMessage: `${k} ${ERROR_TYPES_INVALID_ID}`
                    });
                }
            }
            else {
                if (!tutorialData[k] && (tutorialData[k] + '').trim() === '' &&
                    !errorList.some(err => err.targetElmentId === k && err.errType === TYPES_EMPTY)) {
                    errorList.push({
                        targetElmentId: k,
                        errType: TYPES_EMPTY,
                        errMessage: `${k} ${ERROR_TYPES_EMPTY}`
                    });
                }
            }
        });
        if (errorList.length > 0) {
            isValid = false;
            setFormErrors([...errorList]);
        }
        return isValid;
    }


    // debugger
    let { _id, title, description, status } = tutorial.data;
    let { error, message } = tutorial;


    return (
        <>
            <div className="row">
                <div className="col-md-6">
                    <h2 className="mt-5 text-center">Add New Tutorial</h2>
                    <form
                        className="mt-5 frmEditTutorial"
                        onSubmit={e => formOnSubmitHandler(e)}
                        id="frmEditTutorial"
                        ref={refForm}
                    >
                        <input type="hidden" id="id" name="id" value={_id} />
                        <div className="row mb-3">
                            <label className="col-sm-2">Title:</label>
                            <div className="col-sm-10">
                                <input
                                    id="title"
                                    name="title"
                                    value={title}
                                    onChange={e => inputChangeHandler(e)}
                                    className="form-control formInput" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2">Description:</label>
                            <div className="col-sm-10">
                                <input
                                    id="description"
                                    name="description"
                                    value={description}
                                    onChange={e => inputChangeHandler(e)}
                                    className="form-control formInput" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2">Status:</label>
                            <div className="col-sm-10">
                                <DrpTutorialStatus id="drpAddStatus" change={drpStatusChangeHandler} selected={status} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <input type="submit" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
                <div className="col-md-6">
                    <div className="messagebox">
                        {formSubmitted && tutorial && error && (<div className="alert alert-danger"><p>{message}</p><p>{error}</p></div>)}
                        {formSubmitted && tutorial && !error && (<div className="alert alert-success"><p>{message}</p></div>)}
                    </div>
                    <ul className="text-danger errors" >
                        {
                            formErrors && formErrors.length > 0 ? (
                                formErrors.map((v, k) => <li key={k}>{v.errMessage}</li>)
                            ) : ""
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default AddNewTutorial

