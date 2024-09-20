

import React, { useContext } from 'react';
import ItemCard from "./ItemCard";
import WeatherCard from "./WeatherCard";
import CurrentTemperatureUnitContext from "../context/CurrentTemperatureUnitContext";
const Main = (props) => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(CurrentTemperatureUnitContext);
  // console.log("this is repeating")
  const generateCards = () => {

    const cardItems = props.cardContent.slice().reverse();
    return cardItems.map((item) => {
      const weatherCategory = (temperature, unit) => {
        if (unit === "C") {
          return temperature >= 30
            ? "hot"
            : temperature >= 20
              ? "warm"
              : "cold";
        } else {
          return temperature >= 86
            ? "hot"
            : temperature >= 66
              ? "warm"
              : "cold";
        }
        
      };
      if ((item.weather === weatherCategory(props.temperature, currentTemperatureUnit))) {

        return (
          <ItemCard
            key={item._id}
            id={item._id}
            name={item.name}
            weather={item.weather}
            imageUrl={item.imageUrl}
            likes={item.likes}
            onCardLike={props.onCardLike}
            handleClick={(name, imageUrl, weather) => {
              props.toggleItemModal(item._id, name, imageUrl, weather, item.owner);
            }}
          ></ItemCard>
        );
      }
    });
  }

  const displayTemperature = currentTemperatureUnit === "C"
    ? Math.round((props.temperature - 32) * 5 / 9)
    : props.temperature;

  return (
    <main className="">
      <WeatherCard tempUnit={currentTemperatureUnit} temperature={props.temperature}></WeatherCard>
      <div>
        <h3 className='main__text'>{`Today is ${displayTemperature} ${currentTemperatureUnit} / You may want to wear:`}</h3>
        <div className="profile__section"></div>
        <ul>{generateCards()}</ul>
      </div>
      <br />
    </main>
  );
};

export default Main;
