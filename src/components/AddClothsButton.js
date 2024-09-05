import React from "react";

const AddClothsButton = (props) => {
  return (
    <button onClick={props.onclick} className={`header__add-button header__text ${props.className}`}>
      + Add Cloths
    </button>
  );
};

export default AddClothsButton;
