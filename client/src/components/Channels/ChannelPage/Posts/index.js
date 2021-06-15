import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PostsView from '../PostView/PostView'
import PostsReducer from '../../../../modules/posts'
import Loader from '../../../common/Loader/Loader'
const Posts = (props) => {
    const id = useSelector(PostsReducer.getCurrentChannel)
    const dispatch = useDispatch()
    const DATA = useSelector(PostsReducer.getPosts)
    const currentPage = useSelector(PostsReducer.getCurrentPage)
    const totalItemsCount = useSelector(PostsReducer.getTotalItemsCount)
    const pageSize = useSelector(PostsReducer.getPageSize)
    const fetching = useSelector(PostsReducer.getFetching)
    useEffect(() => {
        dispatch(PostsReducer.posts(id))
    }, [])
    const paginateHandleCreate = () => {
        return (page) => {
            dispatch(PostsReducer.setCurrentPage(page))
            dispatch(PostsReducer.posts(id))
        }
    }
    const paginateHandle = paginateHandleCreate()
    return (
        <div>
            {fetching && <Loader></Loader>}
            <div>
                {fetching && <Loader></Loader>}
                <PostsView
                    data={DATA}
                    page={currentPage}
                    totalCount={totalItemsCount}
                    pageSize={pageSize}
                    paginateHandle={paginateHandle}
                ></PostsView>
            </div>
        </div>
    )
}
export default Posts