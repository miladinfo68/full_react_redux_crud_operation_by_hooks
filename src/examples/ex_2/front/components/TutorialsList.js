import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAllTutorials,
    findTutorialsByTitle,
    removeTutorialById,
    removeAllTutorials,
    resetTutorials
} from '../actions/tutorials';
import { defaultValue4TutorialState } from '../constants';
// import tutorialService from "../services/TutorialService";
import ConfModal from './popup/ConfModal';


const TutorialsList = () => {


    const [currentIndex, setCurrentIndex] = useState(-1);
    const [selectedTutorial, setSelectedTutorial] = useState(null);
    const [searchTitle, setSearchTitle] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [deleteConfirmed, setDeleteConfirmed] = useState(false);
    const [deleteAll, setDeleteAll] = useState(false);

    const dispatch = useDispatch();

    let tutorials = useSelector(state => state.tutorials);
    let tutorial = useSelector(state => state.tutorial);

    tutorials = defaultValue4TutorialState(tutorials);
    tutorial = defaultValue4TutorialState(tutorial);


    const refreshData = () => {
        if (currentIndex != -1) setCurrentIndex(-1);
        if (selectedTutorial) setSelectedTutorial(null);
        // if (deleteConfirmed) setDeleteConfirmed(false);
        if (deleteAll) setDeleteAll(false);

        dispatch(fetchAllTutorials());
    };

    // console.log("11", tutorials)
    // console.log("22", tutorial)

    //fetch data only first time in store of redux
    useEffect(() => {
        dispatch(fetchAllTutorials());
    }, []);

    //clear message and error after delete an item
    useEffect(() => {
        let timeout = 0;
        if (deleteConfirmed && (tutorial.error || tutorial.message)) {
            timeout = setTimeout(() => { setDeleteConfirmed(false) }, 1000)
        }
        return () => { if (timeout > 0) clearTimeout(timeout); }
    });

    //refresh page data after confirmation check to delete
    useEffect(() => {
        if (deleteConfirmed) {
            setTimeout(() => { refreshData(); }, 2000);
        }
    }, [deleteConfirmed]);



    const onChangeSearchTitle = e => setSearchTitle(e.target.value);

    const findByTitle = () => {
        if (searchTitle.trim() !== "")
            dispatch(findTutorialsByTitle(searchTitle.trim()));
    };

    const resetSearchBox = () => {
        setSearchTitle("");
        dispatch(fetchAllTutorials());
    }


    const deleteAllTutorials = () => {
        setShowModal(true);
        setDeleteAll(true);
    };

    const deleteTutorial = e => {
        setShowModal(true);
    }




    const setActiveTutorial = (tutorial, index) => {
        setSelectedTutorial(tutorial);
        setCurrentIndex(index);
    };

    const abortProsses = e => setShowModal(false);

    const completeProsses = e => {
        // debugger
        setShowModal(false);
        if (deleteAll) {
            dispatch(removeAllTutorials());
            setDeleteConfirmed(true);
        }
        else {
            if (selectedTutorial._id) {
                dispatch(removeTutorialById(selectedTutorial._id));
                setDeleteConfirmed(true);
            }
        }
    }
    // debugger
    let { error, message } = tutorial;

    return (
        <div className="row">
            <div className="col-md-6">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByTitle}>
                            Search
                        </button>

                        <button
                            className="btn btn-outline-primary m-lg-1"
                            type="button"
                            onClick={resetSearchBox}>
                            Reset
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="messagebox">
                    {deleteConfirmed && tutorial && error && (<div className="alert alert-danger"><p>{message}</p><p>{error}</p></div>)}
                    {deleteConfirmed && tutorial && !error && (<div className="alert alert-success"><p>{message}</p></div>)}
                </div>
            </div>
            <div className="col-md-6 dashed-border">
                <div className="">
                    {tutorials && tutorials.length > 0 ? (
                        <>
                            <h4>Tutorials List</h4>
                            <button
                                className="m-3 btn btn-sm btn-danger"
                                onClick={deleteAllTutorials}
                            > Remove All </button>
                        </>
                    ) : (
                        <h4>there is no item...</h4>
                    )}
                </div>
                <ul className="px-0">
                    {tutorials && tutorials.length > 0 && tutorials.map((item, index) =>
                        <li
                            key={index}
                            className={"list-group-item" + (currentIndex === index ? " active" : "")}
                            onClick={() => setActiveTutorial(item, index)}
                        >
                            {item.title}
                        </li>
                    )}
                </ul>
            </div>
            <div className="col-md-6 dashed-border" >
                {showModal && (
                    <>
                        <div className="modalOverlay" onClick={abortProsses}></div>
                        <ConfModal
                            title="Delete Items!"
                            cancled={abortProsses}
                            confirmed={completeProsses}>
                            Are you sure you want to delete item('s) ?
                        </ConfModal>
                    </>
                )}

                {selectedTutorial ? (
                    <div className="mt-3 text-center">
                        <h2>Tutorial details</h2>
                        <div>
                            <div className="my-2">
                                <span className="mx-3"><strong>Title:</strong></span>
                                <span>{selectedTutorial.title}</span>
                            </div>

                        </div>
                        <div>
                            <div className="my-2">
                                <span className="mx-3"><strong>Status:</strong></span>
                                <span>{selectedTutorial.status === 2 ? "Published" : "Pending"}</span>
                            </div>
                        </div>
                        <div>
                            <div className="my-2">
                                <span className="mx-3"><strong>Description:</strong></span>
                                <span>{selectedTutorial.description}</span>
                            </div>
                        </div>
                        <div className="my-5">
                            <Link to={"/tutorials/" + selectedTutorial._id} className="btn btn-warning btn-sm mx-lg-2">Edit</Link>
                            <Link data-tutorialid={selectedTutorial._id} to="/" className="btn btn-danger btn-sm" onClick={deleteTutorial}>Delete</Link>
                        </div>
                    </div>
                ) : (
                    <div className="mt-3">
                        <h4>No selected any item yet</h4>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TutorialsList;