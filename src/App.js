// react
import React, { useState, useEffect } from 'react';
import { renderEmail } from 'react-html-email';
import emailjs from 'emailjs-com';
// bootstrap
import Form from 'react-bootstrap/Form';
// styles
import './styles/App.css';
// local components
import DisplayTable from './components/DisplayTable';
import EmailModal from './components/EmailModal';
import BaseEmail from './components/BaseEmail';
import ButtonGroup from './components/ButtonGroup';
import Input from './components/Input';
import Dropdown from './components/Dropdown';
// config
import config from './config.json';
// hooks
import useInput from './hooks/useInput';
import useInvoice from './hooks/useInvoice';

export default function App() {
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
        const userID = 'user_V14xWF1ExiPPBbXWAxdW6';
        const serviceID = 'default_service';
        const templateID = 'alliance_builders_invoice';
        const variables = {
            companyEmail: emailAttributes.companyEmail,
            html: renderEmail(<BaseEmail title="Alliance Builders Invoice" {...emailAttributes} />),
        };

        emailjs
            .send(serviceID, templateID, variables, userID)
            .then((response) => {
                alert('Email successfully sent!');
                this.clearInvoice();
                this.wipeAndSeedCurrentInvoiceItem();
            })
            .catch((error) => console.log(`Email failed to send: ${Object.entries(error)}`));
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
        <div className="App">
            <div className="container">
                <EmailModal show={showModal} handleClose={setShowModal} handleSubmit={handleSubmit}>
                    <BaseEmail title="Alliance Builders Invoice" {...emailAttributes} />
                </EmailModal>
                <h1 style={{ margin: '2rem 0px' }}>Alliance Builders</h1>
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
            </div>
        </div>
    );
}
