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

    // Calculate the position of the element
    const calculateElementPosition = (e) => {
        const margin_element = 20 + 5;

        // Calculate the element corners positions
        const leftUp_corner_pos  = e.clientX - element_panel.offsetWidth - offset.x;
        const rightUp_corner_pos = leftUp_corner_pos + element.config.width.value + margin_element

        let positionX = 0;
        const positionY = e.clientY - offset.y

        // Element has left the bounds on the left
        if (leftUp_corner_pos <= 0) {
            positionX = 0;
        }
        // Element has left the bounds on the right
        else if (rightUp_corner_pos >= canvas_panel.offsetWidth) {
            positionX = canvas_panel.offsetWidth - element.config.width.value - margin_element
        }
        // Element is within bounds
        else {
            positionX = leftUp_corner_pos
        }

        return { positionX, positionY }
    }

    // Update the element new position
    const handleDragEnd  = (e) => {
        // If the element is not selected := Cannot be drag
        if (!isSelected) {
            return;
        }
        // Calculate the new position relative to the grab point
        const { positionX, positionY } = calculateElementPosition( e )

        // Set the element position configuration
        const new_config = {
            ...element.config,
            "posX": { value: Number( positionX.toFixed(2) ), type: "number" },
            "posY": { value: Number( positionY.toFixed(2) ), type: "number" },
        }

        // Update the element configuration
        onElementMoveConfig( new_config )
    };

    return (
        <div
            className={`draggable-${element.name} text-nowrap ${ isSelected ? "selected_element" : "" }`}
            style={{
                left: Number(element.config.posX.value),
                top: Number(element.config.posY.value),
                position: 'absolute',
                width: `${element.config.width.value}px`,
                height: `${element.config.height.value}px`,
                zIndex: `${element.name === "Window" ? 100 : 200}`,
                backgroundColor: `${element.config.background?.value || "#FFFFFF"}`,
                color: `${element.config.foreground?.value || "#000000"}`,
                textAlign: `${element.config.justify?.value || "center"}`,
            }}
            draggable
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
        >
            { element.config.textContent?.value || element.name }
        </div>
    );
}

export default DraggableElement;
