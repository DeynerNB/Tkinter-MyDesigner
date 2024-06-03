export const generateImportLine =  () => `from tkinter import Tk`

export const generateFinalCode =  () => `window.mainloop()`

export const generateWindowCode = (config) => {
    let code = `window = Tk()\n`

    if (config.title)
        code += `window.title("${config.title}")\n`
    if (config.width && config.height)
        code += `window.geometry("${config.width}x${config.height}")\n`
    if (config.background)
        code += `window.configure(bg = "${config.background}")\n`

    code += `\n`
    return code
}

export const generateButtonCode = (config, index, originX, originY) => {
    let code = `button_${index} = Button(`

    // Add more options
    code += `text="${config.textContent || "button"}"`

    // Close the variable line
    code += `)`

    // Place the button
    const positionX = config.posX - originX
    const positionY = config.posY - originY
    code += `\nbutton_${index}.place( x=${positionX.toFixed(2)}, y=${positionY.toFixed(2)}, width=${config.width}, height=${config.height} )\n`

    code += `\n`
    return code
}