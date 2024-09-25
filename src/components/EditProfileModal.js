
import React, { useState, useEffect, useContext } from "react";
import ModalWithForm from './ModalWithForm';
import * as Constants from "../utils/constants";
import useForm from "../hooks/useForm";
import CurrentUserContext from '../context/CurrentUserContext';

const EditProfileModal = (props) => {
    const currentUserContext = useContext(CurrentUserContext);
    const user = currentUserContext.currentUser;
    
    const { values, handleChange, setValues } = useForm({
        name: "",
        avatar: ""
    });

    useEffect(() => {
        if (user && values.name === "" && values.avatar === "") {
            setValues({ name: user.name || "", avatar: user.avatar || "" });
        }
    }, [user]);

    const submitFunction = () => {
        props.updateUser(values, props.auth)
            .then((response) => {
                currentUserContext.setCurrentUser(response);
            })
            .then(() => {
                props.onClose();
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
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
                    value={values[item.name]} 
                    onChange={handleChange}
                />
            ))}
        </ModalWithForm>
    );
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
            id={props.id}
        />
    </label>
);


export default EditProfileModal;


