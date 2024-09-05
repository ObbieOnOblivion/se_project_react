import React from "react";

const Footer = (props) => {
  return (
    <footer>
      <ul className="footer">
        <li className="footer__item">
          <h3>{props.developerName}</h3>
        </li>
        <li className="footer__item">
          <h3>{new Date().getFullYear()}</h3>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
