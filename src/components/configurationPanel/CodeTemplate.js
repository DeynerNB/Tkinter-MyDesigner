const extractConfig = (config, defaultTextContent = "") => {
    let code = ``;
    console.log( config )

    if (config.textContent) {
        code += ` text="${config.textContent.value || defaultTextContent}",`;
    }
    if (config.background) {
        code += ` bg="${config.background.value}",`;
    }
    if (config.foreground) {
        code += ` fg="${config.foreground.value}",`;
    }
    if (config.justify) {
        code += ` justify="${config.justify.value}",`;
    }

    // Remove the last caracter (,)
    return (code.slice(0, -1) + " )");
}

export const generateImportLine =  () => `from tkinter import Tk`

export const generateFinalCode =  () => `window.mainloop()`

export const generateWindowCode = (config) => {
    let code = `window = Tk()\n`

    if (config.title)
        code += `window.title("${config.title.value}")\n`
    if (config.width && config.height)
        code += `window.geometry("${config.width.value}x${config.height.value}")\n`
    if (config.background)
        code += `window.configure(bg = "${config.background.value}")\n`

    code += `\n`
    return code
}

export const generateElementCode = (config, element_id, originX, originY, type) => {
    let code = `${element_id} = ${type}(`
    const e_width  = config.width?.value || -1
    const e_height = config.height?.value || -1

    // Set the options
    code += extractConfig(config, type)

    // Place the element
    const positionX = config.posX.value - originX
    const positionY = config.posY.value - originY
    code += `\n${element_id}.place( x=${positionX.toFixed(2)}, y=${positionY.toFixed(2)}`

    if (e_width !== -1 && e_height !== -1) {
        code += `, width=${e_width}, height=${e_height}`
    }

    code += ` )\n\n`
    return code
}