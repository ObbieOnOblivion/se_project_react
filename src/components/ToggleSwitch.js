import React, { useContext } from 'react';
import CurrentTemperatureUnitContext from "../context/CurrentTemperatureUnitContext"

const ToggleSwitch = () => {
    const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(CurrentTemperatureUnitContext);

    return (
        <div className="header__switch-button">
            <div className="header__switch__text" style={{ whiteSpace: 'pre' }}> F     C</div>
            <div className="header__switch-circle">{currentTemperatureUnit}</div>
        </div>
    )
}

export default ToggleSwitch
