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
    return Object.fromEntries(config.components.map((input) => [input.attributes.name, input.init]));
}
