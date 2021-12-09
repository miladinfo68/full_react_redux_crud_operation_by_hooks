import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import DrpTutorialStatus from './DrpTutorialStatus';
import ConfModal from './popup/ConfModal';
import tutorialService from '../services/TutorialService'
import {
    fetchTutorialById,
    updateTutorial,
    resetTutorials
} from '../actions/tutorials';
import {
    TYPES_EMPTY,
    TYPES_INVALID_ID,
    ERROR_TYPES_EMPTY,
    ERROR_TYPES_INVALID_ID,
    defaultValue4TutorialState
} from '../constants';



function EditTutorial() {
    // debugger
    let fetchedTutorial = useSelector(state => state.tutorial);
    // console.log("storeData", storeData);
    let initTutorial = defaultValue4TutorialState(fetchedTutorial);

    const [tutorial, setTutorial] = useState(initTutorial);
    const [formErrors, setFormErrors] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const refForm = useRef(null);
    const { id } = useParams();
    const dispatch = useDispatch();

    // const refreshData = () => {
    //     if (tutorial) setTutorial(defaultValue4TutorialState());
    //     if (formErrors) setFormErrors(null);
    //     if (formSubmitted) setFormSubmitted(false);
    //     if (showModal) setShowModal(false);
    //     fetchedTutorial = null;
    // }




    //get data from store
    useEffect(() => {       
        // fetch data from store only one time
        if (id) {
            dispatch(fetchTutorialById(id));
        }
    }, [id]);

    useEffect(() => {
        reSetBorders();
    }, [formErrors]);

    useEffect(() => {
        if (fetchedTutorial && fetchedTutorial.data) {
            setTutorial(fetchedTutorial);
        }
    }, [fetchedTutorial]);


    useEffect(() => {
        let timeout = 0;
        if (formSubmitted && (tutorial.error || tutorial.message)) {
            timeout = setTimeout(() => { setFormSubmitted(false); }, 2000)
        }
        return () => {
            if (timeout > 0) {
                clearTimeout(timeout);
                dispatch(resetTutorials());
                // refreshData();
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
        setTutorial({ ...tutorial, data : tData });

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
        setTutorial({ ...tutorial, "data": tData });
        // setTutorial({ ...tutorial, ["data" + [name]]: value });
        if (formErrors && formErrors.length > 0) {
            reSetBorders();
            setFormErrors(null);
        }

        setFormSubmitted(false);
    }

    const formOnSubmitHandler = e => {
        e.preventDefault();
        if (formErrors && formErrors.length > 0) {
            reSetBorders();
            setFormErrors(null);
        }
        if (!isValidTutorial()) return;

        setShowModal(true);
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

    const abortProsses = e => {
        setShowModal(false);
    }

    const completeProsses = e => {
        // debugger
        setShowModal(false);
        setFormSubmitted(true);
        dispatch(updateTutorial(tutorial.data));
    }



    // debugger
    let { _id, title, description, status } = tutorial.data;
    let { error, message } = tutorial;


    return (
        <>
            {showModal && (
                <>
                    <div className="modalOverlay" onClick={abortProsses}></div>
                    <ConfModal
                        title="Edit Iitem!"
                        cancled={abortProsses}
                        confirmed={completeProsses}>
                        Are you sure you want to change current record ?
                    </ConfModal>
                </>
            )}

            <div className="row">
                <div className="col-md-6">
                    <h2 className="mt-5 text-center">Edit Tutorial</h2>
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

export default EditTutorial

