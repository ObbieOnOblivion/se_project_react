import sunnyDayImage from "../images/sunny.svg";
import sunnyNightImage from "../images/sunnyNight.svg";
import rainyDayImage from "../images/rainy.svg";
import rainyNightImage from "../images/rainyNight.svg";
import snowyDayImage from "../images/snow.svg";
import snowyNightImage from "../images/snowyNight.svg";
import foggyDayImage from "../images/fog.svg";
import foggyNightImage from "../images/foggyNight.svg";
import stormyDayImage from "../images/storm.svg";
import stormyNightImage from "../images/stormyNight.svg";
import cloudyDayImage from "../images/cloudy.svg";
import cloudyNightImage from "../images/cloudyNight.svg";

const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Winter coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];

const inputElements = [ // better name for this
  {
    id: "name-input",
    labelName: "Name",
    labelClassName: "form__text-label",
    inputClassName: "form__text-input",
    type: "text",
    placeholder: "Name",
    name: "name",
    onChange: () => { },
    onClick: () => { },
  },
  {
    id: "url-input",
    labelName: "Image",
    labelClassName: "form__text-label",
    inputClassName: "form__text-input",
    type: "url",
    placeholder: "Image URL",
    name: "imageUrl",
    onChange: () => { },
    onClick: () => { },
  },
  {
    id: "hot button",
    labelName: "Hot",
    labelClassName: "form__radio-label",
    inputClassName: "form__radio-input",
    type: "radio",
    name: "weather",
    value: "hot",
    onChange: () => { },
    onClick: () => { },
  },
  {
    id: "warm-button",
    labelName: "Warm",
    labelClassName: "form__radio-label",
    inputClassName: "form__radio-input",
    type: "radio",
    name: "weather",
    value: "warm",
    onChange: () => { },
    onClick: () => { },
  },
  {
    id: "cold-button",
    labelName: "Cold",
    labelClassName: "form__radio-label",
    inputClassName: "form__radio-input",
    type: "radio",
    name: "weather",
    value: "cold",
    onChange: () => { },
    onClick: () => { },
  },
];

const longitude = 22.890533;
const latitude = -109.91674;
const cardConditions = {
  day: {
    sunny: sunnyDayImage,
    rainy: rainyDayImage,
    snowy: snowyDayImage,
    foggy: foggyDayImage,
    stormy: stormyDayImage,
    cloudy: cloudyDayImage,
  },
  night: {
    sunny: sunnyNightImage,
    rainy: rainyNightImage,
    snowy: snowyNightImage,
    foggy: foggyNightImage,
    stormy: stormyNightImage,
    cloudy: cloudyNightImage,
  },
};

const editProfileModal = [
  {
    id: "name-input",
    labelName: "Name",
    labelClassName: "form__text-label",
    inputClassName: "form__text-input",
    type: "text",
    placeholder: "Name",
    name: "name",
    required: false,
    onChange: () => { },
    onClick: () => { },
  },
  {
    id: "avatar-input",
    labelName: "Avatar",
    labelClassName: "form__text-label",
    inputClassName: "form__text-input",
    type: "url",
    placeholder: "Avatar",
    name: "avatar",
    required: false,
    onChange: () => { },
    onClick: () => { },
  }

]

const loginInputComponents = [
  {
    id: "email-input",
    labelName: "Email",
    labelClassName: "form__text-label",
    inputClassName: "form__text-input",
    type: "email",
    placeholder: "Enter Email",
    name: "Email",
    onChange: () => { },
    onClick: () => { },
  },
  {
    id: "password-input",
    labelName: "Password",
    labelClassName: "form__text-label",
    inputClassName: "form__text-input",
    type: "text",
    placeholder: "Enter password",
    name: "Password",
    onChange: () => { },
    onClick: () => { },
  }
  
]
const registerInputComponents = [
  {
    id: "email-input",
    labelName: "Email",
    labelClassName: "form__text-label",
    inputClassName: "form__text-input",
    type: "email",
    placeholder: "Email",
    name: "Email",
    required: true,
    onChange: () => { },
    onClick: () => { },
  },
  {
    id: "password-input",
    labelName: "Password",
    labelClassName: "form__text-label",
    inputClassName: "form__text-input",
    type: "text",
    placeholder: "Password",
    name: "Password",
    required: true,
    onChange: () => { },
    onClick: () => { },
  },
  {
    id: "name-input",
    labelName: "Name",
    labelClassName: "form__text-label",
    inputClassName: "form__text-input",
    type: "text",
    placeholder: "Name",
    name: "Name",
    required: false,
    onChange: () => { },
    onClick: () => { },
  },
  {
    id: "avatar-input",
    labelName: "Avatar",
    labelClassName: "form__text-label",
    inputClassName: "form__text-input",
    type: "url",
    placeholder: "Avatar",
    name: "Avatar",
    required: false,
    onChange: () => { },
    onClick: () => { },
  },
  
]


export { defaultClothingItems, longitude, latitude, cardConditions, inputElements, loginInputComponents,
  registerInputComponents, editProfileModal
 };
