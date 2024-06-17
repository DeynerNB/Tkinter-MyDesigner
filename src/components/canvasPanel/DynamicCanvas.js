import React, { useState, useEffect, useRef } from 'react';
import DraggableElement from './DraggableElement';
import "./Canvas.css"

import PropTypes from "prop-types"

function DynamicCanvas({ elements, setSelectElementKey, onElementMoveConfig, selectedElementKey }) {

    // Set the origin position of the canvas
    const [ origin, setOrigin ] = useState({ x: 0, y: 0 });

    // Controls the position of the board
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // Controls when the board is being drag
    const [dragging, setDragging] = useState(false);

    // Set the relative position from the point of grabbing of the board
    const [rel, setRel] = useState({ x: 0, y: 0 });

    // Set the initial scroll position
    const [scaleValue, setScaleValue] = useState( 1 );

    const boardRef = useRef(null)
    const cameraRef = useRef(null)

    const header_element = document.getElementById("header-container");

    const calculateOrigin = () => {
        const canvas_element = cameraRef.current.getBoundingClientRect()

        setOrigin({
            x: canvas_element.x,
            y: canvas_element.y
        })
    }

    useEffect(() => {
        calculateOrigin();

        const boardCenter_X = boardRef.current.offsetWidth / 2;
        const boardCenter_Y = boardRef.current.offsetHeight / 2;

        const cameraCenter_X = cameraRef.current.offsetWidth / 2;
        const cameraCenter_Y = cameraRef.current.offsetHeight / 2;

        setPosition({
            x: -(boardCenter_X - cameraCenter_X),
            y: -(boardCenter_Y - cameraCenter_Y)
        })

    }, [])

    const onSelectingBoard = (e) => {
        if (e.target.id.includes('canvas-board')) {
            setDragging(true);
            const rect = e.target.getBoundingClientRect();

            setRel({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
            e.preventDefault();
        }
    };

    const onDraggingBoard = (e) => {
        if (dragging) {
            const posX = e.clientX - origin.x - rel.x;
            const posY = e.clientY - Math.abs(header_element.offsetHeight - window.scrollY) - rel.y;

            setPosition({
                x: posX,
                y: posY
            });
            e.preventDefault();
        }
    };

    const onFreeingBoard = (e) => {
        setDragging(false);
        e.preventDefault();
    };

    const zoomIn = () => {
        const value = scaleValue + 0.1;
        if (value >= 1.5) {
            return;
        }
        setScaleValue( scaleValue + 0.1 )
    }
    const zoomOut = () => {
        const value = scaleValue - 0.1;
        if (value <= 0.5) {
            return;
        }
        setScaleValue( value )
    }
    const reset = () => {
        setPosition({ x: 0, y: 0 })
    }

    const setElementPosition = () => {
        const board_element = boardRef.current.getBoundingClientRect()

        let delta_x = 0;
        let delta_y = 0;

        if (board_element.x < origin.x) {
            delta_x = ( board_element.x >= 0 ) ? Math.abs(origin.x - board_element.x) : origin.x + (-1 * board_element.x)
        }
        if (board_element.y < origin.y) {
            delta_y = Math.abs( board_element.y ) + (header_element.offsetHeight - window.scrollY)
        }

        const result = { x: Math.floor( delta_x / scaleValue ), y: Math.floor( delta_y / scaleValue ) }
        return result
    }

    const generateElements = () => {
        return Object.entries(elements).map(([key, value]) => (
            <div key={key} onMouseDown={(e) => { e.stopPropagation(); setSelectElementKey( key ); }}>
                <DraggableElement
                    element={value}
                    isSelected={key === selectedElementKey}
                    onElementMoveConfig={onElementMoveConfig}
                    zoomFactor={scaleValue}
                    boardOrigin={origin}
                    initialPosition={setElementPosition()} />
            </div>
        ))
    }

    return (
        <div className='position-relative w-100 h-100 overflow-hidden'
            id='canvas-camera'
            ref={cameraRef}
            onMouseMove={onDraggingBoard}
            onMouseUp={onFreeingBoard}
            onMouseLeave={onFreeingBoard}
        >
            <div
                className='position-absolute draggable-canvas'
                id='canvas-board'
                ref={boardRef}
                style={{
                    top: position.y,
                    left: position.x,
                    transform: `scale(${scaleValue})`,
                    transformOrigin: "0 0"
                }}
                onMouseDown={onSelectingBoard}
            >
                { generateElements() }
            </div>

            {/* Board controls */}
            <div className='position-absolute d-flex flex-row-reverse gap-2' id='board-controls-container'>
                <button className='board-control' onClick={zoomIn} >+</button>
                <button className='board-control' onClick={zoomOut} >-</button>
                <button className='board-control' onClick={reset} >Reset</button>
            </div>
        </div>
    );
}

DynamicCanvas.propTypes = {
    elements: PropTypes.object,
    setSelectElementKey: PropTypes.func,
    onElementMoveConfig: PropTypes.func,
    selectedElementKey: PropTypes.string
}

export default DynamicCanvas;