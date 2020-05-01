let express = require("express"),
    db = require("./../../db"),
    request = require("async-request"),
    cfg = require("./../../config"),
    router = express.Router();

//----------------------------------------------------------------------------------------
// users routes

router.get("/targeting/category/life-events/:userid", async (req, res) => {
    let id = req.params.userid
    let errors = []

    let user = await db.Users.get_by_id(id)
    if (user) {
        let proxy = await db.Proxies.get_by_id(user.proxy_id)
        if (proxy) {

            let document = await request(`https://graph.facebook.com/${cfg.api_version}/search?type=adTargetingCategory&class=life_events&access_token=${user.access_token}`,
                {
                    proxy: `http://${proxy.ip}:${proxy.port}`,
                    headers: { 'User-Agent': user.user_agent }
                })
            let data = JSON.parse(document.body)
            if (data) {
                if (data.error) {
                    errors.push(data.error.message)
                }
                else if (data.data) {
                    res.json({ success: true, data: data.data })
                }
                else errors.push("Wrong answer from Facebook API")
            }
            else errors.push("Wrong answer from Facebook API")
        } else errors.push("Proxy not found")
    } else errors.push("User not found")

    if (errors.length) res.json({ success: false, err: errors[0] })
})



module.exports = router;



