let request = require("async-request")
let m_fb = require("../models/pixel")

class c_pixel {
    constructor() {
        this.api_version = "v6.0"
    }
    async get(user, proxy, ad_account_id, api_version = this.api_version) {

        let document = await request(`https://graph.facebook.com/${api_version}/act_${ad_account_id}/adspixels?fields=${m_fb.url_format()}&access_token=${user.access_token}`,
            {
                proxy: `http://${proxy.ip}:${proxy.port}`,
                headers: { 'User-Agent': user.user_agent }
            })
        let data = JSON.parse(document.body)
        return data
    }

}

let obj = new c_pixel()

module.exports = obj