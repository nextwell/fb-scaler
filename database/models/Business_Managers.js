let mongoose = require("mongoose")

const Schema = mongoose.Schema


const BMSchema = new Schema({
	id: { type: String },
	user_id: { type: String },
	data: { type: Object }
})

const BManagers = mongoose.model("BManagers", BMSchema)

module.exports = BManagers
