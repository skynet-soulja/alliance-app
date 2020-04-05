import React from 'react/';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

export default function Dropdown({ options, name, value, handleChange }) {
    const optionItems = options.map((option, index) => (
        <option key={index} value={option}>
            {option}
        </option>
    ));

    return (
        <Form.Group xs="12" md="3" as={Col} controlId={`form${name}`}>
            <Form.Label>{`${name.charAt(0).toUpperCase()}${name.slice(1)}`}</Form.Label>
            <Form.Control name={name} value={value} as="select" onChange={handleChange}>
                {optionItems}
            </Form.Control>
        </Form.Group>
    );
}
