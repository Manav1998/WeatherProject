const express = require("express");
const https = require("node:https");
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const apiId = "657284fa2087365e0ba248bb018d0ba7";    

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, response) => {
    response.sendFile(__dirname + "/index.html");
});

app.post("/", (req, response) => {
    const cityName = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=";
    https.get(url + apiId, (res) => {
        res.on('data', (d) => {
            const weatherData = JSON.parse(d);
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            response.write("<h1>Temperature in " + cityName + " is " + temp + " degree celcius.</h1><br><p>The weather is currently " + weatherDesc + "</p>");
            response.send();
        })
    });
});


app.listen(port, () => {
    console.log("Server is starting on " + port);
});