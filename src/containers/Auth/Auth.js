import React from "react";
import classes from './Auth.module.sass'
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {auth} from "../../redux/actions/auth"

class Auth extends React.Component {

    state = {
        email: '',
        password: '',
        userData: [],
        isLoading: false
    }

    loginHandler = () => {
        this.props.auth(
            this.state.email,
            this.state.password
        )
    }

    submitHandler = (event) => {
        event.preventDefault()
    }

    handleChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    handleChangePassword = (event) => {
        this.setState({
            password: event.target.value
        });
    }


    render() {
        return (
            <div className={classes.Auth}>
                <h1>Авторизация</h1>
                {
                    this.props.isLoading
                        ? <Loader
                            marginTop={'50px'}
                        />
                        : <form onSubmit={this.submitHandler}>
                            <label htmlFor="">email</label>
                            <input type="text" value={this.state.email} onChange={this.handleChangeEmail}/>

                            <label htmlFor="">password</label>
                            <input type="password" value={this.state.password} onChange={this.handleChangePassword}/>

                            <button onClick={this.loginHandler}>Войти</button>
                        </form>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.projects.isLoading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password) => dispatch(auth(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)