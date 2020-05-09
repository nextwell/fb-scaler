let fb_root = require("./root");

let fields = [
    "name"
];

class pixel_m extends fb_root {
    constructor(_fields) {
        super();
        this.fields = _fields;
    }
}

let object = new pixel_m(fields);

module.exports = object;