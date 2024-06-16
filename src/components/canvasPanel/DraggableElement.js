// src/components/DraggableElement.js
import React, { useState, useEffect } from 'react';
import "./DraggableStyle.css"

function DraggableElement({ element, isSelected, onElementMoveConfig, zoomFactor, boardOrigin }) {

    // Set the origin position for the elements
    const [ origin, setOrigin ] = useState( boardOrigin );

    // Set the relative position of the grabbing point of an element
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    // Controls the position of the element
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // Controls when the object is been drag
    const [dragging, setDragging] = useState(false);

    // Calculate the position of the element
    const calculateElementPosition = (e) => {
        const canvas_board = document.getElementById("canvas-board");
        const board_element = canvas_board.getBoundingClientRect()

        const boardX = Math.floor(board_element.x - origin.x);
        const boardY = Math.floor(board_element.y - origin.y);

        const positionX = (e.clientX - origin.x - offset.x - boardX) / zoomFactor;
        const positionY = (e.clientY - origin.y - offset.y - boardY) / zoomFactor;

        return { x: positionX, y: positionY }
    }

    // Calculate the initial offset
    const handleDragStart = (e) => {
        setDragging(true)
        const rect = e.target.getBoundingClientRect();
        setOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    // Update the position when dragging
    const handleDrag = (e) => {
        if (!isSelected || !dragging) {
            return;
        }
        // Calculate the new position relative to the grab point
        const new_position = calculateElementPosition( e )

        if (new_position.x < 0 || new_position.y < 0) {
            e.preventDefault();
            return;
        }

        setPosition( new_position )
        e.preventDefault();
    };

    // Update the element new position
    const handleDragEnd  = (e) => {
        // If the element is not selected := Cannot be drag
        if (!isSelected || !dragging) {
            return;
        }
        setDragging(false)

        // Set the element position configuration
        const new_config = {
            ...element.config,
            "posX": { value: Number( position.x ), type: "number" },
            "posY": { value: Number( position.y ), type: "number" },
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
            textAlign: "center",
            transformOrigin: "0 0"
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
