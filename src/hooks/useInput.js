import { useState } from 'react';
import config from '../config.json';

export default function useInput() {
    const [input, setInput] = useState(initState());

    function handleComponent(event, complexValue) {
        const { name, value } = event.target;
        if (complexValue) {
            setInput({
                ...input,
                [name]: complexValue,
            });
        } else {
            setInput({ ...input, [name]: value });
        }
    }

    return [input, handleComponent];
}

function initState() {
    const stateObj = {};
    for (let component of config.components) {
        stateObj[component.attributes.name] = component.init;
    }
    return stateObj;
}
