import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import WeatherBox from "./components/WeatherBox";
import WeatherButton from "./components/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

const cities = ["paris", "new york", "tokyo", "seoul"];

const API_KEY = process.env.REACT_APP_WEATHER_APP_API_KEY;
function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      getWeatherByCurrentLocation(latitude, longitude);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      setLoading(true);
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      ).then((res) => res.json());
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const getWeatherByCity = async () => {
    setLoading(true);
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    ).then((res) => res.json());
    setWeather(data);
    setLoading(false);
  };

  useEffect(() => {
    city === "" ? getCurrentLocation() : getWeatherByCity();
  }, [city]);

  return (
    <>
      <div className={"container"}>
        {loading ? (
          <ClipLoader color={"#f88c6b"} loading={loading} size={150} />
        ) : !error ? (
          <WeatherBox weather={weather} />
        ) : (
          <h1>{error}</h1>
        )}

        {/*{error && <p>{error}</p>}
        {loading && (
          <ClipLoader color={"#f88c6b"} loading={loading} size={150} />
        )}
        {!loading && <WeatherBox weather={weather} />}*/}
        <WeatherButton cities={cities} setCity={setCity} selectedCity={city} />
      </div>
    </>
  );
}

export default App;
