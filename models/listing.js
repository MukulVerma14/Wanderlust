const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    description : String,
    image: {
    filename: {
        type: String,
        default: "listingimage"
      },
    url: String,
    },
    price : Number,
    location : String,
    country : String,
    reviews : [
      {
        type : Schema.Types.ObjectId,
        ref : "Review",
      },
    ],
    owner : {
      type : Schema.Types.ObjectId,
      ref : "User",
    },
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;