import './WeatherApp.css';
import React ,{useState}from 'react';
import search_icon from '../Assets/search.png';
import clear_icon from'../Assets/clear-day.svg';
import cloud_night from '../Assets/cloudy-night.svg';
import cloud_day from '../Assets/partly-cloudy-day.svg';
import drizzle_day from '../Assets/partly-cloudy-day-drizzle.svg';
import drizzle_night from '../Assets/partly-cloudy-night-drizzle.svg';
import rain_day from '../Assets/partly-cloudy-day-rain.svg';
import rain_night from '../Assets/partly-cloudy-night-rain.svg';
import snow_day from '../Assets/partly-cloudy-day-snow.svg';
import snow_night from '../Assets/partly-cloudy-night-snow.svg';
import wind_icon  from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';
import clear_night from '../Assets/clear-night.svg';
import report from '../Assets/report.jpg';


const WeatherApp = ()=>{
    let api_key = "8e774439269bb5e854bcf966e66aa019";
  
    const [wicon,setWicon] = useState(cloud_day)

    const search = async()=>{
        const element = document.getElementsByClassName("cityInput");

        if(element[0].value ===  ""){
            return 0;
        
        }
        let url =`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let response = await  fetch(url);
        let data = await response.json();
         
        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temprature = document.getElementsByClassName("weather-temp"); 
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.main.humidity +" %";
        wind[0].innerHTML = Math.floor(data.wind.speed )+" km/h";
        temprature[0].innerHTML = Math.floor(data.main.temp) +"˚c";
        location[0].innerHTML = data.name;

        if(data.weather[0].icon === "01d" )
        {
             setWicon(clear_icon);
        }
        if (data.weather[0].icon === "01n"){
            setWicon(clear_night);
        }
        else if (data.weather[0].icon === "02d" ){
            setWicon(cloud_day);

        }
        else if(data.weather[0].icon === "02n"){
            setWicon(cloud_night);
        }
        else if (data.weather[0].icon === "03d" || data.weather[0].icon === "04d"){
            setWicon(drizzle_day);
            
        }
        else if (data.weather[0].icon === "03n" || data.weather[0].icon === "04n"){
            setWicon(drizzle_night);
            
        }
        else if (data.weather[0].icon === "09d" || data.weather[0].icon === "10d"){
            setWicon(rain_day);
            
        }
        else if (data.weather[0].icon === "09n" || data.weather[0].icon === "10n"){
            setWicon(rain_night);
            
        }
        else if (data.weather[0].icon === "13d"){
            setWicon(snow_day);
            
        }
        else if(data.weather[0].icon === "13n"){
            setWicon(snow_night)
        }
        else{
            setWicon(clear_icon);
        }

    }
    return (
        <div className='all'>
            <div className='container'>
                <div className="top-bar">
                    <input type="text"className="cityInput" placeholder='Search'></input>
                    <div className="search-icon" onClick={()=>{search()}}>
                        <img src={search_icon} alt="" />
                    </div>
                </div>
                <div className="weather-img">
                    <img src={wicon} alt="" />
                </div>
                <div className="weather-temp">24c</div>
                <div className="weather-location">London</div>
                <div className="data-container">
                    <div className="element">
                        <img src={humidity_icon}alt="" className="icon" />
                        <div className="data">
                            <div className="humidity-percent">64%</div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>
                    <div className="element">
                        <img src={wind_icon}alt="" className="icon" />
                        <div className="data">
                            <div className="wind-rate">18 km/h</div>
                            <div className="text">Wind Speed</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="report">
                <img src={report} alt="" />
            </div>
        </div>
        
    )
};
export default WeatherApp


