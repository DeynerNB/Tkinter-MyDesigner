export const Tkinter_Window = {
    name: "Window",
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
        }
    }
}

export const TKinter_Entry = {
    name: "Entry",
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
        }
    }
}

export const TKinter_Text = {
    name: "Text",
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
            value: "#FFFFFF",
            type: "color"
        },
        foreground: {
            value: "#000000",
            type: "color"
        }
    }
}