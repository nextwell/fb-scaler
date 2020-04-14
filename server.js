let express = require("express"),
    bodyParser = require("body-parser"),
    path = require("path"),
    Logger = require("./utils/logger"),
    cfg = require("./config.js");


let indexRouter = require("./routes/index")

//----------------------------------------------------------------------------------------
// Express Settings

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.listen(process.env.PORT || cfg["EXPRESS_PORT"], function () {
    let address = this.address();
    Logger.write({ source: "Express", action: "INFO", text: `Express server running on address ${address.address}:${address.port}` });
});