let ad_set_c = require("./fb/controllers/C_ad-set");
let ad_account_c = require("./fb/controllers/C_ad-account");
let business_manager_c = require("./fb/controllers/C_business-manager");
let page_c = require("./fb/controllers/C_page");
let campaign_c = require("./fb/controllers/C_campaign");
let pixel_c = require("./fb/controllers/C_pixel");
let ad_c = require("./fb/controllers/C_ad");




let fb_objects = {
    ad_set: ad_set_c,
    ad_account: ad_account_c,
    bus_manager: business_manager_c,
    page: page_c,
    campaign: campaign_c,
    pixel: pixel_c,
    ad: ad_c
}

module.exports = fb_objects