const request=require('request')
const geocode=(address,callback)=>{

    const url='https://api.maptiler.com/geocoding/'+address+'.json?key=jzLFFfu2sygHazgpUYWL'
    request(
        {url:url,json:true},(error,response)=>{

        if(error)
        {
          callback('unable to connect to location services!',undefined)
        }else if(response.body.features.length===0)
        {
            callback('unable to find to location .Try to find another search!',undefined)
        }
        else{
            callback(undefined,{
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[1].place_name
            })

        }
})
}
module.exports=geocode