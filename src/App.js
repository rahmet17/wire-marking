import React, {Component} from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import Layout from "./hoc/Layout/Layout";
import Project from "./containers/Project/Project";
import Auth from "./containers/Auth/Auth";
import ProjectList from "./containers/ProjectList/ProjectList";
import ActiveConnection from "./components/ActiveConnection/ActiveConnection";
import {connect} from "react-redux";
import {autoLogin} from "./redux/actions/auth";
import Logout from "./components/Logout/Logout";

class App extends Component {

    componentDidMount() {
        this.props.autoLogin()
    }
    render() {
        let routes = (
            <Switch>
                <Route path="/auth" component={Auth} />
                <Redirect to="/auth" />
            </Switch>
        )
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path='/project/:id/:serialNumber' component={ActiveConnection}/>
                    <Route path='/project/:id' component={Project} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/' exact component={ProjectList} />
                    <Redirect to='/' />
                </Switch>
            )
        }

        return (
            <Layout>
                {routes}
            </Layout>
        )
    }
}
function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token,
        projects: state.projects.projects
    }
}

function mapDispatchToProps(dispatch) {
    return {
        autoLogin: () => dispatch(autoLogin())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
