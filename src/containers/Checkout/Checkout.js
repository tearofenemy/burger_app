import React, {Component} from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import OrderContact from "./OrderContact/OrderContact";
import * as actions from '../../store/actions/index';

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

    componentDidMount() {
        this.props.onPurchaseInit();
    }

    checkoutCancelledHandler = () => {
        this.props.history.push('/');
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/make-order");
    }

    render() {
        let summary = <Redirect to='/'/>;
        if(this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to='/'/> : null;
            summary = (
                <div>
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                    />
                    <Route path={this.props.match.path + '/make-order'} component={OrderContact}/>
                    {purchasedRedirect}
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.totalPrice,
        purchased: state.order.purchased
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseInit: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);