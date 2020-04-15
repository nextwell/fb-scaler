let fb_root = require("./root");

let fields = [
    "name",
    "timezone_id",
    "primary_page",
    "id",
    "update_time",
    "updated_by",
    "creation_time",
    "created_by"
];

class bm_m extends fb_root {
    constructor(_fields) {
        super();
        this.fields = _fields;
    }
}

let object = new bm_m(fields);

module.exports = object;