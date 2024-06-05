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

    // Update the config when the input is not on focus
    const handleBlur = (e) => {
        const { name, value } = e.target;

        const newValue = isNaN( Number(value) ) ? value : Number( value );
        const newConfig = { ...config, [name]: newValue }

        setConfig(newConfig)
        onUpdateConfig(newConfig);
    };

    // Update the input value based on the configuration
    const handleChange = (e) => {
        const { name, value } = e.target;

        const newValue = isNaN( Number(value) ) ? value : Number( value );
        const new_config = {
            ...config,
            [name]: newValue
        }
        setConfig( new_config );
    };

    // Return the corresponding input element
    const displayInput = (attribute, index) => {
        return (
            <label key={index}>
                {attribute.charAt(0).toUpperCase() + attribute.slice(1)}
                <input
                    name={attribute}
                    value={`${config[attribute]}` || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </label>
        )
    }

    // If there is no element selected := Display a default message
    // if (!element) {
    //     return <div className="panel d-flex h-100 justify-content-center align-items-center text-center">Selecciona un elemento</div>;
    // }

    return (
        <div className='d-flex flex-column h-100 justify-content-between'>
            {
                (element) ?
                (
                    <div>
                        <h3>Configuración de {element.name}</h3>
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
