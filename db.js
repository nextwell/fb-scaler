let db = require("./database/utils/DataBaseUtils.js")

db.setUpConnection()

// db.Proxies.remove_by_params({})
// db.Users.remove_by_params({})

module.exports = db
