import React from 'react'

const ChannelPage = (props) => {
    return (
        <div>
            {props.match.params.id}
        </div>
    )
}
export default ChannelPage