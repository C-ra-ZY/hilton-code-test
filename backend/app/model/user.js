module.exports = (app) => {
	const mongoose = app.mongoose;
	const Schema = mongoose.Schema;

	const UserSchema = new Schema(
		{
			// _id: Schema.Types.ObjectId,
			userName: {type: String},
			passwordHash: {type: String},
			type: {type: String},
			contactInfo: {type: String},
		},
		{collection: "user"}
	);

	return mongoose.model("User", UserSchema);
};
