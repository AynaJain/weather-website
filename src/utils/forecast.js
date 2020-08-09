const request = require('postman-request')

const forecast =(latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=62caf201173830eb4acd7bb5617bda1a&query='+ latitude+','+ longitude+'&units=f'

    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to location services', undefined)
        }
        else if(body.error){
            callback('Unable to find location. Try another search!', undefined)
        }
        else(
            callback(undefined, body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degrees out. It feels like '+body.current.feelslike+' degress out There is a .'+ body.current.wind_speed + '% chance of rain.')
            
        )
    })
}

module.exports = forecast


