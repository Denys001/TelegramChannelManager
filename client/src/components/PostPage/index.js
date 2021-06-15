import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PostStore from '../../modules/posts'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Loader from '../common/Loader/Loader'
import { useParams } from "react-router-dom";
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
        width: '35%',
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
    }
}))

const PostPage = () => {
    let { id } = useParams();
    const dispatch = useDispatch()
    const classes = useStyles()
    useEffect(() => {
        dispatch(PostStore.show(id))
    }, [])
    const post = useSelector(PostStore.getCurrentPost)
    const fetching = useSelector(PostStore.getFetching)
    const makeQuiz = () => {
        const content = JSON.parse(post.content)
        console.log(content);
        if (content.type === 'quiz') {
            return (
                <Paper className={classes.content}>
                    <h3>{content.question}</h3>
                    <ul>
                        {
                            content.options.map(
                                (el, index) =>
                                    <li
                                        className={
                                            index === content.correct_option_id
                                                ? classes.correctAnswer
                                                : classes.answer
                                        }
                                    >
                                        {el}
                                    </li>
                            )
                        }
                    </ul>
                    { (content.hasOwnProperty('explanation') && content.explanation.trim().length != 0) &&
                        <p className={classes.explanation}> Пояснення: {
                            content.explanation
                        }</p>
                    }
                </Paper>
            )
        } else {
            return (
                <Paper className={classes.content}>
                    <h3>{content.question}</h3>
                    <ul>
                        {
                            content.options.map(
                                (el, index) =>
                                    <li
                                        className={classes.answer}
                                    >
                                        {el}
                                    </li>
                            )
                        }
                    </ul>
                </Paper>
            )
        }
    }
    if (fetching) {
        return (
            <Loader />
        )
    } else {

        return (
            <div>
                <Grid container className={classes.container}>
                    <Grid item xs={12} sm={7} md={7} lg={7} xl={7} >
                        <div className={classes.imgContainer}>
                            <img src={"http://localhost:5000/" + post.image} className={classes.img}></img>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                        <Grid container>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <h1 className={classes.textAlignCenter}>
                                    <Link to={`/channel/${post.channelId}`} exact className={classes.header}>
                                        {post.channelName}
                                    </Link>
                                </h1>
                                <p className={classes.textAlignCenter}>{
                                    new Intl.DateTimeFormat('uk-DE', {
                                        year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit'
                                    }).format(new Date(post.date).getTime())
                                }</p>
                                <p className={classes.textAlignCenter}>
                                    {post.InArchive && "Пост в архіві"}
                                </p>
                                {/* {
                                    post.type !== "default" &&
                                    <p className={classes.textAlignCenter}>
                                        Тип: Опитування
                                    </p>
                                } */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {
                    post.content.trim() !== '' &&
                    <Grid container className={classes.contentContainer}>
                        <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                            {
                                post.type === "default"
                                    ? <Paper>
                                        <td
                                            className={classes.content}
                                            dangerouslySetInnerHTML={{
                                                __html: post.content.replaceAll('\n', '<br>')
                                            }}
                                        />
                                    </Paper>
                                    : makeQuiz()
                            }
                        </Grid>
                    </Grid>
                }
            </div>
        )
    }
}
export default PostPage