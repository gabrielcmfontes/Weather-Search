//Elements
const apiKey = "7cc7b943033a15a91ee96a5470b01a7f";
const containerBox = document.getElementById("container");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const errorText = document.getElementById("found-text");
const searchButton = document.querySelector(".search-box button");


const temp = document.querySelector(".temperature");
const humidity = document.querySelector(".humidityText");
const wind = document.querySelector(".windText");
const description = document.querySelector(".description");

//Events
searchButton.addEventListener("click", () => {
    const city = document.querySelector(".search-box input").value;

    if(city == ''){
        return;
    }

    fetch(`http://api.openweathermap.org/data/2.5/find?q=${city}&appid=${apiKey}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição da API');
        }
        return response.json(); 
    })
    .then(data => {
        const firstCity = data.list[0];
        if (!firstCity) {
            //Style
            containerBox.style.height = "300px";
            weatherBox.style.display = "none";
            humidity.innerHTML = `0%`;
            wind.innerHTML = `0Km/h`;
            errorText.innerHTML = "Oops! Invalid Location";
            //Get Out
            return Promise.reject('Cidade não encontrada na resposta da API');
        }
        const cityId = firstCity.id; 
        return fetch(`http://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=${apiKey}`);
    })    
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição da API de busca');
        }
        return response.json();
    })
    .then(data => {
        const cityTemp = data.main.temp;
        const cityHumidity = data.main.humidity;
        const cityWind = data.wind.speed;

        //Style
        weatherBox.style.display = "block";
        errorText.innerHTML = "";
        containerBox.style.height = "380px";
        temp.innerHTML = `${Math.trunc(cityTemp)}º`;
        description.innerHTML = city;
        humidity.innerHTML = `${cityHumidity}%`;
        wind.innerHTML = `${cityWind}Km/h`;
    })
});
