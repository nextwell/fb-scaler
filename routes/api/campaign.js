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
                res.json({ success: false, err: "Ошибка при создании кампании" })
            }
        }
    }
    else res.json({ success: false, err: "Ошибка при поиске шаблонной кампании" })

});


router.post("/template/new", async (req, res) => {
    for (let i = 0; i < req.body.adsets.length; i++) {
        for (let y = 0; y < req.body.adsets[i].ads.length; y++) {
            let image = await db.Images.create(req.body.adsets[i].ads[y].file_image)
            req.body.adsets[i].ads[y].file_image = image._id
        }
    }
    let obj = await db.TCampaigns.create({ data: req.body, name: req.body.campaigns_settings[0].name, date: new Date() })
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
    for (let i = 0; i < campaigns.adsets.length; i++) {
        for (let y = 0; y < campaigns.adsets[i].ads.length; y++) {
            let image = await db.Images.get_by_id(campaigns.adsets[i].ads[y].file_image)
            if (image) {
                campaigns.adsets[i].ads[y].file_image = image.toObject()
            }
        }
    }
    res.json(campaigns)
})

router.get("/template/:id/remove", async (req, res) => {
    await db.TCampaigns.remove_by_id(req.params.id)
    res.json({ success: true })
})

router.get("/template/:id/copy", async (req, res) => {
    let campaign = await db.TCampaigns.get_by_id(req.params.id)
    campaign.data.campaigns_settings[0].name = `${campaign.name} (Copy)`
    let new_campaign = await db.TCampaigns.create({ data: campaign.data, name: `${campaign.name} (Copy)`, date: new Date() })
    res.json({ success: true })
})


router.post("/template/:id/edit/campaign", async (req, res) => {
    let body = req.body

    let campaign_data = (await db.TCampaigns.get_by_id(req.params.id)).data
    if (campaign_data) {

        campaign_data.campaigns_settings[0].name = body.name;
        campaign_data.campaigns_settings[0].buying_type = body.buying_type;
        campaign_data.campaigns_settings[0].objective = body.objective;
        campaign_data.campaigns_settings[0].status = body.status;

        await db.TCampaigns.update({ _id: req.params.id, action: { data: campaign_data, name: body.name } })
        res.json({ success: true })
    }
    else res.json({ success: true })
})

router.post("/template/:id/edit/adset", async (req, res) => {
    let body = req.body

    let campaign_data = (await db.TCampaigns.get_by_id(req.params.id)).data
    if (campaign_data) {
        for (let i = 0; i < campaign_data.adsets.length; i++) {
            if (campaign_data.adsets[i].key == body.key) {
                campaign_data.adsets[i].name = body.name
                campaign_data.adsets[i].destination_type = body.destination_type
                campaign_data.adsets[i].daily_budget = body.daily_budget
                campaign_data.adsets[i].age_min = body.age_min
                campaign_data.adsets[i].age_max = body.age_max
                campaign_data.adsets[i].genders = body.genders
                campaign_data.adsets[i].geo_locations = body.geo_locations
                campaign_data.adsets[i].life_events = body.life_events
                campaign_data.adsets[i].status = body.status
                campaign_data.adsets[i].window_days = body.window_days
                campaign_data.adsets[i].custom_event_type = body.custom_event_type
                await db.TCampaigns.update({ _id: req.params.id, action: { data: campaign_data } })
                res.json({ success: true })
                break;
            }
        }
    }
    else res.json({ success: true })
})
router.post("/template/:id/edit/ad", async (req, res) => {
    let body = req.body
    let campaign_data = (await db.TCampaigns.get_by_id(req.params.id)).data
    if (campaign_data) {
        for (let i = 0; i < campaign_data.adsets.length; i++) {
            if (campaign_data.adsets[i].key == body.adset_key) {
                for (let y = 0; y < campaign_data.adsets[i].ads.length; y++) {
                    if (campaign_data.adsets[i].ads[y].key == body.key) {
                        campaign_data.adsets[i].ads[y].name = body.name
                        campaign_data.adsets[i].ads[y].name = body.name
                        campaign_data.adsets[i].ads[y].title = body.title
                        campaign_data.adsets[i].ads[y].text = body.text
                        campaign_data.adsets[i].ads[y].description = body.description
                        campaign_data.adsets[i].ads[y].welcome_text = body.welcome_text
                        campaign_data.adsets[i].ads[y].answer = body.answer
                        campaign_data.adsets[i].ads[y].action = body.action

                        let img_doc = await db.Images.get_by_id(campaign_data.adsets[i].ads[y].file_image)

                        if (img_doc.img != body.file_image.img) {
                            let img = await db.Images.create(body.file_image)
                            campaign_data.adsets[i].ads[y].file_image = img._id
                        }

                        await db.TCampaigns.update({ _id: req.params.id, action: { data: campaign_data } })

                        res.json({ success: true })

                    }
                }

            }
        }
    }
    else res.json({ success: true })
})


