let express = require("express"),
    db = require("./../../db"),
    fb = require("./../../fb-objects"),
    router = express.Router();

//----------------------------------------------------------------------------------------
// proxies routes

router.post("/new", async (req, res) => {
    let body = req.body

    let user = await db.Users.get_by_id(body.user_id)
    let proxy = await db.Proxies.get_by_id(body.proxy_id)

    let campaignData = {
        name: body.campaign_name,
        buying_type: body.campaign_buying_type,
        objective: body.campaign_objective,
        status: body.campaign_status,
        special_ad_category: body.campaign_special_ad_category,

        ad_account_id: body.ad_account_id
    }

    if (user && proxy) {
        let data = await fb.campaign.create(campaignData, user, proxy)
        if (data.id) {
            res.json({ success: true, id: data.id })
        }
        else {
            res.json({ success: false, err: "Ошибка при создании компании" })
        }
    }

});

module.exports = router;



