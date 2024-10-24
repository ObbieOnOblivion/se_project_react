import React, { useEffect } from "react";
import ModalWithForm from './ModalWithForm';
import { loginInputComponents } from '../utils/constants';
import useForm from "../hooks/useForm";

const LoginModal = (props) => {
    const { values, handleChange, setValues } = useForm({
        Email: "",
        Password: ""
    });

    useEffect(() => {
        const initialValues = {};
        loginInputComponents.forEach((item) => {
            initialValues[item.name] = "";
        });
        setValues(initialValues);
    }, []);

    const submitFunction = () => { 
        props.loginUser(values.Email, values.Password).then(data => {
            
            localStorage.setItem("jwt", data.token);
            props.setUser(data.token);
        }).then(() => props.onClose())
        .catch(error => console.error("Login error: ", error));
    };

    return (
        <ModalWithForm
            submitHandler={submitFunction}
            className={props.className}
            onClose={props.onClose}
            state={props.state}
            title={props.title}
            buttonText={props.buttonText}
            openAlternativeModal={props.openRegisterModal}
            alternateButtonText={props.alternateButtonText}
            hideLoginButton={props.hideLoginButton}
            children={loginInputComponents.map((item) => (
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
                    value={values[props.name]}
                    onClick={item.onClick}
                    onChange={handleChange}
                />
            ))}
        />
    );
};

const InputComponent = (props) => {
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
                onChange={props.onChange}
                onClick={props.onClick}
                id={props.id}
            />
        </label>
    );
};

export default LoginModal;
