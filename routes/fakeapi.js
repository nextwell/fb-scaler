let express = require("express"),
    path = require("path"),
    router = express.Router();

//----------------------------------------------------------------------------------------
// test

router.get("/fb/id", async (req, res) => {

    res.json({ id: 1 })
});

router.get("/fb/image", async (req, res) => {

    console.log(req.body)
});


module.exports = router;



