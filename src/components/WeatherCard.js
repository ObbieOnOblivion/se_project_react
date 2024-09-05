import React from 'react';
import * as Constants from "../utils/constants";
import CurrentTemperatureUnitContext from "../context/CurrentTemperatureUnitContext.js"

const WeatherCard = (props) => {

  const displayTemperature = props.tempUnit === "C"
    ? Math.round((props.temperature - 32) * 5 / 9)
    : props.temperature;

  return (
    <div className="weather-modal">
      <div className="weather-temp">{`${displayTemperature} ${props.tempUnit}°`}</div>
      <img
        className="weather-card"
        src={Constants.cardConditions.night.stormy}
        alt="Weather condition"
      />
    </div>
  );
};

export default WeatherCard;
