import React from 'react';

import { Tkinter_Window, Tkinter_Button } from './Elements';

function ElementPanel({ onAddElement }) {
    return (
        <div className="panel">
            <h3>Elementos</h3>
            <div className='d-flex flex-column gap-2'>
                <button onClick={() => onAddElement(Tkinter_Window)}>{Tkinter_Window.name}</button>
                <button onClick={() => onAddElement(Tkinter_Button)}>{Tkinter_Button.name}</button>
            </div>
        </div>
    );
}

export default ElementPanel;