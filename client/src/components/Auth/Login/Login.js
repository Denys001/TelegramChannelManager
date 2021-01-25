import React from 'react';
import LoginForm from './loginForm';
import { AuthLayout } from './../authLayout'
import { connect } from 'react-redux'
import { LoginRequest } from '../../../redux/reducers/authReducer'
import Loader from '../../common/Loader/Loader'
function Login(props) {
    const submit = (data) => {
        props.LoginRequest(data)
    }
    return (
        <AuthLayout>
            {props.fetching ? <Loader></Loader>: ''} 
            <LoginForm onSubmit={submit}></LoginForm>
        </AuthLayout>
    );
}
const mapStateToProps = (state) => {
    return {
        fetching: state.auth.fetching
    }
}
const mapDispatchToProps = {
    LoginRequest,
}
const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login)
export default LoginContainer