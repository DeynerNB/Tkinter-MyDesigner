// src/components/DraggableElement.js
import React, { useState } from 'react';
import "./DraggableStyle.css"

function DraggableElement({ element, isSelected, onElementMoveConfig }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const element_panel = document.getElementById("element-panel")

    const handleDragStart = (e) => {
        const rect = e.target.getBoundingClientRect();
        setOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const handleDrag = (e) => {
        e.preventDefault();
    };

    const handleDragEnd  = (e) => {
        if (!isSelected) {
            return;
        }

        const positionX = (e.clientX - element_panel.offsetWidth <= 0) ? 0 : e.clientX - element_panel.offsetWidth - offset.x;
        const positionY = e.clientY - offset.y

        element.config.posX = positionX.toFixed(2)
        element.config.posY = positionY.toFixed(2)

        onElementMoveConfig( element.config )

        setPosition({
            x: positionX,
            y: positionY
        });
    };

    return (
        <div
            className={`draggable-${element.name} text-center text-nowrap overflow-hidden`}
            style={{ left: position.x, top: position.y, position: 'absolute', width: `${element.config.width}px`, height: `${element.config.height}px` }}
            draggable
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
        >
            {
                element.config.textContent || element.name
            }
        </div>
    );
}

export default DraggableElement;
