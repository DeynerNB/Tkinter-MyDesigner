import React, { useState, useEffect } from 'react';

import { generateImportLine, generateWindowCode, generateButtonCode, generateFinalCode } from "./CodeTemplate"
import "./CodeDisplayStyle.css"

function CodeDisplay({ codeDisplayDialog, elements, deactivateSelection }) {

    // Variable to store the resulted code
    const [resultCode, setResultCode] = useState("")

    // Variables to define the window position (The origin to place the rest of the elements)
    let originX = -1;
    let originY = -1;
    let hasWindow = false;

    // Variable to define what to import
    let importObject = new Set();

    // Generate the tkinter code
    const generateCode = () => {

        // Get the default import line
        let importLine = generateImportLine();
        let code = ''

        // Check if exists a window to be the first code
        Object.entries(elements).map(([key, value], index) => {
            const { name, config } = value;

            if (name === "Window") {
                originX = config.posX;
                originY = config.posY;
                hasWindow = true;
                code += generateWindowCode(config);
            }
        })

        if (!hasWindow) {
            setResultCode( "Debe generar al menos una Window para colocar los elementos" );
            return;
        }

        // Go throught all the elements generating its respective code
        Object.entries(elements).map(([key, value], index) => {
            const { name, config } = value;

            if (name === "Button") {
                importObject.add( "Button" )
                code += generateButtonCode(config, index, originX, originY);
            }
        })

        // Set the imports based on the elements generated
        for (const imp of importObject) {
            importLine += `, ${imp}`
        }

        // Set the last piece of code
        importLine += `\n\n`
        code += generateFinalCode()

        // Set the resulted code in the textarea
        setResultCode( importLine + code )
    }

    // Generate the code when display
    useEffect(() => {
        deactivateSelection( null );
        generateCode();
    });

    return (
        <div className='code-display-container d-flex justify-content-center align-items-center'>
            <div className='code-display w-50 p-3 bg-light position-relative'>
                <div className='code-display-icon-container'>
                    <span className="material-symbols-outlined icon-close" onClick={() => codeDisplayDialog( false )}>close</span>
                </div>
                <p className='text-center fs-3'>Código:</p>
                <textarea className='w-100' style={{ resize: 'none', minHeight: "300px", maxHeight: "600px", height: "450px" }} defaultValue={resultCode}></textarea>
            </div>
        </div>
    );
}

export default CodeDisplay;
