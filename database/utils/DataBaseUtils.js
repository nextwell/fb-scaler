let mongoose = require("mongoose"),
	Users = require("./UsersUtils"),
	Proxies = require("./ProxiesUtils"),
	config = require("./../../config")

mongoose.Promise = global.Promise

module.exports.setUpConnection = () => {

	let MODE = process.env.MODE
	let DB_URL = config.DB_URL
	if (MODE == "DEVELOP") DB_URL = "mongodb://localhost:27017/fbscale"

	try {
		mongoose.connect(DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		})
	} catch (error) {
		console.log(error)
	}
}

module.exports.Users = Users
module.exports.Proxies = Proxies