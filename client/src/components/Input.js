import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

export default function Input({ attributes, formattedName, handleChange }) {
    return (
        <Form.Group xs="12" md="4" as={Col}>
            <Form.Label>{formattedName}</Form.Label>
            <Form.Control {...attributes} onChange={handleChange} />
        </Form.Group>
    );
}
