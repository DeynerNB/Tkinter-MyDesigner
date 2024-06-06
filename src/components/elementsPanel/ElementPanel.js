import React from 'react';

import { Tkinter_Window, Tkinter_Button, TKinter_Entry, TKinter_Text } from './Elements';
import "./ElementPanel.css"

function ElementPanel({ onAddElement }) {
    return (
        <>
            <div className="panel">
                <h3>Elementos</h3>
                <div className='d-flex flex-column gap-2'>
                    <span className='w-100 text-center span_button' onClick={() => onAddElement(Tkinter_Window)}>{Tkinter_Window.name}</span>
                    <span className='w-100 text-center span_button' onClick={() => onAddElement(Tkinter_Button)}>{Tkinter_Button.name}</span>
                    <span className='w-100 text-center span_button' onClick={() => onAddElement(TKinter_Entry)}>{TKinter_Entry.name}</span>
                    <span className='w-100 text-center span_button' onClick={() => onAddElement(TKinter_Text)}>{TKinter_Text.name}</span>
                </div>
            </div>
            <div>
                <p>Para información más detallada en Tkinter, puede consultar la <a href='https://docs.python.org/es/3/library/tkinter.html' target='_blank'>documentación de Tkinter</a> </p>
            </div>
        </>
    );
}

export default ElementPanel;