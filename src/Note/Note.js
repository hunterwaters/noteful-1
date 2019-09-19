import React from 'react';
import {Link} from 'react-router-dom';
// import {format} from 'date-fns';
import './Note.css';

export default function Note(props) {
    return (
        <div className = 'note'>
            <h2 className = 'noteTitle'>
                <Link to = {`/note/${props.id}`}>
                    {props.name}
                </Link>
            </h2>
            <div className = 'noteDate'>
                <div className = 'modifiedDate'>
                    Modified 
                    {' '}
                    <span className = 'Date'>
                        {props.modified}
                        {/* {format(props.modified, 'Do MMM YYYY')} */}
                    </span>
                </div>
            </div>
            <button 
                className = 'deleteNote'
                type = 'button'>
                remove
            </button>
        </div>
    )
}

