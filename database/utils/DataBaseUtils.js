let mongoose = require("mongoose"),
	Users = require("./UsersUtils"),
	Proxies = require("./ProxiesUtils"),
	BManagers = require("./B_ManagersUtils"),
	Ad_Accounts = require("./Ad_AccountsUtils"),
	Pages = require("./PagesUtils"),
	TCampaigns = require("./T_CampaignsUtils"),
	config = require("./../../config")

mongoose.Promise = global.Promise

module.exports.setUpConnection = () => {

	let DB_URL = config.DB_URL

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
module.exports.BManagers = BManagers
module.exports.AdAccounts = Ad_Accounts
module.exports.Pages = Pages

module.exports.TCampaigns = TCampaigns