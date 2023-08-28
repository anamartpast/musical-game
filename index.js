import { updateScore, setScore } from "../common/score.js";
import { showMessageOpt } from "./common/utils.js";

function init() {
    updateScore();
    attachScoreEvent();
}

function attachScoreEvent() {
    document.querySelector("#reset-score").addEventListener("click", () => resetScore());
}

async function resetScore() {
    const response = await showMessageOpt({
        message: "¿Deseas poner a 0 el contador de puntos?",
        buttons: [
            { text: "Sí", class: "confirm" },
            { text: "No", class: "reject" }
        ]
    });

    if (response === 1)
        return;

    setScore(0);
    updateScore();
}

init();