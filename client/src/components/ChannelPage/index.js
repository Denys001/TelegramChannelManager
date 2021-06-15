import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import { Link } from 'react-router-dom'
import ChannelStore from '../../modules/channels'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Loader from '../common/Loader/Loader'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const useStyles = makeStyles((theme) => ({
    root: {
    },
    imgContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    header: {
        color: '#1976d2',
        textDecoration: 'none',
    },
    textAlignCenter: {
        textAlign: 'center',
        marginBottom: 0
    },
    img: {
        //position: 'fixed',
        width: '50%',
        //border: 'solid 1px black',
        borderRadius: 10
    },
    contentContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    content: {
        //backgroundColor: 'red'
        padding: theme.spacing(3),
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    container: {
        marginBottom: theme.spacing(3),
    },
    answer: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    correctAnswer: {
        fontSize: 14,
        color: '#6be585',
        fontWeight: 'bold'
    },
    explanation: {
        fontSize: 14,
    },
    dialogHeader: {
        fontSize: 15,
        marginRight: 14,
        fontWeight: "bold"
    }
}))

const PostPage = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const history = useHistory();
    
    const currentChannelId = useSelector(ChannelStore.getCurrentChannel)
    const fetching = useSelector(ChannelStore.getFetching)
    const channels = useSelector(ChannelStore.getChannels)


    const [channel, setChannel] = useState(channels.filter(el => el._id === currentChannelId)[0])
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openRemove, setOpenRemove] = React.useState(false);

    const [newName, setNewName] = React.useState(channel.name);
    const [newDescription, setNewDescription] = React.useState(channel.description);
    const [photo, setPhoto] = React.useState(null);

    useEffect(()=>{
        setChannel(channels.filter(el => el._id === currentChannelId)[0])
    }, [channels])

    const handleClickOpenEdit = () => {
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleClickOpenRemove = () => {
        setOpenRemove(true);
    };

    const handleCloseRemove = () => {
        setOpenRemove(false);
    };

    const handleChangeNewName = (event) => {
        setNewName(event.target.value)
    }

    const handleChangeNewDescription = (event) => {
        setNewDescription(event.target.value)
    }

    const handleConfirmRemove = () => {
        dispatch(ChannelStore.delete())
        history.push("/");
    }

    const handleConfirmEdit = () => {
        dispatch(ChannelStore.edit(newName, newDescription, photo))
        setOpenEdit(false);
    }

    const onChangeFileHandler = (event) => {
        setPhoto(event.target.files[0])
    }

    return (
        <div>
            {fetching && <Loader />}
            <Grid container className={classes.container} direction="column" alignItems="center">
                <Grid item xs={12} sm={7} md={7} lg={7} xl={7} >
                    <div className={classes.imgContainer}>
                        <img src={"http://localhost:5000/" + channel.image} className={classes.img}></img>
                    </div>
                </Grid>
                <Grid item>
                    <Grid container>
                        <Grid item>
                            <h2 className={classes.textAlignCenter}>
                                <Link className={classes.header}>
                                    {channel.name}
                                </Link>
                            </h2>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                container
                className={classes.contentContainer}
                direction="column"
                alignItems="center"
            >
                <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                    <p>
                        <strong>Опис: </strong>{
                            channel.description.trim() !== '' ? channel.description : 'нема'
                        }
                    </p>
                </Grid>
                <Grid container item justify="center" spacing={2}>
                    <Grid item>
                        <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={handleClickOpenEdit}
                        >
                            Налаштування
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            onClick={handleClickOpenRemove}
                        >
                            Видалити
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Dialog open={openEdit} onClose={handleCloseEdit} fullWidth={true}>
                <DialogTitle id="form-dialog-title">Налаштування</DialogTitle>
                <DialogContent>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                value={newName}
                                onChange={handleChangeNewName}
                                label="Назва каналу"
                                fullWidth
                                multiline
                                error={newName.length > 255}
                            />
                        </Grid>
                        <InputLabel align="right" htmlFor="component-disabled">{`${newName.length} / 255`}</InputLabel>
                        <Grid item>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                value={newDescription}
                                onChange={handleChangeNewDescription}
                                label="Опис каналу"
                                fullWidth
                                multiline
                                error={newDescription.length > 255}
                            />
                        </Grid>
                        <InputLabel align="right" htmlFor="component-disabled">{`${newDescription.length} / 255`}</InputLabel>
                        <Grid item>
                            <form id="uploadForm" enctype="multipart/form-data" className="mb-1">
                                <label
                                    className={classes.dialogHeader}
                                >
                                    <strong>Фото каналу:  </strong>
                                </label>
                                <input
                                    accept="image/*"
                                    type='file'
                                    name='postsImage'
                                    onChange={onChangeFileHandler}
                                //ref={inputFile} 
                                />
                            </form>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit} color="primary">
                        Закрити
                    </Button>
                    <Button
                        onClick={handleConfirmEdit}
                        color="primary"
                        disabled={
                            newDescription.length > 255 ||
                            newName.length > 255 ||
                            newName.length === 0
                        }
                    >
                        Підтвердити
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openRemove} onClose={handleCloseRemove} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Увага</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ви впевнені що хочете видалити канал?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseRemove}
                        variant="contained"
                        color="secondary"
                    >
                        Ні
                    </Button>
                    <Button
                        onClick={handleConfirmRemove}
                        color="primary"
                        variant="contained"
                    >
                        Так
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default PostPage