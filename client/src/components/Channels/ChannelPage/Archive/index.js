import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PostsView from './PostView/PostView'
import ArchiveStore from '../../../../modules/archive'
import Loader from '../../../common/Loader/Loader'

const Posts = (props) => {
    const id = useSelector(ArchiveStore.getCurrentChannel)
    const dispatch = useDispatch()
    const DATA = useSelector(ArchiveStore.getPosts)
    const currentPage = useSelector(ArchiveStore.getCurrentPage)
    const totalItemsCount = useSelector(ArchiveStore.getTotalItemsCount)
    const pageSize = useSelector(ArchiveStore.getPageSize)
    const fetching = useSelector(ArchiveStore.getFetching)
    useEffect(() => {
        dispatch(ArchiveStore.posts(id))
    }, [])
    const paginateHandleCreate = () => {
        return (page) => {
            dispatch(ArchiveStore.setCurrentPage(page))
            dispatch(ArchiveStore.posts(id))
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