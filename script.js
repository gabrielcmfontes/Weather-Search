//Elements
const apiKey = "7cc7b943033a15a91ee96a5470b01a7f";
const container = document.querySelector(".container");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const searchButton = document.querySelector(".search-box button");

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
        return response.json(); // Converte os dados recebidos para JSON
    })
    .then(data => {
        const firstCity = data.list[0]; // Pega o primeiro resultado da lista de cidades
        const cityId = firstCity.id; // Pega o ID da cidade
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
