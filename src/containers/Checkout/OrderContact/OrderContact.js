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
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
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

    render() {
        let form = (
            <form>
                <Input
                    value={this.state.name}
                    label="Name" inputtype="input"
                    placeholder="Your name"
                    onChange={e => this.setState({name: e.target.value})}
                />
                <Input
                    value={this.state.email}
                    label="Email"
                    inputtype="input" placeholder="Your email"
                    onChange={e => this.setState({email: e.target.value})}
                />
                <Input
                    value={this.state.country}
                    label="Country"
                    inputtype="input"
                    placeholder="Your country"
                    onChange={e => this.setState({country: e.target.value})}
                />
                <Input
                    value={this.state.city}
                    label="City"
                    elemetType="input"
                    placeholder="Your city"
                    onChange={e => this.setState({city:  e.target.value})}
                />
                <Input
                    value={this.state.street}
                    label="Street"
                    inputtype="input"
                    placeholder="Your street"
                    onChange={e => this.setState({street: e.target.value})}
                />
                <Button clicked={(e) => this.orderHandler(e)} btnType='Success'>MAKE ORDER</Button>
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