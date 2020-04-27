let fb_root = require("./root");

let fields = [
    "id",
    "name"
];

class page_m extends fb_root {
    constructor(_fields) {
        super();
        this.fields = _fields;
    }
}

let object = new page_m(fields);

module.exports = object;