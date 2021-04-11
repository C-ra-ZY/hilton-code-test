"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
	const {router, controller} = app;
	router.get("/reservation", controller.reservation.index);
	router.put("/reservation", controller.reservation.update);
	router.post("/reservation", controller.reservation.create);
	router.delete("/reservation", controller.reservation.delete);
	// router.post("/login",controller.user.create)
	router.get("/user", controller.user.index);
	router.post("/user", controller.user.create);
	router.put("/user", controller.user.update);
	router.delete("/user", controller.user.delete);
};
