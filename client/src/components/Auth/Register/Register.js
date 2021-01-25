import React from 'react';
import RegisterForm from './registerForm'
import { AuthLayout } from './../authLayout'
import Loader from '../../common/Loader/Loader'
import { RegisterRequest } from '../../../redux/reducers/authReducer'
import { connect } from 'react-redux'

function Register(props) {
    const submit = (data) => {
        props.RegisterRequest(data)
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
        fetching: state.auth.fetching
    }
}
const mapDispatchToProps = {
    RegisterRequest
}
const RegisterContainer = connect(mapStateToProps, mapDispatchToProps)(Register)
export default RegisterContainer