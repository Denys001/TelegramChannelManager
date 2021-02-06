import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Step1 from './Step1'
import Step2 from './Step2'
import { connect, useSelector } from 'react-redux'
import { addChannels, setErrorNull } from '../../../redux/reducers/channelsReducer'
import { Divider } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.down(375)]: {
      padding: theme.spacing(0),
      margin: theme.spacing(0),
      marginTop: theme.spacing(2),
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
    [theme.breakpoints.down(375)]: {
      margin: theme.spacing(0),
      padding: theme.spacing(1),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}))
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const steps = ['Згенерувати код', 'Переслати повідомлення']

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Step1 />
    case 1:
      return <Step2 />
    default:
      throw new Error('Unknown step')
  }
}

const Checkout = (props) => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const [open, setOpen] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('error')
  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }
  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }
  const Finish = async () => {
    const error = await props.addChannels(props.code, props.token)
    if (error) {
      setErrorMessage(error)
      setOpen(true)
    }
    else {
      handleNext()
    }
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    props.setErrorNull()
    setOpen(false)
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Додати канал
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="subtitle1">
                  Якщо ви все зробили відповідно до інструкції то канал з'явиться в переліку каналів. Важливо щоб бот був додан до телеграм каналу як адміністратор щоб вcе працювало коректно
                </Typography>
              </React.Fragment>
            ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} className={classes.button}>
                        Назад
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={activeStep === steps.length - 1 ? Finish : handleNext}
                      className={classes.button}
                      disabled={!props.code && true}
                    >
                      {activeStep === steps.length - 1 ? 'Завершити' : 'Наступний крок'}
                    </Button>
                  </div>
                </React.Fragment>
              )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  )
}
const mapStateToProps = (state) => {
  return {
    code: state.channels.code,
    token: state.auth.token
  }
}
const mapDispatchToProps = {
  addChannels, setErrorNull
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)