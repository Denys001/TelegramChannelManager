import React from 'react'
import { Link } from 'react-router-dom'
import { Field } from 'redux-form'
import { reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import LinkS from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import MyInput from '../MyInput'
import {email, required} from "./../../../utils/validators/validators"
const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
function LoginForm(props) {
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
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
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
                    <Link to="/register">
                        <LinkS variant="body2">
                            {"Ще не маєте акаунту? Зареєструватися"}
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
                Увійти
            </Button>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)
export default LoginReduxForm