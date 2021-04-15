"use strict";

const Controller = require("egg").Controller;
const { Types } = require("mongoose");
class ReservationController extends Controller {
	async login() {
		const { ctx, app } = this; 
		const { username, password } = ctx.request.body; 
		const user = (await ctx.model.User.find({ userName: username })).find((e) => {
			return e.passwordHash === this.app.saltHashPassword(password).passwordHash;
		});

		if (user) {
			const token = app.jwt.sign(
				{
					name: user.userName,
					type: user.type,
					contactInfo: user.contactInfo,
				},
				app.config.jwt.secret
			);
			ctx.body = {
				code: 200,
				token,
			};
		} else {
			ctx.status = 401;
		}
	}

	async update() {
		const { ctx } = this;
		const { body: user } = ctx.request;
		const id = ctx.params.id;
		await ctx.model.User.update({ _id: Types.ObjectId(id) }, user);
		ctx.response.status = 204;
	}

	async delete() {
		const { ctx } = this;
		const id = ctx.params.id;
		await ctx.model.Reservation.deleteOne({ _id: Types.ObjectId(id) });
		ctx.response.status = 204;
	}

	async create() {
		const { ctx } = this;
		const { body: user } = ctx.request;
		let exists = await ctx.model.User.findOne({ userName: user.nickname });
		if (exists) {
			ctx.status = 409;
			return;
		}
		const User = ctx.model.User;
		const newUser = new User();
		newUser.type = "guest";
		newUser.userName = user.nickname;
		newUser.contactInfo = user.phone;
		newUser.passwordHash = this.app.saltHashPassword(user.password).passwordHash;
		await newUser.save();
		ctx.response.status = 204;
	}
}

module.exports = ReservationController;
