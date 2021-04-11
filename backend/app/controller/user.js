"use strict";

const Controller = require("egg").Controller;
const {Types} = require("mongoose");
const crypto = require("crypto");

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function (length) {
	return crypto
		.randomBytes(Math.ceil(length / 2))
		.toString("hex") /** convert to hexadecimal format */
		.slice(0, length); /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = function (password, salt) {
	var hash = crypto.createHmac("sha512", salt); /** Hashing algorithm sha512 */
	hash.update(password);
	var value = hash.digest("hex");
	return {
		salt: salt,
		passwordHash: value,
	};
};

function saltHashPassword(userpassword) {
	var salt = genRandomString(16); /** Gives us salt of length 16 */
	return sha512(userpassword, salt);
	/* console.log("UserPassword = " + userpassword);
	console.log("Passwordhash = " + passwordData.passwordHash);
	console.log("nSalt = " + passwordData.salt); */
}

class ReservationController extends Controller {
	async index() {
		const {ctx} = this;
		await ctx.model.User.find({}).cursor().pipe(ctx.res);
		/* for await (const doc of ctx.model.User.find({})) {
			ctx.response.res.write(JSON.stringify(doc));
		} */
	}

	async update() {
		const {ctx} = this;
		const {body: user} = ctx.request;
		const id = ctx.params.id;
		await ctx.model.User.update({_id: Types.ObjectId(id)}, user);
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
		const {body: user} = ctx.request;
		const User = ctx.model.User;
		const newUser = new User({
			type: "guest",
			username: user.nickname,
			ontactInfo: user.phone,
			passwordHash: saltHashPassword(user.password).passwordHash,
		});
		await newUser.save();
		ctx.response.status = 204;
	}
}

module.exports = ReservationController;
