import React from 'react'

const ImagePreview = (props) => {
    return (
        <div className = "p-media__thumb" onClick={()=>{props.delete(props.id)}}>
            {/* ここのclassNameで画像のサイズが指定されている */}
            <img src={props.path}　alt="プレビュー画像" />
        </div>
    )
}

export default ImagePreview;