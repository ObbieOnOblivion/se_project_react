import ModalWithForm from './ModalWithForm';
import { loginInputComponents } from '../utils/constants'
import React, { useState, useEffect } from "react";
import { loginUser } from '../utils/api';

const LoginModal = (props) => {
    const [loginLabels, setLoginLabels] = useState({});

    useEffect(() => {
        const labels = {};
        loginInputComponents.forEach((item) => {
            labels[item.labelName] = "";
        });

        setLoginLabels(labels);
    }, [loginInputComponents])

    const submitFunction = () => { 
        loginUser(loginLabels.Email, loginLabels.Password).then(data =>{
            localStorage.setItem("jwt", data.token)
            props.setUser(data.token)
        }).then(
            props.onClose()
        )
    }
    const InputComponent = (props) => {

        const handleInputChange = (event) =>{
            loginLabels[event.target.name] = event.target.value

        }

        return (
            <label className={props.labelClassName}>
                {props.labelName}
                <input
                    required={props.required}
                    className={props.inputClassName}
                    type={props.type}
                    placeholder={props.placeholder}
                    name={props.name}
                    value={props.value}
                    onChange={handleInputChange}
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
            handleInputChange={NaN}
            hideLoginButton={props.hideLoginButton}
            openAlternativeModal={props.openRegisterModal}
            alternateButtonText = {props.alternateButtonText}
            children={loginInputComponents.map((item) => {
                return (
                    <InputComponent
                        key={item.id}
                        labelName={item.labelName}
                        id={item.id}
                        required={item.required}
                        labelClassName={item.labelClassName}
                        inputClassName={item.inputClassName}
                        type={item.type}
                        placeholder={item.placeholder}
                        name={item.name}
                        value={item.value}
                        onChange={NaN}
                        onClick={(item.onClick)}
                    ></InputComponent>
                );
            })}
        >


        </ModalWithForm>
    )
}

export default LoginModal
