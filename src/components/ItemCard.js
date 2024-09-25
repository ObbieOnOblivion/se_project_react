
import React, { useState, useEffect, useContext } from "react";
import defaultImage from "../images/State=Default.png"
import likeImage from "../images/State=Liked.png"
import CurrentUserContext from "../context/CurrentUserContext";

const renderLikeImage = (image) =>{
  return (
    <img
    className="card__like-image"
    src={image}
    >
    </img>
  )
}


const ItemCard = (props) => {
  const [isLiked, setIsLiked] = useState(false);
  const currentUserContext = useContext(CurrentUserContext);
  const currentUser = currentUserContext.currentUser;

  useEffect(() =>{  
    setIsLiked(props.likes.includes(currentUser._id));
  }, [])

  const toggleLike = () => {
    props.onCardLike({id:props.id, isLiked:isLiked}).then(() =>{
      setIsLiked(prevIsLiked => !prevIsLiked);
    }).catch((error) =>{
      console.error(error)
    })
  };

  return (
    <li
      className="card"
    >
      <img
        className="card__image"
        src={props.imageUrl ? props.imageUrl : ""}
        alt={props.name ? props.name : ""}
        onClick={() => {
          props.handleClick(props.name, props.imageUrl, props.weather);
        }}
      />
      <div className="card__info-center">
      <h3 className="card__title">
        {props.name}
      </h3>
      <button className={`card__like_button ${currentUser._id?"":"card__like_button_hidden"}`} onClick={toggleLike}>
        {isLiked?renderLikeImage(likeImage):renderLikeImage(defaultImage)}
        </button>
      </div>

    </li>
  );
};

export default ItemCard;
