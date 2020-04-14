let express = require("express");
let router = express.Router();
let path = require('path');

//----------------------------------------------------------------------------------------
// Currency functions

router.get("/", async (req, res) => {
    res.sendFile(path.resolve('client/list.html'));
});

module.exports = router;
