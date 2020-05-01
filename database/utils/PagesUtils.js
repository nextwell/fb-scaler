let mongoose = require("mongoose"),
	Pages = require("../models/Pages")

let ObjectID = mongoose.Types.ObjectId

const Page = mongoose.model("Pages")

module.exports.create = (data) => {
	let newObject = new Page(data)
	let promise = newObject.save()
	return promise
}


module.exports.get_byUserID = (user_id) => {
	return Pages.find({ user_id: user_id })
}

module.exports.get_byUserID_BM = (user_id, bm_id) => {
	return Pages.find({ user_id: user_id, business_id: bm_id })
}



module.exports.remove_byUserID = (user_id) => {
	return Pages.remove({ user_id: user_id })
}


module.exports.get_byID = (bm_id) => {
	return Pages.find({ id: bm_id })
}