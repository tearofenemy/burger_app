import React from "react";
import classes from './BurgerControls.module.css';
import BurgerControl from './BurgerControl/BurgerControl';

const controls = [
    {
        label: 'Salad',
        type: 'salad'
    },
    {
        label: 'Bacon',
        type: 'bacon'
    },
    {
        label: 'Cheese',
        type: 'cheese'
    },
    {
        label: 'Meat',
        type: 'meat'
    }
];

const burgerControls = props => {
    return (
        <div className={classes.BurgerControls}>
            <p>Current price: <strong>{props.price.toFixed(2)} $</strong></p>
            {controls.map(ctrl =>
                <BurgerControl
                    key={ctrl.label}
                    label={ctrl.label}
                    added={() => props.addIngredient(ctrl.type)}
                    removed={() => props.removeIngredient(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                />
            )};
        </div>
    );
};

export default burgerControls;