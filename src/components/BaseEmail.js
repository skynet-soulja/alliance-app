import React from 'react';
import Table from 'react-bootstrap/Table';
import { Email } from 'react-html-email';

const mobileCSS = `
body {
    letter-spacing: .03rem;
}
@media only screen and (max-width: 992px) {
    table td > table {
        width: 100% !important;
    }
}
@media only screen and (max-width: 480px) {
    body {
        font-size: 12px !important;
    }
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

export default function BaseEmail({
    site,
    model,
    elevation,
    invoiceNum,
    lotNum,
    totalValue,
    today,
    invoice,
    numberWithCommas,
}) {
    const tablerows = invoice.map(({ cc: [cc, ccValue], option: [option, optValue], price }, index) => {
        return (
            <tr style={(index + 1) % 2 !== 0 ? trStyleOne : {}} key={index}>
                <td style={tdStyle}>{option !== 'BASE HOUSE' ? optValue : ccValue}</td>
                <td style={tdStyle}>{option}</td>
                <td style={tdStyle}>${numberWithCommas(price)}.00</td>
            </tr>
        );
    });
    return (
        <Email id="email" headCSS={mobileCSS} title="Alliance Builders Invoice">
            <div style={emailStyle}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <p>Alliance Builders Inc.</p>
                    <p>24931 Avonlea Drive</p>
                    <p>Chantilly Va. 20152</p>
                    <p>(703) 926-5780</p>
                </div>
                <div style={{ marginBottom: '2rem' }}>
                    <p style={pStyle}>Billing: Toll Information Systems</p>
                    <p style={pStyle}>
                        Address: {site} Lot # {lotNum}
                    </p>
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
                            <td style={tdFootStyle}>${numberWithCommas(totalValue)}.00</td>
                        </tr>
                    </tfoot>
                </Table>
                <p style={{ marginBottom: 8 }}>Invoice # {invoiceNum}</p>
            </div>
        </Email>
    );
}
