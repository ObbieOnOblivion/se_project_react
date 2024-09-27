import "../blocks/App.css";
import "../index.css";
import React, { useState, useEffect } from "react";
import { Route, Switch } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import AddClothsButton from "./AddClothsButton";
import Footer from "./Footer";
import ItemModal from "./ItemModal";
import DeleteModal from "./DeleteModal";
import fetchWeatherApiInfo from "../utils/WeatherApi";
import CurrentTemperatureUnitContext from "../context/CurrentTemperatureUnitContext"
import CurrentCardsContext from "../context/CardsContext";
import CurrentUserContext from "../context/CurrentUserContext";
import Profile from "./Profile"
import AddItemModal from "./AddItemModal";
import {
  getCards, addCard, deleteCard, registerUser, loginUser, checkUser,
  addCardLike, removeCardLike, updateUser
} from "../utils/api";
import LoginModal from "./Login";
import RegisterModal from "./Register";
import EditProfileModal from "./EditProfileModal";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  const [itemModal, setItemModal] = useState({
    opened: false,
    itemInfo: { id: "", title: "", link: "", category: "", owner: "" }
  });
  const [deleteModal, setDeleteModal] = useState({ opened: false })
  const [loginModal, setLoginModal] = useState({ opened: false })
  const [registerModal, setRegisterModal] = useState({ opened: false })
  const [addModal, setAddModal] = useState({ opened: false });
  const [weatherData, setWeatherData] = useState({});
  const [temperature, setTemperature] = useState(0);
  const [currentTemperatureUnit, setCurrentTempUnit] = useState("F");
  const [cards, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [editProfileModal, setEditProfileModal] = useState(false);

  const VerifyToken = (token) => {
    checkUser(token).then(
      (response) => {
        if (response._id) {
          setRegisterModal({ opened: false })
          setLoginModal({ opened: false })
          setCurrentUser(response)
          setIsUserLoggedIn(true)
        }
      }
    ).catch(error => {
      console.error(error);
    })
  }

  useEffect(() => {
    const fetchClothesData = async () => {
      try {
        const response = await getCards();
        setClothingItems(response);
      } catch (error) {
        console.error('Error fetching clothes data:', error);
      }
    };
    fetchClothesData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      VerifyToken(token);
    }

  }, []);

  useEffect(() => {
    fetchWeatherApiInfo()
      .then((data) => {
        setWeatherData(data);
        setTemperature(data.main.temp);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const openEditProfileModal = () => {
    setEditProfileModal(true)
  }

  const closeEditProfileModal = () => {
    setEditProfileModal(false)
  }

  const closeLoginModal = () => {
    setLoginModal({ opened: false });
  }

  const openLoginModal = () => {
    setLoginModal({ opened: true });
  }

  const closeRegisterModal = () => {
    setRegisterModal({ opened: false });
  }

  const openRegisterModal = () => {
    setRegisterModal({ opened: true });
  }

  const closeItemModal = () => {
    setItemModal((prevItemModal) => ({ ...prevItemModal, opened: false }));
  };

  const closeAddModal = () => {
    setAddModal((prevAddModal) => ({ ...prevAddModal, opened: false }));
  };

  const openAddModal = () => {
    setAddModal({ opened: true });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ opened: false })
  }

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTempUnit("C") :
      setCurrentTempUnit("F");

  }

  const toggleItemModal = (id, title, link, category, owner) => {
    setItemModal((prevItemModal) => ({
      ...prevItemModal,
      itemInfo: {
        id: id,
        title: title,
        link: link,
        category: category,
        owner: owner
      },
      opened: !prevItemModal.opened,
    }));
  };

  const removeCardById = (idToRemove) => {
    setClothingItems(prevCards => prevCards.filter(card => card._id !== idToRemove));
  };

  const logOut = () => {
    localStorage.removeItem('jwt');
    setCurrentUser({})
  }

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    return !isLiked
      ?
      addCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
      :
      removeCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
  };

  return (
    <div className="App">
      <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
        <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
          <CurrentCardsContext.Provider value={{ cards, setClothingItems }}>

            <EditProfileModal
              state={editProfileModal}
              buttonText={"Save Changes"}
              title={"Change Profile Data"}
              onClose={closeEditProfileModal}
              updateUser={updateUser}
              setCurrentUser={setCurrentUser}
              auth={localStorage.getItem("jwt")}
            >

            </EditProfileModal>

            <RegisterModal
              state={registerModal.opened}
              title={"Sign Up"}
              buttonText={"Next"}
              onClose={closeRegisterModal}
              openLogin={openLoginModal}
              alternateButtonText={"Or Login"}
              registerUser={registerUser}
              setCurrentUser={setCurrentUser}
              loginUser={loginUser}
              setUser={VerifyToken}
            >

            </RegisterModal>

            <LoginModal
              state={loginModal.opened}
              hideLoginButton={false}
              buttonText={"login"}
              title={"Login"}
              onClose={closeLoginModal}
              alternateButtonText={"Or Register"}
              openRegisterModal={openRegisterModal}
              loginUser={loginUser}
              setUser={VerifyToken}
            >

            </LoginModal>

            <DeleteModal
              onClose={closeDeleteModal}
              state={deleteModal.opened}
              executeDelete={() => {
                const token = localStorage.getItem("jwt");
                return deleteCard(itemModal.itemInfo.id, token).then(() => {
                  removeCardById(itemModal.itemInfo.id)
                })
                .then(closeDeleteModal())
                .catch(console.error());
              }}
            >
            </DeleteModal>

            <AddItemModal
              state={addModal.opened}
              onClose={closeAddModal}
              className={`modal modal_type_`}
              title={"New Garement"}
              buttonText={"Add Garement"}
              apiAdd={addCard}
              hideLoginButton={true}
              auth={localStorage.getItem("jwt")}
              setItemModal={setItemModal}
            >
            </AddItemModal>

            <ItemModal
              onClose={() => {
                closeItemModal();
              }}
              handleDelete={() => { setDeleteModal({ opened: true }) }}
              opened={itemModal.opened}
              itemId={itemModal.itemInfo.id}
              itemName={itemModal.itemInfo.title}
              itemCategory={itemModal.itemInfo.category}
              itemImageUrl={itemModal.itemInfo.link}
              itemOwner={itemModal.itemInfo.owner}
            ></ItemModal>

            <Header
              addButton={
                <AddClothsButton onclick={() => openAddModal()}></AddClothsButton>
              }
              logoImageUrl="../src/components/Logo.svg"
              location={weatherData.name}
              openRegisterModal={openRegisterModal}
              openLoginModal={openLoginModal}
            ></Header>
            <Switch>
              <Route exact path="/">
                <Main
                  temperature={temperature}
                  cardContent={cards}
                  toggleItemModal={toggleItemModal}
                  onCardLike={handleCardLike}
                ></Main>
              </Route>
              <ProtectedRoute
                  path="/profile"
                  checkUser={checkUser}
                  component={() => (
                    <Profile
                      temperature={temperature}
                      cardContent={cards}
                      addButton={<AddClothsButton onclick={() => openAddModal()} className={"profile__items-AddButton"}></AddClothsButton>}
                      toggleItemModal={toggleItemModal}
                      onCardLike={handleCardLike}
                      openEditModal={openEditProfileModal}
                      logOut={logOut}
                    />
                  )}
                />
            </Switch>

            <Footer developerName={"Developed by Obbie"} year={2024}></Footer>
          </CurrentCardsContext.Provider>
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>

    </div>
  );



};

export default App;



