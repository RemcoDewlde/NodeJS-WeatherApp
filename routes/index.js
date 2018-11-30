let express = require('express');
let router = express.Router();
const request = require('request');


/* GET home page. */
router.get('/', function (req, res, next) {
    error = req.query.error;
    res.render('index', {title: 'WeatherApp', error: error});
});

router.get('/weather', function (req, res, next) {
    let city = req.query.city;
    let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=5d80bc283a8685b14fa7128658df8a0a&units=metric';

    request(url, function (error, response, body) {
        let weather_json = JSON.parse(body);

        if (weather_json.cod === '404') {
            let error = weather_json.message;
            res.redirect('/?error=' + error);
            res.render('index', {error: weather_json.cod})

        } else {
            let weather = {
                temp: Math.round(weather_json.main.temp),
                desc: weather_json.weather[0].description,
                city: weather_json.name,
                code: weather_json.weather[0].id,
                wins: weather_json.wind.speed,
            };

            res.render('weather', {weather: weather, title: 'WeatherApp'})
        }
    })
});

module.exports = router;
