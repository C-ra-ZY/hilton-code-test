"use strict";

const Controller = require("egg").Controller;
const {Types} = require("mongoose");

class ReservationController extends Controller {
	async index() {
		const {ctx} = this;
		await ctx.model.Reservation.create({
			user: new Types.ObjectId("6072e72599a484246cf8bdc2"),
			arrivalTime: new Date(),
			tableSet: 2,
			status: "pending",
		});
		ctx.body = await ctx.model.Reservation.find(
			{}
		); /* .cursor().pipe(ctx.res); */
	}

	async update() {
		const {ctx} = this;
		const {body: reservastion} = ctx.request;
		const id = ctx.params.id;
		await ctx.model.Reservation.update({_id: Types.ObjectId(id)}, reservastion);
		ctx.response.status = 204;
	}

	async delete() {
		const {ctx} = this;
		const id = ctx.params.id;
		await ctx.model.Reservation.deleteOne({_id: Types.ObjectId(id)});
		ctx.response.status = 204;
	}

	async create() {
		const {ctx} = this;
		const {body: reservastion} = ctx.request;
		await ctx.model.Reservation.create(reservastion);
		ctx.response.status = 204;
	}
}

module.exports = ReservationController;
