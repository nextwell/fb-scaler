let request = require("async-request")
let m_fb = require("./../models/ad-account")

class c_ad_ac {
    constructor() {
        this.api_version = "v6.0"
    }
    async get(user, bm_id, api_version = this.api_version) {
        let document = await request(`https://graph.facebook.com/${api_version}/${bm_id}/client_ad_accounts?fields=${m_fb.url_format()}&access_token=${user.access_token}`,
            {
                proxy: `http://${user.ip}:${user.port}`,
                headers: { 'User-Agent': user.user_agent }
            })
        let data = (JSON.parse(document.body)).data
        for (let i = 0; i < data.length; i++) {
            let status_text = m_fb.status(data[i].account_status)
            data[i].account_status_text = status_text
        }
        return data
    }

}

let obj = new c_ad_ac()

module.exports = obj