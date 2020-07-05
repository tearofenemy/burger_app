import React, {Component} from "react";
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{

    state = {
        showSideDrawer: true
    }

    showSideDrawerHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        })
    }

    render() {
        return (
            <Aux>
                <div>
                    <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                    <SideDrawer
                        open={this.state.showSideDrawer}
                        closed={this.showSideDrawerHandler}
                    />
                    <main className={classes.Content}>{this.props.children}</main>
                </div>
            </Aux>
        );
    }
}

export default Layout;