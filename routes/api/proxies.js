let express = require("express"),
    db = require("./../../db"),
    router = express.Router();

//----------------------------------------------------------------------------------------
// proxies routes

router.post("/new", async (req, res) => {
    let _new = await db.Proxies.create({
        name: req.body.name,
        region: req.body.region,
        ip: req.body.ip,
        port: req.body.port,
        date_created: new Date()
    })
    console.log(_new)
    res.json({ success: true, obj: _new })
});

router.get("/", async (req, res) => {
    let proxies = await db.Proxies.get_all()
    res.json(proxies)
});

router.get("/:id", async (req, res) => {
    let _id = req.params.id
    try {
        let proxy = await db.Proxy.get_by_id(_id)
        res.json(proxy)
    } catch (error) {
        // console.log(error)
        res.json({ err: "Error" })
    }
});

router.get("/remove/:id", async (req, res) => {
    let _id = req.params.id
    console.log(_id)
    try {
        let ans = await db.Proxies.remove_by_id(_id)
        res.json({ success: true })
    } catch (error) {
        // console.log(error)
        res.json({ err: "Error" })
    }
});



module.exports = router;



