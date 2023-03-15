/****************************SCRIPT FOR WEATHER API*****************************/

const api = '9908d691435ad75aebee9e5b9446ab61';

const weatherImage = document.getElementById("weather-icon");
const locate = document.getElementById("location");
const descriptionData = document.querySelector(".desc");
const tempCelsius = document.querySelector(".celsius");
const sunriseData = document.querySelector(".sunrise");
const sunsetData = document.querySelector(".sunset");

window.addEventListener('load', () => {
    let long = 0;
    let lat = 0;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            //detect actual location
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}`;

            console.log(base);  //This helps to access full weather data at the console.
            fetch(base).then((response) => {
                return response.json();
            })
            .then((getData) => {
                //get specific data from base
                const {temp} = getData.main;
                const place = getData.name;
                const {description, icon} = getData.weather[0];
                const {sunrise, sunset} = getData.sys;

                const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

                const sunriseGMT = new Date(sunrise * 1000); //Convert sunrise time from Epoch to GMT
                const sunsetGMT = new Date(sunset * 1000);  //Convert sunset time from Epoch to GMT

                weatherImage.src = iconUrl;

                let temptoCelsius = temp - 273.15;  //convert kelvin to celsius
                //display data
                locate.textContent = place;
                descriptionData.textContent = description;
                tempCelsius.textContent = temptoCelsius.toFixed(2) + "°C";
                sunriseData.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
                sunsetData.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
            });
        });
    }
});

//------------------END OF SCRIPT FOR WEATHER API-------------------------------//
