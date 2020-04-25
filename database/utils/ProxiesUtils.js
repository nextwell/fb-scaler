let mongoose = require("mongoose"),
	Proxies = require("../models/Proxies.js")

let ObjectID = mongoose.Types.ObjectId

const Proxy = mongoose.model("Proxies")

module.exports.create = (proxy_d) => {
	let newObject = new Proxy(proxy_d)
	let promise = newObject.save()
	return promise
}


module.exports.get_all = async () => {
	return Proxies.find({})
}


module.exports.get_by_id = async (_id) => {
	return Proxies.find({ _id: ObjectID(_id) })
}

module.exports.remove_by_id = async (_id) => {
	return Proxies.remove({ _id: ObjectID(_id) })
}

module.exports.get_by_params = async (_id) => {
	return Proxies.find(params)
}

module.exports.remove_by_params = async (_id) => {
	return Proxies.remove(params)
}
