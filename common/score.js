export function setScore(points) {
    localStorage.setItem('score', points);
}

export function getScore() {
    return parseInt(localStorage.getItem('score') || 0);
}

export function updateScore(elementQuery = '#score') {
    document.querySelector(elementQuery).textContent = getScore() + " puntos";
}