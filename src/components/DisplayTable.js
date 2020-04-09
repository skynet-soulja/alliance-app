import React from 'react';
import Table from 'react-bootstrap/Table';
import TableRow from './TableRow';

export default function DisplayTable({ invoice, totalValue, numberWithCommas, handleClick }) {
    const tablerows = invoice.length
        ? invoice.map((invoiceItem, index) => (
              <TableRow
                  key={index}
                  id={index}
                  invoiceItem={invoiceItem}
                  numberWithCommas={numberWithCommas}
                  handleClick={handleClick}
              />
          ))
        : [];

    return (
        <Table id="invoice-table" style={{ marginTop: '1rem' }} striped bordered hover responsive size="sm">
            <thead>
                <tr>
                    <th>CC Description</th>
                    <th className="responsive-hide">Model</th>
                    <th className="responsive-hide">Elevation</th>
                    <th>Option</th>
                    <th>Price</th>
                    <th>Remove Row</th>
                </tr>
            </thead>
            <tbody>
                {!invoice.length ? (
                    <tr>
                        <td>XXX</td>
                        <td className="responsive-hide">XXX</td>
                        <td className="responsive-hide">XXX</td>
                        <td>XXX</td>
                        <td>XXX</td>
                        <td>XXX</td>
                    </tr>
                ) : (
                    tablerows
                )}
            </tbody>
            <tfoot>
                <tr>
                    <td>Total</td>
                    <td className="responsive-hide"></td>
                    <td className="responsive-hide"></td>
                    <td></td>
                    <td>${numberWithCommas(totalValue)}</td>
                    <td></td>
                </tr>
            </tfoot>
        </Table>
    );
}
