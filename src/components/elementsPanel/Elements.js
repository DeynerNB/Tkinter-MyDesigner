export const Tkinter_Window = {
    name: "Window",
    from: "Tk",
    config: {
        posX: {
            value: 20,
            type: "number"
        },
        posY: {
            value: 20,
            type: "number"
        },
        title: {
            value: "Tkinter window",
            type: "text"
        },
        width: {
            value: 700,
            type: "number"
        },
        height: {
            value: 500,
            type: "number"
        },
        background: {
            value: "#FFFFFF",
            type: "color"
        }
    }
}

export const Tkinter_Button = {
    name: "Button",
    from: "Tk",
    config: {
        posX: {
            value: 20,
            type: "number"
        },
        posY: {
            value: 20,
            type: "number"
        },
        width: {
            value: 100,
            type: "number"
        },
        height: {
            value: 35,
            type: "number"
        },
        textContent: {
            value: "",
            type: "text"
        },
        background: {
            value: "#FFFFFF",
            type: "color"
        },
        foreground: {
            value: "#000000",
            type: "color"
        },
        fontSize: {
            value: 18,
            type: "number"
        }
    }
}

export const TKinter_Entry = {
    name: "Entry",
    from: "Tk",
    config: {
        posX: {
            value: 20,
            type: "number"
        },
        posY: {
            value: 20,
            type: "number"
        },
        width: {
            value: 300,
            type: "number"
        },
        height: {
            value: 35,
            type: "number"
        },
        background: {
            value: "#FFFFFF",
            type: "color"
        },
        foreground: {
            value: "#000000",
            type: "color"
        },
        justify: {
            value: "left",
            type: "select",
            possible_options: ["left", "center", "right"]
        },
        fontSize: {
            value: 18,
            type: "number"
        }
    }
}

export const TKinter_Text = {
    name: "Text",
    from: "Tk",
    config: {
        posX: {
            value: 20,
            type: "number"
        },
        posY: {
            value: 20,
            type: "number"
        },
        width: {
            value: 300,
            type: "number"
        },
        height: {
            value: 300,
            type: "number"
        },
        background: {
            value: "#ffffff",
            type: "color"
        },
        foreground: {
            value: "#000000",
            type: "color"
        },
        fontSize: {
            value: 18,
            type: "number"
        }
    }
}

export const Tkinter_Label = {
    name: "Label",
    from: "Tk",
    config: {
        posX: {
            value: 20,
            type: "number"
        },
        posY: {
            value: 20,
            type: "number"
        },
        textContent: {
            value: "",
            type: "text"
        },
        background: {
            value: "#FFFFFF",
            type: "color"
        },
        foreground: {
            value: "#000000",
            type: "color"
        },
        fontSize: {
            value: 18,
            type: "number"
        }
    }
}

export const Tkinter_ComboBox = {
    name: "Combobox",
    from: "ttk",
    class_name: "TCombobox",
    config: {
        posX: {
            value: 20,
            type: "number"
        },
        posY: {
            value: 20,
            type: "number"
        },
        width: {
            value: 200,
            type: "number"
        },
        items: {
            value: "",
            type: "textarea"
        },
        background: {
            value: "#FFFFFF",
            type: "color"
        },
        foreground: {
            value: "#000000",
            type: "color"
        },
        fontSize: {
            value: 18,
            type: "number"
        }
    }
}

export const Tkinter_PhotoImage = {
    name: "PhotoImage",
    from: "Tk",
    config: {
        posX: {
            value: 20,
            type: "number"
        },
        posY: {
            value: 20,
            type: "number"
        },
        width: {
            value: 100,
            type: "number"
        },
        height: {
            value: 100,
            type: "number"
        },
        file: {
            value: "your/image/path",
            type: "text"
        }
    }
}

export const TKinter_Listbox = {
    name: "Listbox",
    from: "Tk",
    config: {
        posX: {
            value: 20,
            type: "number"
        },
        posY: {
            value: 20,
            type: "number"
        },
        width: {
            value: 300,
            type: "number"
        },
        height: {
            value: 35,
            type: "number"
        },
        selectmode: {
            value: "BROWSE",
            type: "select",
            possible_options: ["BROWSE", "SINGLE", "MULTIPLE", "EXTENDED"]
        },
        fontSize: {
            value: 18,
            type: "number"
        }
    }
}

export const TKinter_Spinbox = {
    name: "Spinbox",
    from: "Tk",
    config: {
        posX: {
            value: 20,
            type: "number"
        },
        posY: {
            value: 20,
            type: "number"
        },
        width: {
            value: 300,
            type: "number"
        },
        background: {
            value: "#FFFFFF",
            type: "color"
        },
        foreground: {
            value: "#000000",
            type: "color"
        },
        fontSize: {
            value: 18,
            type: "number"
        },
        justify: {
            value: "left",
            type: "select",
            possible_options: ["left", "center", "right"]
        },
        from: {
            value: 0,
            type: "number"
        },
        to: {
            value: 100,
            type: "number"
        },
    }
}