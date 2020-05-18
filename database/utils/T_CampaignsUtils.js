let mongoose = require("mongoose"),
	TCampaigns = require("../models/Template_Campaigns")

let ObjectID = mongoose.Types.ObjectId

const TCampaign = mongoose.model("TCampaigns")

module.exports.create = (data) => {
	let newObject = new TCampaign(data)
	let promise = newObject.save()
	return promise
}


module.exports.get_all = () => {
	return TCampaigns.find({})
}
