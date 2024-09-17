// import React, { useState, useEffect, useContext } from "react";
// import ModalWithForm from './ModalWithForm';
// import CurrentCardsContext from "../context/CardsContext";
// import * as Constants from "../utils/constants"
// import useForm from "../hooks/useForm"

// const AddItemModal = (props) => {
//   const { cards, setClothingItems } = useContext(CurrentCardsContext);
//   const [modalData, setModalData] = useState({ _id: 17, "name": "", "weather": "", "imageUrl": "" });

//   function findArrayDifference(avalableIds, usedIds) {
//     const difference = avalableIds.filter(x => !usedIds.includes(x));
//     return difference;
//   }

//   function findId(arr) {
//     let stableCount = 1;
//     let usedIds = [];
//     let avalableIds = [];
//     for (let i = 1; i <= arr.length + 1; i++) {
//       avalableIds.push(i)
//     }
//     for (let item of arr) {
//       stableCount += 1;
//       usedIds.push(item._id);
//     }
//     return findArrayDifference(avalableIds, usedIds)[0];
//   }

//   useEffect(() => {
//     if (props.state === true) {
//       setModalData({ _id: findId(cards), "name": NaN, "weather": NaN, "imageUrl": NaN, "likes":[] });
//     }
//   }, [props.state]);
//   //import useForm
//   const {values, handleChange, setValues} = useForm({})

//   const handleInputChange = (event, name) => {
//     // modalData[name] = event.target.value;
//     // reviwer rejected the above approach
//     //ive used the method bellow because everytime i use the setModalData it kicks me out of the input field

//     setModalData((data) => {
//       return {
//         ...data,
//         [name]: event.target.value,
//       };
//     });
//   };

//   const submitFunction = () => {
//     props.apiAdd(modalData, props.auth).then((response) => {
//       modalData.owner = response.owner;
//       modalData._id = response._id
//       setClothingItems(prevState => ([
//         ...prevState,
//         modalData
//       ]))
//     }).then(() => {
//       props.onClose()
//     }).catch((error) => {
//       console.error('There was a problem with the fetch operation:', error);
//     });

//   }

//   const InputComponent = (props) => {

//     return (
//       <label className={props.labelClassName}>
//         {props.labelName}
//         <input
//           required={true}
//           className={props.inputClassName}
//           type={props.type}
//           placeholder={props.placeholder}
//           name={props.name}
//           value={props.value}
//           onChange={props.onChange}
//           onClick={props.onclick}
//           id={props.id}
//         ></input>
//       </label>
//     );
//   };

//   return (
//     <ModalWithForm
//       submitHandler={submitFunction}
//       className={props.className}
//       onClose={props.onClose}
//       state={props.state}
//       title={props.title}
//       buttonText={props.buttonText}
//       handleInputChange={handleInputChange}
//       hideLoginButton={props.hideLoginButton}
//       children={Constants.inputElements.map((item) => {
//         return (
//           <InputComponent
//             key={item.id}
//             labelName={item.labelName}
//             id={item.id}
//             labelClassName={item.labelClassName}
//             inputClassName={item.inputClassName}
//             type={item.type}
//             placeholder={item.placeholder}
//             name={item.name}
//             value={item.value}
//             onChange={(event) => { handleInputChange(event, item.name) }}
//             onClick={(item.onClick)}
//           ></InputComponent>
//         );
//       })}
//     >
//     </ModalWithForm>
//   );
// };

// export default AddItemModal;


import React, { useEffect, useContext } from "react";
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

  // useEffect(() => {
  //   console.log("Test UseEffect !!!!")
  //   if (props.state === true) {
  //     setValues({
  //       _id: findId(cards),
  //       name: "",
  //       weather: "",
  //       imageUrl: "",
  //       likes: [],
  //     });
  //   }
  // }, [props.state, cards, setValues]);

  const submitFunction = () => {
    console.log(values);
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
            value={item.value || values[item.name]}  // For radio buttons, use item.value
            onChange={handleChange}
            selectedValue={values[item.name]}  // Pass the currently selected value for radio buttons
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
        // Add the checked attribute for radio buttons
        checked={props.type === "radio" && props.value === props.selectedValue}
      />
    </label>
  );
};


export default AddItemModal;


