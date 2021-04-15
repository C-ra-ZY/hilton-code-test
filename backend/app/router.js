"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
	const {router, controller} = app;
	router.get("/reservation", app.jwt, controller.reservation.index);
	router.put("/reservation/:id", app.jwt, controller.reservation.update);
	router.post("/reservation", app.jwt, controller.reservation.create);
	router.delete("/reservation/:id", app.jwt, controller.reservation.delete);
	router.post("/login", controller.user.login);
	router.post("/user", controller.user.create);
	// router.put("/user", app.jwt, controller.user.update);
	// router.delete("/user", app.jwt, controller.user.delete);
	router.redirect('/','/index.html')
};
