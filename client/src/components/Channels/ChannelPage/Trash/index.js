import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PostsView from './PostView/PostView'
import TrashStore from '../../../../modules/trash'
import Loader from '../../../common/Loader/Loader'

const Posts = (props) => {
    const id = useSelector(TrashStore.getCurrentChannel)
    const dispatch = useDispatch()
    const DATA = useSelector(TrashStore.getPosts)
    const currentPage = useSelector(TrashStore.getCurrentPage)
    const totalItemsCount = useSelector(TrashStore.getTotalItemsCount)
    const pageSize = useSelector(TrashStore.getPageSize)
    const fetching = useSelector(TrashStore.getFetching)
    useEffect(() => {
        dispatch(TrashStore.posts(id))
    }, [])
    const paginateHandleCreate = () => {
        return (page) => {
            dispatch(TrashStore.setCurrentPage(page))
            dispatch(TrashStore.posts(id))
        }
    }
    const paginateHandle = paginateHandleCreate()

    return (
        <div>
            {fetching && <Loader></Loader>}
            <div>
                {fetching && <Loader/>}
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