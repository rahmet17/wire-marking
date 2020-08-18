import React from "react";
import classes from './Layout.module.sass'
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";
import {connect} from "react-redux";

class Layout extends React.Component {

    state = {
        menu: false
    }

    toggleMenu = () => {
        this.setState({menu: !this.state.menu})
    }

    closeMenu = () => {
        this.setState({menu: false})
    }


    render() {
        return (
            <div className={classes.Layout}>

                <Drawer
                    open={this.state.menu}
                    onClose={this.closeMenu}
                    isAuthenticated={this.props.isAuthenticated}
                />

                <MenuToggle
                    onToggle={this.toggleMenu}
                    state={this.state.menu}
                />

                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout)