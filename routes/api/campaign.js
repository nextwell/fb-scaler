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


router.post("/template/new", async (req, res) => {
    console.log(req.body)
    let obj = await db.TCampaigns.create({ data: req.body, name: req.body.campaigns_settings[0].name, date: new Date() })
    console.log(obj)
    if (obj) {
        res.json({ success: true })
    }
    else res.json({ success: false, err: "Error creating db object" })
})

router.get("/template/list", async (req, res) => {
    let list = await db.TCampaigns.get_all()
    let campaigns = {
        campaigns_settings: [],
        adsets: []
    }
    for (let i = 0; i < list.length; i++) {
        if (list[i].data) {
            let item = list[i].data
            item.campaigns_settings[0].key = i
            for (let y = 0; y < item.adsets.length; y++) {
                item.adsets[y].campaign_key = i
                for (let x = 0; x < item.adsets[y].ads.length; x++) {
                    item.adsets[y].ads[x].campaign_key = i
                }
            }
            campaigns.campaigns_settings.push(item.campaigns_settings[0])
            campaigns.adsets = [...campaigns.adsets, ...item.adsets]
        }

    }
    res.json(campaigns)
})

module.exports = router;



