const LocalStrategy = require("passport-local").Strategy;

module.exports = (app) => {
	/* app.passport.use(
		new LocalStrategy(
			{
				passReqToCallback: true,
			},
			(req, username, password, done) => {
				// format user
				const user = {
					provider: "local",
					username,
					password,
				};
				app.passport.doVerify(req, user, done);
			}
		)
	);

	app.passport.verify(async (ctx, user) => {});
	app.passport.serializeUser(async (ctx, user) => {});
	app.passport.deserializeUser(async (ctx, user) => {}); */
};
