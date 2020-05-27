let mongoose = require("mongoose"),
	Image = require("../models/Images.js")

let ObjectID = mongoose.Types.ObjectId

const Images = mongoose.model("Images")

module.exports.create = (data) => {
	let newObject = new Image(data)
	let promise = newObject.save()
	return promise
}

module.exports.get_by_id = async (_id) => {
	return Images.findOne({ _id: ObjectID(_id) })
}