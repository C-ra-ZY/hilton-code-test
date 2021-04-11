const mongoose = require("mongoose");
(async () => {
	const UserSchema = new mongoose.Schema(
		{
			// _id: Schema.Types.ObjectId,
			userName: {type: String},
			passwordHash: {type: String},
			type: {type: String},
			contactInfo: {type: String},
		},
		{collection: "user"}
	);

	var connection = await mongoose.createConnection(
		"mongodb://localhost:27017/reservation"
	);
	const UserModel = connection.model("User", UserSchema);
	await UserModel.create({
		userName: "111",
		passwordHash: "111",
		type: "guest",
		contactInfo: "111",
	});
	console.log("successfully");
})();
