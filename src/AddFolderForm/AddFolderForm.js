import React from 'react';
import config from '../config';
import cuid from 'cuid';
import ApiContext from '../ApiContext'

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
                console.error({ error })
            })

    }

    render() {
        return (
            <div>
                <h2>Add Folder</h2>
                <form name="newFolderForm" onSubmit={this.handleNewFolderSubmit}>
                    <label htmlFor="newFolderName">New Folder Name</label>
                    <input type="text" name="newFolderNameTextField"></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}