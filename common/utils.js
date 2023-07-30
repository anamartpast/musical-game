export function getRandom(from, to) {
    if (to === undefined) {
        to = from;
        from = 0;
    }
    return Math.floor(Math.random() * (to - from) + from);
}

export function createElement(options = {}) {
    const element = document.createElement(options.type);
    Object.keys(options).forEach(key => {

        if (key === 'parentElement') {
            // Adjuntar a elemento padre
            options.parentElement.appendChild(element);
        } else if (key === 'class') {
            // Añadir clase
            element.classList.add(options.class);
        } else if (key === 'style') {
            // Computar estilos
            parseStyle(element, options.style);
        } else {
            // Asignar atributos
            element[key] = options[key];
        }
    });

    return element;
}

export function parseStyle(element, styleConfig) {
    Object.entries(styleConfig).forEach(([property, value]) => {
        element.style[property] = value;
    });
}

export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function showMessage(data) {
    const dialog = document.createElement('dialog');
    dialog.classList.add(data.type === 'success' ? 'success' : 'error');
    dialog.innerHTML = `
        ${data.message}
        <div>
            <button type="button" class="close">Cerrar</button>
        </div>
    `;
    dialog.querySelector('button').addEventListener('click', () => {
        dialog.close();
        document.body.removeChild(dialog);
    });
    document.body.appendChild(dialog);
    dialog.showModal();
}