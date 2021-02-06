import React from 'react'
import PostsView from '../PostView/PostView'
const DATA = [
    "fddffd",
    "fddffd",
    "fddffd",
    "fddffd",
    "fddffd",
    "fddffd",
    "fddffd",
    "fddffd",
    "fddffd",
    "fddffd",
    "fddffd",
    "fddffd",
]

const Posts = () => {
    return (
        <div>
            <PostsView data={DATA} page={1} totalCount={12} pageSize={9}></PostsView>
        </div>
    )
}
export default Posts