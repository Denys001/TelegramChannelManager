import React from 'react'
import {Redirect} from 'react-router-dom'
import RegisterForm from './registerForm'
import { AuthLayout } from './../authLayout'
import Loader from '../../common/Loader/Loader'
import { RegisterRequest } from '../../../redux/reducers/authReducer'
import { connect } from 'react-redux'
import { useCookies } from 'react-cookie'
function Register(props) {
    const [cookies, setCookie] = useCookies(['auth'])

    const submit = (data) => {
        props.RegisterRequest(data)
    }
    if(props.isAuth){
        setCookie('token', props.token, { path: '/' })
        return (
            <Redirect to="/" />
        )
    }
    return (
        <AuthLayout>
            {props.fetching ? <Loader></Loader>: ''} 
            <RegisterForm onSubmit={submit}></RegisterForm>
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
    RegisterRequest
}
const RegisterContainer = connect(mapStateToProps, mapDispatchToProps)(Register)
export default RegisterContainer