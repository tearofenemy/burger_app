import React, {Component} from "react";
import Button from '../../../components/UI/Button/Button';
import classes from './CheckoutContact.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';

class OrderContact extends Component{

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: ''
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your City'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    orderHandler = event => {
        event.preventDefault();

        const formData = {};

        for(let formElemID in this.state.orderForm) {
            formData[formElemID] = this.state.orderForm[formElemID].value;
        }
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false})
            })
    }

    inputChangeHandler = (event, inputID) => {
        const updatedForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...this.state.orderForm[inputID]
        }
        updatedFormElement.value = event.target.value;
        updatedForm[inputID] = updatedFormElement;
        this.setState({orderForm: updatedForm});
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
                        changed={(event) => this.inputChangeHandler(event, formElement.id)}
                    />
                })}
                <Button btnType='Success'>MAKE ORDER</Button>
            </form>
        );
        if(this.state.loading) {
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

export default OrderContact;