router.post("/template/:id/copy/adset", async (req, res) => {
    let body = req.body
    let campaign_data = (await db.TCampaigns.get_by_id(req.params.id)).data
    if (campaign_data) {
        let maxkey = parseInt(campaign_data.adsets[campaign_data.adsets.length - 1].key)

        for (let i = 0; i < campaign_data.adsets.length; i++) {
            if (campaign_data.adsets[i].key == body.key) {
                let newadset = JSON.stringify(campaign_data.adsets[i])
                newadset = JSON.parse(newadset)
                newadset.key = maxkey + 1
                for (let y = 0; y < newadset.ads.length; y++) {
                    newadset.ads[y].adset_key = newadset.key
                }
                newadset.name = newadset.name + " (Copy)"
                campaign_data.adsets.push(newadset)
                await db.TCampaigns.update({ _id: req.params.id, action: { data: campaign_data } })
                res.json({ success: true })
            }
        }
    }
    else res.json({ success: true })
})

router.post("/template/:id/remove/adset", async (req, res) => {
    let body = req.body

    let campaign_data = (await db.TCampaigns.get_by_id(req.params.id)).data
    if (campaign_data) {
        let maxkey = parseInt(campaign_data.adsets[campaign_data.adsets.length - 1].key)

        for (let i = 0; i < campaign_data.adsets.length; i++) {
            if (campaign_data.adsets[i].key == body.key) {
                campaign_data.adsets.splice(i, 1)
                await db.TCampaigns.update({ _id: req.params.id, action: { data: campaign_data } })
                res.json({ success: true })
            }
        }
    }
    else res.json({ success: true })
})

router.post("/template/:id/copy/ad", async (req, res) => {
    let body = req.body

    let campaign_data = (await db.TCampaigns.get_by_id(req.params.id)).data
    if (campaign_data) {

        for (let i = 0; i < campaign_data.adsets.length; i++) {

            if (campaign_data.adsets[i].key == body.adset_key) {

                let maxkey = parseInt(campaign_data.adsets[i].ads[campaign_data.adsets[i].ads.length - 1].key)
                for (let y = 0; y < campaign_data.adsets[i].ads.length; y++) {

                    if (campaign_data.adsets[i].ads[y].key == body.key) {

                        let newad = JSON.stringify(campaign_data.adsets[i].ads[y])
                        newad = JSON.parse(newad)
                        newad.key = maxkey + 1
                        newad.name = newad.name + " (Copy)"
                        campaign_data.adsets[i].ads.push(newad)
                        await db.TCampaigns.update({ _id: req.params.id, action: { data: campaign_data } })
                        res.json({ success: true })
                    }
                }

            }
        }
    }
    else res.json({ success: true })
})

router.post("/template/:id/remove/ad", async (req, res) => {
    let body = req.body

    let campaign_data = (await db.TCampaigns.get_by_id(req.params.id)).data
    if (campaign_data) {

        for (let i = 0; i < campaign_data.adsets.length; i++) {

            if (campaign_data.adsets[i].key == body.adset_key) {

                for (let y = 0; y < campaign_data.adsets[i].ads.length; y++) {
                    if (campaign_data.adsets[i].ads[y].key == body.key) {
                        campaign_data.adsets[i].ads.splice(y, 1)
                        await db.TCampaigns.update({ _id: req.params.id, action: { data: campaign_data } })
                        res.json({ success: true })
                    }
                }

            }
        }
    }
    else res.json({ success: true })
})


module.exports = router;



