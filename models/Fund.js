const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FundSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    SchemeCode: {
        type: String,
        required: true
    },
    purchaseNAV: {
        type: Number,
        required: true
    },
    numberOfUnits: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model("funds",FundSchema);