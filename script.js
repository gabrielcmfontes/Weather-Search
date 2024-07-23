// Elements
const containerBox = document.getElementById("container");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const errorText = document.getElementById("found-text");
const searchButton = document.querySelector(".search-box button");

const temp = document.querySelector(".temperature");
const humidity = document.querySelector(".humidityText");
const wind = document.querySelector(".windText");
const description = document.querySelector(".description");

// Events
searchButton.addEventListener("click", () => {
    const city = document.querySelector(".search-box input").value;
    const apiKey = "23e65d5bfa7dfa64e1f2ddf1a3114a36";

    if (city === '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição da API');
            }
            return response.json();
        })
        .then(data => {
            const cityTemp = data.main.temp;
            const cityHumidity = data.main.humidity;
            const cityWind = data.wind.speed;

            weatherBox.style.display = "block";
            errorText.innerHTML = "";
            containerBox.style.height = "380px";
            temp.innerHTML = `${Math.trunc(cityTemp)}º`;
            description.innerHTML = city;
            humidity.innerHTML = `${cityHumidity}%`;
            wind.innerHTML = `${cityWind}Km/h`;
        })
        .catch(error => {
            console.error(error);
            containerBox.style.height = "300px";
            weatherBox.style.display = "none";
            errorText.innerHTML = "Oops! Invalid Location";
        });
});
