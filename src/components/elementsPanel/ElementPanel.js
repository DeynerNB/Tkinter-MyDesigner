import React from 'react';

import { Tkinter_Window, Tkinter_Button, TKinter_Entry, TKinter_Text, Tkinter_Label, Tkinter_ComboBox } from './Elements';
import "./ElementPanel.css"

function ElementPanel({ onAddElement }) {
    return (
        <>
            <div>
                <h3 className='element-panel-title'>Elementos</h3>
                <div className='d-flex flex-column gap-2'>
                    <span className='w-100 px-1 d-flex justify-content-between span_button' onClick={() => onAddElement(Tkinter_Window)}>{Tkinter_Window.name} <span>+</span> </span>
                    <span className='w-100 px-1 d-flex justify-content-between span_button' onClick={() => onAddElement(Tkinter_Button)}>{Tkinter_Button.name} <span>+</span> </span>
                    <span className='w-100 px-1 d-flex justify-content-between span_button' onClick={() => onAddElement(TKinter_Entry)}>{TKinter_Entry.name} <span>+</span> </span>
                    <span className='w-100 px-1 d-flex justify-content-between span_button' onClick={() => onAddElement(TKinter_Text)}>{TKinter_Text.name} <span>+</span> </span>
                    <span className='w-100 px-1 d-flex justify-content-between span_button' onClick={() => onAddElement(Tkinter_Label)}>{Tkinter_Label.name} <span>+</span> </span>
                    <span className='w-100 px-1 d-flex justify-content-between span_button' onClick={() => onAddElement(Tkinter_ComboBox)}>{Tkinter_ComboBox.name} <span>+</span> </span>
                </div>
            </div>
            <div>
                <p>Para información más detallada en Tkinter, puede consultar la <a href='https://docs.python.org/es/3/library/tkinter.html' className='documentation-link' target='_blank' rel="noopener noreferrer">documentación de Tkinter</a> </p>
            </div>
        </>
    );
}

export default ElementPanel;