

import React, { useContext, useState, useEffect } from 'react';
import ItemCard from "./ItemCard";
import WeatherCard from "./WeatherCard";
import CurrentTemperatureUnitContext from "../context/CurrentTemperatureUnitContext"

const Main = (props) => {
  const {currentTemperatureUnit, handleToggleSwitchChange} = useContext(CurrentTemperatureUnitContext);

  const cards = () =>{
    let items =[]
    for (let i = 0; i <= props.cardContent.length - 1; i++) {
      items.push(props.cardContent[i])
      
    }
    return items.map((item) => {
      const weatherCategory =
        props.temperature >= 86
          ? "hot"
          : props.temperature >= 66 && props.temperature <= 85
            ? "warm"
            : "cold";
      if (item.weather === weatherCategory) {
        return (
          <ItemCard
            key={item._id}
            name={item.name}
            weather={item.weather}
            imageUrl={item.imageUrl}
            handleClick={(x, y, z) => {
              props.toggleItemModal(item._id, x, y, z);
            }}
          ></ItemCard>
        );
      }
    });
  }

  return (
    <main className="">
      <WeatherCard tempUnit={currentTemperatureUnit} temperature={props.temperature}></WeatherCard>
      <div>
        <div className="profile__section"></div>
        <ul>{cards()}</ul>
      </div>
      <br />
    </main>
  );
};

export default Main;
