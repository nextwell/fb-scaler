let express = require("express"),
    router = express.Router();

//----------------------------------------------------------------------------------------
// test

router.get("/", async (req, res) => {

    res.json({ success: true })
});

module.exports = router;



