import React, { useState } from 'react';
import ElementPanel from './components/elementsPanel/ElementPanel';
import Canvas from './components/canvasPanel/Canvas';
import ConfigPanel from './components/configurationPanel/ConfigPanel';
import CodeDisplay from './components/configurationPanel/CodeDisplay';
import './App.css';

function App() {
    const [elements, setElements] = useState([]);
    const [selectedElement, setSelectedElement] = useState(null);
    const [showCodeDisplay, setShowCodeDisplay] = useState(false);

    const addElement = (type) => {
        let count = elements.filter( (elem) => elem.type.name == type.name ).length
        setElements([...elements, { type: { ...type, ID: `${type.name}_${count}` } }]);
    };

    const selectElement = (index) => {
        setSelectedElement(index);
    };

    const updateConfig = (newConfig) => {
        const updatedElements = elements.map((element, index) =>
            index === selectedElement ? { type: { ...element.type, config: newConfig } } : element
        );
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
                    <Canvas elements={elements} onSelectElement={selectElement} onElementMoveConfig={updateConfig} selectedElementIndex={selectedElement}/>
                </div>
                <div className='col pt-2 panel-tkinter '>
                    <ConfigPanel element={elements[selectedElement]} onUpdateConfig={updateConfig} codeDisplayDialog={codeDisplayDialog} />
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
