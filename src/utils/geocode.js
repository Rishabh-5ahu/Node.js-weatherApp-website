const request=require('request')


geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicmlzaGFiaHNhaHUiLCJhIjoiY2s4OG4xaTVmMDllODNlbWowZmpjaWo2MyJ9.7dlJVbMgMSdf5fRKatZdXw&limit=1'
    request({url,json:true},(error,response)=>{             //Property Shorthand url:url => url only
        if(error)
            callback('Unable to connect with service',undefined)
        else if(response.body.features.length===0)
            callback('Unable to find the location',undefined)
        else{
            const data={
                longitude:response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            }
            callback(undefined,data)
        }
      
    })
}

module.exports={geocode:geocode}