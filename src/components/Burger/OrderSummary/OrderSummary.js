import React from "react";
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = props => {

    const orderSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return(
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            );
        });

    return (
        <Aux>
            <h3>Your Order:</h3>
            <p>A delicious burger with your ingredient:</p>
            <ul>
                {orderSummary}
            </ul>
            <p>Total price: <strong>{props.totalPrice.toFixed(2)} $</strong></p>
            <p>Would you like to checkout your order?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseCheckout}>CONTINUE</Button>
        </Aux>
    )
};

export default orderSummary;
