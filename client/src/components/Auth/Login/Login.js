import React from 'react';
import { Redirect } from 'react-router-dom'
import LoginForm from './loginForm';
import { useDispatch, useSelector } from 'react-redux'
import { AuthLayout } from './../authLayout'
import auth from '../../../modules/auth'
import Loader from '../../common/Loader/Loader'
import Cookies from 'universal-cookie'

function Login(props) {
    const dispatch = useDispatch()
    const isFetching = useSelector(auth.getFetching)
    const isAuth = useSelector(auth.getIsAuth)
    const token = useSelector(auth.getToken)
    const refreshToken = useSelector(auth.getRefreshToken)
    const cookies = new Cookies()

    const Submit = (data) => {
        dispatch(auth.login(data.email, data.password))
    }
    if (isAuth) {
        localStorage.setItem('token', token)
        localStorage.setItem('refreshToken', refreshToken)

        cookies.set('myCat', 'Pacman', { path: '/' });
        console.log(cookies.get('myCat')); // Pacman

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