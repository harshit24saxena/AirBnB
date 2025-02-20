const mongoose = require("mongoose");
const { type } = require("os");

const placeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  address: String,
  country: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: Date,
  checkOut: Date,
  maxGuests: Number,
  price: Number,
});

const PlaceModel = mongoose.model("place", placeSchema);

module.exports = PlaceModel;
