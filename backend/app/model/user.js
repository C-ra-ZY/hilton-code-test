const findOrCreate = require('mongoose-findorcreate')

module.exports = (app) => {
	const mongoose = app.mongoose;
	const Schema = mongoose.Schema;

	const UserSchema = new Schema(
		{
			userName: { type: String, unique: true, index: true, required: true },
			passwordHash: { type: String, required: true },
			type: { type: String, required: true },
			contactInfo: { type: String, required: true },
		},
		{ collection: "user" }
	);
	UserSchema.plugin(findOrCreate);

	return mongoose.model("User", UserSchema);
};
