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
	// var salt = genRandomString(16); /** Gives us salt of length 16 */
	var salt = "123456";
	return sha512(userpassword, salt);
	/* console.log("UserPassword = " + userpassword);
	console.log("Passwordhash = " + passwordData.passwordHash);
	console.log("nSalt = " + passwordData.salt); */
}

class ReservationController extends Controller {
	async login() {
		const {ctx, app} = this; // post请求传来的参数
		const {username, password} = ctx.request.body; // 判断数据库里面是否存在该用户
		const user = (await ctx.model.User.find({userName: username})).find((e) => {
			return e.passwordHash === saltHashPassword(password).passwordHash;
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
		let exists = await ctx.model.User.findOne({usernName: user.nickname});
		if (exists) {
			ctx.status = 409;
			return;
		}
		const User = ctx.model.User;
		const newUser = new User();
		newUser.type = "guest";
		newUser.userName = user.nickname;
		newUser.contactInfo = user.phone;
		newUser.passwordHash = saltHashPassword(user.password).passwordHash;
		await newUser.save();
		ctx.response.status = 204;
	}
}

module.exports = ReservationController;
