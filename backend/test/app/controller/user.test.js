"use strict";

const {app, mock} = require("egg-mock/bootstrap");

const guestJwt =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY2FybCIsInR5cGUiOiJndWVzdCIsImNvbnRhY3RJbmZvIjoiMTIzIiwiaWF0IjoxNjE4NDkwODU3fQ.OeC5L4CDM-YSQHIKztZb6qp9SQ8aJbFck_wb_4V3qlY";
const employeeJwt =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJ0eXBlIjoiZW1wbG95ZWUiLCJjb250YWN0SW5mbyI6ImFkbWluIiwiaWF0IjoxNjE4NDk0MDM4fQ.Ikb4n_EJBxQz3cRs0mLtVaZgIdnTs-92WydPVNlp7FI";

describe("test/app/controller/user.test.js", () => {
	it("login 200", () => {
		const jwt = app.jwt.sign({
			name: "carl",
			type: "guest",
			contactInfo: "123",
		});
		const ctx = app.mockContext({});
		mock(ctx.model.User, "findOne", (headers) => {
			return {
				type: "guest",
				userName: "carl",
				contactInfo: "123",
				passwordHash:
					"c20a992baa4f76930b7fbf2006a64fb32d1b4be60b5dc9c64f7d37e475a843512977aa701d19ca06df2a0003a9efff34d7740917465ba90127f8ff0bc0528399",
			};
		});
		mock(app.jwt, "sign", (headers) => {
			return jwt;
		});
		return app
			.httpRequest()
			.post("/login")
			.send({username: "carl", password: "123"})
			.expect(200, {
				code: 200,
				token: jwt,
			});
	});
	it("login 401", () => {
		const jwt = app.jwt.sign({
			name: "carl",
			type: "guest",
			contactInfo: "123",
		});
		const ctx = app.mockContext({});
		mock(ctx.model.User, "findOne", (headers) => {
			return;
		});
		mock(app.jwt, "sign", (headers) => {
			return jwt;
		});
		return app
			.httpRequest()
			.post("/login")
			.send({username: "carl", password: "123"})
			.expect(401);
	});

	it("create 409", () => {
		const ctx = app.mockContext({});
		mock(ctx.model.User, "findOne", (headers) => {
			return {username: "carl"};
		});
		// mock(app.jwt, "sign", (headers) => {
		// 	return jwt;
		// });
		return (
			app
				.httpRequest()
				.post("/user")
				.send({username: "carl", password: "123"})
				// .send({username: "carl", password: "123"})
				.expect(409)
		);
	});

	it("create 204", () => {
		const ctx = app.mockContext({});
		mock(ctx.model.User, "findOne", (headers) => {
			return;
		});
		mock(app, "saltHashPassword", function () {
			return {
				passwordHash: "123",
			};
		});
		mock(ctx.model.User.prototype, "save", (headers) => {
			return;
		});
		// mock(app.jwt, "sign", (headers) => {
		// 	return jwt;
		// });
		return (
			app
				.httpRequest()
				.post("/user")
				.send({username: "carl", password: "123"})
				// .send({username: "carl", password: "123"})
				.expect(204)
		);
	});
});
