import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PostCard from './PostCard/PostCard'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  empty: {
    marginTop: 50,
    marginBottom: 50
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 15,
  },
}))
const PostView = (props) => {
  const handleChangePage = (e, v) => {
    props.paginateHandle(v)
  }
  const pagesCount = Math.ceil(props.totalCount / props.pageSize)
  const classes = useStyles()
  const content = props.data && props.data.length !== 0
    ? props.data.map(
      el =>
        <Grid
          item
          //xs={12} sm={6} md={6} lg={4} xl={3}> 
          xs={12} sm={6} md={6} lg={4} xl={2}>
          <PostCard
            subheader={
              new Intl.DateTimeFormat('uk-DE', {
                year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit'
              }).format(new Date(el.date).getTime())
            }
            image={"http://localhost:5000/" + el.image}
            content={el.content}
            id={el._id}
            el={el}
            type={el.type}
          />
        </Grid>)
    : (<Typography variant="h4" className={classes.empty} align='center'>Покищо постів нема...</Typography>)
  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        justify="center"
        alignItems="stretch"
      >
        {content}
      </Grid>
      <div className={classes.pagination}>
        <Pagination
          count={pagesCount}
          page={props.page}
          color="primary"
          showFirstButton
          showLastButton
          onChange={handleChangePage}
        />
      </div>
    </div>
  )
}
export default PostView