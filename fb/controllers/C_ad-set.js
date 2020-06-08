// let request = require("async-request")
let m_fb = require("../models/ad-set")

let utils = require("../../utils.js")

class c_adset {
    constructor() {
        this.api_version = "v6.0"
    }
    async create(user, proxy, campaign, adset, api_version = this.api_version) {
        adset.attribution_spec = [adset.attribution_spec["CONVERSIONS"]]
        console.log(user, proxy, campaign, adset)
        try {

            let options = {
                url: `https://graph.facebook.com/${api_version}/act_${campaign.ad_account_id}/adsets?access_token=${user.access_token}`,
                method: 'POST',
                headers: {
                    'User-Agent': user.agent
                },
                proxy: `http://${proxy.ip}:${proxy.port}`,
                json: adset
            }
            let document = await utils.request(options)
            let data = document.body
            if (data.error) {
                console.log(data.error)
                return false
            }
            console.log(data)
            return data
        }
        catch (err) {
            console.log("[ERROR] Request to creating adset")
            console.log(JSON.parse(err.body))
            return false
        }
    }

}

let obj = new c_adset()

module.exports = obj

  // let options = {
            //     url: `https://graph.facebook.com/${api_version}/act_${campaign.ad_account_id}/adsets?access_token=${user.access_token}`,
            //     method: 'POST', // default
            //     data: adset,
            //     proxy: {
            //         host: proxy.ip,
            //         port: proxy.port,
            //     },
            //     headers: { 'User-Agent': user.agent }
            // }
            // let document = await axios(options)


 // var options = {
//     uri: `https://graph.facebook.com/${api_version}/act_${campaign.ad_account_id}/adsets?access_token=${user.access_token}`,
//     method: 'POST',
//     headers: {
//         'User-Agent': user.agent
//     },
//     proxy: `http://${proxy.ip}:${proxy.port}`,
//     body: JSON.stringify(adset)
// };
// let document = await requestPromise(options)

 // let document = await request(`https://graph.facebook.com/${api_version}/act_${campaign.ad_account_id}/adsets?access_token=${user.access_token}`, {
//     method: 'POST',
//     headers: {
//         'User-Agent': user.agent
//     },
//     proxy: `http://${proxy.ip}:${proxy.port}`,
//     data: adset
// });