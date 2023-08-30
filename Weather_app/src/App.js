import './App.css'


import clear from './img/clear.png'
import clouds from './img/clear.png'

import drizzle from './img/drizzle.png'
import haze from './img/haze.png'
import mist from './img/mist.png'
import rain from './img/rain.png'
import snow from './img/snow.png'

import wind from '../src/images/wind.png'
import humidity from './images/humidity.png'
import { useEffect, useState } from 'react'
import axios from 'axios'

const color = { border: '1px solid gray', backgroundColor: 'gray' }

function App() {
  const [data, setData] = useState({
    celcius: 0,
    name: '',
    humidity: 0,
    speed: 0,
    weatherName:'',
    image:"./img/clouds.png"
  })

  const [name, setName] = useState('');
  const [error, setError] = useState('');


  // useEffect(() => {

  // }, [])

  const handleClick = () => {
    if (name !== '') {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=07a81722ccaf6c9c28bbd1cb4aaceb96`
      axios.get(apiUrl)
        .then((result) => {
          
          setError('');
          let imagePath = ''
          
          if(result.data.weather[0].main == 'Clouds'){
            
            imagePath = "./img/clouds.png"
            // imagePath = {clouds}
          } else if(result.data.weather[0].main == 'Clear') {
            imagePath = './img/clear.png';
            // imagePath = {clear};
          } else if(result.data.weather[0].main == 'Rain') {
            imagePath = './img/rain.png';
            // imagePath = {rain}
          } else if(result.data.weather[0].main == 'Drizzle') {
            imagePath = './img/drizzle.png';
            // imagePath = {drizzle}
          } else if(result.data.weather[0].main == 'Mist') {
            imagePath = './img/mist.png';
            // imagePath = {mist}
          } else if(result.data.weather[0].main == 'Haze') {
            imagePath = './img/haze.png'
          } 
          else{
            
            imagePath = './img/clouds.png';
            // imagePath = {clouds};
            
          }
          console.log(result.data);
          setData({ ...data, celcius: result.data.main.temp, name: result.data.name, humidity: result.data.main.humidity, speed: result.data.wind.speed, weatherName:result.data.weather[0].main, image:imagePath })
        })
        .catch((error) => {
          if(error.response.status === 404) {
            setError(" Invalid City Name.. ");
          }
          else{
            setError('');
          }
          console.log(error);
        })
    }
  }


  return (
    <>
      <div className="container">
        <div className="header">
          <div className="search-box">
            <input type="text" placeholder='Enter City Name ' onChange={(e) => { setName(e.target.value) }} />
            <button className='fa-solid fa-magnifying-glass' onClick={handleClick}></button>
          </div>
        </div>

        <div className="error">
          <p>{error}</p>
        </div>

        <div className="weather-body">
          <img src={data.image} alt="weather img"  />

          <div className="weather-box">
            <p className="temp">{Math.round(data.celcius)} <sup>°C</sup> </p>
            <h2 className='nm'> {data.name} </h2>
            <p className="description">{data.weatherName}</p>
          </div>

          <div className="weather-details">

            <div className="humidity">
              <img src={humidity} style={color} alt="" />
              <div className="text">
                <span id='humidity'>{Math.round(data.humidity)}%</span>
                <p>Humidity</p>
              </div>

            </div>

            <div className="wind">
              <img src={wind} style={color} alt="" />
              <div className="text">
                <span id='wind-speed'>{Math.round(data.speed)} km/hr</span>
                <p>Wind Speed</p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default App;
