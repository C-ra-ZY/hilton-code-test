// app.js


class AppBootHook {
	constructor(app) {
		this.app = app;
	}

	configWillLoad() {
	}

	async didLoad() {
	}

	async willReady() {
		await this.app.model.User.findOrCreate({
			userName: "admin",
		}, {
			userName: "admin",
			passwordHash: this.app.saltHashPassword("admin").passwordHash,
			type: "employee",
			contactInfo: "admin"
		});
	}

	async didReady() {
	}

	async serverDidReady() {
	}
}

module.exports = AppBootHook;