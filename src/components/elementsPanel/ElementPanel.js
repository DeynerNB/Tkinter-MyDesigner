import React from 'react';

import { Tkinter_Window, Tkinter_Button } from './Elements';
import "./ElementPanel.css"

function ElementPanel({ onAddElement }) {
    return (
        <div className="panel">
            <h3>Elementos</h3>
            <div className='d-flex flex-column gap-2'>
                <span className='w-100 text-center span_button' onClick={() => onAddElement(Tkinter_Window)}>{Tkinter_Window.name}</span>
                <span className='w-100 text-center span_button' onClick={() => onAddElement(Tkinter_Button)}>{Tkinter_Button.name}</span>
            </div>
        </div>
    );
}

export default ElementPanel;