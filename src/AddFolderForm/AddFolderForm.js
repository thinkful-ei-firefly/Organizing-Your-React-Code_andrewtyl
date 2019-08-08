import React from 'react';

export default class AddFolderForm extends React.Component {
    static defaultProps = {

    }

    handleNewFolderSubmit = e => {
        e.preventDefault();
        console.log(e.currentTarget.elements.newFolderNameTextField.value);
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