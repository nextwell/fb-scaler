let express = require("express"),
    db = require("./../db"),
    router = express.Router();

//----------------------------------------------------------------------------------------
// users routes

router.post("/new", async (req, res) => {

    res.json({ success: true })
});

router.get("/", async (req, res) => {
    let users = await db.Users.get_all()
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
        let ans = await db.Users.remove_by_params(_id)
        res.json({ success: true })
    } catch (error) {
        // console.log(error)
        res.json({ err: "Error" })
    }
});



module.exports = router;



