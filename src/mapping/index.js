import description from './description.json';
import model from './model.json';
import elevation from './elevation.json';
import option from './option.json';
import price from './price.json';

const maps = {
    description,
    model,
    elevation,
    option,
};

function mapOptionValues(invoiceItem) {
    let mapped = '';
    for (let [key, value] of Object.entries(invoiceItem)) {
        mapped += maps[key][value];
    }
    console.log(price[mapped.toString()]);
    return price[mapped.toString()];
}

export default mapOptionValues;
