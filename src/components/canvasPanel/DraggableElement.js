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

        const elem_width = (element.config.width) ? element.config.width.value : e.target.offsetWidth;

        // Calculate the element corners positions
        const leftUp_corner_pos  = e.clientX - element_panel.offsetWidth - offset.x;
        const rightUp_corner_pos = leftUp_corner_pos + elem_width + margin_element

        let positionX = 0;
        const positionY = e.clientY - offset.y

        // Element has left the bounds on the left
        if (leftUp_corner_pos <= 0) {
            positionX = 0;
        }
        // Element has left the bounds on the right
        else if (rightUp_corner_pos >= canvas_panel.offsetWidth) {
            positionX = canvas_panel.offsetWidth - elem_width - margin_element
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

    // Set the element style
    const setElementStyle = (config) => {
        // Default element style
        let style = {
            position: 'absolute',
            left: Number(config.posX.value),
            top: Number(config.posY.value),
            zIndex: `${element.name === "Window" ? 100 : 200}`,
            textAlign: "center"
        }
        if (config.width) {
            style.width = `${config.width.value}px`;
        }
        if (config.height) {
            style.height = `${config.height.value}px`;
        }
        if (config.background) {
            style.backgroundColor = `${config.background.value}`;
        }
        if (config.foreground) {
            style.color = `${config.foreground.value}`;
        }
        if (config.justify) {
            style.textAlign = `${config.justify.value}`;
        }

        return style
    }

    return (
        <div
            className={`draggable-${element.name} text-nowrap ${ isSelected ? "selected_element" : "" }`}
            style={ setElementStyle( element.config ) }
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
