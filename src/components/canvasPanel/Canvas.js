import React, { useState } from 'react';
import DraggableElement from './DraggableElement';
import "./Canvas.css"

function Canvas({ elements, setSelectElementKey, onElementMoveConfig, selectedElementKey }) {

    const [ mouseRelativePosition, setMouseRelativePosition ] = useState({ x: 0, y: 0 });

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [rel, setRel] = useState({ x: 0, y: 0 });

    const element_panel = document.getElementById("element-panel")
    const header_panel = document.getElementById("header-container")

    const onMouseDown = (e) => {
        // Solo inicializa el arrastre si hace clic en el div correcto
        if (e.target.className.includes('draggable-canvas')) {
            setDragging(true);
            // Calcula la posición relativa del ratón dentro del div
            const rect = e.target.getBoundingClientRect();
            setRel({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
            e.preventDefault();
        }
    };

    const onMouseMove = (e) => {
        if (dragging) {
            const posX = e.clientX - element_panel.offsetWidth - rel.x;
            const posY = e.clientY - rel.y;

            setPosition({
                x: posX,
                y: posY
            });
            e.preventDefault();
        }
    };

    const onMouseUp = (e) => {
        setDragging(false);
        e.preventDefault();
    };

    const generateElements = () => {
        return Object.entries(elements).map(([key, value], index) => (
            <div key={key} onClick={(e) => { setSelectElementKey( key ); }}>
                <DraggableElement
                    element={value}
                    isSelected={key === selectedElementKey}
                    onElementMoveConfig={onElementMoveConfig} />
            </div>
        ))
    }

    // return (
    //     <div className="position-relative w-100 h-100" onClick={ () => setSelectElementKey( null ) }>
    //         { generateElements() }
    //     </div>
    // );
    return (
        <div className="position-relative w-100 h-100 overflow-hidden"
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
        >
            <div className='draggable-canvas position-absolute'
                style={{ left: position.x, top: position.y }}
                onMouseDown={onMouseDown}
            >
                <div className="position-relative w-100 h-100" >
                    { generateElements() }
                </div>
            </div>
        </div>
    );
}

export default Canvas;