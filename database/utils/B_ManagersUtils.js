let mongoose = require("mongoose"),
	BManagers = require("../models/Business_Managers")

let ObjectID = mongoose.Types.ObjectId

const BManager = mongoose.model("BManagers")

module.exports.create = (data) => {
	let newObject = new BManager(data)
	let promise = newObject.save()
	return promise
}


module.exports.get_byUserID = (user_id) => {
	return BManagers.find({ user_id: user_id })
}


module.exports.remove_byUserID = (user_id) => {
	return BManagers.remove({ user_id: user_id })
}


module.exports.get_byID = (bm_id) => {
	return BManagers.find({ id: bm_id })
}