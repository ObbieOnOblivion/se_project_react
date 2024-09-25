import ModalWithForm from './ModalWithForm';
import React, { useEffect } from "react";
import { registerInputComponents } from '../utils/constants';
import useForm from "../hooks/useForm";

const RegisterModal = (props) => {
    const { values, handleChange, setValues } = useForm({
        Email: "",
        Password: "",
        Name: "",
        Avatar: ""
    });

    useEffect(() => {
        const initialValues = {};
        registerInputComponents.forEach((item) => {
            initialValues[item.name] = "";
        });
        setValues(initialValues);
    }, []);

    const submitFunction = () => {
        props.registerUser(values.Email, values.Password, values.Name, values.Avatar)
            .then((res) => {
                props.setCurrentUser(res);
                props.onClose();
            }).then(() =>{
                props.loginUser(values.Email, values.Password).then(data => {
                    localStorage.setItem("jwt", data.token);
                    props.setUser(data.token);
                }).catch((error) =>{console.error("Login error: ", error)})
            })
            .catch((error) => console.error("Registration error: ", error));
    };

    return (
        <ModalWithForm
            submitHandler={submitFunction}
            className={props.className}
            onClose={props.onClose}
            state={props.state}
            title={props.title}
            buttonText={props.buttonText}
            openAlternativeModal={props.openLogin}
            alternateButtonText={props.alternateButtonText}
            children={registerInputComponents.map((item) => (
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
                    value={values[item.name]}
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
                onClick={props.onclick}
                id={props.id}
            />
        </label>
    );
};
export default RegisterModal;
