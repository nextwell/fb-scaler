let fb_root = require("./root");

let fields = [
    "id",
    "account_id",
    "account_status",
    "age",
    "agency_client_declaration",
    "amount_spent",
    "attribution_spec",
    "balance",
    "business",
    "business_city",
    "business_country_code",
    "business_name",
    "business_state",
    "business_street",
    "business_street2",
    "business_zip",
    "can_create_brand_lift_study",
    "created_time",
    "currency",
    "disable_reason",
    "end_advertiser",
    "end_advertiser_name",
    "extended_credit_invoice_group",
    "failed_delivery_checks",
    "fb_entity",
    "funding_source",
    "funding_source_details",
    "has_migrated_permissions",
    "io_number",
    "is_attribution_spec_system_default",
    "is_direct_deals_enabled",
    "is_in_3ds_authorization_enabled_market",
    "is_in_middle_of_local_entity_migration",
    "is_notifications_enabled",
    "is_personal",
    "is_prepay_account",
    "is_tax_id_required",
    "line_numbers",
    "media_agency",
    "min_campaign_group_spend_cap",
    "min_daily_budget",
    "name",
    "offsite_pixels_tos_accepted",
    "owner",
    "partner",
    // "rf_spec",
    "spend_cap",
    "tax_id",
    "tax_id_status",
    "tax_id_type",
    "timezone_id",
    "timezone_name",
    "timezone_offset_hours_utc",
    "tos_accepted",
    "user_tasks",
    "user_tos_accepted"

    //"capabilities",

    //"ad_account_creation_request",
    //"ad_account_promotable_objects",
    //"direct_deals_tos_accepted",
    // "has_page_authorized_adaccount",
    // "show_checkout_experience",
];

class ad_account_m extends fb_root {
    constructor(_fields) {
        super();
        this.fields = _fields;
    }
    status(code) {
        let status_msg
        switch (code) {
            case 1: status_msg = "ACTIVE"; break;
            case 2: status_msg = "DISABLED"; break;
            case 3: status_msg = "UNSETTLED"; break;
            case 7: status_msg = "PENDING_RISK_REVIEW"; break;
            case 8: status_msg = "PENDING_SETTLEMENT"; break;
            case 9: status_msg = "IN_GRACE_PERIOD"; break;
            case 100: status_msg = "PENDING_CLOSURE"; break;
            case 101: status_msg = "CLOSED"; break;
            case 201: status_msg = "ANY_ACTIVE"; break;
            case 202: status_msg = "ANY_CLOSED"; break;
        }
        return status_msg
    }
}

let object = new ad_account_m(fields);

module.exports = object;
