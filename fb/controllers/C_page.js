let request = require("async-request")
let m_fb = require("../models/page")

class c_page {
    constructor() {
        this.api_version = "v6.0"
    }
    async get(user, bm_id, api_version = this.api_version) {
        let data = []
        let document = await request(`https://graph.facebook.com/${api_version}/${bm_id}/owned_pages?fields=${m_fb.url_format()}&access_token=${user.access_token}`,
            {
                proxy: `http://${user.ip}:${user.port}`,
                headers: { 'User-Agent': user.user_agent }
            })

        let document_2 = await request(`https://graph.facebook.com/${api_version}/${bm_id}/client_pages?fields=${m_fb.url_format()}&access_token=${user.access_token}`)
        data = [...data, ...(JSON.parse(document.body)).data]
        data = [...data, ...(JSON.parse(document_2.body)).data]
        // for (let i = 0; i < data.length; i++) {
        //     this.get_status(user, data[i].id)
        // }
        return data
    }

    // async get_status(user, page_id, api_version = this.api_version) {
    //     //temporary_status
    //     let document = await request(`https://graph.facebook.com/${api_version}/${page_id}?fields=${m_fb.url_format()}&access_token=${user.access_token}`)
    //     console.log(document)
    // }

}

let obj = new c_page()

module.exports = obj