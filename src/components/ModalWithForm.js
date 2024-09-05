import React from "react";
import useEscape from "../utils/useEscape";

const ModalWithForm = (props) => {
  
  const handleModalClick = (event) => {
    if (event.target === event.currentTarget) {
      props.onClose();
    }
  };
  const handleLoginButtonClick = () => {
    props.onClose();
    props.openAlternativeModal();
  }
  useEscape(ModalWithForm, props.onClose);

  return (
    <div className={`modal ${props.state ? "" : "modal_close"}`} onClick={handleModalClick}>
      {/* ${props.authError?"form__shake":""} */}
      <form className={`form`} onSubmit={(event) => { 
        event.preventDefault();
        props.submitHandler();
      }}>
        <button
          type="button"
          className="form__close-button"
          onClick={() => {
            props.onClose();
          }}
        ></button>

        <h3>{props.title}</h3>

        {props.children}
        <div className="form__buttons">
          <button type="Button" className={`form__alternative-button ${props.hideLoginButton ? "form__alternative-button_hidden"
            : ""
            }`} onClick={handleLoginButtonClick}>
            {props.alternateButtonText}
          </button>

          <button className="form__submit-button" type="submit">
            {props.buttonText}
            {/* naming needs to be changed above */}
          </button>
        </div>

      </form>
    </div>
  );
};

export default ModalWithForm;
