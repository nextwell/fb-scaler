let fb_root = require("./root");

let fields = [
    "id",
    "account_id",
    "adlabels",
    "adset_schedule",
    "asset_feed_id",
    "attribution_spec",
    "bid_adjustments",
    "bid_amount",
    "bid_constraints",
    "bid_info",
    "bid_strategy",
    "billing_event",
    "budget_remaining",
    "campaign",
    "campaign_id",
    "configured_status",
    "created_time",
    "creative_sequence",
    "daily_budget",
    "daily_min_spend_target",
    "daily_spend_cap",
    "destination_type",
    "effective_status",
    "end_time",
    "frequency_control_specs",
    "full_funnel_exploration_mode",
    "instagram_actor_id",
    "is_dynamic_creative",
    "issues_info",
    "learning_stage_info",
    "lifetime_budget",
    "lifetime_imps",
    "lifetime_min_spend_target",
    "lifetime_spend_cap",
    "name",
    "optimization_goal",
    "optimization_sub_event",
    "pacing_type",
    "promoted_object",
    "recommendations",
    "recurring_budget_semantics",
    "review_feedback",
    "rf_prediction_id",
    "source_adset",
    "source_adset_id",
    "start_time",
    "status",
    "targeting",
    "time_based_ad_rotation_id_blocks",
    "time_based_ad_rotation_intervals",
    "updated_time",
    "use_new_app_click"
];

class ad_set_m extends fb_root {
    constructor(_fields) {
        super();
        this.fields = _fields;
    }
}

let object = new ad_set_m(fields);

module.exports = object;