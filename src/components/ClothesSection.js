import React from "react";

const ClothesSection = (props) => {
    return (
        <div className='profile__items'>
            <div className='profile__items-header'>
                <h3 className='profile__items-text'>Your Items</h3>
                {props.addButton}
            </div>
            <div className='profile__items-cards'>{props.cards()}</div>

        </div>
    )
}

export default ClothesSection
