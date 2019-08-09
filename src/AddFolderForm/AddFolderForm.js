import React from 'react';
import config from '../config';
import cuid from 'cuid';
import ApiContext from '../ApiContext'
import "./AddFolderForm.css"

export default class AddFolderForm extends React.Component {
    static defaultProps ={
        onAddFolder: () => {},
      }
      static contextType = ApiContext;

    handleNewFolderSubmit = e => {
        e.preventDefault();
        let newFolderName = e.currentTarget.elements.newFolderNameTextField.value;

        let newFolderId = cuid();

        let bodyIn = {
            "id": newFolderId,
            "name": newFolderName
        };
        let bodyOut = JSON.stringify(bodyIn);

        fetch(`${config.API_ENDPOINT}/folders`, {
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
                this.context.addFolder(data);
                this.props.history.push('/');
            })
            .catch(error => {
                throw new Error("Error: " + error);
            })

    }

    render() {
        return (
            <div>
                <h2>Add Folder</h2>
                <form name="newFolderForm" onSubmit={this.handleNewFolderSubmit}>
                    <label htmlFor="newFolderName">New Folder Name</label><br/>
                    <input type="text" name="newFolderNameTextField" required></input><br/>
                    <button type="submit">Submit</button><br/>
                </form>
            </div>
        )
    }
}