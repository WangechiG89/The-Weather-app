function formatDate(timestamp){
    let date =new Date(timestamp);
    let hours=date.getHours();
    if (hours<10);
hours=`0 ${hours}`;

let minutes=date.getMinutes();
if (minutes<10);
minutes=` 0${minutes}`;

let days=["Sunday", "Monday", "Tuesday", "Wednesaday", "Thursday", "Friday", "Saturday"];
let day=days [date.getDay()];
    return`${day} ${hours}:${minutes}`;
}

function displayForecast(response){
  console.log(response.data.daily);
    let forecastElement=document.querySelector("#forecast");

    let forecastHTML=`<div class="row">`;
    let days =["Thur", "Fri", "Sat","Sun"];
    days.forEach(function(day){

    forecastHTML=forecastHTML+`
           
              <div class="col-2">
                <div class="weather-forecast-date">${day}</div>

                <img
                  src="https://openweathermap.org/img/wn/50n@2x.png"
                  alt=""
                  width="36"
                />
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temperature-max">18° </span>
                  <span class="weather-forecast-temperature-mini">12° </span>
                </div>
              </div>
            </div>
             `;



    });
      
    forecastHTML=forecastHTML+`</div>`;

    forecastElement.innerHTML=forecastHTML;
    console.log(forecastHTML);

   
}
function getForecast(coordinates){
  console.log(coordinates);
  let apiKey="f256af9198bc4036cf1455428925e38c";
  let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response){
    
    let temperatureElement=document.querySelector("#temperature");
    let cityElement=document.querySelector("#city");
    let conditionElement=document.querySelector("#condition");
    let humidityElement=document.querySelector("#humidity");
let windElement=document.querySelector("#wind");
let dateElement=document.querySelector("#date");
let iconElement=document.querySelector("#icon");

celsiusTemperature=response.data.main.temp;
    temperatureElement.innerHTML=Math.round(celsiusTemperature);
    cityElement.innerHTML=response.data.name;
   conditionElement.innerHTML=response.data.weather[0].description;
   humidityElement.innerHTML=response.data.main.humidity;
   windElement.innerHTML=Math.round(response.data.wind.speed);
   dateElement.innerHTML=formatDate(response.data.dt*1000);
   iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png `);
   iconElement.setAttribute("alt",response.data.weather[0].description);
  
   getForecast(response.data.coord);
}
function handleSubmit(event){
    event.preventDefault();
    let cityInputElement=document.querySelector("#city-input");
    search(cityInputElement.value);
}
  
function search(city){
let apiKey="f256af9198bc4036cf1455428925e38c";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl). then(displayTemperature);

}

function displayFahrTemp(event){
event.preventDefault();

let temperatureElement=document.querySelector("#temperature");
let fahrTemp= (celsiusTemperature * 9/5) + 32 ;
temperatureElement.innerHTML=Math.round(fahrTemp);
}

function displaycelsiusTemp(event){
event.preventDefault();
let temperatureElement=document.querySelector("#temperature");
temperatureElement.innerHTML= Math.round(celsiusTemperature);
}
let celsiusTemperature=null;

let form=document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrLink=document.querySelector("#fahr-link");
fahrLink.addEventListener("click", displayFahrTemp);

let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displaycelsiusTemp);


search("New York");
