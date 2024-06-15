import React, { useState, useEffect, useRef } from 'react';

import { generateImportLine, generateWindowCode, generateElementCode, generateFinalCode } from "./CodeTemplate"
import "./CodeDisplayStyle.css"

function CodeDisplay({ codeDisplayDialog, elements, deactivateSelection }) {
    // Variable to store the resulted code
    const [resultCode, setResultCode] = useState("")
    const [hasWindow, setHasWindow] = useState(false)
    const codeRef = useRef( "" );

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
        Object.entries(elements).map(([key, value], index) => {
            const { name, config } = value;

            if (name === "Window") {
                originX = config.posX.value;
                originY = config.posY.value;

                setHasWindow( true )
                code += generateWindowCode(config);
            }
        })

        // Show message for when the windows has not been generated
        if (!hasWindow) {
            setResultCode( "Debe generar al menos una Window para colocar los elementos" );
            return;
        }

        // Go throught all the elements generating its respective code
        Object.entries(elements).map(([key, value], index) => {
            const { name, from, class_name, config } = value;

            // Import the ttk library if necessary
            if (from === "ttk" && !ttk_library) {
                ttk_library = true;
            }

            if (name === "Button") {
                importObject.add( "Button" )
                code += generateElementCode(config, key, originX, originY, "Button", from, class_name);
            }
            else if (name === "Entry") {
                importObject.add( "Entry" )
                code += generateElementCode(config, key, originX, originY, "Entry", from, class_name);
            }
            else if (name === "Text") {
                importObject.add( "Text" )
                code += generateElementCode(config, key, originX, originY, "Text", from, class_name);
            }
            else if (name === "Label") {
                importObject.add( "Label" )
                code += generateElementCode(config, key, originX, originY, "Label", from, class_name);
            }
            else if (name === "Combobox") {
                code += generateElementCode(config, key, originX, originY, "Combobox", from, class_name);
            }
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
                            className='btn btn-outline-primary'
                            data-bs-toggle="popover"
                            data-bs-title="Popover title"
                            data-bs-content="And here's some amazing content. It's very engaging. Right?"
                            onClick={copyCodeToClipboard}
                        >Copiar código</button>
                    </div>
                }
            </div>
        </div>
    );
}

export default CodeDisplay;
