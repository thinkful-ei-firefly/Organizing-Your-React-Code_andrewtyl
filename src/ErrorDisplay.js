import React from 'react';
import './ErrorDisplay.css'

class ErrorDisplay extends React.Component {
    state = {error: null};

    static getDerivedStateFromError(error) {
        console.error(error);
        return {error};
    }

    render() {
        if (this.state.error === true) {
            return (
                <div className="error-display-yes">
                    <h1>The app encountered an error.</h1>
                    <h2>Please check your connection and refresh the page.</h2>
                    <h3>If that doesn't help, please email <a href="mailto: andrewtyl@gmail.com">andrewtyl@gmail.com</a>.</h3>
                </div>
            )
        }
        else {
            return (
                <div className="error-display-no"></div>
            )
        }
    }

}

export default ErrorDisplay;