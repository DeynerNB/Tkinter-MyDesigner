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

    const addElement = (new_element) => {
        let count = 0
        Object.keys( elements ).forEach( key => {
            count += key.includes( new_element.name ) ? 1 : 0;
        });

        const element_id = `${new_element.name}_${count}`
        const updatedElements = {
            ...elements,
            [element_id]: new_element
        }

        setElements(updatedElements);
    };

    const selectElement = (element_key) => {
        setSelectedElementKey(element_key);
    };

    const updateConfig = (newConfig) => {
        const updatedElements = {
            ...elements,
            [selectedElementKey]: { ...elements[selectedElementKey], config: newConfig }
        }

        setElements(updatedElements);
    };

    const codeDisplayDialog = (value) => {
        setShowCodeDisplay( value )
    }

    return (
        <div className="container-fluid vh-100">
            <div className='row h-100'>
                <div className='col pt-2 panel-tkinter ' id='element-panel'>
                    <ElementPanel onAddElement={addElement} />
                </div>
                <div className='col-8 panel-tkinter'>
                    <Canvas elements={elements} setSelectElementKey={selectElement} onElementMoveConfig={updateConfig} selectedElementKey={selectedElementKey}/>
                </div>
                <div className='col pt-2 panel-tkinter '>
                    <ConfigPanel element={ elements[ selectedElementKey ] } onUpdateConfig={updateConfig} codeDisplayDialog={codeDisplayDialog} />
                </div>
            </div>

            {
                showCodeDisplay
                &&
                <CodeDisplay
                    codeDisplayDialog={codeDisplayDialog}
                    elements={elements}
                />
            }
        </div>
    );
}

export default App;
