"use strict";

const {app, mock} = require("egg-mock/bootstrap");

const guestJwt =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY2FybCIsInR5cGUiOiJndWVzdCIsImNvbnRhY3RJbmZvIjoiMTIzIiwiaWF0IjoxNjE4NDkwODU3fQ.OeC5L4CDM-YSQHIKztZb6qp9SQ8aJbFck_wb_4V3qlY";
const employeeJwt =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJ0eXBlIjoiZW1wbG95ZWUiLCJjb250YWN0SW5mbyI6ImFkbWluIiwiaWF0IjoxNjE4NDk0MDM4fQ.Ikb4n_EJBxQz3cRs0mLtVaZgIdnTs-92WydPVNlp7FI";
describe("test/app/controller/reservation.test.js", () => {
	/* it('should assert', () => {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  }); */

	it("get 200 guest", () => {
		const ctx = app.mockContext({});
		mock(ctx.model.User, "findOne", (headers) => {
			return {};
		});
		mock(ctx.model.Reservation, "find", (headers) => {
			return [];
		});
		return app
			.httpRequest()
			.get("/reservation")
			.set("authorization", "bearer " + guestJwt)
			.expect(200)
			.expect([]);
	});
	it("get 200 employee", () => {
		const ctx = app.mockContext({});
		mock(ctx.model.Reservation, "find", (headers) => {
			return [];
		});
		return app
			.httpRequest()
			.get("/reservation")
			.set("authorization", "bearer " + employeeJwt)
			.expect(200)
			.expect([]);
	});
	it("get 404 nobody", () => {
		const nobodyJwt = app.jwt.sign({
			name: "nobody",
			type: "nobody",
			contactInfo: "",
		});
		const ctx = app.mockContext({});
		return app
			.httpRequest()
			.get("/reservation")
			.set("authorization", "bearer " + nobodyJwt)
			.expect(404);
	});

	it("get 404 failed to parse jwt", () => {
		const nobodyJwt = app.jwt.sign({
			name: "nobody",
			type: "nobody",
			contactInfo: "",
		});
		mock(app, "jwtObj", (...args) => {
			return null;
		});
		return app
			.httpRequest()
			.get("/reservation")
			.set("authorization", "bearer " + nobodyJwt)
			.expect(404);
	});
	it("put 204", () => {
		const ctx = app.mockContext({});
		const id = new app.mongoose.Types.ObjectId();
		mock(ctx.model.Reservation, "updateOne", (headers) => {
			return;
		});
		return app
			.httpRequest()
			.put("/reservation/" + id.toHexString())
			.set("authorization", "bearer " + guestJwt)
			.expect(204);
	});

	it("delete 204", () => {
		const ctx = app.mockContext({});
		const id = new app.mongoose.Types.ObjectId();
		mock(ctx.model.Reservation, "updateOne", (headers) => {
			return;
		});
		return app
			.httpRequest()
			.put("/reservation/" + id.toHexString())
			.set("authorization", "bearer " + guestJwt)
			.expect(204);
	});
	it("create 204", () => {
		const ctx = app.mockContext({});
		const id = new app.mongoose.Types.ObjectId();
		mock(ctx.model.User, "findOne", (headers) => {
			return {user: id.toHexString(), status: "Pending"};
		});
		mock(ctx.model.Reservation, "create", (headers) => {
			return {};
		});
		return app
			.httpRequest()
			.post("/reservation")
			.send({operatorName: "test"})
			.set("authorization", "bearer " + guestJwt)
			.expect(204);
	});
});
