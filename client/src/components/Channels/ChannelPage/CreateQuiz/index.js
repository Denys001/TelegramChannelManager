import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import RemoveIcon from '@material-ui/icons/Remove'
import { green } from '@material-ui/core/colors'
import Radio from '@material-ui/core/Radio'
import { withStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from "react-redux"
import QuizsStore from "../../../../modules/quizs"
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    input: {
        marginTop: 0,
        width: '100%',
    },
    divider: {
        marginTop: 15,
        //marginBottom: 15
    },
    listHeader: {
        fontWeight: 'bold',
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    li: {
        marginRight: theme.spacing(1)
    },
    red: {
        color: '#c31432'
    },
    formControl: {
        marginBottom: theme.spacing(1),
        minWidth: '100%',
    },
}))
const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />)

const CreateQuiz = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const question = useSelector(QuizsStore.getQuestion)
    const options = useSelector(QuizsStore.getOptions)
    const type = useSelector(QuizsStore.getType)
    const explanation = useSelector(QuizsStore.getExplanation)
    const correctOptionId = useSelector(QuizsStore.getCorrectOptionId)

    const [answer, setAnswer] = useState('')
    const [editInput, setEditInput] = useState('')
    const [editInputID, setEditInputID] = useState(0)
    const [open, setOpen] = React.useState(false)

    const handleQuestionChange = (event) => {
        event.preventDefault()
        dispatch(QuizsStore.setQuestion(event.target.value))
    }

    const handleAnswerChange = (event) => {
        event.preventDefault()
        setAnswer(event.target.value)
    }

    const handleAddOptionClick = () => {
        dispatch(QuizsStore.setOption(answer))
        setAnswer('')
    }

    const handleClickOpen = (id) => {
        setOpen(true)
        setEditInput(options[id])
        setEditInputID(id)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleEditInput = (event) => {
        setEditInput(event.target.value)
    }

    const handleConfirmEdit = () => {
        dispatch(QuizsStore.editOption(editInputID, editInput))
        setOpen(false)
    }

    const handleDeleteOption = (index) => {
        dispatch(QuizsStore.deleteOption(index))
    }

    const handleChangeType = (event) => {
        switch (event.target.value) {
            case 'default': {
                dispatch(QuizsStore.setTypeDefualt())
                break
            }
            case 'quiz': {
                dispatch(QuizsStore.setTypeQuiz())
                break
            }
        }
    }

    const handleChangeExplanation = (event) => {
        dispatch(QuizsStore.setExplanation(event.target.value))
    }
    const handleChangeCorrectAnswerId = (event) => {
        dispatch(QuizsStore.setCorrectOptionId(event.target.value))
    }

    const handleCreate = () => {
        dispatch(QuizsStore.create())
    }

    const handleCreateInArchive = () => {
        dispatch(QuizsStore.createInArchive())
    }

    return (
        <div className={classes.root}>
            <Grid container >
                <Grid item xs={12}>
                    <TextField
                        className={classes.input}
                        label="Питання:"
                        color="primary"
                        multiline
                        value={question}
                        onChange={handleQuestionChange}
                        error={question.length > 300}
                    />
                    <InputLabel align="right" htmlFor="component-disabled">{`${question.length} / 300`}</InputLabel>
                </Grid>
                <Grid container>
                    <Grid item xs sm={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-controlled-open-select-label">Оберіть режим:</InputLabel>
                            <Select
                                value={type}
                                onChange={handleChangeType}
                            >
                                <MenuItem value={'default'} >Опитування</MenuItem>
                                <MenuItem value={'quiz'}>Вікторина</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {options.length !== 0 && <InputLabel className={classes.listHeader}>Варіанти:</InputLabel>}
                    <List component="div" >
                        {
                            options.map((el, index) =>
                                <Grid container xs={12}>
                                    <ListItem button>
                                        <Grid container>
                                            <Grid
                                                container
                                                wrap="nowrap"
                                                item
                                                xs
                                                alignItems="center"
                                            >
                                                <Grid item >
                                                    <RemoveIcon smDown fontSize="small" className={classes.li} />
                                                </Grid>
                                                <Grid item>
                                                    <ListItemText item primary={el} />
                                                </Grid>
                                            </Grid>
                                            <Grid
                                                container
                                                item
                                                justify="center"
                                                alignItems="center"
                                                xs={2}

                                            >
                                                {
                                                    type === "quiz" &&
                                                    <Grid item>
                                                        <GreenRadio
                                                            checked={correctOptionId == index}
                                                            onChange={handleChangeCorrectAnswerId}
                                                            value={index}
                                                            name="radio-button-demo"
                                                        />
                                                    </Grid>
                                                }
                                                <Grid item>
                                                    <IconButton
                                                        aria-label="edite"
                                                        className={classes.margin}
                                                        size="small"

                                                        onClick={() => handleClickOpen(index)}
                                                    >
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                </Grid>
                                                <Grid item>
                                                    <IconButton
                                                        aria-label="delete"
                                                        className={classes.margin}
                                                        size="small"

                                                        onClick={() => handleDeleteOption(index)}
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                    <Divider />
                                </Grid>
                            )
                        }

                    </List>
                    {
                        options.length !== 0 &&
                        <InputLabel
                            align="right"
                            htmlFor="component-disabled"
                        >
                            {`${options.length} / 10`}
                        </InputLabel>
                    }

                </Grid>
                {
                    options.length < 10 &&
                    <Grid container item >
                        <Grid item xs={12} sm={10}>
                            <TextField
                                className={classes.input}
                                label="Додати варіант відповіді:"
                                color="primary"
                                value={answer}
                                multiline
                                onChange={handleAnswerChange}
                                error={answer.length > 100}
                            />
                            <InputLabel align="right" htmlFor="component-disabled">{`${answer.length} / 100`}</InputLabel>
                            {
                                options.length < 2 &&
                                <InputLabel
                                    className={classes.red}
                                    align="right" htmlFor="component-disabled"
                                >
                                    Мінімальна кількість варіантів відповіді - 2!
                                </InputLabel>
                            }
                        </Grid>
                        <Grid container item xs={12} sm alignItems="center" justify="center">
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={answer.length == 0 || answer.length > 100}
                                onClick={handleAddOptionClick}
                            >
                                Ok
                            </Button>
                        </Grid>
                    </Grid>
                }
            </Grid>
            {
                type === "quiz" &&
                <Grid container >
                    <Grid item xs={12}>
                        <TextField
                            className={classes.input}
                            label="Пояснення правильної відповіді:"
                            color="primary"
                            multiline
                            value={explanation}
                            onChange={handleChangeExplanation}
                            error={explanation.length > 200}
                        />
                        <InputLabel align="right" htmlFor="component-disabled">{`${explanation.length} / 200`}</InputLabel>
                    </Grid>
                </Grid>
            }
            <Box py={3}>
                <Grid container spacing={3} direction="row" justify="center">
                    <Box mx={2} mt={2} my={1}>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={
                                question.length === 0 ||
                                question.length > 300 ||
                                options.length < 2 ||
                                options.length > 10 ||
                                explanation.length > 200
                            }
                        onClick={handleCreate}
                        >
                            Опублікувати
                        </Button>
                    </Box>
                    <Box mx={2} my={1}>
                        <Button
                            item variant="contained"
                            color="primary"
                            disabled={
                                question.length === 0 ||
                                question.length > 300 ||
                                options.length < 2 ||
                                options.length > 10 ||
                                explanation.length > 200
                            }
                        onClick={handleCreateInArchive}
                        >
                            Додати в архів
                        </Button>
                    </Box>
                </Grid>
            </Box>
            <div>
                <Dialog
                    className={classes.input}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                    fullWidth={true}
                >
                    <DialogTitle id="form-dialog-title">Редагування</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            value={editInput}
                            id="name"
                            label="Ввведіть новий текст"
                            onChange={handleEditInput}
                            fullWidth
                            multiline
                            error={editInput.length > 100}
                        />
                        <InputLabel align="right" htmlFor="component-disabled">{`${editInput.length} / 100`}</InputLabel>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Закрити
                        </Button>
                        <Button
                            onClick={handleConfirmEdit}
                            color="primary"
                            disabled={editInput.length == 0 || editInput.length > 100}
                        >
                            ОК
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}
export default CreateQuiz