let mongoose = require("mongoose"),
	Users = require("../models/Users.js")

let ObjectID = mongoose.Types.ObjectId

const User = mongoose.model("Users")

module.exports.create = (user_d) => {
	let newObject = new User(user_d)
	let promise = newObject.save()
	return promise
}


module.exports.get_all = async () => {
	return Users.find({})
}


module.exports.get_by_id = async (_id) => {
	return Users.findOne({ _id: ObjectID(_id) })
}

module.exports.remove_by_id = async (_id) => {
	return Users.deleteOne({ _id: ObjectID(_id) })
}

module.exports.get_by_params = async (params) => {
	return Users.find(params)
}

module.exports.remove_by_params = async (params) => {
	return Users.remove(params)
}

//----------------------------------------------------------------------------------------
// Update User status

module.exports.update = (object) => {
	return Users.update({ _id: ObjectID(object._id) }, { $set: object.action });
}