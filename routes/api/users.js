let express = require("express"),
    db = require("./../../db"),
    fb = require("./../../fb-objects")
router = express.Router();

//----------------------------------------------------------------------------------------
// users routes

router.post("/new", async (req, res) => {
    let user = req.body
    let _new = await db.Users.create({
        name: user.name,
        access_token: user.access_token,
        user_agent: user.user_agent,
        proxy_id: user.proxy_id,
        date_created: new Date()
    })
    console.log(_new)
    res.json({ success: true })
});

router.get("/", async (req, res) => {
    let users = await db.Users.get_all()
    
    // let users_f = []
    // for (let i = 0; i < users.length; i++) {
    //     let user = users[i].toObject()
    //     let proxy = await db.Proxies.get_by_id(user.proxy_id)
    //     if (proxy) {
    //         user.ip = proxy.ip
    //         user.port = proxy.port
    //         let ans = await fb.bus_manager.get(user)
    //         user.bms = ans
    //         for (let i = 0; i < user.bms.length; i++) {
    //             let bm = user.bms[i];
    //             let ad_accounts = await fb.ad_account.get(user, bm.id)
    //             let pages = await fb.page.get(user, bm.id)
    //             user.bms[i].pages = pages
    //             user.bms[i].ad_accounts = ad_accounts
    //         }
    //         users_f.push(user)
    //     }
    // }
    // res.json(users_f)
    res.json(users)
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


module.exports = router;



