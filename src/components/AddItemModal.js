import React, { useState, useEffect, useContext } from "react";
import ModalWithForm from './ModalWithForm';
import CurrentCardsContext from "../context/CardsContext";
import * as Constants from "../utils/constants"

const AddItemModal = (props) => {
  const { cards, setClothingItems } = useContext(CurrentCardsContext);
  const [modalData, setModalData] = useState({ _id: 17, "name": "", "weather": "", "imageUrl": "" });

  function findArrayDifference(avalableIds, usedIds) {
    const difference = avalableIds.filter(x => !usedIds.includes(x));
    return difference;
  }

  function findId(arr) {
    let stableCount = 1;
    let usedIds = [];
    let avalableIds = [];
    for (let i = 1; i <= arr.length + 1; i++) {
      avalableIds.push(i)
    }
    for (let item of arr) {
      stableCount += 1;
      usedIds.push(item._id);
    }
    return findArrayDifference(avalableIds, usedIds)[0];
  }

  useEffect(() => {
    if (props.state === true) {
      setModalData({ _id: findId(cards), "name": NaN, "weather": NaN, "imageUrl": NaN, "likes":[] });
    }
  }, [props.state]);
  //import useForm
  // const {values, handleChange, setValues} = useForm({})

  const handleInputChange = (event, name) => {
    // modalData[name] = event.target.value;
    // reviwer rejected the above approach
    //ive used the method bellow because everytime i use the setModalData it kicks me out of the input field

    setModalData((data) => {
      return {
        ...data,
        [name]: event.target.value,
      };
    });
  };

  const submitFunction = () => {
    props.apiAdd(modalData, props.auth).then((response) => {
      modalData.owner = response.owner;
      modalData._id = response._id
      setClothingItems(prevState => ([
        ...prevState,
        modalData
      ]))
    }).then(() => {
      props.onClose()
    }).catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });

  }

  const InputComponent = (props) => {

    return (
      <label className={props.labelClassName}>
        {props.labelName}
        <input
          required={true}
          className={props.inputClassName}
          type={props.type}
          placeholder={props.placeholder}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          onClick={props.onclick}
          id={props.id}
        ></input>
      </label>
    );
  };

  return (
    <ModalWithForm
      submitHandler={submitFunction}
      className={props.className}
      onClose={props.onClose}
      state={props.state}
      title={props.title}
      buttonText={props.buttonText}
      handleInputChange={handleInputChange}
      hideLoginButton={props.hideLoginButton}
      children={Constants.inputElements.map((item) => {
        return (
          <InputComponent
            key={item.id}
            labelName={item.labelName}
            id={item.id}
            labelClassName={item.labelClassName}
            inputClassName={item.inputClassName}
            type={item.type}
            placeholder={item.placeholder}
            name={item.name}
            value={item.value}
            onChange={(event) => { handleInputChange(event, item.name) }}
            onClick={(item.onClick)}
          ></InputComponent>
        );
      })}
    >
    </ModalWithForm>
  );
};

export default AddItemModal;
