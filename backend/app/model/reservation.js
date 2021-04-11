module.exports = (app) => {
	const mongoose = app.mongoose;
	const Schema = mongoose.Schema;

	const ReservationSchema = new Schema(
		{
			user: {type: Schema.Types.ObjectId, ref: "User"},
			arrivalTime: {type: Date},
			tableSet: {type: Number},
			status: {type: String},
		},
		{collection: "reservation"}
	);

	return mongoose.model("Reservation", ReservationSchema);
};
