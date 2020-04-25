let express = require("express"),
    path = require("path"),
    router = express.Router();

//----------------------------------------------------------------------------------------
// test

router.get("/", async (req, res) => {

    res.sendFile(path.join(__dirname + '/client/application/build/index.html'));
});

module.exports = router;



