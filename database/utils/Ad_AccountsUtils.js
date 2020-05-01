let mongoose = require("mongoose"),
	Ad_Accounts = require("../models/Ad_Accounts")

let ObjectID = mongoose.Types.ObjectId

const Ad_Account = mongoose.model("AdAccounts")

module.exports.create = (data) => {
	let newObject = new Ad_Account(data)
	let promise = newObject.save()
	return promise
}


module.exports.get_byUserID = (user_id) => {
	return Ad_Accounts.find({ user_id: user_id })
}

module.exports.get_byUserID_BM = (user_id, bm_id) => {
	return Ad_Accounts.find({ user_id: user_id, business_id: bm_id })
}


module.exports.remove_byUserID = (user_id) => {
	return Ad_Accounts.remove({ user_id: user_id })
}



module.exports.get_byID = (bm_id) => {
	return Ad_Accounts.find({ id: bm_id })
}