import React from 'react';
import Table from 'react-bootstrap/Table';
import { Email } from 'react-html-email';
import descriptionMap from '../mapping/description.json';
import optionMap from '../mapping/option.json';

const mobileCSS = `
@media only screen and (max-device-width: 480px) {
  font-size: 12px !important;
}`.trim();

const emailStyle = {
    boxSizing: 'border-box',
    fontSize: '18px',
    color: '#212529',
    backgroundColor: '#ffffff',
    padding: '0 1rem',
};

const pStyle = {
    marginTop: 2,
    marginBottom: 2,
};

const tableStyle = {
    border: '1px solid #dee2e6',
    width: '100%',
    marginBottom: '1.5rem',
    borderCollapse: 'collapse',
};

const thStyle = {
    borderBottomWidth: 2,
    verticalAlign: 'bottom',
    textAlign: 'inherit',
    border: '1px solid #dee2e6',
    borderBottom: '2px solid #dee2e6',
    padding: '.3rem',
};

const trStyleOne = {
    backgroundColor: 'rgba(0,0,0,.05)',
};

const tdStyle = {
    border: '1px solid #dee2e6',
    padding: '.3rem',
    verticalAlign: 'top',
};

const tdFootStyle = {
    verticalAlign: 'bottom',
    border: '1px solid #dee2e6',
    borderBottom: '2px solid #dee2e6',
    padding: '.3rem',
};

export default function BaseEmail({ companyName, invoiceNum, companyDescription, invoiceItems, totalValue, today }) {
    const { model, elevation } = invoiceItems[0];
    const tablerows = invoiceItems.map(({ description, option, price }, index) => {
        let trStyle = {};
        if ((index + 1) % 2 !== 0) {
            trStyle = { ...trStyleOne };
        }
        return (
            <tr style={trStyle} key={index}>
                <td style={tdStyle}>{option !== 'BASE HOUSE' ? optionMap[option] : descriptionMap[description]}</td>
                <td style={tdStyle}>{option}</td>
                <td style={tdStyle}>${price}.00</td>
            </tr>
        );
    });
    return (
        <Email headCSS={mobileCSS} title="Alliance Builders Invoice">
            <div style={emailStyle}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <p>Alliance Builders Inc.</p>
                    <p>24931 Avonlea Drive</p>
                    <p>Chantilly Va. 20152</p>
                    <p>(703) 926-5780</p>
                </div>
                <div style={{ marginBottom: '2rem' }}>
                    <p style={pStyle}>Billing To: {companyName}</p>
                    <p style={pStyle}>Address: {companyDescription}</p>
                    <p style={pStyle}>
                        Model/Elevation: {model}/{elevation}
                    </p>
                    <p style={pStyle}>Date: {today}</p>
                </div>
                <Table style={tableStyle}>
                    <thead>
                        <th style={thStyle}>Option</th>
                        <th style={thStyle}>Description</th>
                        <th style={thStyle}>Amount</th>
                    </thead>
                    <tbody>{tablerows}</tbody>
                    <tfoot>
                        <tr>
                            <td style={tdFootStyle}>Total</td>
                            <td style={tdFootStyle}></td>
                            <td style={tdFootStyle}>${totalValue}.00</td>
                        </tr>
                    </tfoot>
                </Table>
                <p style={{ marginBottom: 8 }}>Invoice# {invoiceNum}</p>
            </div>
        </Email>
    );
}
