const search = document.querySelector(".search-location");
const cityValue = document.querySelector(".search-location input");
// const btn = document.querySelector(".buttom");
const cityName = document.querySelector(".city-name p");
const cityName1 = document.querySelector(".city-name span");
const cardBody = document.querySelector(".card-body");
const timeImage = document.querySelector(".card-top img");
const Cbody = document.querySelector(".back-card");

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .then((registration) => {
      console.log("SW Registration!");
      console.log(registration);
    })
    .catch((error) => {
      console.log("SW Registration Failed");
      console.log(error);
    });
}

const spitOutCelcius = (kelvin) => {
  celcius = Math.round(kelvin - 273.15);
  return celcius;
};

const isDay = (icon) => {
  if (icon.includes("d")) {
    return true;
  } else {
    return false;
  }
};

//load data to html
updateWeatherApp = (city) => {
  console.log(city);
  const icons = city.weather[0].icon;
  const iconSrc = `http://openweathermap.org/img/wn/${icons}.png`;
  cityName.textContent = city.name;
  cardBody.innerHTML = `
  <div class="card-mid row">
            <div class="col text-center temp">
              <span>${spitOutCelcius(city.main.temp)}&deg;C</span>
            </div>
            <div class="col-4 condition-temp">
              <p class="cond">${city.weather[0].description}</p>
              <p class="high">${spitOutCelcius(city.main.temp_max)}&deg;C</p>
              <p class="low">${spitOutCelcius(city.main.temp_min)}&deg;C</p>
            </div>
          </div>

          <div class="icon-container card shadow mx-auto">
            <img src="${iconSrc}" style="height: 100px; width: 100px;" alt="" />
          </div>
          <div class="card-buttom px-5 py-4 row">
            <div class="col text-center">
              <p>${spitOutCelcius(city.main.feels_like)}&deg;</p>
              <span>Feel like</span>
            </div>
            <div class="col text-center">
              <p>${city.main.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>`;
  // selction icon when is day or night
  if (isDay(icons)) {
    console.log("Day");
    timeImage.setAttribute("src", "img/day_image.svg");
    if (cityName.classList.contains("text-white") && cityName1.classList.contains("text-white")) {
      cityName.classList.remove("text-white");
      cityName1.classList.remove("text-white");
    } else {
      cityName.classList.add("text-black");
      cityName1.classList.add("text-black");
    }
  } else {
    console.log("Night");
    timeImage.setAttribute("src", "img/night_image.svg");
    if (cityName.classList.contains("text-black") && cityName1.classList.contains("text-black")) {
      cityName.classList.remove("text-black");
      cityName1.classList.remove("text-black");
    } else {
      cityName.classList.add("text-white");
      cityName1.classList.add("text-white");
    }
  }
  Cbody.classList.remove("card-none");
};

//add event
search.addEventListener("submit", (e) => {
  // Cbody.classList.remove("card-none");
  e.preventDefault();
  const citySearch = cityValue.value.trim();
  search.reset();
  reqCity(citySearch)
    .then((data) => {
      updateWeatherApp(data);
      // window.location.href = "info.html";
    })
    .catch((error) => console.log(error));
});
