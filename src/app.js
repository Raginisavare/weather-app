const path = require('path')
const express = require('express')
const hbs=require('hbs')
const geocode=require('../src/geocode')
const forecast=require('../src/forecast')

const app = express()

//define path for for express config
const publicDirectoryPath = path.join(__dirname, '../public')

const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//set up handlers engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('/products', (req, res) => {
    if(!req.query.search){
       return  res.send({
            error:'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send( {
        products: []
    })
})

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'ragini'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'ragini savare'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title:'Help',
        name:'Ragini savare'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error:'you must provide an address!'
        })
    }
geocode(req.query.address,(error,{latitude,longitude,location} ={})=>{
    if(error){
        return res.send({error})
    }
    forecast(latitude,longitude,(error,forecastData)=>{
        if(error){
            return res.send({error})
        }
        res.send({
            forecast:forecastData,
            location,
            address:req.query.address
        })
    })
})

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'ragini',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ragini',
        errorMessage: 'Page not found.'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})