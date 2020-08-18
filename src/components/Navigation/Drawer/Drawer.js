import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import classes from './Drawer.module.sass'
import Backdrop from "../../UI/Backdrop/Backdrop";

class Drawer extends Component {

    handleClick = () => {
        this.props.onClose()
    }

    renderLinks = (links) => {
        return links.map((link, index) => {
            return (
                <li key={link.to + index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={this.handleClick}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }


    render() {
        const links = []
        const userEmail = localStorage.getItem('userEmail')

        if (this.props.isAuthenticated) {
            links.push({to: '/', label: 'Все проекты', exact: false})
            links.push({to: '/logout', label: 'Выйти', exact: false})
        } else {
            links.push({to: '/auth', label: 'Авторизация', exact: false})
        }
        return (
            <React.Fragment>
                <nav
                    className={[classes.Drawer, this.props.open ? '' : classes.close].join(' ')}
                >
                    <div className={classes.NavHeader}>
                        <span>{userEmail !== null
                        ? userEmail
                        : 'Гость'}</span>
                    </div>
                    <hr/>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>

                {this.props.open ? <Backdrop onClick={this.props.onClose}/> : null}

            </React.Fragment>
        )
    }
}

export default Drawer