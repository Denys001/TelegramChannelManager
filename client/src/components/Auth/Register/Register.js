import React from 'react'
import {Redirect} from 'react-router-dom'
import RegisterForm from './registerForm'
import {useDispatch, useSelector} from 'react-redux'
import { AuthLayout } from './../authLayout'
import Loader from '../../common/Loader/Loader'
import auth from '../../../modules/auth'
function Register(props) {
    const dispatch = useDispatch()
    const isFetching = useSelector(auth.getFetching)
    const isAuth = useSelector(auth.getIsAuth)
    const token = useSelector(auth.getToken)
    const refreshToken = useSelector(auth.getRefreshToken)

    const submit = (data) => {
        dispatch(auth.register(data.email, data.password, data.nickName, data.passwordConfirm))
    }
    if(isAuth){
        localStorage.setItem('token', token)
        localStorage.setItem('refreshToken', refreshToken)
        console.log('output', localStorage.getItem(token));
        return (
            <Redirect to="/" />
        )
    }
    return (
        <AuthLayout>
            {isFetching ? <Loader></Loader>: ''} 
            <RegisterForm onSubmit={submit}></RegisterForm>
        </AuthLayout>
    );
}

export default Register