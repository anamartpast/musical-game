export function getRandom (from, to) {
    if (to === undefined) {
        to = from;
        from = 0;
    }
    return Math.floor(Math.random() * (to - from) + from);
}

export function createElement(options = {}) {
    const element = document.createElement(options.type);
    if (options.class) {
        element.classList.add(options.class)
    }
    if (options.id) {
        element.id = options.id;
    }
    if (options.src) {
        element.src = options.src;
    }
    if (options.parentElement) {
        options.parentElement.appendChild(element);
    }
    if(options.number){
        element.textContent = options.number;
    }
    if (options.style) {
        parseStyle(element, options.style);
    }

    return element;
}

export function parseStyle(element, styleConfig) {
    Object.entries(styleConfig).forEach(([property, value]) => {
        element.style[property] = value;
    });
}

