"use strict";

const Controller = require("egg").Controller;
const { Types } = require("mongoose");

class ReservationController extends Controller {
	async index() {
		const { ctx } = this;
		let jwtObj = this.app.jwtObj(ctx.get("authorization"))
		if (!jwtObj) {
			ctx.status = 404
		} else {
			switch (jwtObj.type) {
				case "guest":
					let user = await ctx.model.User.findOne({ userName: jwtObj.name })
					ctx.body = await ctx.model.Reservation.find(
						{ user }
					);
					break;
				case "employee":
					ctx.body = await ctx.model.Reservation.find({});
					break;
				default:
					ctx.status = 404
					break;
			}
		}
	}

	async update() {
		const { ctx } = this;
		const { body: reservation } = ctx.request;
		const id = ctx.params.id;
		await ctx.model.Reservation.updateOne(
			{ _id: Types.ObjectId(id) },
			reservation
		);
		ctx.response.status = 204;
	}

	async delete() {
		const { ctx } = this;
		const id = ctx.params.id;
		await ctx.model.Reservation.updateOne(
			{ _id: Types.ObjectId(id) },
			{ status: "Cancelled" }
		);
		ctx.response.status = 204;
	}

	async create() {
		const { ctx } = this;
		const { body: reservation } = ctx.request;
		const user = await ctx.model.User.findOne({
			userName: reservation.operatorName,
		});
		await ctx.model.Reservation.create({
			...reservation,
			user: user["_id"],
			status: "Pending",
		});
		ctx.response.status = 204;
	}
}

module.exports = ReservationController;
