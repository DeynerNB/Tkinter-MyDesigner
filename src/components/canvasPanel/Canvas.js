import React from 'react';
import DraggableElement from './DraggableElement';

function Canvas({ elements, onSelectElement, onElementMoveConfig, selectedElementIndex }) {
    return (
        <div className="position-relative w-100 h-100">
            {elements.map((element, index) => (
                <div key={index} onClick={() => onSelectElement( index )}>
                    <DraggableElement
                        element={element.type}
                        isSelected={selectedElementIndex === index}
                        onElementMoveConfig={onElementMoveConfig} />
                </div>
            ))}
        </div>
    );
}

export default Canvas;