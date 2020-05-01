let mongoose = require("mongoose")

const Schema = mongoose.Schema


const Ad_Account_Schema = new Schema({
	id: { type: String },
	user_id: { type: String },
	business_id: { type: String },
	data: { type: Object }
})

const AdAccounts = mongoose.model("AdAccounts", Ad_Account_Schema)

module.exports = AdAccounts
