import React from 'react'
import { useEffect} from 'react'
import { useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PostsView from '../PostView/PostView'
import PostsSagas from './../../../../modules/posts'
import Loader from '../../../common/Loader/Loader'
const Posts = (props) => {
    let { id } = useParams()
    const dispatch = useDispatch()
    const DATA = useSelector(PostsSagas.getPosts)
    const currentPage = useSelector(PostsSagas.getCurrentPage)
    const totalItemsCount = useSelector(PostsSagas.getTotalItemsCount)
    const pageSize = useSelector(PostsSagas.getPageSize)
    const fetching = useSelector(PostsSagas.getFetching)
    useEffect(()=>{
        dispatch(PostsSagas.posts(id))
    }, [])
    const paginateHandleCreate = () => {
        return (page) => {
            dispatch(PostsSagas.setCurrentPage(page))
            console.log(id);
            dispatch(PostsSagas.posts(id))
        }
    }
    const paginateHandle = paginateHandleCreate()
    return (
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
    )
}
export default Posts