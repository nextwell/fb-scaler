let express = require("express"),
    db = require("./../../db"),
    fb = require("./../../fb-objects"),
    router = express.Router();

//----------------------------------------------------------------------------------------
// users routes

router.post("/new", async (req, res) => {
    let errors = []
    let user = req.body
    let new_user = await db.Users.create({
        name: user.name,
        access_token: user.access_token,
        user_agent: user.user_agent,
        proxy_id: user.proxy_id,
        date_created: new Date()
    })
    let proxy = await db.Proxies.get_by_id(user.proxy_id)
    if (proxy) {
        new_user.ip = proxy.ip
        new_user.port = proxy.port
        let bms = await fb.bus_manager.get(new_user)

        if (bms) {
            for (let i = 0; i < bms.length; i++) {
                let bm = bms[i]
                let new_bm = await db.BManagers.create({
                    id: bm.id,
                    user_id: new_user._id,
                    data: bm
                })
                let ad_accounts = await fb.ad_account.get(new_user, bm.id)
                for (let i = 0; i < ad_accounts.length; i++) {
                    let ad_account = ad_accounts[i]
                    await db.AdAccounts.create({
                        id: ad_account.account_id,
                        user_id: new_user._id,
                        business_id: bm.id,
                        data: ad_account
                    })
                }

                let pages = await fb.page.get(new_user, bm.id)
                for (let i = 0; i < pages.length; i++) {
                    let page = pages[i]
                    await db.Pages.create({
                        id: page.id,
                        user_id: new_user._id,
                        business_id: bm.id,
                        data: page
                    })
                }
            }
            res.json({ success: true })
        }
        else errors.push("FB api error process finding business managers")

    }
    else errors.push("Proxy not found")

    if (errors.length) res.json({ success: false, err: errors[0] })
});

router.get("/", async (req, res) => {
    let users = await db.Users.get_all()

    let users_f = []
    for (let i = 0; i < users.length; i++) {
        let user = users[i].toObject()



        user.bms = []

        let bms = await db.BManagers.get_byUserID(user._id)

        for (let y = 0; y < bms.length; y++) {
            let bm = bms[y]
            user.bms.push(bm.data)
            let ad_accounts = await db.AdAccounts.get_byUserID_BM(user._id, bm.id)
            let pages = await db.Pages.get_byUserID_BM(user._id, bm.id)

            user.bms[y].ad_accounts = []
            user.bms[y].pages = []

            ad_accounts.forEach((item) => {
                user.bms[y].ad_accounts.push(item.data)
            })
            pages.forEach((item) => {
                user.bms[y].pages.push(item.data)
            })
        }



        users_f.push(user)
    }
    res.json(users_f)

});

router.get("/:id", async (req, res) => {
    let _id = req.params.id
    try {
        let user = await db.Users.get_by_id(_id)
        res.json(user)
    } catch (error) {
        // console.log(error)
        res.json({ err: "Error" })
    }
});

router.get("/remove/:id", async (req, res) => {
    let _id = req.params.id
    try {
        let ans = await db.Users.remove_by_id(_id)
        res.json({ success: true })
    } catch (error) {
        // console.log(error)
        res.json({ err: "Error" })
    }
});

router.get("/:id/bms", async (req, res) => {
    let _id = req.params.id
    let user = await db.Users.get_by_id(_id)
    if (user) {
        console.log(user)
        let proxy = await db.Proxies.get_by_id(user.proxy_id)
        if (proxy) {
            user.ip = proxy.ip
            user.port = proxy.port

            let ans = await fb.bus_manager.get(user)
            console.log(ans)
            res.json(ans)
            //console.log(ans)


        } else res.json({ success: false, error: "Proxy for user not found" })
    }
    else res.json({ success: false, error: "User not found" })
})

router.post("/:id/update/proxy", async (req, res) => {
    let options = {
        user_id: req.params.id,
        proxy_id: req.body.proxy_id
    }

    try {
        await db.Users.update({ _id: options.user_id, action: { proxy_id: options.proxy_id } })
        res.json({ success: true })
    } catch (error) {
        console.log(error)
        res.json({ success: false, error: "Proxy update error" })
    }
})

router.get("/:id/remove", async (req, res) => {
    let user_id = req.params.id
    try {
        await db.Users.remove_by_id(user_id)
        res.json({ success: true })
    } catch (error) {
        console.log(error)
        res.json({ success: false, error: "Error deleting user" })
    }
})

router.get("/:id/update", async (req, res) => {
    let errors = []
    let user_id = req.params.id

    let user = await db.Users.get_by_id(user_id)
    if (user) {
        let proxy = await db.Proxies.get_by_id(user.proxy_id)
        if (proxy) {
            await db.BManagers.remove_byUserID(user._id)
            await db.AdAccounts.remove_byUserID(user._id)
            await db.Pages.remove_byUserID(user._id)

            let user_o = user.toObject()

            user_o.ip = proxy.ip
            user_o.port = proxy.port

            let bms = await fb.bus_manager.get(user_o)

            if (bms) {
                for (let i = 0; i < bms.length; i++) {
                    let bm = bms[i]
                    let new_bm = await db.BManagers.create({
                        id: bm.id,
                        user_id: user_o._id,
                        data: bm
                    })
                    let ad_accounts = await fb.ad_account.get(user_o, bm.id)
                    for (let i = 0; i < ad_accounts.length; i++) {
                        let ad_account = ad_accounts[i]
                        await db.AdAccounts.create({
                            id: ad_account.account_id,
                            user_id: user_o._id,
                            business_id: bm.id,
                            data: ad_account
                        })
                    }

                    let pages = await fb.page.get(user_o, bm.id)
                    for (let i = 0; i < pages.length; i++) {
                        let page = pages[i]
                        await db.Pages.create({
                            id: page.id,
                            user_id: user_o._id,
                            business_id: bm.id,
                            data: page
                        })
                    }
                }
                res.json({ success: true })
            } else errors.push("FB api error process finding business managers")

        } else errors.push("Proxy not found")
    } else errors.push("User not found")


    if (errors.length) res.json({ success: false, err: errors[0] })
})


module.exports = router;



