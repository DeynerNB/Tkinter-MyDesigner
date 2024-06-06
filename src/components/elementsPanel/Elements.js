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
            value: 200,
            type: "number"
        },
        height: {
            value: 200,
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
        background: {
            value: "#FFFFFF",
            type: "color"
        },
        foreground: {
            value: "#000000",
            type: "color"
        },
        justify: {
            value: "LEFT",
            type: "select",
            possible_options: ["LEFT", "CENTER", "RIGHT"]
        }
    }
}