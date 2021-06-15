import React from 'react'
import { Redirect, Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import Register from '../Auth/Register/Register'
import Login from '../Auth/Login/Login'
import { connect } from 'react-redux'
import Menu from '../common/Menu/Menu'
import Addition from './../Channels/Addition'
import ChannelPage from './../Channels/ChannelPage'
import PostPage from './../PostPage'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

const MainRoute = (props) => {
    if (props.isAuth)
        return (
            <Router history={history}>
                <Menu>
                    <Switch>
                        <Route component={Addition} path="/channel/add" exact></Route>
                        <Route component={ChannelPage} path="/channel/:id" exact></Route>
                        <Route component={PostPage} path="/post/:id" exact></Route>
                        <Redirect to='/'></Redirect>
                    </Switch>
                </Menu>
            </Router>
        )
    return (
        <Router>
            <Switch>
                <Route component={Login} path="/login" exact></Route>
                <Route component={Register} path="/register" exact></Route>
                <Redirect to='/login'></Redirect>
            </Switch>
        </Router>
    )
}
const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}
export default connect(mapStateToProps, {})(MainRoute)
