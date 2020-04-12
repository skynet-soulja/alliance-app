// react
import React, { useState } from 'react';
import '../styles/Custom.css';
// PDF
// import { Document, Page, pdfjs } from 'react-pdf';
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default class Custom extends React.Component {
    state = { numPages: null, pageNumber: 1 };

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    };

    goToPrevPage = () => this.setState((state) => ({ pageNumber: state.pageNumber - 1 }));
    goToNextPage = () => this.setState((state) => ({ pageNumber: state.pageNumber + 1 }));

    render() {
        const { pageNumber, numPages } = this.state;

        return (
            <div id="pdf-wrapper">
                <p>Open with Microsoft Edge to enable form filling.</p>
                <a class="btn btn-primary" href="alliance_builders_invoice.pdf">
                    Open PDF
                </a>
                {/* <Document file="alliance_builders_invoice.pdf" onLoadSuccess={this.onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} width={850} />
                </Document> */}
            </div>
        );
    }
}
