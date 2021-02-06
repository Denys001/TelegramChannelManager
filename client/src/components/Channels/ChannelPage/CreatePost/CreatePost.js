import React, {useState} from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html';
import {connect} from 'react-redux'
import { setCurrentPostText } from '../../../../redux/reducers/postsReducer'
import htmlToDraft from 'html-to-draftjs'
const CreatePost = (props) => {
    const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(props.currentPostText).contentBlocks)))
    console.log(props);
    const onEditorStateChange = (content) => {
        setEditorState(content)
    }
    const onContentStateChange = (content)=>{
        props.setCurrentPostText(draftToHtml(content))
    }
    return (
        <div>
            <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                onContentStateChange={onContentStateChange}
                toolbar={{
                    options: [
                        'inline', 'blockType', 'fontSize',
                        'fontFamily', 'list', 'textAlign',
                        'colorPicker', 'link', 'emoji',
                        'remove', 'history'
                    ]
                }}
            />
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        currentPostText: state.posts.currentPostText
    }
}
const mapDispatchToProps = {
    setCurrentPostText
}
export default connect(mapStateToProps, mapDispatchToProps)(CreatePost) 