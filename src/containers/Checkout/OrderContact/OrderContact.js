import React, {Component} from "react";
import Button from '../../../components/UI/Button/Button';
import classes from './CheckoutContact.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

class OrderContact extends Component{

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 8
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 20
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 15
                },
                valid: false,
                touched: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your City'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 25
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 25
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,
                touched: false
            }
        },
        formIsValid: false
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if(!rules) {
            return true;
        }

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        return isValid;
    }

    orderHandler = event => {
        event.preventDefault();

        const formData = {};

        for(let formElemID in this.state.orderForm) {
            formData[formElemID] = this.state.orderForm[formElemID].value;
        }
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingrds,
            price: this.props.price,
            orderData: formData
        };
        this.props.onBurgerOrder(order);
    }

    inputChangeHandler = (event, inputID) => {
        const updatedForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...this.state.orderForm[inputID]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedForm[inputID] = updatedFormElement;

        let formIsValid = true;

        for(let inputElem in updatedForm) {
            formIsValid = updatedForm[inputElem].valid && formIsValid;
        }
        this.setState({orderForm: updatedForm, formIsValid: formIsValid});
    }

    render() {
        const formElementsArray = [];

        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={e => this.orderHandler(e)}>
                {formElementsArray.map(formElement => {
                    return <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangeHandler(event, formElement.id)}
                    />
                })}
                <Button btnType='Success' disabled={!this.state.formIsValid}>MAKE ORDER</Button>
            </form>
        );
        if(this.props.loading) {
            form = <Spinner/>;
        }
        return (
            <div className={classes.CheckoutContact}>
                <h4>Make your order</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingrds: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onBurgerOrder: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderContact);