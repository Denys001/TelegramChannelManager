import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import Divider from '@material-ui/core/Divider'
import StepButton from '@material-ui/core/StepButton'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import OneStep from './OneStep'
import step1_img from './../../../asset/step1.png'
import step2_img from './../../../asset/step2.png'
import step3_img from './../../../asset/step3.png'
import step4_img from './../../../asset/step4.png'


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
  }))
  
  function getSteps() {
    return [
        'Надіслати код в канал', 
        'Знайти телеграм бота', 
        'Переслати повідомлення з кодом з телеграм каналу',
        'Додати бота як адміністратора'
    ]
  }
  
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <OneStep 
                    text="Згенерований код відправте в чат створеного телеграм каналу"
                    imgPath={step1_img}
                />
      case 1:
        return <OneStep 
                    text="В пошуку знайдіть телеграм бота з назвою tcm_xBot"
                    imgPath={step2_img}
                />
      case 2:
        return <OneStep 
                    text="Перешліть повідомлення з кодом з телеграм каналу в чат з ботом tcm_xBot"
                    imgPath={step3_img}
                />
      case 3:
        return <OneStep 
                    text="Добавте телеграм бота tcm_xBot як адміністратора в телеграм канал"
                    imgPath={step4_img}
                />
      default:
        return 'Unknown step'
    }
  }
  function Step2(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const steps = getSteps();
  
    const totalSteps = () => {
      return steps.length;
    };
  
    const completedSteps = () => {
      return Object.keys(completed).length;
    };
  
    const isLastStep = () => {
      return activeStep === totalSteps() - 1;
    };
  
    const allStepsCompleted = () => {
      return completedSteps() === totalSteps();
    };
  
    const handleNext = () => {
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? // It's the last step, but not all steps have been completed,
            // find the first step that has been completed
            steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleStep = (step) => () => {
      setActiveStep(step);
    };
  
    const handleComplete = () => {
      const newCompleted = completed;
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      handleNext();
    };
  
    const handleReset = () => {
      setActiveStep(0);
      setCompleted({});
    };
  
    return (
      <div className={classes.root}>
        <Divider/>
        <Stepper nonLinear activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton onClick={handleStep(index)} completed={completed[index]}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {allStepsCompleted() ? (
            <div>
              <Typography className={classes.instructions}>
                Всі кроки завершині
              </Typography>
              <Button onClick={handleReset}>Заново</Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              <div>
                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                  Назад
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  Далі
                </Button>
                {/* {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography variant="caption" className={classes.completed}>
                      Крок {activeStep + 1} вже завершиний
                    </Typography>
                  ) : (
                    <Button variant="contained" color="primary" onClick={handleComplete} className={classes.button}>
                      {completedSteps() === totalSteps() - 1 ? 'Завершити' : 'Завершити крок'}
                    </Button>
                  ))} */}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

export default Step2