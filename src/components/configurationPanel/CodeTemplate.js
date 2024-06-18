const extractConfig_VersionTK = (config, defaultTextContent = "") => {
    let code = ``;

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
    if (config.fontSize) {
        code += ` font=("Inter", ${config.fontSize.value}),`;
    }
    if (config.file) {
        code += ` file="${config.file.value}",`;
    }
    if (config.from) {
        code += ` from_=${config.from.value},`;
    }
    if (config.to) {
        code += ` to=${config.to.value},`;
    }

    // Remove the last caracter (,)
    return (code.slice(0, -1) + " )");
}

const extractConfig_VersionTtK = (config, class_name, defaultTextContent = "") => {
    let code = ``;
    let style_code = `ttk.Style().configure("${class_name}"`;

    // Set the constructor code line
    if (config.textContent) {
        code += ` text="${config.textContent.value || defaultTextContent}",`;
    }
    if (config.items) {
        const item_list = config.items.value.split(",").map((item) => item.trim())
        const list_str  = JSON.stringify( item_list )

        code += ` values=${list_str},`;
    }
    code = code.slice(0, -1) + " )"

    // Set the style constructor line
    if (config.background) {
        style_code += `, background="${config.background.value}"`;
    }
    if (config.foreground) {
        style_code += `, foreground="${config.foreground.value}"`;
    }
    if (config.fontSize) {
        style_code += `, font=("Inter", ${config.fontSize.value})`;
    }

    style_code += ")"

    // Remove the last caracter (,)
    return { style_code, code };
}

export const generateImportLine =  (ttkImport = false) => (ttkImport) ? `from tkinter import ttk` : `from tkinter import Tk`

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

export const generateElementCode = (config, element_id, originX, originY, type, from_library, class_name) => {
    let code = `${element_id} = ${(from_library === "ttk") ? "ttk." : ""}${type}(`
    const e_width  = config.width?.value || -1
    const e_height = config.height?.value || -1

    // Set the options
    if (from_library === "ttk") {
        const code_obj = extractConfig_VersionTtK(config, class_name, type)

        code = code_obj.style_code + "\n" + code;
        code += code_obj.code
    }
    else {
        code += extractConfig_VersionTK(config, type)
    }

    // Place the element
    const positionX = config.posX.value - originX;
    const positionY = config.posY.value - originY;

    if (type === "PhotoImage") {
        code += `\nLabel_${element_id} = Label( image=${element_id} )`;
        code += `\nLabel_${element_id}.place( x=${positionX.toFixed(2)}, y=${positionY.toFixed(2)}`;
    }
    else {
        code += `\n${element_id}.place( x=${positionX.toFixed(2)}, y=${positionY.toFixed(2)}`;
    }

    if (e_width !== -1) {
        code += `, width=${e_width}`
    }
    if (e_height !== -1) {
        code += `, height=${e_height}`
    }

    code = `# Tkinter element ${element_id}\n` + code + ` )\n\n`
    return code
}