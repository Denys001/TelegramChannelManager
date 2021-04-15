import React, { useState, createRef } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { useDispatch, useSelector } from 'react-redux'
import htmlToDraft from 'html-to-draftjs'
import Button from '@material-ui/core/Button'
import posts from '../../../../modules/posts'
import Loader from '../../../common/Loader/Loader'
const CreatePost = (props) => {
    const dispatch = useDispatch()
    const isButtonDisabled = useSelector(posts.getIsButtonDisabled)
    const channels = useSelector(posts.getChannels)
    const photo = useSelector(state => state.posts.image)
    const currentPostText = useSelector(posts.getContent)
    const fetching = useSelector(posts.getFetching)
    const inputFile = createRef()
    const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(currentPostText).contentBlocks)))
    const onEditorStateChange = (content) => {
        setEditorState(content)
    }
    const onContentStateChange = (content) => {
        dispatch(posts.setCurrentPostText(draftToHtml(content)))
    }
    const clickHandle = async () => {
        var html = currentPostText
        html = html.replace(/<style([\s\S]*?)<\/style>/gi, '');
        html = html.replace(/<script([\s\S]*?)<\/script>/gi, '');
        html = html.replace(/<\/div>/ig, '\n');
        html = html.replace(/<\/li>/ig, '\n');
        html = html.replace(/<li>/ig, '  *  ');
        html = html.replace(/<\/ul>/ig, '\n');
        html = html.replace(/<\/p>/ig, '\n');
        html = html.replace(/<br\s*[\/]?>/gi, "\n");
        html = html.replace(/<[^>]+>/ig, '');
        console.log(photo);
        if(photo && html.length > 1024){
            alert('Повідомлення занадто велике')
            return
        }
        const channel = channels.filter(el => el._id === props.channel_id)
        dispatch(posts.createPost(channel[0]))
        setEditorState(EditorState.createEmpty())
        inputFile.current.value = null
    }
    const onChangeFileHandler = (event) => {
        dispatch(posts.setImage(event.target.files[0]))
    }
    return (
        <div>
            {fetching && <Loader></Loader>}
            <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                onContentStateChange={onContentStateChange}
                toolbar={{
                    options: [
                        'inline', 'list', 'link',
                        'emoji', 'remove', 'history'
                    ],
                    inline: {
                        options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
                    },
                    list: {
                        options: ['unordered'],
                    }
                }}
            />
            <form id="uploadForm" enctype="multipart/form-data" className="mb-1">
                <input accept="image/*" type='file' name='postsImage' onChange={onChangeFileHandler} ref={inputFile} />
            </form>
            <div className="d-flex justify-content-center">
                <Button variant="contained" color="primary" disabled={isButtonDisabled} onClick={clickHandle}>
                    Опублікувати
                </Button>
            </div>
        </div>
    )
}

export default CreatePost