let settings = {
    url: "",
};

//console.log(process.env);

if (process.env.NODE_ENV === "development") {
    console.log("DEVELOP MODE");
    settings.url = "http://localhost:8080";
}

export default settings;
