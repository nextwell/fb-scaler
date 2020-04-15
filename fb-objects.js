let ad_set = require("./fb-models/ad-set"),
    ad_account = require("./fb-models/ad-account"),
    business_manager = require("./fb-models/business-manager"),
    campaign = require("./fb-models/campaign"),
    ad = require("./fb-models/ad")

let fb_objects = {
    ad_set: ad_set,
    ad_account: ad_account,
    bus_manager: business_manager,
    campaign: campaign,
    ad: ad
}

module.exports = fb_objects