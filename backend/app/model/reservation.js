module.exports = (app) => {
	const mongoose = app.mongoose;
	const Schema = mongoose.Schema;

	const ReservationSchema = new Schema(
		{
			user: {type: Schema.Types.ObjectId, ref: "User"},
			contactInfo: {type: String},
			guestName: {type: String},
			arrivalTime: {type: Date},
			tableSet: {type: Number},
			status: {type: String},
		},
		{collection: "reservation"}
	);

	return mongoose.model("Reservation", ReservationSchema);
};
