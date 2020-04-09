import site from './site.json';
import description from './description.json';
import model from './model.json';
import elevation from './elevation.json';
import option from './option.json';
import price from './price.json';

const maps = {
    site,
    description,
    model,
    elevation,
    option,
};

export default function mapOptionValues(invoiceItem) {
    let mapped = '';
    for (let [key, value] of Object.entries(invoiceItem)) {
        mapped += maps[key][value];
    }
    return price[mapped.toString()];
}
