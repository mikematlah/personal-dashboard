const author = document.getElementById("author")
const crypto = document.getElementById("crypto")
const cryptoWeather = document.getElementById("crypto-weather")
const prices = document.getElementById("prices")
const time = document.getElementById("time")
const weather = document.getElementById("weather")
const currency = document.getElementById("currency")

let date = new Date()
let lon = ""
let lat = ""

console.log(date.toLocaleTimeString("en-ua",{timeStyle:"short"}))

function renderTime(){
   
    date = new Date()
    time.innerHTML = `${date.toLocaleTimeString("en-ua",{timeStyle:"short"})}`
}

setInterval(renderTime,1000)


fetch(`https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=utah`)
    .then(response=>response.json())
    .then(data=>{

      
        document.body.style.backgroundImage=`url(${data.urls.regular})`
        author.innerText = `By: ${data.user.name}`
    
        
        
        
        
    })
    .catch(err=>{
        console.error("something went wrong")

        document.body.style.backgroundImage=`url("https://images.unsplash.com/photo-1502657877623-f66bf489d236?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjQxODI5MjA&ixlib=rb-1.2.1&q=80&w=1080")`

    })
  
   

    fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    .then(response=>{

      
        console.log(response.ok)
        if(!response.ok){
            throw Error ="error ocured"
        }
       
        return response.json()})
    .then(data=>{
        
        let cryptoHtml = ``
        let priceHtml = ``
        cryptoHtml = ` 
            <img src="${data.image.small}">
            <p>${data.name}</p>
            <p>$${data.market_data.current_price.usd} </p>
     
        `
        priceHtml = `
            <p>🎯$${data.market_data.current_price.usd}</p>
            <p>👆 $${data.market_data.high_24h.usd}</p>
            <p>👇 $${data.market_data.low_24h.usd}</p>

        `
      
        
     
        crypto.innerHTML = cryptoHtml
        prices.innerHTML = priceHtml
      
       
        
    })
    .catch(err=>{

        console.error(err)
        crypto.innerHTML="error ocured"
        crypto.innerHTML = err
    })


    navigator.geolocation.getCurrentPosition(position => {
        lat = position.coords.latitude
        lon = position.coords.longitude
        console.log(lat)
        console.log(lon)
    

        fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`)
        .then(response=>{
            if(!response.ok){
                throw Error ="Weather data not available"
            }
          return response.json()})
        .then(data=>{

            console.log(data.weather[0].icon)
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            weather.innerHTML = 
               `
                   
                    <img src=${iconUrl}>
                    <p class="weather-temp">${Math.floor(data.main.temp)}°C</p>
                    <p class="weather-city">${data.name}</p>
                    
                ` 
                
            
                
                 

            
            
        })
        .catch(err=>{

            console.error(err)
            weather.innerHTML="Weather data not available"
           
        })

    })
  
   fetch("https://api.exchangerate.host/latest")

   .then(response=>{

        console.log(response.ok)
        if(!response.ok){
            throw Error ="error ocured"
        }

        return response.json()
   })
   .then(data=>{
        console.log(data.rates.UAH)
        currency.innerHTML = `<p>💲 ${data.rates.UAH.toFixed(2)}UAH</p>`
     
      
        
    })
   
    .catch(err=>{

        console.error(err)
       
        prices.innerHTML+="error ocured"
    })
 

