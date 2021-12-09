const TYPES_EMPTY = "TYPES_EMPTY";
const TYPES_INVALID_ID = "TYPES_INVALID_ID";
const TYPES_INVALID_FORMAT = "TYPES_INVALID_FORMAT";
const TYPES_INVALID_EMAIL_FORMAT = "TYPES_INVALID_EMAIL_FORMAT";

const ERROR_TYPES_EMPTY = "Can't be empty.";
const ERROR_TYPES_INVALID_FORMAT = "Format is incorrect.";
const ERROR_TYPES_INVALID_ID = "Can't be negative or zero.";
const ERROR_TYPES_INVALID_EMAIL_FORMAT = "Invalid email format.";

const objectIsIterable = (obj) => {
    if (!obj) return false
    return typeof obj[Symbol.iterator] === 'function'
}

const defaultValue4TutorialState = (model = null) => {

    const isIteratable = objectIsIterable(model);

    // debugger
    //[{} ,{},...] 
    //many records
    if (isIteratable) return model;

    //{data:{} ,error ,message ,success}
    //only one record
    if (!isIteratable && model?.data) return model;

    //when deleteAll is done
    if (!isIteratable && !model?.data && (model?.message || model?.error)) return model;

    const dataModel = {
        _id: '-1',
        title: '',
        description: '',
        status: 0
    }
    const data = isIteratable ? Array.from(dataModel) : dataModel
    return {
        data: data,
        success: true,
        error: null,
        message: null,
    }

}



const ckeckInputIsFalsy = (input) => {
    let isFalsy = false;
    if (checkInputType(input) === 'string' && !input) isFalsy = true;
    if (checkInputType(input) === 'number' && input == 0) isFalsy = true;
    return isFalsy;
}

function checkInputType(input) {
    const obj = Object.prototype.toString.call(input);
    const type = obj.substring(obj.indexOf(" ") + 1, obj.indexOf("]"));
    return type.toLowerCase();
}

export {
    TYPES_EMPTY,
    TYPES_INVALID_ID,
    TYPES_INVALID_FORMAT,
    TYPES_INVALID_EMAIL_FORMAT,

    ERROR_TYPES_EMPTY,
    ERROR_TYPES_INVALID_ID,
    ERROR_TYPES_INVALID_FORMAT,
    ERROR_TYPES_INVALID_EMAIL_FORMAT,

    defaultValue4TutorialState,
    ckeckInputIsFalsy,
    checkInputType
}




