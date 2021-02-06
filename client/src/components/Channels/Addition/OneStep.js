import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { Divider } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 10
    },
    img: {
        borderRadius: 5,
        [theme.breakpoints.down(375)]: {
            height: 100
        },
        
    }
}))
const OneStep = ({ text, imgPath }) => {
    const classes = useStyles()
    return (
        <div>
            <Divider/>
            <Typography>{text}</Typography>
            <div className={classes.wrapper}>
            <img src={imgPath} height="150px" className={classes.img}/>

            </div>
            <Divider/>
        </div>
    )
}
export default OneStep
