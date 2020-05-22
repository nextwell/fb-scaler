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
    let t_campaign_doc = await db.TCampaigns.get_by_id(body.template_campaign_id)
    if (t_campaign_doc) {
        console.log(t_campaign_doc)
        let t_campaign = t_campaign_doc.data.campaigns_settings[0]

        let campaignData = {
            name: t_campaign.name,
            buying_type: t_campaign.buying_type,
            objective: t_campaign.objective,
            status: t_campaign.status,
            special_ad_category: "NONE",
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
    }
    else res.json({ success: false, err: "Ошибка при поиске шаблонной кампании" })

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
            item.campaigns_settings[0]._id = list[i]._id
            for (let y = 0; y < item.adsets.length; y++) {
                item.adsets[y].campaign_key = i
                item.adsets[y].campaign_id = list[i]._id
                for (let x = 0; x < item.adsets[y].ads.length; x++) {
                    item.adsets[y].ads[x].campaign_key = i
                    item.adsets[y].ads[x].campaign_id = list[i]._id
                }
            }
            campaigns.campaigns_settings.push(item.campaigns_settings[0])
            campaigns.adsets = [...campaigns.adsets, ...item.adsets]
        }

    }
    res.json(campaigns)
})

module.exports = router;



