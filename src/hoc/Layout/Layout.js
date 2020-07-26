import React, {Component} from "react";
import {connect} from 'react-redux';
import Aux from '../Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{

    state = {
        showSideDrawer: false
    }

    showSideDrawerHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render() {
        return (
            <Aux>
                <div>
                    <Toolbar
                        drawerToggleClicked={this.sideDrawerToggleHandler}
                        isAuth={this.props.isAuth}
                    />
                    <SideDrawer
                        open={this.state.showSideDrawer}
                        closed={this.showSideDrawerHandler}
                        isAuth={this.props.isAuth}
                    />
                    <main className={classes.Content}>{this.props.children}</main>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);