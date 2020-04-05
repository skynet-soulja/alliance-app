// react
import React from 'react';
import { renderEmail } from 'react-html-email';
import emailjs from 'emailjs-com';
// bootstrap
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
// styles
import './styles/App.css';
// json data
import dropdownOptionsData from './data/dropdown-options.json';
// local components
import Dropdown from './components/Dropdown';
import TableRow from './components/TableRow';
import EmailModal from './components/EmailModal';
import BaseEmail from './components/BaseEmail';
// mapping
import mapOptionValues from './mapping';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            dropdownOptions: dropdownOptionsData,
            companyName: '',
            companyEmail: '',
            companyDescription: '',
            invoiceNum: '',
            currentInvoiceItem: {},
            invoiceItems: [],
            totalValue: 0,
            today: new Date().toLocaleDateString(),
            emailAttributes: {},
            show: false,
        };

        this.wipeAndSeedCurrentInvoiceItem = this.wipeAndSeedCurrentInvoiceItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addInvoiceItem = this.addInvoiceItem.bind(this);
        this.removeInvoiceItem = this.removeInvoiceItem.bind(this);
        this.clearInvoice = this.clearInvoice.bind(this);
        this.calculateTotalValue = this.calculateTotalValue.bind(this);
    }

    componentDidMount() {
        this.wipeAndSeedCurrentInvoiceItem();
    }

    wipeAndSeedCurrentInvoiceItem() {
        const seedInvoiceItem = {};
        for (let item of this.state.dropdownOptions) {
            seedInvoiceItem[item.name] = item.options[0];
        }
        this.setState({
            currentInvoiceItem: seedInvoiceItem,
        });
    }

    handleShow() {
        this.setState({
            show: true,
        });
    }

    handleClose() {
        this.setState({
            show: false,
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSelectChange(event) {
        this.setState({
            currentInvoiceItem: {
                ...this.state.currentInvoiceItem,
                [event.target.name]: event.target.value,
            },
        });
    }

    handlePreview(event) {
        event.preventDefault();
        const emailAttributes = {
            companyName: this.state.companyName,
            companyEmail: this.state.companyEmail,
            invoiceNum: this.state.invoiceNum,
            companyDescription: this.state.companyDescription,
            invoiceItems: this.state.invoiceItems,
            totalValue: this.state.totalValue,
            today: this.state.today,
        };
        if (!this.checkRequiredValues(emailAttributes)) {
            return;
        }
        this.setState({ emailAttributes });
        this.handleShow();
    }

    handleSubmit(event) {
        event.preventDefault();
        const userID = 'user_V14xWF1ExiPPBbXWAxdW6';
        const serviceID = 'default_service';
        const templateID = 'alliance_builders_invoice';
        const variables = {
            companyEmail: this.state.emailAttributes.companyEmail
                ? this.state.emailAttributes.companyEmail
                : 'bmartinalliance@gmail.com',
            html: renderEmail(
                <BaseEmail
                    title="Alliance Builders Invoice"
                    {...this.state.emailAttributes}
                    numberWithCommas={this.numberWithCommas}
                />
            ),
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

    checkRequiredValues(emailAttributes) {
        if (!emailAttributes.invoiceItems.length) {
            alert('No Invoice Items Added');
            return false;
        }
        const requiredValues = {
            companyName: 'Company Name',
            invoiceNum: 'Invoice #',
            companyDescription: 'Company Description',
        };
        for (let [key, value] of Object.entries(requiredValues)) {
            if (!emailAttributes[key]) {
                alert(`${value} is required`);
                return false;
            }
        }
        return true;
    }

    addInvoiceItem() {
        const price = mapOptionValues(this.state.currentInvoiceItem);
        if (!price) {
            alert('Invalid Invoice Item');
            return;
        }
        this.setState(
            {
                invoiceItems: [...this.state.invoiceItems, { ...this.state.currentInvoiceItem, price }],
            },
            this.calculateTotalValue
        );
    }

    removeInvoiceItem(event) {
        const invoiceItems = this.state.invoiceItems.filter((item, index) => index !== parseInt(event.target.value));
        this.setState(
            {
                invoiceItems,
            },
            this.calculateTotalValue
        );
    }

    clearInvoice() {
        this.setState(
            {
                invoiceItems: [],
            },
            this.calculateTotalValue
        );
    }

    calculateTotalValue() {
        const totalValue = this.state.invoiceItems.length
            ? this.state.invoiceItems.reduce((prev, curr) => ({
                  price: prev.price + curr.price,
              }))['price']
            : 0;
        this.setState({
            totalValue,
        });
    }

    numberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    render() {
        const dropdowns = this.state.dropdownOptions.map((item, index) => (
            <Dropdown
                key={index}
                {...item}
                value={this.state.currentInvoiceItem[item.name]}
                handleChange={this.handleSelectChange}
            />
        ));

        const tablerows = this.state.invoiceItems.map((item, index) => (
            <TableRow key={index} id={index} item={item} removeInvoiceItem={this.removeInvoiceItem} />
        ));

        return (
            <div className="App container">
                <EmailModal show={this.state.show} handleClose={this.handleClose} handleSubmit={this.handleSubmit}>
                    <BaseEmail
                        title="Alliance Builders Invoice"
                        {...this.state.emailAttributes}
                        numberWithCommas={this.numberWithCommas}
                    />
                </EmailModal>
                <h1 style={{ margin: '2rem 0px' }}>Alliance Builders</h1>
                <Form>
                    <Form.Row>
                        <Form.Group xs="12" md="4" as={Col} controlId="formBasicCompany">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control
                                name="companyName"
                                type="text"
                                placeholder="Enter company name"
                                value={this.state.companyName}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group xs="12" md="4" as={Col} controlId="formBasicCompany">
                            <Form.Label>Company Email</Form.Label>
                            <Form.Control
                                name="companyEmail"
                                type="email"
                                placeholder="Enter company email"
                                value={this.state.companyEmail}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group xs="12" md="4" as={Col} controlId="formBasicInvoice">
                            <Form.Label>Invoice #</Form.Label>
                            <Form.Control
                                name="invoiceNum"
                                type="text"
                                placeholder="Enter invoice #"
                                value={this.state.invoiceNum}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formBasicDescription">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                name="companyDescription"
                                as="textarea"
                                placeholder="Enter address"
                                value={this.state.companyDescription}
                                onChange={this.handleChange}
                            />
                            <Form.Text className="text-muted">For ex. - Lenah Mill Parker singles Lot 9024</Form.Text>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>{dropdowns}</Form.Row>

                    <Form.Row id="btn-ctrl">
                        <Col>
                            <Button variant="primary" type="button" onClick={this.addInvoiceItem}>
                                Add Invoice Item
                            </Button>
                            <Button
                                style={{ marginLeft: '1rem' }}
                                variant="primary"
                                type="button"
                                onClick={this.clearInvoice}
                            >
                                Clear Invoice
                            </Button>
                            <Button
                                style={{ marginLeft: '1rem' }}
                                variant="primary"
                                type="submit"
                                onClick={this.handlePreview}
                            >
                                Submit
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
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
                        {!this.state.invoiceItems.length ? (
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
                            <td>{this.state.totalValue}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </Table>
            </div>
        );
    }
}
