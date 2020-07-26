import * as actionType from '../actions/actionTypes';
import {updatedObject} from "../utility";

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.3,
    cheese: 0.5,
    bacon: 1,
    meat: 1.7
};

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const updatedIngredients = updatedObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
    return updatedObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const updatedIngs = updatedObject(state.ingredients, updatedIng);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
    return updatedObject(state, updatedSt);
}

const setIngredients = (state, action) => {
    return updatedObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building: false
    });
}

const fetchIngredientsFail = (state, action) => {
    return updatedObject(state, {error: true});
}

const burgerBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionType.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionType.SET_INGREDIENTS:
            return setIngredients(state, action);
        case actionType.FETCHED_INGREDIENTS_FAILED:
            return fetchIngredientsFail(state, action);
        default:
            return state;
    }
};

export default burgerBuilder;