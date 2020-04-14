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

const h1Style = {
    fontSize: '3.5rem',
    marginBottom: '1rem',
};

const flexStyle = {
    display: 'flex',
    justifyContent: 'left',
    marginBottom: '1rem',
};

const flexBasisStyle = {
    flexBasis: '50%',
};

const marginRightStyle = {
    marginRight: '3rem',
};

const h6Style = {
    color: '#7a7979',
    fontSize: '.9rem',
    fontWeight: 700,
};

const spacerStyle = {
    display: 'block',
    height: '4rem',
};

const spacerMdStyle = {
    display: 'block',
    height: '3.5rem',
};

const spacerSmStyle = {
    display: 'block',
    height: '2rem',
};

const emailStyle = {
    boxSizing: 'border-box',
    fontSize: '12px',
    color: '#212529',
    backgroundColor: '#ffffff',
    padding: '0 1rem',
    letterSpacing: '0.07rem',
};

const pStyle = {
    lineHeight: 1.7,
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
        <Email id="email" width="750px" headCSS={mobileCSS} title="Alliance Builders Invoice">
            <div style={emailStyle}>
                <div style={spacerSmStyle}></div>
                <h1 style={h1Style}>INVOICE</h1>
                <div style={flexStyle}>
                    <div style={marginRightStyle}>
                        <h6 style={h6Style}>INVOICE NUMBER</h6>
                        <span>{invoiceNum}</span>
                    </div>
                    <div>
                        <h6 style={h6Style}>DATE OF ISSUE</h6>
                        <span>{today}</span>
                    </div>
                </div>
                <div style={spacerStyle}></div>
                <div style={flexStyle}>
                    <div style={flexBasisStyle}>
                        <h6 style={h6Style}>BILLED TO</h6>
                        <p style={pStyle}>Toll Integrated Systems</p>
                        <h6 style={h6Style}>FOR</h6>
                        <p style={pStyle}>
                            {site} Lot # {lotNum}
                        </p>
                        <h6 style={h6Style}>MODEL/ELEVATION</h6>
                        <p style={pStyle}>
                            {model}/{elevation}
                        </p>
                    </div>
                    <div style={flexBasisStyle}>
                        <h6 style={h6Style}>
                            <b style={{ color: '#212529' }}>Alliance Builders Inc.</b>
                        </h6>
                        <p style={pStyle}>
                            24931 Avonlea Drive <br /> Chantilly VA 20152 <br /> (703) 926-5780
                        </p>
                    </div>
                </div>
                <div style={spacerMdStyle}></div>
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
                <div style={spacerStyle}></div>
                <footer>Alliance Builders Inc.</footer>
            </div>
        </Email>
    );
}
