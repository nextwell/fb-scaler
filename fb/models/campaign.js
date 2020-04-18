let fb_root = require("./root");

let fields = [
    "adlabels",
    "bid_strategy",
    "budget_rebalance_flag",
    "buying_type",
    "daily_budget",
    "execution_options",
    "iterative_split_test_configs",
    "lifetime_budget",
    "name",
    "objective",
    "promoted_object",
    "source_campaign_id",
    "special_ad_category",
    "spend_cap",
    "status",
    "topline_id",
    "upstream_events"
];

class campaign_m extends fb_root {
    constructor(_fields) {
        super();
        this.fields = _fields;
    }
}

let object = new campaign_m(fields);

module.exports = object;