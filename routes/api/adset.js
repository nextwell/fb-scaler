let express = require("express"),
    db = require("./../../db"),
    fb = require("./../../fb-objects"),
    router = express.Router();


router.post("/create", async (req, res) => {
    let body = req.body

    let user = await db.Users.get_by_id(body.user_id)
    let proxy = await db.Proxies.get_by_id(body.proxy_id)
    let campaign_data = await db.TCampaigns.get_by_id(body.template_campaign_id)
    let campaign = req.body.campaign_id

    if (campaign_data) {

        let adsets_data = campaign_data.data.adsets

        let adsets = []

        for (let i = 0; i < adsets_data.length; i++) {
            let adset = adsets_data[i]
            let obj = {
                campaign_id: body.campaign_id,
                destination_type: adset.destination_type,
                daily_budget: (parseFloat(adset.daily_budget) * 100).toString(),
                special_ad_category: "NONE",
                name: adset.name,
                billing_event: "IMPRESSIONS",
                bid_strategy: "LOWEST_COST_WITHOUT_CAP",
                targeting: {
                    "geo_locations": { "countries": [adset.geo_locations] },
                    "life_events": [{
                        "id": adset.life_events
                    }]
                },
                promoted_object: {
                    pixel_id: body.pixel,
                    custom_event_type: adset.custom_event_type
                },
                attribution_spec: {
                    CONVERSIONS: {
                        event_type: "CLICK_THROUGH",
                        window_days: parseInt(adset.window_days)
                    }
                },

                status: adset.status,
            }
            if (adset.age_min) obj.targeting["age_min"] = parseInt(adset.age_min)
            if (adset.age_max) obj.targeting["age_max"] = parseInt(adset.age_max)
            let genders = []
            if (adset.genders) {
                genders.push(adset.genders)
            }
            if (genders.length) obj.targeting["genders"] = genders
            adsets.push(obj)
        }

        // console.log(adsets)


        if (user && proxy && adsets.length) {
            let success_adsets = 0
            for (let i = 0; i < adsets.length; i++) {
                let data = await fb.ad_set.create(user, proxy, { ad_account_id: body.ad_account_id }, adsets[i])
                if (data.id) {
                    if (adsets_data[i].ads) {
                        for (let y = 0; y < adsets_data[i].ads.length; y++) {
                            ad = adsets_data[i].ads[y]
                            let image_doc = await db.Images.get_by_id(ad.file_image)
                            let uploaded_image = await fb.ad.uploadImage(user, proxy, body.ad_account_id, {
                                name: image_doc.name,
                                bytes: image_doc.img
                            })
                            // {
                            //     hash: '9da34eda8a9d1955b21e614507fe4a13',
                            //     url: 'https://scontent.fevn2-1.fna.fbcdn.net/v/t45.1600-4/100382918_23844907932970558_2098036192032325632_n.png?_nc_cat=105&_nc_sid=2aac32&_nc_ohc=EPrBpAsOpH8AX8lQUce&_nc_ht=scontent.fevn2-1.fna&oh=3f5fc7c377fa3b560a30cf0e770998b8&oe=5EEC8807'
                            // }
                            if (uploaded_image) {
                                let creative = await fb.ad.create({
                                    user: user,
                                    proxy: proxy,
                                    page_id: body.page,
                                    image: uploaded_image,
                                    ad: ad,
                                    ad_account_id: body.ad_account_id
                                })
                                if (creative.id) {
                                    let assoc = await fb.ad.associate({
                                        ad_account_id: body.ad_account_id,
                                        user: user,
                                        proxy: proxy,
                                        creative_id: creative.id,
                                        adset_id: data.id,
                                        ad: ad
                                    })
                                }
                            }
                        }

                    }
                    success_adsets++
                }

            }
            res.json({ success: true, success_adsets: success_adsets })

        }
    } else res.json({ success: false, err: "Ошибка при поиске шаблонной кампании" })

});

module.exports = router;



