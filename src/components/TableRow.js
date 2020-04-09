import React from 'react/';
import Button from 'react-bootstrap/Button';

const displayInputs = ['cc', 'model', 'elevation', 'option', 'price'];

export default function TableRow({ id, invoiceItem, numberWithCommas, handleClick }) {
    const tds = Object.keys(invoiceItem).map((inputName, index) => {
        return displayInputs.includes(inputName) ? (
            <td key={index} className={[1, 2].includes(index) ? 'responsive-hide' : ''}>
                {Array.isArray(invoiceItem[inputName])
                    ? invoiceItem[inputName][0]
                    : `$${numberWithCommas(invoiceItem[inputName])}`}
            </td>
        ) : null;
    });

    return (
        <tr>
            {tds}
            <td>
                <Button
                    onClick={(event) => {
                        handleClick(event, false, true);
                    }}
                    value={id}
                    style={{ fontSize: '.57rem' }}
                    variant="danger"
                    size="sm"
                    type="button"
                >
                    x
                </Button>
            </td>
        </tr>
    );
}
