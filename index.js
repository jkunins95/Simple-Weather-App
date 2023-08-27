const apiKey = "a03b3219be7b650ca3c417283a1ecdc3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

const searchBox = document.querySelector(".search input");
const searchBttn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const resp = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(resp.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        let data = await resp.json();

        // console.log(data);
    
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°F";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + "mph";
    
        if(data.weather[0].main === "Clouds") {
            weatherIcon.src = "img/clouds.png";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "img/clear.png";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "img/rain.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "img/drizzle.png";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "img/mist.png";
        }
    
        document.querySelector(".weather").style.display = "block"
        document.querySelector(".error").style.display = "none";
    };
};

searchBttn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
