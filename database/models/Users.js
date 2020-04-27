let mongoose = require("mongoose")

const Schema = mongoose.Schema


const UserSchema = new Schema({
	name: { type: String },
	access_token: { type: String },
	user_agent: { type: String },
	proxy_id: { type: String },
	date_created: { type: Date }
})

const Users = mongoose.model("Users", UserSchema)

module.exports = Users
