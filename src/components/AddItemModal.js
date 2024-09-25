
import React, { useContext } from "react";
import ModalWithForm from "./ModalWithForm";
import CurrentCardsContext from "../context/CardsContext";
import * as Constants from "../utils/constants";
import useForm from "../hooks/useForm";

const AddItemModal = (props) => {
  const { cards, setClothingItems } = useContext(CurrentCardsContext);

  const { values, handleChange, setValues } = useForm({
    _id: 17,
    name: "",
    weather: "",
    imageUrl: "",
    likes: [],
  });

  function findArrayDifference(availableIds, usedIds) {
    const difference = availableIds.filter((x) => !usedIds.includes(x));
    return difference;
  }

  function findId(arr) {
    let stableCount = 1;
    let usedIds = [];
    let availableIds = [];
    for (let i = 1; i <= arr.length + 1; i++) {
      availableIds.push(i);
    }
    for (let item of arr) {
      stableCount += 1;
      usedIds.push(item._id);
    }
    return findArrayDifference(availableIds, usedIds)[0];
  }

  const submitFunction = () => {
    props.apiAdd(values, props.auth)
      .then((response) => {
        const updatedData = {
          ...values,
          owner: response.owner,
          _id: response._id,
        };
        setClothingItems((prevState) => [...prevState, updatedData]);
      })
      .then(() => {
        props.onClose();
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <ModalWithForm
      submitHandler={submitFunction}
      className={props.className}
      onClose={props.onClose}
      state={props.state}
      title={props.title}
      buttonText={props.buttonText}
      handleInputChange={"handleChange"}
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
            value={item.value || values[item.name]}
            onChange={handleChange}
            selectedValue={values[item.name]}
          />
        );
      })}
    />
  );
};

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
        id={props.id}
        checked={props.type === "radio" && props.value === props.selectedValue}
      />
    </label>
  );
};


export default AddItemModal;


