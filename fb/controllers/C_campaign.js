let request = require("async-request")
let m_fb = require("./../models/ad-account")

class c_campaign {
    constructor() {
        this.api_version = "v6.0"
    }
    async create(campaignImport, user, proxy, api_version = this.api_version) {
        let url = `https://graph.facebook.com/${api_version}/act_${campaignImport.ad_account_id}/campaigns?access_token=${user.access_token}`;
        if (process.env.MODE == "DEVELOP") url = "http://localhost:8080/fakeapi/fb/id"
        let document = await request(url, {
            method: 'POST',
            headers: {
                'User-Agent': user.agent
            },
            proxy: `http://${proxy.ip}:${proxy.port}`,
            data: campaignImport
        });
        let data = JSON.parse(document.body)
        return data
    }

}

let obj = new c_campaign()

module.exports = obj