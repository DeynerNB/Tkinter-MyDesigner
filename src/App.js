import React, { useState } from 'react';
import ElementPanel from './components/elementsPanel/ElementPanel';
import Canvas from './components/canvasPanel/Canvas';
import ConfigPanel from './components/configurationPanel/ConfigPanel';
import CodeDisplay from './components/configurationPanel/CodeDisplay';
import './App.css';

function App() {
    const [elements, setElements] = useState({});
    const [selectedElementKey, setSelectedElementKey] = useState(null);
    const [showCodeDisplay, setShowCodeDisplay] = useState(false);

    // Add a element to the elements object
    const addElement = (new_element) => {
        let count = 0
        Object.keys(elements).forEach(key => {
            count += key.includes(new_element.name) ? 1 : 0;
        });

        // Set the element id based on its name and the number of the same elements found
        const element_id = `${new_element.name}_${count}`
        const updatedElements = {
            ...elements,
            [element_id]: new_element
        }

        setElements(updatedElements);
    };

    // Set the selected element
    const selectElement = (element_key) => {
        setSelectedElementKey(element_key);
    };

    // Set the new configuration for the selected element
    const updateConfig = (newConfig) => {
        const updatedElements = {
            ...elements,
            [selectedElementKey]: { ...elements[selectedElementKey], config: newConfig }
        }

        setElements(updatedElements);
    };

    // Open the show code window
    const codeDisplayDialog = (value) => {
        setShowCodeDisplay(value)
    }

    const deleteSelectedElement = () => {
        if (selectedElementKey === null) {
            return;
        }

        // Clone the data object
        const cloneElements = { ...elements };

        // Delete the selected item
        delete cloneElements[selectedElementKey];

        // Get the type of the selected key
        const [ type ] = selectedElementKey.split('_');

        // Separate and filter the elements by type
        const { filteredElements, updatedElements } = Object.keys(cloneElements).reduce((acc, key) => {
            if (key.startsWith(type)) {
                acc.updatedElements.push(key);
            } else {
                acc.filteredElements[key] = cloneElements[key];
            }
            return acc;
        }, { filteredElements: {}, updatedElements: [] });

        // Sort and reassign keys for the selected type
        const sortedAndReassigned = updatedElements
            .sort((a, b) => parseInt(a.split('_')[1]) - parseInt(b.split('_')[1]))
            .reduce((acc, key, index) => {
                acc[`${type}_${index}`] = cloneElements[key];
                return acc;
            }, {});

        // Merge the updated data with the rest of the original data
        const newElements = { ...filteredElements, ...sortedAndReassigned };

        setSelectedElementKey( null )
        setElements( newElements )
    }

    return (
        <div className="container-fluid vh-100">
            <div className='row h-100'>
                <div className='col pt-2 panel-tkinter d-flex flex-column justify-content-between' id='element-panel' style={{ minWidth: "170px" }}>
                    <ElementPanel onAddElement={addElement} />
                </div>
                <div className='col-8 panel-tkinter' id='canvas-panel'>
                    <Canvas elements={elements} setSelectElementKey={selectElement} onElementMoveConfig={updateConfig} selectedElementKey={selectedElementKey} />
                </div>
                <div className='col pt-2 panel-tkinter ' style={{ minWidth: "170px" }}>
                    <ConfigPanel element={elements[selectedElementKey]} onUpdateConfig={updateConfig} codeDisplayDialog={codeDisplayDialog} deleteSelectedElement={deleteSelectedElement} />
                </div>
            </div>

            {
                showCodeDisplay
                &&
                <CodeDisplay
                    codeDisplayDialog={codeDisplayDialog}
                    elements={elements}
                    deactivateSelection={selectElement}
                />
            }
        </div>
    );
}

export default App;
