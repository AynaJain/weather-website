const path = require('path')// no need to install it because core node modulee
const express= require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))


// define paths for config
const publicDirect = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath) // takes a path to the directory

// set up static directory to serve
app.use(express.static(publicDirect))

app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather App New',
        name:'Ayna'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About me',
        name:'Ayna Jain'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        helpText: 'Help me please',
        title: 'Help',
        name: 'ayna Jain'
    })
})
//  app.get('', (req, res)=>{
//     res.send('<h1>Weather</h1>')
//     // res.send('<p>today is a very nice day and I love to be here in chicago but i miss my home for all the delicious food my mother cooks and for all the love that shares with me</p>')
//  })

//  app.get('/help', (req, res)=>{
//     //  res.send({
//     //      name: 'Ayna',
//     //      age: '20'
//     //  })

//     res.send([{
//         name: 'Ayna'},
//         {age: '20'
//     }])
//  })

//  app.get('/about', (req, res)=>{
//      res.send('<h1>About page!</h1>')
//  })

 app.get('/weather', (req, res)=>{
    //  const address= process.argv[2]
     if(!req.query.address){
         return res.send({
             error: 'You must provide the address in order to see the forecast'
         })
     }
     else{
         geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
            if(error){
                return res.send({error})
            }

            forecast(latitude,longitude, (error, forecastdata) => {
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast: forecastdata,
                    location,
                    address: req.query.address 
                })
            })
        
         })
     }
     
     
 })

 app.get('/products', (req,res)=>{
     if(!req.query.search){ // when there is no search term
        return res.send({
            error: 'You must provide a search term'
        })
     }
     console.log(req.query.search                                                                                                                                                           )
     res.send({
         products: []
     })
 })

 //app.com
 //app.com/help
 //app.com/about
 //app.com/weather

//  app.get('/what',(req,res)=>{
//     res.render('Page not found!',{
//         title: 'Unknown page',
//         name: 'Ayna Jain '
//     })
// })

// app.get('/help/units',(req,res)=>{
//     res.render('Help article not found!',{
//         title: 'help page',
//         name: 'Ayna Jain!'
//     })
// })

 app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: '404 help',
        name: 'Ayna Jain',
        errorMessage: 'Help error not found!!!!'
    })
 })

 

 app.get('*', (req, res)=>{
    res.render('404',{
        title:'404',
        name: 'ayna Jain!!',
        errorMessage: 'Page not found!!!!!'
    })
 })

 app.listen(3000, ()=>{
     console.log('Server is up on port 3000')
 })