module.exports = (app) => {
	const mongoose = app.mongoose;
	const Schema = mongoose.Schema;

	const ReservationSchema = new Schema(
		{
			user: { type: Schema.Types.ObjectId, ref: "User", required: true },
			contactInfo: { type: String, required: true },
			guestName: { type: String, required: true },
			arrivalTime: { type: Date, required: true },
			tableSize: { type: Number, required: true },
			status: { type: String, required: true },
		},
		{ collection: "reservation" }
	);

	return mongoose.model("Reservation", ReservationSchema);
};
