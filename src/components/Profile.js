import React, {useContext} from 'react';
import ItemCard from "./ItemCard";
import SideBar from './SideBar';
import ClothesSection from './ClothesSection';
import CurrentUserContext from '../context/CurrentUserContext';

//this paths functionality is not done right buttons dont do anything and itemModals are not opened
//there are hella rerenders
//itemcard like button keeps toggling like

// const Cards = (props) => {
//   const cardItems = props.cardContent.slice().reverse();
//   const currentUserContext = useContext(CurrentUserContext);
//   const registeredUser = currentUserContext.currentUser._id

//   return cardItems.map((item) => {
//     if (item.owner == registeredUser){
//       // console.log(item.likes)
//       return (
//         <ItemCard
//           id={item._id}
//           key={item._id}
//           name={item.name}
//           weather={item.weather}
//           imageUrl={item.imageUrl}
//           likes={item.likes}
//           onCardLike={props.onCardLike}
//           handleClick={(name, imageUrl, weather) => {
//             props.toggleItemModal(item._id, name, imageUrl, weather, item.owner);
//           }}
//         ></ItemCard>
//       );
//     }
//   });
// }


const Profile = (props) => {
  const currentUserContext = useContext(CurrentUserContext);
  const registeredUser = currentUserContext.currentUser._id
  const Cards = () => {
    const cardItems = props.cardContent.slice().reverse();

    return cardItems.map((item) => {
      if (item.owner == registeredUser){
        return (
          <ItemCard
            id={item._id}
            key={item._id}
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

  return (
    <div className='profile'>
      <SideBar
      openEditModal={props.openEditModal}
      logOut={props.logOut}
      ></SideBar>
      <ClothesSection addButton={props.addButton} cards={Cards}></ClothesSection>
    </div>
  )
}

export default Profile
