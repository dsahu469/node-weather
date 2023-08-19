const express = require('express');
const path    = require('path');
const hbs     = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, '../public'));

const app        = express();
const port       = process.env.PORT || 3000;

// Define paths for express config
const public_dir   = path.join(__dirname, '../public');
const views_dir    = path.join(__dirname, '../templates/views');
const partials_dir = path.join(__dirname, '../templates/partials');

// Setip static directory to serve
app.use(express.static(public_dir));

// app.get('', (req, res) => {
//     res.send('Hello, Express!');
// });

// app.get('/help', (req, res) => {
//     res.send('Hello, Express! We are here to help you!');
// });

// app.get('/about', (req, res) => {
//     res.send('Hello, Express! I'+"'m"+' an open book');
// });

// app.get('/weather', (req, res) => {
//     res.send('Hello, Express! We are working on that!');
// });

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', views_dir);

hbs.registerPartials(partials_dir);

app.get('', (req, res) => {
    //res.render('index')

    res.render('index', {
        title: '',
        name: 'Dinesh'
    })
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide some address'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            });
        }

        forecast(latitude, longitude, (forecastError, forecastResponse) => {
            if(forecastError){
                return res.send({
                    error: forecastError
                });
            }

            res.send({
                response: forecastResponse,
                location: location
            });
        })
    })

    // res.send({
    //     forecast: "It's raining",
    //     location: req.query.address,
    // });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App - About',
        name: 'Dinesh'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather App - Help',
        name: 'Dinesh'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        message: '404: Page not found!'
    });
});

app.listen(port, () => {
    console.log('Server is up on Port - ' + port);
});