// react
import React, { useState, useEffect } from 'react';
import { renderEmail } from 'react-html-email';
import * as html2pdf from 'html2pdf.js';
import axios from 'axios';
// bootstrap
import Form from 'react-bootstrap/Form';
// styles
import '../styles/App.css';
// local components
import DisplayTable from '../components/DisplayTable';
import EmailModal from '../components/EmailModal';
import BaseEmail from '../components/BaseEmail';
import ButtonGroup from '../components/ButtonGroup';
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';
// config
import config from '../config.json';
// hooks
import useInput from '../hooks/useInput';
import useInvoice from '../hooks/useInvoice';

export default function Standard() {
    // standard
    const [emailAttributes, setEmailAttributes] = useState({});
    // boolean
    const [showModal, setShowModal] = useState(false);
    // calculated
    const [totalValue, setTotalValue] = useState(0);
    // custom './hooks'
    const [input, handleInput] = useInput();
    const [invoice, handleInvoice] = useInvoice(input);
    // effects
    useEffect(() => {
        if (invoice.length) {
            const totalValue = invoice.reduce((acc, obj) => {
                return acc + obj.price;
            }, 0);
            setTotalValue(totalValue);
        } else {
            setTotalValue(0);
        }
    }, [invoice]);

    // creating components from config
    const components = {};

    for (let component of config.components) {
        const {
            type,
            attributes: { name },
        } = component;
        components[type] = components[type] ? components[type] : {};
        switch (type) {
            case 'input':
                components[type][name] = <Input key={name} {...component} handleChange={handleInput} />;
                break;
            case 'dropdown':
                components[type][name] = (
                    <Dropdown key={name} {...component} handleChange={handleInput} site={input.site} />
                );
                break;
            default:
                throw new Error('Invalid component type.');
        }
    }

    // functions
    function handleSubmit(event) {
        event.preventDefault();

        const options = {
            margin: 0,
            // filename: 'alliance_builders_invoice.pdf',
            image: { type: 'png', quality: 0.98 },
            html2canvas: { scale: 1 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        };

        html2pdf()
            .set(options)
            .from(document.querySelector('#email-container > html'))
            .toPdf()
            .output('datauristring')
            .then(sendEmail);
    }

    async function sendEmail(pdfAsString) {
        const renderedInvoice = renderEmail(
            <BaseEmail title="Alliance Builders Invoice" {...emailAttributes} darkBackground={true} />
        );

        try {
            const response = await axios.post(
                '/send',
                {
                    to: emailAttributes.companyEmail,
                    invoiceNum: emailAttributes.invoiceNum,
                    html: renderedInvoice,
                    attachment: pdfAsString,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            alert(response.data.message);
        } catch (error) {
            alert('Email failed to send!');
        }
    }

    function handlePreview(event) {
        event.preventDefault();
        if (missingValues()) {
            return;
        }
        const emailAttributes = {
            companyEmail: input.email,
            site: input.site[0],
            model: input.model[0],
            elevation: input.elevation[0],
            invoiceNum: input.invoiceNum,
            lotNum: input.lotNum,
            totalValue: totalValue,
            today: new Date().toLocaleDateString(),
            invoice,
            numberWithCommas,
        };
        setEmailAttributes(emailAttributes);
        setShowModal(true);
    }

    function missingValues() {
        return config.components.some((component) => {
            if (component.required && !input[component.attributes.name]) {
                alert(`${component.formattedName} is required!`);
                return true;
            } else if (!invoice.length) {
                alert('No invoice items added!');
                return true;
            }
            return false;
        });
    }

    function numberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return (
        <React.Fragment>
            <EmailModal show={showModal} handleClose={setShowModal} handleSubmit={handleSubmit}>
                <BaseEmail title="Alliance Builders Invoice" {...emailAttributes} />
            </EmailModal>
            <Form>
                <Form.Row>
                    {components.input.email}
                    {components.input.invoiceNum}
                </Form.Row>
                <Form.Row>
                    {components.dropdown.site}
                    {components.input.lotNum}
                </Form.Row>
                <Form.Row>
                    {components.dropdown.model}
                    {components.dropdown.elevation}
                </Form.Row>
                <Form.Row>
                    {components.dropdown.cc}
                    {components.dropdown.option}
                </Form.Row>
                <Form.Row>
                    <ButtonGroup handleClick={{ handleInvoice, handlePreview }} />
                </Form.Row>
            </Form>
            <DisplayTable
                invoice={invoice}
                totalValue={totalValue}
                numberWithCommas={numberWithCommas}
                handleClick={handleInvoice}
            ></DisplayTable>
        </React.Fragment>
    );
}
