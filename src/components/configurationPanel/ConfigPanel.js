// src/components/ConfigPanel.js
import React, { useState, useEffect } from 'react';

function ConfigPanel({ element, onUpdateConfig, codeDisplayDialog }) {
    const [config, setConfig] = useState(element ? element.config : {});

    useEffect(() => {
        if (element) {
            setConfig(element.config);
        }
    }, [element]);

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const newConfig = { ...config, [name]: value }

        setConfig(newConfig)
        onUpdateConfig(newConfig);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const new_config = {
            ...config,
            [name]: value
        }
        setConfig( new_config );
    };

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

    if (!element) {
        return <div className="panel">Selecciona un elemento</div>;
    }

    return (
        <div className='d-flex flex-column h-100 justify-content-between'>
            <div>
                <h3>Configuración de {element.name}</h3>
                <div>
                    {
                        Object.keys(config).map((key, index) => displayInput(key, index))
                    }
                </div>
            </div>
            <div>
                <button className='w-100' onClick={() => codeDisplayDialog(true)}>Generar código</button>
            </div>
        </div>
    );
}

export default ConfigPanel;
