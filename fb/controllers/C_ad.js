let request = require("async-request")
let m_fb = require("../models/ad")

class c_ad {
    constructor() {
        this.api_version = "v7.0"
    }
    async create(data, api_version = this.api_version) {
        //console.log(data)

        let document = await request(`https://graph.facebook.com/${api_version}/act_${data.ad_account_id}/adcreatives?access_token=${data.user.access_token}`, {
            method: 'POST',
            headers: {
                'User-Agent': data.user.agent
            },
            proxy: `http://${data.proxy.ip}:${data.proxy.port}`,
            data: {
                name: data.ad.name,
                title: data.ad.title,

                object_story_spec: {
                    "page_id": data.page_id,
                    "link_data": {
                        "call_to_action": { "type": data.ad.action, "value": { "app_destination": "MESSENGER" } },
                        "image_hash": data.image.hash,
                        "name": data.ad.title,
                        "message": data.ad.text,
                        "description": data.ad.description || " ",
                        "page_welcome_message": JSON.stringify(
                            {
                                "message": {
                                    "text": data.ad.welcome_text,
                                    "quick_replies": [
                                        {
                                            "content_type": "text",
                                            "title": data.ad.answer,
                                        }
                                    ]
                                }

                            }),

                    }


                },
            }
        });
        let doc_data = JSON.parse(document.body)

        return doc_data
    }

    async uploadImage(user, proxy, campaign_id, img, api_version = this.api_version) {
        // img = {name: "123", bytes: "ASDSAD/dwqdsad"}
        img.bytes = img.bytes.replace("data:image/png;base64,", "")
        img.bytes = img.bytes.replace("data:image/jpeg;base64,", "")
        img.bytes = img.bytes.replace("data:image/jpg;base64,", "")
        img.bytes = img.bytes.toString('base64')



        let document = await request(`https://graph.facebook.com/${api_version}/act_${campaign_id}/adimages?access_token=${user.access_token}`, {
            method: 'POST',
            headers: {
                'User-Agent': user.agent
            },
            proxy: `http://${proxy.ip}:${proxy.port}`,
            data: img
        });
        let data = JSON.parse(document.body)
        if (data.images) {
            if (data.images[img.name]) return data.images[img.name]
            else return false
        }
        else return false
    }

    async associate(data, api_version = this.api_version) {
        let document = await request(`https://graph.facebook.com/${api_version}/act_${data.ad_account_id}/ads?access_token=${data.user.access_token}`, {
            method: 'POST',
            headers: {
                'User-Agent': data.user.agent
            },
            proxy: `http://${data.proxy.ip}:${data.proxy.port}`,
            data: {
                adset_id: data.adset_id,
                creative: {
                    "creative_id": data.creative_id
                },
                status: data.ad.status,
                name: data.ad.name
            }
        });
        let doc_data = JSON.parse(document.body)
        return doc_data

    }

}

let obj = new c_ad()

module.exports = obj