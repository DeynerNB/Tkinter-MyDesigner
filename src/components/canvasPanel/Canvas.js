import React from 'react';
import DraggableElement from './DraggableElement';

function Canvas({ elements, onSelectElement, onElementMoveConfig }) {
    return (
        <div className="position-relative w-100 h-100">
            {elements.map((element, index) => (
                <div key={index} onClick={() => onSelectElement( index )}>
                    <DraggableElement element={element.type} onElementMoveConfig={onElementMoveConfig} />
                </div>
            ))}
        </div>
    );
}

export default Canvas;