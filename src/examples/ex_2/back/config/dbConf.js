const mongoose = require("mongoose");
const Tutorial = require('../models/tutorialModel.js');
const dummyTutorialData=require('../config/dummyTutorialData');
mongoose.connect(process.env.BD_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => {
    //Tutorial.countDocuments.drop();
    Tutorial.countDocuments((err, count) => {
        //insert seed data
        if (count == 0) {
            Tutorial.insertMany(dummyTutorialData).then(emp => {
                console.log(`${emp.length} Tutorials created`);
            }).catch((err) => {
                console.log(err);
            })
            // .finally(() => {
            //     mongoose.connection.close();
            // });
        }
    });
    console.log("connecting to database successfuly has done!");
}).catch(err => {
    console.log("error in conecting to db \n" + err);
});