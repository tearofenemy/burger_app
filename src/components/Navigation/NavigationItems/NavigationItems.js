import React from "react";
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/' active>Main</NavigationItem>
        <NavigationItem link='/about'>About</NavigationItem>
        <NavigationItem link='/contact'>Contact</NavigationItem>
    </ul>
);

export default navigationItems;