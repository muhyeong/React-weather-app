import React from "react";
import { Button } from "react-bootstrap";

export default function WeatherButton({ cities, setCity, selectedCity }) {
  return (
    <div className={"buttonBox"}>
      <Button
        variant={selectedCity === "" ? "outline-warning" : "warning"}
        onClick={() => setCity("")}
      >
        Current Location
      </Button>
      {cities.map((city, idx) => (
        <Button
          key={idx}
          variant={selectedCity === city ? "outline-warning" : "warning"}
          onClick={() => setCity(city)}
        >
          {city}
        </Button>
      ))}
    </div>
  );
}
