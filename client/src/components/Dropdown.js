import React from 'react/';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

export default function Dropdown({ site, attributes, formattedName, dependant, options, handleChange }) {
    const optionItems = !dependant ? mapOptions(options) : mapOptions(dependant[site[0]].options);

    return (
        <Form.Group xs="12" md="3" as={Col}>
            <Form.Label>{formattedName}</Form.Label>
            <Form.Control
                {...attributes}
                as="select"
                onChange={(event) => {
                    const complexValue = event.target.value.split(',');
                    handleChange(event, complexValue);
                }}
            >
                {optionItems}
            </Form.Control>
        </Form.Group>
    );
}

function mapOptions(options) {
    return options.map(([value, numValue]) => {
        return (
            <option key={value} value={`${value},${numValue}`}>
                {value}
            </option>
        );
    });
}
