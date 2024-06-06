// src/components/ConfigPanel.js
import React, { useState, useEffect } from 'react';

function ConfigPanel({ element, onUpdateConfig, codeDisplayDialog }) {
    const [config, setConfig] = useState(element ? element.config : {});

    // Get the config object of the selected element
    useEffect(() => {
        if (element) {
            setConfig(element.config);
        }
    }, [element]);

    // Update the input value based on the configuration
    const handleChange = (e) => {
        const { name, value, type } = e.target;

        const newValue = (type === "number") ? Number( value ) : value;
        const new_config = {
            ...config,
            [name]: {
                ...config[name],
                value: newValue,
            }
        }
        setConfig( new_config );
        onUpdateConfig(new_config);
    };

    // Return the corresponding input element
    const displayInput = (attribute, index) => {
        const { value, type, possible_options } = config[attribute]

        if (type === "select") {
            return (
                <label key={index} style={{ width: "100%" }}>
                    {attribute.charAt(0).toUpperCase() + attribute.slice(1)}
                    <select
                        id={`${attribute}-select`}
                        name={ attribute }
                        style={{ width: "100%" }}
                        onChange={ handleChange }
                    >
                        {
                            possible_options.map((opt, subindex) => (
                                <option
                                    key={`option-${index}-${subindex}`}
                                    value={opt}
                                >{opt}</option>
                            ))
                        }
                    </select>
                </label>
            )
        }

        return (
            <label key={index} style={{ width: "100%" }}>
                {attribute.charAt(0).toUpperCase() + attribute.slice(1)}
                <input
                    type={ type }
                    style={{ width: "100%" }}
                    name={ attribute }
                    value={`${value}` || ''}
                    onChange={ handleChange }
                />
            </label>
        )
    }

    return (
        <div className='d-flex flex-column h-100 justify-content-between'>
            {
                (element) ?
                (
                    <div>
                        <h4>Configuración de {element.name}</h4>
                        <div>
                            { Object.keys(config).map((key, index) => displayInput(key, index)) }
                        </div>
                    </div>
                )
                :
                (
                    <div className="panel d-flex h-100 justify-content-center align-items-center text-center">Selecciona un elemento</div>
                )
            }
            <div>
                <button className='w-100 mb-2' onClick={() => codeDisplayDialog(true)}>Generar código</button>
            </div>
        </div>
    );
}

export default ConfigPanel;
