let fb_root = require("./root");

let fields = [
    "id",
    "account_id",
    "ad_review_feedback",
    "adlabels",
    "adset",
    "adset_id",
    "bid_amount",
    "campaign",
    "campaign_id",
    "configured_status",
    "created_time",
    "creative",
    "effective_status",
    "issues_info",
    "last_updated_by_app_id",
    "name",
    "recommendations",
    "source_ad",
    "source_ad_id",
    "status",
    "tracking_specs",
    "updated_time",


    //"preview_shareable_link",
];

class ad_m extends fb_root {
    constructor(_fields) {
        super();
        this.fields = _fields;
    }
}

let object = new ad_m(fields);

module.exports = object;