let express = require("express"),
    db = require("./../../db"),
    fb = require("./../../fb-objects"),
    router = express.Router();

//----------------------------------------------------------------------------------------
// proxies routes

router.get("/list/:user_id/:ad_account_id", async (req, res) => {
    let body = req.body

    let user = await db.Users.get_by_id(req.params.user_id)
    let proxy
    if (user) {
        proxy = await db.Proxies.get_by_id(user.proxy_id)
    }

    if (user && proxy) {
        let document = await fb.pixel.get(user, proxy, req.params.ad_account_id)
        console.log(document)
        if (process.env.MODE == "DEVELOP") document.data = [{ id: 123, name: "test" }]
        if (document.data) {
            res.json({ success: true, data: document.data })
        }
        else {
            res.json({ success: true, data: [] })
            // res.json({ success: false, err: "Ошибка при чтении пикселей" })
        }
    }

});

module.exports = router;



