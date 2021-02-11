import React, { useState, createRef } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { connect } from 'react-redux'
import htmlToDraft from 'html-to-draftjs'
import Button from '@material-ui/core/Button'
import { setCurrentPostText, create, setImage } from '../../../../redux/reducers/postsReducer'
const CreatePost = (props) => {
    const inputFile = createRef()
    const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(props.currentPostText).contentBlocks)))
    const onEditorStateChange = (content) => {
        setEditorState(content)
    }
    const onContentStateChange = (content) => {
        props.setCurrentPostText(draftToHtml(content))
    }
    const clickHandle = async () => {
        const channel = props.channels.filter(el => el._id = props.channel_id)
        const { token, currentPostText } = props
        props.create(token, channel[0], currentPostText, props.image)
        setEditorState(EditorState.createEmpty())
        console.log(null);
        inputFile.current.value = null
        inputFile.current.files = null
    }
    const onChangeFileHandler = (event) => {
        props.setImage(event.target.files[0])
    }
    return (
        <div>
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
            <form id="uploadForm" enctype="multipart/form-data">
                <input type='file' name='postsImage' onChange={onChangeFileHandler} ref={inputFile}/>
            </form>
            
            <Button variant="contained" color="primary" disabled={props.buttonDisable} onClick={clickHandle}>
                Primary
            </Button>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        currentPostText: state.posts.currentPostText,
        token: state.auth.token,
        channels: state.channels.channels,
        buttonDisable: state.posts.buttonDisable,
        image: state.posts.image,
    }
}
const mapDispatchToProps = {
    setCurrentPostText, create, setImage
}
export default connect(mapStateToProps, mapDispatchToProps)(CreatePost) 