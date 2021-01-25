import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import LinkS from '@material-ui/core/Link'
import { Link } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Field } from 'redux-form'
import { reduxForm } from 'redux-form'
import MyInput from './../MyInput'
import {email, required, minLengthCreator} from "./../../../utils/validators/validators"
const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
const min6 = minLengthCreator(6)
function RegisterForm(props) {
    const classes = useStyles()
    const { handleSubmit, pristine, reset, submitting } = props
    return (
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Field
                id="email"
                label="Електрона адреса"
                name="email"
                autoComplete="email"
                component={MyInput}
                validate={[required, email]}
            />
            <Field
                id="nickName"
                label="Нікнейм"
                name="nickName"
                autoComplete="nickName"
                component={MyInput}
                validate={[required, min6]}
            />
            <Field
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                component={MyInput}
                validate={[required, min6]}
            />
            <Field
                name="passwordConfirm"
                label="Підтвердження паролю"
                type="password"
                id="passwordConfirm"
                component={MyInput}
                validate={[required]}
            />
            {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                            /> */}

            <Grid container>
                {/* <Grid item xs>
                                <Link href="#" variant="body2">
                                Forgot password?
                                </Link>
                            </Grid> */}
                <Grid item>
                    <Link to="/login">
                        <LinkS variant="body2">
                            {"Вже маєте акаунт? Увійти"}
                        </LinkS>
                    </Link>
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={submitting}
            >
                Зареєструватися
            </Button>
        </form>
    )
}
const RegisterReduxForm = reduxForm({ form: 'register' })(RegisterForm)
export default RegisterReduxForm