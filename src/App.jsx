import { useEffect, useState } from "react";
import "./App.css";
// images
import searchIcon from "./assets/search.png";
import clearIcon from "./assets/clear.png";
import cloudIcon from "./assets/cloud.png";
import drisilIcon from "./assets/drisil.png";
import rainIcon from "./assets/rain.png";
import windIcon from "./assets/wind.png";
import snowIcon from "./assets/snow.png";
import humadidtyIcon from "./assets/humadidty.png";

const WeatherDetails = ({
  icon,
  temp,
  city,
  country,
  lat,
  log,
  humidity,
  wind,
}) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt="image" />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">latitude</span>
          <span> {lat}</span>
        </div>
        <div>
          <span className="log">longitude</span>
          <span> {log}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humadidtyIcon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="" className="icon" />
          <div className="data">
            <div className="wind-percent">{wind} km/h</div>
            <div className="text">Wind speed</div>
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  let apiKey = `815ce0b3aee0af269fd94117dd453c59`;
  const [text, setText] = useState("london");
  const [icon, setIcon] = useState(snowIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("london");
  const [country, setCountry] = useState("SL");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const weatherIconMap = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": drisilIcon,
    "03n": drisilIcon,
    "04d": drisilIcon,
    "04n": drisilIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  };

  const search = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&units=Metric`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data.cod === "404") {
        console.log("city not fond");
        setLoading(false);
        setCityNotFound(true);
        return;
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon);
      setCityNotFound(false);
    } catch (error) {
      console.log("An occured", error.message);
      setError("An ERROR occuredd while fetching weather data.");
    } finally {
      setLoading(false);
    }
  };
  const handleCity = (e) => {
    setText(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };
  useEffect(function () {
    search();
  }, []);
  return (
    <>
      <div className="container">
        <div className="input-container">
          <input
            type="text"
            className="cityInput"
            placeholder="search city"
            onChange={handleCity}
            value={text}
            onKeyDown={handleKeyDown}
          />
          <div
            className="search-icon"
            onClick={() => {
              search();
            }}
          >
            <img src={searchIcon} alt="search" />
          </div>
        </div>

        {loading && <div className="loading-message">Loading...</div>}
        {error && <div className="error-message">{error}</div>}
        {cityNotFound && <div className="city-not-found">city not found</div>}
        {!loading && !cityNotFound && (
          <WeatherDetails
            icon={icon}
            temp={temp}
            city={city}
            country={country}
            lat={lat}
            log={log}
            wind={wind}
            humidity={humidity}
          />
        )}
        <p className="copyright">
          Desigend by <span>Fazal</span>
        </p>
      </div>
    </>
  );
}

export default App;
