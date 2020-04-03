const request=require('request')

forecast=(lati,longi,callback)=>{
    
const url='https://api.darksky.net/forecast/9140cd08cc6e6ceaf5799a793d4a236f/'+encodeURIComponent(lati)+','+encodeURIComponent(longi)+'?units=si'
    request({url:url,json:true},(error,response)=>{
        if(error)
            callback('Unable to connect to weather service!',undefined)
        else if(response.body.error)
            callback('Unable to find the location',undefined)
        else{
            callback(undefined,response.body.daily.data[0].summary+" It is currently "+response.body.currently.temperature+"  Degrees Celsius out. This high today is "+response.body.daily.data[0].temperatureHigh+" with a low of "+response.body.daily.data[0].temperatureLow+". There is a "+response.body.currently.precipProbability+"% chance of rain.")
        }
    })
}

module.exports={forecast:forecast}



// const url='https://api.darksky.net/forecast/9140cd08cc6e6ceaf5799a793d4a236f/37.8267,-122.4233?unit=si'

// request({ url:url,json:true},(error,response)=>{
// // console.log(JSON.parse(response.body).currently)
// //console.log(response.body.currently)
// console.log(response.body.daily.data[0].summary+" It is currently "+response.body.currently.temperature+" drgrees out. There is a "+response.body.currently.precipProbability+"% chance of rain.")
// })
