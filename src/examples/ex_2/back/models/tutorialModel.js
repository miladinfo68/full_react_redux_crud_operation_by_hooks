const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tutorialSchema = new Schema({
    title: String,
    description: String,
    status: Number
}, { timestamps: true });

// tutorialSchema.method("toJSON", function () {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
// });

const Tutorial = mongoose.model("Tutorial", tutorialSchema);
module.exports = Tutorial;



