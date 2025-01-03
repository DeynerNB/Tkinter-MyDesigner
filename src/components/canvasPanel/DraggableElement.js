// src/components/DraggableElement.js
import React, { useState, useEffect } from 'react';
import "./DraggableStyle.css"

import PropTypes from "prop-types"

function DraggableElement({ element, isSelected, onElementMoveConfig, zoomFactor, boardOrigin, initialPosition }) {

    // Z-Index when dragging
    const [ zIndex_value, setZIndex_value ] = useState( 200 )

    // Set the relative position of the grabbing point of an element
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    // Controls the position of the element
    const [position, setPosition] = useState(initialPosition);

    // Controls when the object is been drag
    const [dragging, setDragging] = useState(false);

    // Keep track of the initial grap point (avoid minimun movement of the element)
    const [startGrapPoint, setStartGrapPoint] = useState(null);

    // Threshold of how much a drag must be made
    const dragThreshold = 5;

    useEffect(() => {

        const handleMouseMove = (e) => {
            if (dragging && isSelected) {
                handleDrag(e);
            }
        };
        document.addEventListener("mousemove", handleMouseMove);

        // Limpiar los eventos al desmontar el componente
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };

    }, [dragging, isSelected])

    // Calculate the position of the element
    const calculateElementPosition = (e) => {
        const canvas_board = document.getElementById("canvas-board");
        const board_element = canvas_board.getBoundingClientRect()

        const boardX = Math.floor(board_element.x - boardOrigin.x);
        const boardY = Math.floor(board_element.y - boardOrigin.y);

        const positionX = (e.clientX - boardOrigin.x - offset.x - boardX) / zoomFactor;
        const positionY = (e.clientY - boardOrigin.y - offset.y - boardY) / zoomFactor;

        return { x: positionX.toFixed(2), y: positionY.toFixed(2) }
    }

    // Calculate the initial offset
    const handleDragStart = (e) => {
        if (!isSelected) return;

        setDragging(true);
        setZIndex_value( 300 );

        const rect = e.target.getBoundingClientRect();
        setOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });

        setStartGrapPoint({ x: e.clientX, y: e.clientY})
    };

    // Update the position when dragging
    const handleDrag = (e) => {
        if (!isSelected || !dragging) {
            return;
        }

        // Minimum drag distance must be made in order start the element dragging
        const drag_distance = Math.sqrt(
            Math.pow(e.clientX - startGrapPoint.x, 2) +
            Math.pow(e.clientY - startGrapPoint.y, 2)
        )
        if (drag_distance <= dragThreshold) {
            return
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
    const handleDragEnd  = () => {
        // If the element is not selected := Cannot be drag
        if (!isSelected || !dragging) {
            return;
        }
        setDragging(false)
        setZIndex_value( 200 );

        // Set the element position configuration
        const new_config = {
            ...element.config,
            "posX": { value: position.x, type: "number" },
            "posY": { value: position.y, type: "number" },
        }
        // Update the element configuration
        onElementMoveConfig( new_config )
    };

    // Set the element style
    const setElementStyle = (config) => {
        // Default element style
        let style = {
            position: 'absolute',
            left: Number(position.x),
            top: Number(position.y),
            zIndex: `${element.name === "Window" ? 100 : zIndex_value}`,
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
            className={`default-element draggable-${element.name} text-nowrap ${ isSelected ? "selected_element" : "" }`}
            style={ setElementStyle( element.config ) }
            onMouseDown={handleDragStart}
            // onMouseMove={handleDrag}
            onMouseUp={handleDragEnd}
        >
            { (element.name === "Window") ? "" : element.config.textContent?.value || element.name }
        </div>
    );
}

DraggableElement.propTypes = {
    element: PropTypes.object,
    isSelected: PropTypes.bool,
    onElementMoveConfig: PropTypes.func,
    zoomFactor: PropTypes.number,
    boardOrigin: PropTypes.object,
    initialPosition: PropTypes.object,
}

export default DraggableElement;
