import React from 'react';
import { Redirect } from 'react-router-dom'
import LoginForm from './loginForm';
import { AuthLayout } from './../authLayout'
import { connect } from 'react-redux'
import { LoginRequest } from '../../../redux/reducers/authReducer'
import Loader from '../../common/Loader/Loader'
import Cookies from 'js-cookie'

function Login(props) {
    const submit = (data) => {
        props.LoginRequest(data)
    }
    if (props.isAuth) {

        return (
            <Redirect to="/" />
        )
    }
    return (
        <AuthLayout>
            {props.fetching ? <Loader></Loader> : ''}
            <LoginForm onSubmit={submit}></LoginForm>
        </AuthLayout>
    );
}
const mapStateToProps = (state) => {
    return {
        fetching: state.auth.fetching,
        isAuth: state.auth.isAuth,
        token: state.auth.token,
    }
}
const mapDispatchToProps = {
    LoginRequest,
}
const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login)
export default LoginContainer