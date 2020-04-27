let request = require("async-request")
let m_fb = require("../models/page")

class c_page {
    constructor() {
        this.api_version = "v6.0"
    }
    async get(user, bm_id, api_version = this.api_version) {
        let document = await request(`https://graph.facebook.com/${api_version}/${bm_id}/owned_pages?fields=${m_fb.url_format()}&access_token=${user.access_token}`,
            {
                proxy: `http://${user.ip}:${user.port}`,
                headers: { 'User-Agent': user.user_agent }
            })
        let data = (JSON.parse(document.body)).data
        return data
    }

}

let obj = new c_page()

module.exports = obj