import React from 'react';
// import PropType from 'prop-type';
import ValidationError from '../ValidationError';
import config from '../config';
import NotefulContext from '../NotefulContext';
import './AddFolder.css';

export default class AddFolder extends React.Component {
    static contextType = NotefulContext; 
    constructor(props) {
        super(props);
        this.state = {
            name: {
              value: '',
              touched: false
            },
            id: '',
            // error: null,
        };
    }

    updateName(name) {
        this.setState({name: {value: name, touched: true}});
    }
    
    createFolderId() {
            let min = 100000;
            let max = 1000000;
            let folderId = Math.floor(Math.random() * (max - min + 1) + min);
            this.setState({id: folderId});
    }

    handleSubmit(event) {
        event.preventDefault();
        const folder = {
            id: this.state.id,
            name: this.state.name.value
        }
        const url = config.API_ENDPOINT + '/folders';
        console.log(url)
        // this.setState({ error: null })
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(folder)
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
            this.context.addFolder(data)
            this.props.history.push('/')
        })
    }

    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
          return 'Name is required';
        } 
        else if (name.length < 3) {
          return 'Name must be at least 3 characters long';
        }
    }
    
    render() {
        const nameError = this.validateName();
        return (
            <form className = "newFolder"
                onSubmit = {(e) => this.handleSubmit(e)}>
                <h2>Create a new folder!</h2>
                <div className="folderCreation__hint">* required field</div>
                <label htmlFor="name">Folder Name *</label> 
                <input 
                    type = "text" 
                    className = "folderCreation"
                    name = "name" 
                    id = "name" 
                    onChange = {e => this.updateName(e.target.value)}/>
                {this.state.name.touched && (
                    <ValidationError message = {nameError}/>
                )}
                <button
                    type = "submit"
                    className = "folderCreation_button"
                    disabled = {
                        this.validateName() 
                    }>
                    Create Folder
                </button>
            </form>
        )
    }
}