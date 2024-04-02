//Elements
const apiKey = "7cc7b943033a15a91ee96a5470b01a7f";
const containerBox = document.querySelector(".container");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const searchButton = document.querySelector(".search-box button");
const disappear = document.getElementById("#disappear");


const temp = document.querySelector(".temperature");
temp.innerHTML = "Dei o  u";
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const description = document.querySelector(".description");

//Events
searchButton.addEventListener("click", () => {
    const city = document.querySelector(".search-box input").value;
    if(city == ''){
        return;
    }

    weatherBox.classList.add(".disappear");
    fetch(`http://api.openweathermap.org/data/2.5/find?q=${city}&appid=${apiKey}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição da API');
        }
        return response.json(); 
    })
    .then(data => {
        const firstCity = data.list[0];
        const cityId = firstCity.id; 
        console.log("ID da cidade:", cityId);
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


        console.log(`Temperatura de ${city}: ${cityTemp}`);
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});
