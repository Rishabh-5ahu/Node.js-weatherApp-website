const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()

// console.log(path.join(__dirname,'../public'))
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialsPath= path.join(__dirname,'../templates/partials')

// Setup for handlebar engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)         //Customizing views directory
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('/',(req,res)=>{
    res.render('index',{title:"Weather App"})
})

app.get('/help',(req,res)=>{
    res.render('help',{title:"Weather App"})
})
app.get('/about',(req,res)=>{
    res.render('about',{title:"Weather App",author:"Rishabh Sahu"})
})
app.get('/weather',(req,res)=>{
    //console.log(req.query.address)
    if(!req.query.address){
        return res.send({error:"Please must provide an address"})
    }

    geocode.geocode(req.query.address,(error,{latitude, longitude, location}={})=>{  //(error,data) to (error,{latitude, longitude, location})            
        if(error)
        return res.send({error})
        
        forecast.forecast(latitude,longitude, (error, forecastData) => {
            if(error)
            return res.send({error})

            res.send({location:location,forecast:forecastData,address:req.query.address})
          })
})   
  
   
})
app.get('*',(req,res)=>{
    res.render('404')
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})