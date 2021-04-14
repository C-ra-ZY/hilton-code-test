"use strict";

const Controller = require("egg").Controller;

class IndexController extends Controller {
	async index() {
		const {ctx} = this;
		ctx.render("index.html");
	}
}

module.exports = IndexController;
