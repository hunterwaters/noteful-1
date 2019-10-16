import React from 'react';
// import PropType from 'prop-type';
import ValidationError from '../ValidationError';
import './AddNote.css';

export default class AddNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
              value: '',
              touched: false
            },
            id: '',
            modified: '',
            
            content: {
                value: '',
                touched: false
            }
        };
    }

    updateName(name) {
        this.setState({name: {value: name, touched: true}});
    }

    updateContent(content) {
        this.setState({content: {value: content, touched: true}})
    }

    handleSubmit(event) {
        event.preventDefault();
        const name = this.state;
        const content = this.state;
    
        console.log('Name: ', name.value);
        console.log('Content: ', content.value);
        // createNoteId() {
        //     let min = 100000;
        //     let max = 1000000;
        //     let noteId = Math.floor(Math.random() * (max - min + 1) + min);
        //     this.setState({id: noteId});
        // }
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
        return (
            <form className = "newNote"
                onSubmit = {(e) => this.handleSubmit(e)}>
                <h2>Create a new note!</h2>
                <div className="registration__hint">* required field</div>
                <label htmlFor="name">Note Name *</label> 
                <input 
                    type = "text" 
                    className = "noteCreation"
                    name = "name" 
                    id = "name" 
                    onChange = {e => this.updateName(e.target.value)}/>
                {this.state.name.touched && (
                    <ValidationError message = {nameError}/>
                )}
                <label htmlFor="Content">Note Content *</label> 
                <input 
                    type = "text" 
                    className = "noteContentCreation"
                    name = "Content" 
                    id = "name" 
                    onChange = {e => this.updateContent(e.target.value)}/>
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
            </form>
        )
    }
}