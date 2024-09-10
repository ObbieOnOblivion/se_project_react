import React, { useState, useEffect, useContext } from "react";
import ModalWithForm from './ModalWithForm';
import * as Constants from "../utils/constants"
import CurrentUserContext from '../context/CurrentUserContext';

const EditProfileModal = (props) => {
    const currentUser = useContext(CurrentUserContext);
    const [modalData, setModalData] = useState({ name: currentUser.name || "", avatar: currentUser.avatar || "" });

    // when i change the input it works for one action and exits the input component
    useEffect(() => {
        setModalData({ name: currentUser.name || "", avatar: currentUser.avatar || "" });
    }, [currentUser]);

    const handleInputChange = (event, name) => {
        setModalData({
            ...modalData,
            [name]: event.target.value
        });
    };

    const submitFunction = () => {
        props.updateUser(modalData, props.auth).then((response) => {
            currentUser.name = modalData.name;
            currentUser.avatar = modalData.avatar;
        }).then(() => {
            props.onClose();
        }).catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
    };

    const InputComponent = (props) => (
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
                onClick={props.onClick}
                id={props.id}
            />
        </label>
    );

    return (
        <ModalWithForm
            submitHandler={submitFunction}
            className={props.className}
            onClose={props.onClose}
            state={props.state}
            title={props.title}
            buttonText={props.buttonText}
            hideLoginButton={props.hideLoginButton}
        >
            {Constants.editProfileModal.map((item) => (
                <InputComponent
                    key={item.id}
                    labelName={item.labelName}
                    id={item.id}
                    labelClassName={item.labelClassName}
                    inputClassName={item.inputClassName}
                    type={item.type}
                    placeholder={item.placeholder}
                    name={item.name}
                    value={modalData[item.name] || ""}
                    onChange={(event) => handleInputChange(event, item.name)}
                    onClick={item.onClick}
                />
            ))}
        </ModalWithForm>
    );
};

export default EditProfileModal;

// import React, { useState, useEffect, useContext } from "react";
// import ModalWithForm from './ModalWithForm';
// import * as Constants from "../utils/constants"
// import CurrentUserContext from '../context/CurrentUserContext';

// const EditProfileModal = (props) => {
//     const [modalData, setModalData] = useState({ "name": "", "avatar": "" });
//     const currentUser = useContext(CurrentUserContext);

//     const handleInputChange = (event, name) => {
//         modalData[name] = event.target.value;
//     };

//     const submitFunction = () => {
//         props.updateUser(modalData, props.auth).then((response) => {
//             currentUser.name = modalData.name
//             currentUser.avatar = modalData.avatar
//         }).then(() => {
//             props.onClose()
//         }).catch((error) => {
//             console.error('There was a problem with the fetch operation:', error);
//         });

//     }

//     const InputComponent = (props) => {

//         return (
//             <label className={props.labelClassName}>
//                 {props.labelName}
//                 <input
//                     required={true}
//                     className={props.inputClassName}
//                     type={props.type}
//                     placeholder={props.placeholder}
//                     name={props.name}
//                     value={props.value}
//                     onChange={props.onChange}
//                     onClick={props.onclick}
//                     id={props.id}
//                 ></input>
//             </label>
//         );
//     };

//     return (
//         <ModalWithForm
//             submitHandler={submitFunction}
//             className={props.className}
//             onClose={props.onClose}
//             state={props.state}
//             title={props.title}
//             buttonText={props.buttonText}
//             handleInputChange={"handleInputChange"}
//             hideLoginButton={props.hideLoginButton}
//             children={Constants.editProfileModal.map((item) => {
//                 return (
//                     <InputComponent
//                         key={item.id}
//                         labelName={item.labelName}
//                         id={item.id}
//                         labelClassName={item.labelClassName}
//                         inputClassName={item.inputClassName}
//                         type={item.type}
//                         placeholder={item.placeholder}
//                         name={item.name}
//                         value={item.value}
//                         onChange={(event) => { handleInputChange(event, item.name) }}
//                         onClick={(item.onClick)}
//                     ></InputComponent>
//                 );
//             })}
//         >
//         </ModalWithForm>
//     );
// };

// export default EditProfileModal;