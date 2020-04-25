let mongoose = require("mongoose")

const Schema = mongoose.Schema


const ProxySchema = new Schema({
	name: { type: String },
	region: { type: String },
	ip: { type: String },
	port: { type: String },
	date_created: { type: Date }
})

const Proxies = mongoose.model("Proxies", ProxySchema)

module.exports = Proxies
