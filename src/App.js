import React, { useState, useEffect } from "react";

const App = () => {
  const [searchValue, setSearchValue] = useState("Delhi"); // Set default search value to "Delhi"
  const [weatherInfo, setWeatherInfo] = useState({});
  const [timeStr, setTimeStr] = useState("");

  const getWeatherInfo = async (city) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=882175da53303221e2bb734ced2a9472`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

      const { temp, pressure, humidity } = data.main;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;
      const { main: weathermood } = data.weather[0];
      const { name } = data;

      let sec = sunset;
      let date = new Date(sec * 1000);
      const newTimeStr = `${date.getHours()}:${date.getMinutes()}`;
      console.log(newTimeStr);

      const tempInCelsius = (temp - 273.15).toFixed(2); // Convert Kelvin to Celsius

      const infoObject = {
        temp: tempInCelsius,
        pressure,
        humidity,
        speed,
        country,
        timeStr: newTimeStr,
        weathermood,
        name,
      };

      setWeatherInfo(infoObject);
      setTimeStr(newTimeStr);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo(searchValue); // Fetch weather data for the default city "Delhi" on component mount
  }, []); // Empty dependency array ensures it runs only once on mount

  const handleSearch = () => {
    getWeatherInfo(searchValue);
  };

  return (
    <>
      <div className="searchBar">
        <input
          className="searchSpace"
          placeholder="Search By City"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className="searchButton" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="main-container">
        <div className="container-top">
          <i className="container-top-icon bi bi-brightness-high-fill"></i>
        </div>

        <div className="container-middle">
          <div className="container-left">
            <div className="temperature">{weatherInfo.temp}&deg;C</div>
            <div className="weather">
              <p className="wtype">{weatherInfo.weathermood}</p>
              <p className="city">{weatherInfo.name}, {weatherInfo.country}</p>
            </div>
          </div>

          <div className="container-right">
            <p className="date">{new Date().toLocaleDateString()}</p>
            <p className="time">{new Date().toLocaleTimeString()}</p>
          </div>
        </div>

        <div className="container-bottom">
          <div className="info">
            <span className="icon">
              <i className="bi bi-sunset"></i>
            </span>
            <div>
              <p className="ptext1">{weatherInfo.timeStr}</p>
              <p className="ptext1">Sunset</p>
            </div>
          </div>

          <div className="info">
            <span className="icon">
              <i className="bi bi-droplet"></i>
            </span>
            <div>
              <p className="ptext1">{weatherInfo.humidity}</p>
              <p className="ptext1">Humidity</p>
            </div>
          </div>

          <div className="info">
            <span className="icon">
              <i className="bi bi-cloud-drizzle"></i>
            </span>
            <div>
              <p className="ptext1">Pressure</p>
              <p className="ptext1">{weatherInfo.pressure}</p>
            </div>
          </div>

          <div className="info">
            <span className="icon">
              <i className="bi bi-wind"></i>
            </span>
            <div>
              <p className="ptext1">Wind</p>
              <p className="ptext1">{weatherInfo.speed}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
