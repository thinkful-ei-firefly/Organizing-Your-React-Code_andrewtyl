import React from 'react';
import config from '../config';
import cuid from 'cuid';
import ApiContext from '../ApiContext';
import './AddNoteForm.css';

export default class AddNoteForm extends React.Component {
    static defaultProps ={
        onAddNote: () => {},
      }
      static contextType = ApiContext;

    handleNewNoteSubmit = e => {
        e.preventDefault();
        const currentDate = new Date();
        let newNoteName = e.currentTarget.elements.newNoteNameTextField.value;
        let newNoteFolderId = e.currentTarget.elements.newNoteFolderField.value;
        let newNoteModified = currentDate.toISOString();
        let newNoteId = cuid();
        let newNoteContent = e.currentTarget.elements.newNoteContentTextField.value;

        let bodyIn = {
            "id": newNoteId,
            "name": newNoteName,
            "modified": newNoteModified,
            "folderId": newNoteFolderId,
            "content": newNoteContent
        };
        let bodyOut = JSON.stringify(bodyIn);

        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: bodyOut
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then(data => {
                this.context.addNote(data);
                this.props.history.push('/');
            })
            .catch(error => {
                throw new Error("Error: " + error);
            })

    }

    render() {
        console.log(this.context.folders);
        return (
            <div>
                <h2>Add Note</h2>
                <form name="newNoteForm" onSubmit={this.handleNewNoteSubmit}>
                    <label htmlFor="newNoteName">New Note Name</label>
                    <input type="text" name="newNoteNameTextField" required></input><br/>
                    <label htmlFor="newNoteContent">New Note Content</label>
                    <input type="text" name="newNoteContentTextField" required></input><br/>
                    <label htmlFor="newNoteFolder">New Note Folder</label>
                    <select name="newNoteFolderField">
                        {this.context.folders.map(folder =>
                            <option key={folder.id} value={folder.id}>{folder.name}</option>
                            )}
                    </select><br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}