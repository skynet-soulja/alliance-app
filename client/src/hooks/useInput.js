import { useState } from 'react';
import config from '../config.json';

export default function useInput() {
    const [input, setInput] = useState(initState());

    function handleInput(event, complexValue, clear = false) {
        if (complexValue) {
            setInput({
                ...input,
                [event.target.name]: complexValue,
            });
        } else {
            setInput({ ...input, [event.target.name]: event.target.value });
        }
    }

    return [input, handleInput];
}

function initState() {
    const stateObj = {};
    for (let component of config.components) {
        stateObj[component.attributes.name] = component.init;
    }
    return stateObj;
}
