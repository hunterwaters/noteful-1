import React from 'react';
// import PropType from 'prop-type';
import ValidationError from '../ValidationError';
import config from '../config';
import NotefulContext from '../NotefulContext';
import moment from 'moment';
import NotefulError from '../NotefulError';
import './AddNote.css';

export default class AddNote extends React.Component {
    static contextType = NotefulContext; 
    constructor(props) {
        super(props);
        this.state = {
            name: {
              value: '',
              touched: false
            },
            id: '',
            modified: '',
            folderId: {
                value: '',
                touched: false
            },
            content: {
                value: '',
                touched: false
            }
        };
    }

    updateName(name, modified) {
        this.updateModified(modified);
        this.setState({name: {value: name, touched: true}});
    }

    updateModified(modified) {
        this.setState({modified: modified});
    }

    updateContent(content, modified) {
        this.updateModified(modified);
        this.setState({content: {value: content, touched: true}});
        console.log(this.state.modified);
    }

    updateFolderId(folderId) {
        this.setState({folderId: {value: folderId, touched: true}});
    }

    handleSubmit(event) {
        event.preventDefault();
        const note = {
            id: this.state.id,
            name: this.state.name.value,
            modified: this.state.modified,
            content: this.state.content.value
        }
        const url = config.API_ENDPOINT + '/notes';
        console.log(url)
        // this.setState({ error: null })
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        .then(data => {
            this.state.name.value = ''
            this.state.id = ''
            this.state.modified = ''
            this.state.folderId.value = ''
            this.state.content.value = ''
            this.context.addNote(data)
            console.log(this.context);
            this.props.history.push('/')
        })
    }

    timeStamp() {
        moment().ToDate()
    }

    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
          return 'Name is required';
        } else if (name.length < 3) {
          return 'Name must be at least 3 characters long';
        }
    }

    validateContent() {
        const content = this.state.content.value.trim();
        if (content.length === 0) {
            return 'Contents of the note are empty, this is required for note creation';
        }
    }
    
    render() {
        const nameError = this.validateName();
        const contentError = this.validateContent();
        const modified = moment().toDate();
         return (
            <form className = "newNote"
                onSubmit = {(e) => this.handleSubmit(e)}>
                <NotefulError>
                    <h2>Create a new note!</h2>
                    <div className="registration__hint">* required field</div>
                    <label htmlFor="name">Note Name *</label> 
                    <input 
                        type = "text" 
                        className = "noteCreation"
                        name = "name" 
                        id = "name" 
                        onChange = {e => this.updateName(e.target.value, modified)}/>
                    {this.state.name.touched && (
                        <ValidationError message = {nameError}/>
                    )}
                    <label htmlFor="Content">Note Content *</label> 
                    <input 
                        type = "text" 
                        className = "noteContentCreation"
                        name = "Content" 
                        id = "name" 
                        onChange = {e => this.updateContent(e.target.value, modified)}/>
                    {this.state.name.touched && (
                        <ValidationError message = {contentError}/>
                    )}
                    <button
                        type = "submit"
                        className = "noteCreation_button"
                        disabled = {
                            this.validateName() ||
                            this.validateContent()
                        }>
                        Create Note
                    </button>
                </NotefulError>
            </form>
        )
    }
}