import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import Button from '../Button/Button';
import './NoteListFolder.css';
import NotefulContext from '../NotefulContext'
import {countNotesForFolder} from '../notes-helpers';

class NoteListFolder extends React.Component {
    static contextType = NotefulContext;
    
    render() {
        const {folders = [], notes = []} = this.context
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