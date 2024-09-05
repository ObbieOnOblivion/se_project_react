import React from 'react';
import ItemCard from "./ItemCard";
import SideBar from './SideBar';
import ClothesSection from './ClothesSection';

const Profile = (props) => {

  const Cards = () => {
    const cardItems = props.cardContent.slice().reverse();

    return cardItems.map((item) => {
      return (
        <ItemCard
          id={item._id}
          key={item._id}
          name={item.name}
          weather={item.weather}
          imageUrl={item.imageUrl}
          likes={item.likes}
          onCardLike={props.onCardLike}
          handleClick={(x, y, z) => { // better naming 
            props.toggleItemModal(item._id, x, y, z, item.owner);
          }}
        ></ItemCard>
      );
    });
  }

  return (
    <div className='profile'>
      <SideBar
      openEditModal={props.openEditModal}
      logOut={props.logOut}
      ></SideBar>
      <ClothesSection addButton={props.addButton} cards={Cards()}></ClothesSection>
    </div>
  )
}

export default Profile
