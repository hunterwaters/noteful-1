import React from 'react';
import {Link} from 'react-router-dom';
import Note from '../Note/Note';
import Button from '../Button/Button';
import './NoteList.css';

export default function NoteList(props) {
    return (
        <section className = 'noteList'>
            <ul className = 'noteListUl'>
                {props.notes.map(note =>
                    <li key = {note.id}>
                        <Note
                            id = {note.id}
                            name = {note.name}
                            modified = {note.modified}/>
                    </li>
                )}
            </ul>
            <div className = 'noteList-buttonBox'>
                <Button 
                    button = {Link}
                    to = '/add-note'
                    type = 'button'
                    className = 'noteList-addNote'>
                        Add note
                    </Button>
            </div>
        </section>
    )
}

NoteList.defaultProps = {
    notes: [],
}