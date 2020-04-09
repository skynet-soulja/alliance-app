import React from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function ButtonGroup({ handleClick }) {
    return (
        <Col id="btn-ctrl">
            <Button variant="primary" type="button" onClick={handleClick.handleInvoice}>
                Add Invoice Item
            </Button>
            <Button
                style={{ marginLeft: '1rem' }}
                variant="primary"
                type="button"
                onClick={(event) => handleClick.handleInvoice(event, true)}
            >
                Clear Invoice
            </Button>
            <Button style={{ marginLeft: '1rem' }} variant="primary" type="submit" onClick={handleClick.handlePreview}>
                Submit
            </Button>
        </Col>
    );
}
