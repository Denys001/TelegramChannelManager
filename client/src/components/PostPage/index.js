import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import POSTS from '../../modules/posts'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
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
        border: 'solid 1px black',
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
    }
}))

const PostPage = () => {
    const classes = useStyles()
    const post = useSelector(POSTS.getCurrentPost)
    const channels = useSelector(POSTS.getChannels)
    const channel = channels.filter(el => el._id === post.channelId)[0];
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
                                <Link to={`/channel/${channel._id}`} exact className={classes.header}>
                                    {channel.name}
                                </Link>
                            </h1>
                            <p className={classes.textAlignCenter}>{
                                new Intl.DateTimeFormat('uk-DE', {
                                    year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit'
                                }).format(new Date(post.date).getTime())
                            }</p>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {post.content.trim() !== '' &&
                <Grid container className={classes.contentContainer}>
                    <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                        <Paper>
                            <td className={classes.content} dangerouslySetInnerHTML={{
                                __html: post.content.replaceAll('\n', '<br>')
                            }} />
                        </Paper>
                    </Grid>
                </Grid>
            }
        </div>
    )
}
export default PostPage