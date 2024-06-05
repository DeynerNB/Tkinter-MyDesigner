// src/components/DraggableElement.js
import React, { useState } from 'react';
import "./DraggableStyle.css"

function DraggableElement({ element, isSelected, onElementMoveConfig }) {
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const element_panel = document.getElementById("element-panel")
    const canvas_panel = document.getElementById("canvas-panel")

    const handleDrag = (e) => {
        e.preventDefault();
    };

    // Calculate the initial offset
    const handleDragStart = (e) => {
        const rect = e.target.getBoundingClientRect();
        setOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const calculateElementPosition = (e) => {
        const offset_element = 20 + 5;
        const leftUp_corner_pos  = e.clientX - element_panel.offsetWidth - offset.x;
        const rightUp_corner_pos = leftUp_corner_pos + element.config.width + offset_element

        console.log(element.config)
        console.log(rightUp_corner_pos)

        let positionX = 0;
        if (leftUp_corner_pos <= 0) { positionX = 0; }
        else if (rightUp_corner_pos >= canvas_panel.offsetWidth) { positionX = canvas_panel.offsetWidth - element.config.width - offset_element }
        else { positionX = leftUp_corner_pos }

        // const positionX = (temp_posX <= 0) ? 0 : temp_posX;
        const positionY = e.clientY - offset.y

        return { positionX, positionY }
    }

    // Update the element new position
    const handleDragEnd  = (e) => {
        // If the element is not selected := Cannot be drag
        if (!isSelected) {
            return;
        }
        // Calculate the new position relative to the grab point
        const temp_posX = e.clientX - element_panel.offsetWidth - offset.x;
        const { positionX, positionY } = calculateElementPosition( e )

        // const positionX = (temp_posX <= 0) ? 0 : temp_posX;
        // const positionY = e.clientY - offset.y

        // Set the element position configuration
        const new_config = {
            ...element.config,
            "posX": Number( positionX.toFixed(2) ),
            "posY": Number( positionY.toFixed(2) ),
        }

        // Update the element configuration
        onElementMoveConfig( new_config )
    };

    return (
        <div
            className={`draggable-${element.name} text-center text-nowrap ${ isSelected ? "selected_element" : "" }`}
            style={{
                left: Number(element.config.posX),
                top: Number(element.config.posY),
                position: 'absolute',
                width: `${element.config.width}px`,
                height: `${element.config.height}px` }}
            draggable
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
        >
            { element.config.textContent || element.name }
        </div>
    );
}

export default DraggableElement;
