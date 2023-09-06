const STEPS_PER_LEVEL = 3;
const MAX_LEVEL = 2;

export function setScore(points) {
    localStorage.setItem('score', points);
}

export function getScore() {
    return parseInt(localStorage.getItem('score') || 0);
}

export function updateScore(elementQuery = '#score') {
    document.querySelector(elementQuery).textContent = getScore() + " puntos";
}

export function updateLevel(type, elementQuery = ".level span") {
    const levelDescription = [
        'Fácil',
        'Intermedio',
        'Avanzado'
    ];

    const level = getLevel(type);
    document.querySelector(elementQuery).innerText = levelDescription[level];
}

// Recoger nivel en base a step
export function getLevel(type) {
    const level = Math.floor(getStep(type) / STEPS_PER_LEVEL);

    return level > MAX_LEVEL ? MAX_LEVEL : level;
}

// Recoger el step actual
export function getStep(type) {
    return parseInt(localStorage.getItem(`${type}_step`)) || 0;
}

// Setear el step actual
export function setStep(type, value) {
    return localStorage.setItem(`${type}_step`, value)
}

// Step completado, próximo step
// Devuelve true si ha habido cambio de nivel
export function addStep(type) {
    const level = getLevel(type);
    const step = getStep(type) + 1;

    setStep(type, step);

    return getLevel(type) !== level;
}