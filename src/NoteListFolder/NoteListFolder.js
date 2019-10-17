import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import Button from '../Button/Button';
import './NoteListFolder.css';
import NotefulContext from '../NotefulContext'
import PropTypes from 'prop-types';
// import config from '../config';
import {countNotesForFolder} from '../notes-helpers';

class NoteListFolder extends React.Component {
    static defaultProps = {
        onDeleteFolder: () => {}
    }
    static contextType = NotefulContext;

    // handleClickDelete = (e) => {
    //     e.preventDefault() 
    //     const folderId = e.target.id;
    //     console.log(folderId);
    //     fetch(`${config.API_ENDPOINT}/folders/${folderId}`, {
    //         method: 'DELETE',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //     })
    //     .then(res => {
    //         if (!res.ok)
    //             return res.json().then(e => Promise.reject(e))
    //         return res.json()
    //     })
    //     .then(() => {
    //         this.context.deleteFolder(folderId)
    //         this.props.onDeleteFolder(folderId)
    //     })
    //     .catch(error => {
    //         console.error({error})
    //     })
    // }
    
    render() {
        const {folders = [], notes = []} = this.context
        // const handleClick = e => this.handleClickDelete(e.target.id);
        return (
            <div className = 'noteListFolder'>
                <ul className = 'noteListFolder-list'>
                    {folders.map(folder =>
                        <li key = {folder.id}>
                            <NavLink    
                                className = 'noteListFolder-folderLink'
                                to = {`/folder/${folder.id}`}>
                                    <span className = 'noteListFolder-num'>
                                        {countNotesForFolder(notes, folder.id)}
                                    </span>
                                {folder.name}
                            </NavLink>
                            {/* <button 
                                className = 'deleteNote'
                                type = 'button'
                                id = {folder.id}
                                onClick = {handleClick}>
                                remove
                            </button> */}
                        </li>
                    )}
                </ul>
                <div className = 'notesListFolder-buttonBox'>
                    <Button 
                        button = {Link}
                        to = '/add-folder'
                        type = 'button'
                        className = 'noteListFolder-addButton'>
                        Add folder
                    </Button>
                </div>
            </div>
        )
    }
}

export default NoteListFolder

NoteListFolder.propTypes = {
    value: PropTypes.func.isRequired,
    value: PropTypes.array.isRequired,
    value: PropTypes.object.isRequired
};