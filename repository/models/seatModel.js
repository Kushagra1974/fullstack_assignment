import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
    seatNumber: {
        type: Number,
        required: true,
        unique: true
    },
    Occupied: {
        type: Boolean,
        default: false
    }
});


const Seat = mongoose.model("Seat", seatSchema);
export default Seat;
