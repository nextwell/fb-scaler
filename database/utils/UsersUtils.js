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
	return Users.find({ _id: ObjectID(_id) })
}

module.exports.get_by_params = async (_id) => {
	return Users.find(params)
}

module.exports.remove_by_params = async (_id) => {
	return Users.remove(params)
}
