let request = require("async-request")
let m_fb = require("../models/ad-set")

class c_adset {
    constructor() {
        this.api_version = "v6.0"
    }
    async create(user, proxy, campaign, adset, api_version = this.api_version) {
        console.log(user, proxy, campaign, adset,)
        let document = await request(`https://graph.facebook.com/${api_version}/act_${campaign.ad_account_id}/adsets?access_token=${user.access_token}`, {
            method: 'POST',
            headers: {
                'User-Agent': user.agent
            },
            proxy: `http://${proxy.ip}:${proxy.port}`,
            data: adset
        });
        let data = JSON.parse(document.body)
        return data
    }

}

let obj = new c_adset()

module.exports = obj