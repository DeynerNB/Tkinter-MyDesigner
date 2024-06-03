import React, { useState, useEffect } from 'react';

import { generateImportLine, generateWindowCode, generateButtonCode, generateFinalCode } from "./CodeTemplate"
import "./styles.css"

function CodeDisplay({ codeDisplayDialog, elements }) {

    const [resultCode, setResultCode] = useState("")

    let originX = 0;
    let originY = 0;

    let importButton = false;

    const generateCode = () => {

        let importLine = generateImportLine();
        let code = ''

        elements.forEach((element, index) => {
            const { name, config } = element.type;

            if (name === "Window") {
                originX = config.posX;
                originY = config.posY;
                code += generateWindowCode(config);
            }
            else if (name === "Button") {
                importButton = true;
                code += generateButtonCode(config, index, originX, originY);
            }
        });

        if (importButton) {
            importLine += `, Button`
        }

        importLine += `\n\n`
        code += generateFinalCode()

        setResultCode( importLine + code )
    }

    useEffect(() => { generateCode() });

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
