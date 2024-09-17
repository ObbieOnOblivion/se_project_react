import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import companyLogo from "../images/Logo.svg";
import CurrentTemperatureUnitContext from "../context/CurrentTemperatureUnitContext";
import CurrentUserContext from '../context/CurrentUserContext';
import ToggleSwitch from './ToggleSwitch';

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

const returnImage = (link, alt, id = "", className = "") => {
  return <img src={link} alt={alt} id={id} className={className} />;
};

const HeaderButton = (props) =>{
  return (
    <button className='header__registerUser header__text' onClick={props.onClick}> {props.buttonText} </button>
  )
}

const DefaultImage = (props) => {
  const currentUserContext = useContext(CurrentUserContext);
  const user = currentUserContext.currentUser;

  return (
    <div className="header__default-image">
      <div className="header__outer-circle">
        <div className="header__inner-circle">
          <span>{user.name?user.name[0]:"N"}</span>
        </div>
      </div>
    </div>
  );
};

const Header = (props) => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(CurrentTemperatureUnitContext);
  const currentUser = useContext(CurrentUserContext);
  const user = currentUser.currentUser;

  return (
    <header className="header">
      <div className="header__section">
        <Link to="/" className="header__text">{returnImage(companyLogo, "Company Logo")}</Link>
        <p className="header__text header__text_margin_left">
          {currentDate}, {props.location}
        </p>
      </div>

      <div className="header__section header__section_margin_left">
        <label className="header__switch">

          <input type="checkbox" onClick={() => {

            { handleToggleSwitchChange() };

          }} className="header__switch-checkbox"></input>
          <ToggleSwitch tempUnit={currentTemperatureUnit}></ToggleSwitch>
          {props.toggleButton}
        </label>

        {user._id? props.addButton:<HeaderButton  onClick={props.openRegisterModal} buttonText={"Sign Up"}></HeaderButton>}
        <h3 className="header__text">{user.name ? user.name : 
            <HeaderButton buttonText={"Log In"} onClick={props.openLoginModal}></HeaderButton>}</h3>
        <Link className="header__link" to="/profile">
          {user.avatar ? returnImage(user.avatar, "Profile Logo", "", "header__profile-image") : DefaultImage()}
        </Link>

      </div>
    </header>
  );
};

export default Header;
