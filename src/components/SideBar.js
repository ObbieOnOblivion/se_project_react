import React, {useContext} from "react";
import CurrentUserContext from "../context/CurrentUserContext";

const returnImage = (link) => {
    return <img src={link} alt={"Profile Logo"} id={""} className={"profile__logo"} />;
};

const DefaultImage = (props) => {
    const currentUser = useContext(CurrentUserContext);
  
    return (
      <div className="header__default-image">
        <div className="header__outer-circle">
          <div className="header__inner-circle">
            <span>{currentUser.name?currentUser.name[0]:"N"}</span>
          </div>
        </div>
      </div>
    );
  };

const SideBar = (props) => {
    const currentUser = React.useContext(CurrentUserContext);
    return (
        <div className="sidebar">
            <div className='profile__avatar'>

                <h3 className='profile__avatar-text'>{currentUser.name}</h3>
                {currentUser.avatar ? returnImage(currentUser.avatar) : DefaultImage()}
            </div>
            <button className={`sidebar__button ${currentUser._id?"":"sidebar__button_hidden"}`} onClick={props.openEditModal}>Change Profile Data</button>
            <button className={`sidebar__button ${currentUser._id?"":"sidebar__button_hidden"}`} onClick={props.logOut}>Log Out</button>
        </div>

    )
}

export default SideBar
