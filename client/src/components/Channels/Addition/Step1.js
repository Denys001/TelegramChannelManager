import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {generateCode} from '../../../redux/reducers/channelsReducer'

const useStyles = makeStyles((theme) => ({
    buttonBox: {
      display: 'flex',
      justifyContent: 'center',
    },
    button: {
        marginTop: 10,
    }
  })
)

const Step1 = ({code, generateCode}) => {
    const classes = useStyles()
    const generate = () => {
        generateCode()
    }
    return (
        <div>
            <Typography variant="subtitle1">
                Перший крок це згенерувати код щоб знайти канал
            </Typography>
            {
            code ?
            (<Typography variant="h5" color="primary" align="center" className={classes.button}>
               Ваш код: {code}
            </Typography>)
            :
            (
                <div className={classes.buttonBox}>
                    <Button variant="contained" color="primary"  onClick={generate} className={classes.button}>
                        Згенерувати код
                    </Button>
                </div>
            )
         }

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        code: state.channels.code
    }
} 
const mapDispatchToProps = {
    generateCode
} 
export default connect(mapStateToProps, mapDispatchToProps )(Step1)