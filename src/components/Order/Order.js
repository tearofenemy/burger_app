import React from "react";
import classes from './Order.module.css';
const order = props => {

    const ingredients = [];

    for(let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const ingredientOutput = ingredients.map(ingr => {
        return <span style={{
            textTransform: 'capitalize',
            border: '1px solid #eee',
            margin: '0 8px',
            padding: '5px',
            display: 'inline-block'
        }}><strong>{ingr.name} : {ingr.amount}</strong></span>
    });
    return (
        <div className={classes.Order}>
            <p>Customer: <strong>{props.customer}</strong></p>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)} $</strong></p>
        </div>
    );
};

export default order;