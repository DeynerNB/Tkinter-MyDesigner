import React, { useState, useEffect } from 'react';
import DraggableElement from './DraggableElement';
import "./Canvas.css"

function DynamicCanvas({ elements, setSelectElementKey, onElementMoveConfig, selectedElementKey }) {

    // Set the origin position of the canvas
    const [ origin, setOrigin ] = useState({ x: 0, y: 0 });

    // Controls the position of the board
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // Controls when the board is being drag
    const [dragging, setDragging] = useState(false);

    // Controls when the board is being drag
    const [allowToDrag, setAllowToDrag] = useState(false);

    // Set the relative position from the point of grabbing of the board
    const [rel, setRel] = useState({ x: 0, y: 0 });

    // Set the initial scroll position
    const [initialScroll, setInitialScroll] = useState( null );

    // Set the initial scroll position
    const [scaleValue, setScaleValue] = useState( 1 );

    const calculateOrigin = () => {
        const canvas_camera = document.getElementById("canvas-camera");
        const canvas_element = canvas_camera.getBoundingClientRect()

        setOrigin({
            x: canvas_element.x,
            y: canvas_element.y
        })
    }

    useEffect(() => { calculateOrigin() }, [])

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

        if (initialScroll == null) {
            setInitialScroll( window.scrollY )
        }
    };

    const onDraggingBoard = (e) => {
        if (dragging && allowToDrag) {
            const relScroll = initialScroll - window.scrollY;
            const posX = e.clientX - origin.x - rel.x;
            const posY = e.clientY - origin.y - rel.y - relScroll;

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
        setScaleValue( scaleValue + 0.1 )
    }
    const zoomOut = () => {
        setScaleValue( scaleValue - 0.1 )
    }

    const generateElements = () => {
        return Object.entries(elements).map(([key, value], index) => (
            <div key={key} onMouseDown={(e) => { e.stopPropagation(); setSelectElementKey( key ); }}>
                <DraggableElement
                    element={value}
                    isSelected={key === selectedElementKey}
                    onElementMoveConfig={onElementMoveConfig}
                    zoomFactor={scaleValue}
                    boardOrigin={origin} />
            </div>
        ))
    }

    return (
        <div className='position-relative w-100 h-100 overflow-hidden' id='canvas-camera'
            onMouseMove={onDraggingBoard}
            onMouseUp={onFreeingBoard}
            onMouseLeave={onFreeingBoard}
        >
            <div
                className='position-absolute draggable-canvas'
                id='canvas-board'
                style={{
                    width: "2000px",
                    height: "2000px",
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
            <div className='position-absolute d-flex gap-1' id='board-controls-container'>
                <button className='board-control' onClick={() => setAllowToDrag( !allowToDrag )} >M</button>
                <button className='board-control' onClick={zoomIn} >+</button>
                <button className='board-control' onClick={zoomOut} >-</button>
            </div>
        </div>
    );
}

export default DynamicCanvas;