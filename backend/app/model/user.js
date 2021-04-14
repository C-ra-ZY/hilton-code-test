module.exports = (app) => {
	const mongoose = app.mongoose;
	const Schema = mongoose.Schema;

	const UserSchema = new Schema(
		{
			userName: {type: String, unique: true, index: true, required: true},
			passwordHash: {type: String},
			type: {type: String},
			contactInfo: {type: String},
		},
		{collection: "user"}
	);

	return mongoose.model("User", UserSchema);
};
