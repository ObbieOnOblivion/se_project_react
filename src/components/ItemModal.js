import React, { useContext, useEffect } from 'react';
import useEscape from "../utils/useEscape"; // why does this work across multiple modals
import CurrentUserContext from '../context/CurrentUserContext';

const ItemModal = (props) => {

  const currentUser = useContext(CurrentUserContext);

  const handleModalClick = (event) => {
    if (event.target === event.currentTarget) {
      props.onClose();
    }
  };

  const handleDelete = () => {
    props.handleDelete();
    props.onClose();
  }

  const isOwned = props.itemOwner != currentUser._id

  useEscape(ItemModal, props.onClose);

  return (
    <div className={`modal ${props.opened ? "" : "modal_close"}`} onClick={handleModalClick}>
      <div className="modal__container">
        <button
          className={"modal__close-button"}
          onClick={props.onClose}
        ></button>
        <img
          className="modal__image"
          src={props.itemImageUrl ? props.itemImageUrl : ""}
          alt={props.itemName ? props.itemName : ""}
        />
        <div className="modal__sub-container">
          <div className="modal__text-header">
            <h3 className="modal__text">{props.itemName}</h3>
            <button className={`modal__delete-button ${(isOwned)?
              "modal__delete-button_invisable":""
            }`}
              onClick={handleDelete}
              id={props.itemId}
            >Delete Item</button>   
          </div>
          <h3 className="modal__text">{`Weather: ${props.itemCategory}`}</h3>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
