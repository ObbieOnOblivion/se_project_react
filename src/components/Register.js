import ModalWithForm from './ModalWithForm';
import React, { useState, useEffect } from "react";
import { registerInputComponents } from '../utils/constants';


const RegisterModal = (props) => {
    const [registerLabels, setRegisterLabels] = useState({});

    useEffect(() => {
        const labels = {};
        registerInputComponents.forEach((item) => {
            labels[item.labelName] = "";
        });
        setRegisterLabels(labels);
    }, [registerInputComponents]);

    const submitFunction = () => {
        props.registerUser(registerLabels.Email, registerLabels.Password, registerLabels.Name, 
            registerLabels.Avatar
        ).then(
            (res) => {
                console.log(res);
                props.setCurrentUser(res);
                props.onClose();
            }
        )
    }

    const InputComponent = (props) => {

        const handleInputChange = (event) => {
            registerLabels[event.target.name] = event.target.value
        };

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
            openAlternativeModal={props.openLogin}
            alternateButtonText={props.alternateButtonText}
            children={registerInputComponents.map((item) => {
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

export default RegisterModal
