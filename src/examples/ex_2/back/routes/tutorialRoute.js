const tutorialController = require("../controllers/tutorialController.js");
const basePath="/api/tutorials";
module.exports = function (app) {

	app.get(basePath, tutorialController.fetchAll);
	app.get(`${basePath}/:id`, tutorialController.fetchOne);
	//---------------------------------------
	app.post(`${basePath}/qp`, tutorialController.findBy);
	app.post(basePath, tutorialController.add);
	//---------------------------------------
	app.put(basePath, tutorialController.update);
	//---------------------------------------
	app.delete(`${basePath}/:id`, tutorialController.delete);
	app.delete(basePath, tutorialController.deleteAll);
};
