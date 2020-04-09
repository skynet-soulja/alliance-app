import { useState } from 'react';
import config from '../config.json';

const valuedInputs = ['site', 'cc', 'model', 'elevation', 'option'];

export default function useInvoice(input) {
    const [invoice, setInvoice] = useState([]);

    let priceId = '';
    const invoiceItem = {};

    for (let [inputName, inputValue] of Object.entries(input)) {
        if (valuedInputs.includes(inputName)) {
            priceId += inputValue[1];
            invoiceItem[inputName] = inputValue;
        }
    }

    const price = config.priceMapping[priceId];

    function handleInvoice(event, clear = false, removeOne = false) {
        if (clear) {
            setInvoice([]);
        } else if (removeOne) {
            setInvoice(invoice.filter((item, index) => index !== parseInt(event.target.value)));
        } else if (!price) {
            alert('Invalid invoice item!');
            setInvoice([...invoice]);
        } else {
            setInvoice([...invoice, { ...invoiceItem, price }]);
        }
    }

    return [invoice, handleInvoice];
}
