import React from 'react';
import { Redirect } from 'react-router-dom'
import LoginForm from './loginForm';
import {useDispatch, useSelector} from 'react-redux'
import { AuthLayout } from './../authLayout'
import auth from '../../../modules/auth'
import Loader from '../../common/Loader/Loader'

function Login(props) {
    const dispatch = useDispatch()
    const isFetching = useSelector(auth.getFetching)
    const isAuth = useSelector(auth.getIsAuth)

    const Submit = (data) => {
        dispatch(auth.login(data.email, data.password))
    }
    if (isAuth) {

        return (
            <Redirect to="/" />
        )
    }
    return (
        <AuthLayout>
            {isFetching ? <Loader></Loader> : ''}
            <LoginForm onSubmit={Submit}></LoginForm>
        </AuthLayout>
    );
}
export default Login