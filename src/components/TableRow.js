import React from 'react/';
import Button from 'react-bootstrap/Button';

export default function TableRow({ id, item, removeInvoiceItem }) {
    const tds = Object.values(item).map((value, index) => (
        <td className={[1, 2].includes(index) ? 'responsive-hide' : ''} key={index}>
            {value}
        </td>
    ));
    return (
        <tr>
            {tds}
            <td>
                <Button
                    onClick={removeInvoiceItem}
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
