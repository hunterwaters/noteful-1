import React from 'react';
import Button from '../Button/Button';
import './NoteViewFolder.css';

export default function NoteViewFolder(props) {
    return (
        <div className = 'noteViewFolder'>
            <Button
                button = 'button'
                role = 'link'
                onClick = {() => props.history.goBack()}
                className = 'noteViewFolder-goBack'>
                Go Back
            </Button>
            {props.folder && (
                <h3 className = 'noteViewFolder-folderName'>
                    {props.folder.name}
                </h3>
            )}
        </div>
    )
}

NoteViewFolder.defaultProps = {
    history: {
        goBack: () => {}
    }
}