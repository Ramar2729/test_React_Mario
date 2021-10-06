import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

export default function EditBtn(props){

    const handleClick=() => {
        console.log(props.currentPost);
        props.setCurrentPost(props.currentPost)
        props.setAction("edit")
    };
    return (
        <IconButton onClick={handleClick}
                aria-label="edit"
              color="primary"
        >
            <EditIcon />
        </IconButton>
    );
}
        