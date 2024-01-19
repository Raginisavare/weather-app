const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=c89666599188f28e438be88e404bfe8a&query='+latitude+','+longitude
    request({url:url,json:true},(error,response)=>{
        if(error)
        {
           callback('unable to connect to weather service!',undefined)
        }else if(response.body.error)
        {
          callback('unable to find location',undefined)
        }else{
          callback(undefined,response.body.current.weather_descriptions+' it is currently ')
        }
    })
}
module.exports=forecast