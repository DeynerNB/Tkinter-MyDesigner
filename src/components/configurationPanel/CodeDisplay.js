// src/components/ConfigPanel.js
import React from 'react';
import "./styles.css"

function CodeDisplay({ codeDisplayDialog }) {

    return (
        <div className='code-display-container d-flex justify-content-center align-items-center'>
            <div className='code-display w-50 p-3 bg-light position-relative'>
                <div className='code-display-icon-container'>
                    <span className="material-symbols-outlined icon-close" onClick={() => codeDisplayDialog( false )}>close</span>
                </div>
                <p className='text-center fs-3'>Código:</p>
                <textarea className='w-100' style={{ resize: 'none', minHeight: "300px" }}></textarea>
            </div>
        </div>
    );
}

export default CodeDisplay;
