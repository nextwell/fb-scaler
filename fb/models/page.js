let fb_root = require("./root");

let fields = [
    "id",
    "name",
    "temporary_status",
    "is_permanently_closed",
    "can_checkin",
    "can_post",
    "is_messenger_platform_bot",
    "is_messenger_bot_get_started_enabled",
    "merchant_review_status",
    "promotion_eligible",
    "promotion_ineligible_reason"
];

class page_m extends fb_root {
    constructor(_fields) {
        super();
        this.fields = _fields;
    }
}

let object = new page_m(fields);

module.exports = object;