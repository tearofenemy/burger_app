import React, {Component} from "react";
import Button from '../../../components/UI/Button/Button';
import classes from './CheckoutContact.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';

class OrderContact extends Component{

    state = {
        name: '',
        email: '',
        address: {
            country: '',
            street: '',
        },
        loading: false
    }

    orderHandler = event => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: this.props.name,
                email: 'calm.snow98@gmail.com',
                address: {
                    street: 'Truda',
                    building: 34,
                    country: 'RUS',
                    postalCode: '328225'
                },
                deliveryMethod: 'faster'
            }
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
                <label>Name</label>
                <input value={this.state.name} onChange={e => this.setState({name: e.target.value})} type="text"  name="name" placeholder="Name" />
                <label>Email</label>
                <input value={this.state.email} onChange={e => this.setState({email: e.target.value})}  type="email" name="name" placeholder="Email" />
                <label>Country</label>
                <input value={this.state.address.country} onChange={e => this.setState({country: e.target.value})} type="text"  name="country" placeholder="Country" />
                <label>Street</label>
                <input value={this.state.address.street} onChange={e => this.setState({street: e.target.value})}  type="text" name="street" placeholder="Street" />
                <Button clicked={(e) => this.orderHandler(e)} btnType='Success'>ORDER</Button>
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