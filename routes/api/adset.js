let express = require("express"),
    db = require("./../../db"),
    fb = require("./../../fb-objects"),
    router = express.Router();


router.post("/create", async (req, res) => {
    let body = req.body

    let user = await db.Users.get_by_id(body.user_id)
    let proxy = await db.Proxies.get_by_id(body.proxy_id)
    let campaign = req.body.campaign

    let adsets_data = body.adsets

    let adsets = []

    adsets_data.forEach((adset) => {
        adsets.push({
            campaign_id: campaign.id,
            destination_type: adset.destination_type,
            daily_budget: (parseFloat(adset.daily_budget) * 100).toString(),
            special_ad_category: "NONE",
            name: adset.name,
            billing_event: "IMPRESSIONS",
            bid_strategy: "LOWEST_COST_WITHOUT_CAP",
            targeting: {
                "geo_locations": { "countries": [adset.geo_locations] },
                "life_events": {
                    "id": parseInt(adset.life_events)
                }
            },
            promoted_object: {
                pixel_id: campaign.pixel_id,
                custom_event_type: campaign.custom_event_type
            },
            attribution_spec: {
                CONVERSIONS: {
                    event_type: "CLICK_THROUGH",
                    window_days: parseInt(adset.window_days)
                }
            },

            status: adset.status,
        })
    })


    if (user && proxy && adsets.length) {
        let success_adsets = 0
        for (let i = 0; i < adsets.length; i++) {
            let data = await fb.ad_set.create(user, proxy, campaign, adsets[i])
            if (data.id) success_adsets++
            console.log(data)
        }
        res.json({ success: true, success_adsets: success_adsets })

    }

});

module.exports = router;



