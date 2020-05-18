let express = require("express"),
    bodyParser = require("body-parser"),
    path = require("path"),
    cors = require("cors"),
    Logger = require("./utils/logger"),
    cfg = require("./config.js");


let indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");
let apiUsers = require("./routes/api/users");
let apiProxies = require("./routes/api/proxies");
let apiFBHelpers = require("./routes/api/fb");
let apiCampaigns = require("./routes/api/campaign");
let apiPixels = require("./routes/api/pixel");
let apiAdSets = require("./routes/api/adset")

//----------------------------------------------------------------------------------------
// Express Settings

let app = express();

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/application/build")));

app.use(cors({ origin: '*' }));

app.use("/", indexRouter);
// app.use("/users", usersRouter);


app.use("/api/users", apiUsers);
app.use("/api/proxies", apiProxies);
app.use("/api/fb", apiFBHelpers);
app.use("/api/campaigns", apiCampaigns);
app.use("/api/pixels", apiPixels);

app.use("/api/adsets", apiAdSets);


app.listen(process.env.PORT || cfg["EXPRESS_PORT"], function () {
    let address = this.address();
    Logger.write({ source: "Express", action: "INFO", text: `Express server running on address ${address.address}:${address.port}` });
});


let request = require("async-request");


let fb = require("./fb-objects")


// middleware to catch non-existing routes
app.use(function (req, res, next) {

    // you can do what ever you want here
    // for example rendering a page with '404 Not Found'
    res.redirect("/")

});




let user = {
    api_version: "v6.0",
    agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.4 Safari/605.1.15",
    access_token: "EAAGNO4a7r2wBADA3DZCUbPoGoBcj2qQXwP5ldqaBCwQ11VmoIRDcZCYWrGBWiTid8s7FZCZAZCXrp0g1dkMu8LwGMZAMaHYRe9uvzY86e0BtH7LJUKsGbSygib6kw3qmQh2oCHGODc7Enwi4o1JRBAnNVDXQMDLfKv96ElM3OWwXQ586wN5L6H"
}

async function test() {
    let document = await request(`https://graph.facebook.com/${user.api_version}/me/businesses?access_token=${user.access_token}`, { headers: { 'User-Agent': user.agent } })
    let data = (JSON.parse(document.body)).data
    console.log("BMS:")
    console.log(data)

    let document_2 = await request(`https://graph.facebook.com/${user.api_version}/1047905668935999/client_ad_accounts?fields=name&access_token=${user.access_token}`, { headers: { 'User-Agent': user.agent } })
    let data_2 = (JSON.parse(document_2.body)).data
    console.log("AD ACCOUNTS:")
    console.log(data_2)

    // let document_3 = await request(`https://graph.facebook.com/${user.api_version}/${data_2[0].id}/campaigns?fields=${fb.campaign.url_format()}&access_token=${user.access_token}`, { headers: { 'User-Agent': user.agent } })
    // let data_3 = (JSON.parse(document_3.body)).data
    // console.log("CAMPAIGNS:")
    // console.log(data_3)
    // let document_5 = await request(`https://graph.facebook.com/${user.api_version}/${data_3[0].id}/adsets?fields=${fb.ad_set.url_format()}&access_token=${user.access_token}`, { headers: { 'User-Agent': user.agent } })
    // let data_5 = (JSON.parse(document_5.body)).data
    // console.log("Campaign Adsets:")
    // console.log(data_5)

    // let document_4 = await request(`https://graph.facebook.com/${user.api_version}/${data_3[0].id}/ads?fields=${fb.ad.url_format()}&access_token=${user.access_token}`, { headers: { 'User-Agent': user.agent } })
    // let data_4 = (JSON.parse(document_4.body)).data
    // console.log("ADS:")
    // console.log(data_4)
}


//test()

async function createCompaign() {
    let document = await request(`https://graph.facebook.com/${user.api_version}/act_620493452101946/campaigns?access_token=${user.access_token}`, {
        method: 'POST',
        headers: {
            'User-Agent': user.agent
        },
        data: {
            name: "Test Scale",
            buying_type: "AUCTION",
            objective: "CONVERSIONS",
            status: "PAUSED",
            special_ad_category: "NONE",
            access_token: user.access_token
        }
    });

    console.log(JSON.parse(document.body))
}

async function createAdSet() {
    let document = await request(`https://graph.facebook.com/${user.api_version}/act_620493452101946/adsets?access_token=${user.access_token}`, {
        method: 'POST',
        headers: {
            'User-Agent': user.agent
        },
        data: {
            campaign_id: "23844785625380053",
            destination_type: "MESSENGER",
            daily_budget: "2000",
            special_ad_category: "NONE",
            name: "Test adset curl",
            billing_event: "IMPRESSIONS",
            bid_strategy: "LOWEST_COST_WITHOUT_CAP",
            targeting: {
                "geo_locations": { "countries": ["US"] },
                "life_events": {
                    "id": 6048026275783
                }
            },
            promoted_object: {
                pixel_id: "181114593126984",
                custom_event_type: "LEAD"
            },
            attribution_spec: {
                CONVERSIONS: {
                    event_type: "CLICK_THROUGH",
                    window_days: 1
                }
            },

            status: "PAUSED",
            access_token: user.access_token
        }
    });

    console.log(JSON.parse(document.body))
}
//createAdSet()

//createCompaign()