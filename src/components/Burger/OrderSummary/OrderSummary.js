import React, {Component} from "react";
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[OrderSummary.js] didUpdate');
    }

    render() {

        const orderSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return(
                    <li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
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
                <p>Total price: <strong>{this.props.totalPrice.toFixed(2)} $</strong></p>
                <p>Would you like to checkout your order?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseCheckout}>CHECKOUT</Button>
            </Aux>
        )
    }

};

export default OrderSummary;
