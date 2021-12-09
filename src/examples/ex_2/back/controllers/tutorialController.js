const Tutorial = require('../models/tutorialModel');
let resModel = require('../models/responseModel');
const {
    TutorialNotExist,
    TutorialNotFound,
    ErrorInFindingTutorial,
    ErrorInFetchingCurrentTutorial_s,
    ErrorInAddingNewTutorial,
    ErrorInUpdatingCurrentTutorial,
    ErrorInDeletingCurrentTutorial,
    ErrorInDeletingTutorials,

    TutorialAddedSuccessfully,
    TutorialUpdatedSuccessfully,
    TutorialDeletedSuccessfully,
} = require('../constants/messages');



module.exports.fetchAll = async (req, res) => {
    try {
        resModel = setDefaultResponse();
        // const result = await Tutorial.find().select('-__v');
        var usersProjection = { __v: false };
        const result = await Tutorial.find({}, usersProjection);
        if (result && result.length > 0) {
            resModel.data = result;
        } else {
            resModel.message = TutorialNotExist;
        }
    } catch (error) {
        resModel = setErrorResponse(error, ErrorInFetchingCurrentTutorial_s);
    }
    res.json(resModel);
};

//@@@@@@@@@@@@@@@@@@@@

module.exports.fetchOne = async (req, res) => {
    try {
        resModel = setDefaultResponse();
        // const result = await Tutorial.findById(req.params.id);
        var usersProjection = { __v: false };
        const result = await Tutorial.findById(req.params.id, usersProjection);
        if (result) {
            resModel.data = result;
        } else {
            resModel.message = TutorialNotFound;
        }
    } catch (error) {
        resModel = setErrorResponse(error, ErrorInFindingTutorial);
    }
    res.json(resModel);
};
//@@@@@@@@@@@@@@@@@@@@

module.exports.add = async (req, res) => {
    try {
        resModel = setDefaultResponse();
        const newTutorial = new Tutorial({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
            // status: req.body.status
        });
        await newTutorial.save();

        resModel.data = newTutorial;
        resModel.message = TutorialAddedSuccessfully;
    } catch (error) {
        resModel = setErrorResponse(error, ErrorInAddingNewTutorial);
    }
    res.json(resModel);
};
//@@@@@@@@@@@@@@@@@@@@

module.exports.update = async (req, res) => {
    try {
        resModel = setDefaultResponse();
        const id = req.body._id;
        console.log(req.body);
        if (id) {
            const tutorialToUpdate = await Tutorial.findOne({ _id: id });
            if (tutorialToUpdate) {
                if (req.body.title) tutorialToUpdate.title = req.body.title;
                if (req.body.description) tutorialToUpdate.description = req.body.description;
                if (req.body.status) tutorialToUpdate.status = req.body.status;

                await tutorialToUpdate.save();

                resModel.data = tutorialToUpdate;
                resModel.message = TutorialUpdatedSuccessfully;
            } else {
                resModel.message = TutorialNotFound;
            }
        }
    } catch (error) {
        resModel = setErrorResponse(error, ErrorInUpdatingCurrentTutorial);
    }
    res.json(resModel);
};
//@@@@@@@@@@@@@@@@@@@@

module.exports.deleteAll = async (req, res) => {
    try {
        resModel = setDefaultResponse();
        let res = await Tutorial.deleteMany();
        if (res.deletedCount > 0) {
            resModel.message = `${res.deletedCount} ${TutorialDeletedSuccessfully} `;
        } else {
            resModel.message = TutorialNotFound;
        }
    } catch (error) {
        resModel = setErrorResponse(error, ErrorInDeletingTutorials);
    }
    res.json(resModel);
};

//@@@@@@@@@@@@@@@@@@@@

module.exports.delete = async (req, res) => {
    try {
        resModel = setDefaultResponse();
        const tutorialToDelete = await Tutorial.findByIdAndRemove(req.params.id);
        if (tutorialToDelete) {
            resModel.message = TutorialDeletedSuccessfully;
            resModel.data = req.params.id;//tutorialToDelete;
        } else {
            resModel.message = TutorialNotFound;
        }
    } catch (error) {
        resModel = setErrorResponse(error, ErrorInDeletingCurrentTutorial);
    }
    res.json(resModel);

};

//@@@@@@@@@@@@@@@@@@@@

exports.findBy = async (req, res) => {
    try {
        resModel = setDefaultResponse();
        let t = req.body?.title || "";
        let s = req.body?.status || -1;
        let result = null;

        if (t !== ""){
            //select * from tutorials where title like '%t%'
            result = await Tutorial.find({ title: {$regex: t, $options: 'i'} }, { __v: false });
        }

        if (s > 0)
            result = await Tutorial.find({ status: s }, { __v: false });
        
        resModel.data = result;
    } catch (error) {
        resModel = setErrorResponse(error, ErrorInFindingTutorial);
    }
    res.json(resModel);
};






const setDefaultResponse = (data = null, message = null) => {
    return {
        success: true,
        error: null,
        message: message,
        data: data
    }
};

const setErrorResponse = (error = null, message = null) => {
    return {
        success: false,
        error: error,
        message: message,
        data: null
    }
};