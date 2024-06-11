// src/components/DraggableElement.js
import React, { useState } from 'react';
import "./DraggableStyle.css"

function DraggableElement({ element, isSelected, onElementMoveConfig }) {
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const element_panel = document.getElementById("element-panel")
    const canvas_panel = document.getElementById("canvas-panel")
    const header_panel = document.getElementById("header-container")

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
        const positionX = e.clientX - element_panel.offsetWidth - offset.x;
        const positionY = e.clientY - offset.y;

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
        if (config.fontSize) {
            style.fontSize = `${config.fontSize.value}px`;
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
