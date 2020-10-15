const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CryptoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    cryptoCode: {
        type: String,
        required: true
    },
    purchasePrice: {
        type: Number,
        required: true
    },
    numberOfCoins: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model("crypto",CryptoSchema);