// src/components/ConfigPanel.js
import React, { useState, useEffect } from 'react';

import PropTypes from "prop-types"

function ConfigPanel({ element, onUpdateConfig, codeDisplayDialog, deleteSelectedElement }) {
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
                <label key={index} className='configuration-input-label w-100'>
                    {attribute.charAt(0).toUpperCase() + attribute.slice(1)}
                    <select
                        className='w-100'
                        id={`${attribute}-select`}
                        name={ attribute }
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
            <label key={index} className='configuration-input-label w-100'>
                {attribute.charAt(0).toUpperCase() + attribute.slice(1)}
                <input
                    type={ type }
                    className='configuration-input w-100 p-1'
                    name={ attribute }
                    value={`${value}` || ''}
                    onChange={ handleChange }
                />
                {
                    type === "textarea" &&
                    (
                        <>
                            <span className='d-block' style={{ fontSize: "14px" }}>Separe los elementos utilizando <b>,</b></span>
                            <span className='d-block' style={{ fontSize: "14px" }}>Ejemplo: Manzana, Uva, Fresa</span>
                        </>
                    )
                }
            </label>
        )
    }

    return (
        <div className='d-flex flex-column h-100 justify-content-between'>
            {
                (element) ?
                (
                    <div>
                        <h4 className='configuration-title'>Configuración de {element.name}</h4>
                        <div>
                            { Object.keys(config).map((key, index) => displayInput(key, index)) }
                        </div>
                    </div>
                )
                :
                ( <div className="d-flex h-100 justify-content-center align-items-center text-center configuration-title">Selecciona un elemento</div> )
            }
            <div>
                <button className='w-100 mb-2 py-1 btn btn-outline-danger' onClick={() => deleteSelectedElement()}>Eliminar elemento</button>
                <button className='w-100 mb-2 py-1 btn btn-outline-primary' onClick={() => codeDisplayDialog(true)}>Generar código</button>
            </div>
        </div>
    );
}

ConfigPanel.propTypes = {
    element: PropTypes.object,
    onUpdateConfig: PropTypes.func,
    codeDisplayDialog: PropTypes.func,
    deleteSelectedElement: PropTypes.func
}

export default ConfigPanel;
