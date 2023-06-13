import React from "react";

export default function WeatherBox({ weather }) {
  console.log(weather);
  return (
    <div className={"weatherBox"}>
      <div>{weather?.name}</div>
      <h2>
        {Math.floor(weather ? weather.main.temp : null)}℃ /{" "}
        {Math.floor(weather ? (weather?.main.temp * 9) / 5 + 32 : null)}℉
      </h2>
      <h3>{weather?.weather[0].description}</h3>
    </div>
  );
}
