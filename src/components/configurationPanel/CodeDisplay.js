import React, { useState, useEffect, useRef } from 'react';

import { generateImportLine, generateWindowCode, generateElementCode, generateFinalCode } from "./CodeTemplate"
import "./CodeDisplayStyle.css"

import PropTypes from "prop-types"

function CodeDisplay({ codeDisplayDialog, elements, deactivateSelection }) {
    // Variable to store the resulted code
    const [resultCode, setResultCode] = useState("")
    const [hasWindow, setHasWindow] = useState(false)
    const codeRef = useRef( "" );
    const copyCodeButtonRef = useRef( null );

    // Ttk library has been imported
    let ttk_library = false;

    // Variables to define the window position (The origin to place the rest of the elements)
    let originX = -1;
    let originY = -1;

    // Variable to define what to import
    let importObject = new Set();

    // Generate the tkinter code
    const generateCode = () => {

        // Get the default import line
        let importLine_tk = generateImportLine();
        let importLine_ttk = generateImportLine(true);
        let code = ''

        // Check if exists a window to be the first code
        Object.entries(elements).map(([, value]) => {
            const { name, config } = value;

            if (name === "Window") {
                originX = config.posX.value;
                originY = config.posY.value;

                setHasWindow( true )
                code += generateWindowCode(config);
            }
            return value;
        })

        // Show message for when the windows has not been generated
        if (!hasWindow) {
            setResultCode( "Debe generar al menos una Window para colocar los elementos" );
            return;
        }

        // Go throught all the elements generating its respective code
        Object.entries(elements).map(([key, value]) => {
            const { name, from, class_name, config } = value;

            // Import the ttk library if necessary
            if (from === "ttk" && !ttk_library) {
                ttk_library = true;
            }

            if (name !== "Window") {
                if (from === "Tk") {
                    importObject.add( name );
                }
                if (name === "PhotoImage") {
                    importObject.add( "Label" )
                }
                code += generateElementCode(config, key, originX, originY, name, from, class_name);
            }

            return value;
        })
        // Set the imports based on the elements generated
        for (const imp of importObject) {
            importLine_tk += `, ${imp}`
        }

        // Set the last piece of code
        code = `${importLine_tk}\n${(ttk_library) ? importLine_ttk : ""}\n\n${code}${generateFinalCode()}`

        // Set the resulted code in the textarea
        setResultCode( code )
    }

    const copyCodeToClipboard = () => {
        const code = codeRef.current.value;
        navigator.clipboard.writeText( code )

        copyCodeButtonRef.current.classList.add("copied");
        setTimeout(() => { copyCodeButtonRef.current.classList.remove("copied"); }, 3000);
    }

    // Generate the code when display
    useEffect(() => {
        deactivateSelection( null );
        generateCode();
    });

    return (
        <div className='code-display-container d-flex justify-content-center align-items-center'>
            <div className='code-display w-75 p-3 bg-light position-relative'>
                <div className='code-display-icon-container'>
                    <span className="material-symbols-outlined icon-close" onClick={() => codeDisplayDialog( false )}>close</span>
                </div>
                <p className='text-center fs-3'>Código:</p>
                <textarea className='w-100' style={{ resize: 'none', minHeight: "300px", maxHeight: "600px", height: "450px" }} defaultValue={resultCode} ref={codeRef}></textarea>
                {
                    hasWindow &&
                    <div className='text-end'>
                        <button
                            className='btn btn-outline-primary position-relative'
                            id='copy-code-button'
                            ref={copyCodeButtonRef}
                            onClick={copyCodeToClipboard}
                        >Copiar código</button>
                    </div>
                }
            </div>
        </div>
    );
}

CodeDisplay.propTypes = {
    codeDisplayDialog: PropTypes.func,
    elements: PropTypes.object,
    deactivateSelection: PropTypes.func
}

export default CodeDisplay;
