let mongoose = require("mongoose")

const Schema = mongoose.Schema


const ImagesSchema = new Schema({
	name: { type: String },
	img: { type: String }
})

const Images = mongoose.model("Images", ImagesSchema)

module.exports = Images
