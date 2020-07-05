import React from "react";
import img_logo from '../../../assets/images/logo.png';
import classes from './Logo.module.css';

const logo = props => (
    <div className={classes.Logo}>
        <img src={img_logo} alt="MyBurger"/>
    </div>
);

export default logo;