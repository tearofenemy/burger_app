import React from "react";
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';

const layout = props => {
    return(
        <Aux>
            <div>
                <div>Toolbar, Sidedraw, Backdrop</div>
                <main className={classes.Content}>{props.children}</main>
            </div>
        </Aux>
    )
};

export default layout;