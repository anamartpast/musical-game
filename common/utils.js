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
    return new Promise((resolve) => {
        const dialog = document.createElement('dialog');
        dialog.classList.add(data.type === 'success' ? 'success' : 'error');
        dialog.innerHTML = `
            <span>${data.message}</span>
            <div class="buttons">
                <button type="button" class="close">${data.type === 'success' ? 'Siguiente nivel' : 'Cerrar' }</button>
            </div>
        `;
        dialog.querySelector('button').addEventListener('click', () => {
            dialog.close();
            document.body.removeChild(dialog);
            resolve();
        });
        document.body.appendChild(dialog);
        dialog.showModal();
    });
}

export function showMessageOpt(data) {
    return new Promise((resolve) => {
        const dialog = document.createElement('dialog');
        dialog.innerHTML = `
            <span>${data.message}</span>
            <div class="buttons">
            </div>
        `;
        const buttonsContainer = dialog.querySelector(".buttons");

        data.buttons.forEach((button, index) => {
            const btn = document.createElement('button');
            btn.type = "button";
            btn.classList.add(button.class);
            btn.innerText = button.text;
            buttonsContainer.appendChild(btn);
            btn.addEventListener('click', () => {
                dialog.close();
                document.body.removeChild(dialog);
                resolve(index);
            })
        })

        document.body.appendChild(dialog);
        dialog.showModal();
    });
}