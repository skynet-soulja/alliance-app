// react
import React from 'react';
import '../styles/Custom.css';

export default class Custom extends React.Component {
    render() {
        return (
            <div id="pdf-wrapper">
                <p>Open with Microsoft Edge to enable form filling.</p>
                <a target="blank" className="btn btn-primary" href="alliance_builders_invoice.pdf">
                    Open PDF
                </a>
            </div>
        );
    }
}
