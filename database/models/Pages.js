let mongoose = require("mongoose")

const Schema = mongoose.Schema


const PagesSchema = new Schema({
	id: { type: String },
	user_id: { type: String },
	business_id: { type: String },
	data: { type: Object }
})

const Pages = mongoose.model("Pages", PagesSchema)

module.exports = Pages
