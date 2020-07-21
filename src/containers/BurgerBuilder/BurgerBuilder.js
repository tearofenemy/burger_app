import React, {Component} from "react";
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as burgerBuilderActions from "../../store/actions/burgerBuilder";

class BurgerBuilder extends Component{

    /*addIngredientHandler = type => {
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
   }*/

    /*const queryParams = [];

for(let i in this.state.ingredients) {
    queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
}
queryParams.push('price=' + this.props.price);
const queryInput = queryParams.join('&');*/

    state = {
      purchasing: false
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    purchaseHandle = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseCheckoutHandler = () => {
        this.props.history.push('/checkout');
    }

    updatePurchase = ingredients => {
        const sum = Object.keys(ingredients).map(igKey => {
           return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
       return sum > 0;
    }

    render() {
        const disabledInfo = {
            ...this.props.ingrds
        };

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;

        if(this.props.ingrds) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingrds}/>
                    <BurgerControls
                        addIngredient={this.props.onIngredientAdded}
                        removeIngredient={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        ordered={this.purchaseHandle}
                        purchasable={this.updatePurchase(this.props.ingrds)}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ingrds}
                show={this.state.purchasing}
                totalPrice={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseCheckout={this.purchaseCheckoutHandler}
            />;
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

const mapStateToProps = state => {
    return {
        ingrds: state.ingredients,
        price: state.totalPrice,
        error: state.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingrName) => dispatch(burgerBuilderActions.addIngredient(ingrName)),
        onIngredientRemoved: (ingrName) => dispatch(burgerBuilderActions.removeIngredient(ingrName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);