import React, {Component} from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import OrderContact from "./OrderContact/OrderContact";

class Checkout extends Component {

    /*componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for(let param of query.entries()) {
            if(param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients: ingredients, totalPrice: price});
    }*/

    /*render={(props) => (<OrderContact ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props}/> )}*/

    checkoutCancelledHandler = () => {
        this.props.history.push('/');
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/make-order");
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route path={this.props.match.path + '/make-order'} component={OrderContact}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    };
};


export default connect(mapStateToProps)(Checkout);