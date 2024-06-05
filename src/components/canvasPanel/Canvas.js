import React from 'react';
import DraggableElement from './DraggableElement';

function Canvas({ elements, setSelectElementKey, onElementMoveConfig, selectedElementKey }) {

    const generateElements = () => {

        return Object.entries(elements).map(([key, value], index) => (
            <div key={key} onClick={() => setSelectElementKey( key )}>
                <DraggableElement
                    element={value}
                    isSelected={key === selectedElementKey}
                    onElementMoveConfig={onElementMoveConfig} />
            </div>
        ))
    }

    return (
        <div className="position-relative w-100 h-100">
            { generateElements() }
        </div>
    );
}

export default Canvas;