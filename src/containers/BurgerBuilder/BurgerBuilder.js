import React, {Component} from "react";
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.3,
    cheese: 0.5,
    bacon: 1,
    meat: 1.7
};

class BurgerBuilder extends Component{

    state = {
      ingredients: null,
      totalPrice: 3,
      purchasable: false,
      purchasing: false,
      loading: false
    };

    componentDidMount() {
        axios.get('https://react-burger-22dfb.firebaseio.com/ingredients.json')
            .then(response => this.setState({ingredients: response.data}))
            .catch(error => console.log(error));
    }

    purchaseHandle = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseCheckoutHandler = () => {

        const queryParams = [];

        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        const queryInput = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryInput
        });
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'John',
        //         email: 'calm.snow98@gmail.com',
        //         address: {
        //             street: 'Truda',
        //             building: 34,
        //             country: 'RUS',
        //             zipCode: '328225'
        //         },
        //         deliveryMethod: 'faster'
        //     }
        // };
        //
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({loading: false, purchasing: false});
        //     })
        //     .catch(error => {
        //         this.setState({loading: false, purchasing: false});
        //     });
    }

    updatePurchase = ingredients => {
        const sum = Object.keys(ingredients).map(igKey => {
           return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
           totalPrice: newPrice,
           ingredients: updatedIngredients
        });
        this.updatePurchase(updatedIngredients);
    }

    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchase(updatedIngredients);
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = <Spinner/>;

        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BurgerControls
                        addIngredient={this.addIngredientHandler}
                        removeIngredient={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandle}
                        purchasable={this.state.purchasable}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                show={this.state.purchasing}
                totalPrice={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseCheckout={this.purchaseCheckoutHandler}
            />;
        }

        if(this.state.loading) {
            orderSummary = <Spinner/>;
        }
        return(
          <Aux>
              <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                  {orderSummary}
              </Modal>
              {burger}
          </Aux>
        );
    }
}

export default BurgerBuilder;