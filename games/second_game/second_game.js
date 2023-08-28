import MissingTimeStaff from "./missing_time_staff.js";
import TimeOptions from "./time_options.js";
import { createElement, getRandom, showMessage, shuffle } from "../../common/utils.js";
import { updateScore, setScore, getScore } from "../../common/score.js";

const secondGame = {
    dashboard : new TimeOptions(document.querySelector('.options-container')),
    nextLevelButton: document.querySelector("#next-level"),

    init: function() {
        this.createStaff();
        updateScore();
        // Recoger los posibles tiempos de opciones
        const optionsTimes = this.getOptions();
        // Convertir las notas a opciones válidas para el dashboard de opciones
        const optionsElements = optionsTimes.map(option => ({
            value: option, // El valor que luego se comprobará en staff
            element: this.timeToPrint(option) // El elemento html
        }));
        shuffle(optionsElements); // Se mezcla para que salgan desordenadas
        this.dashboard.addOptions(optionsElements); // Se añaden al dashboard
        // Escucha al evento de resultado
        this.staff.onResult((data) => this.onResult(data));
        this.nextLevelButton.addEventListener('click', () => this.onNextLevel())
    },
    createStaff: function() {
        let level = this.staff?.options.level || 0;
        level++;
        
        this.staff?.destroy();
        this.staff = new MissingTimeStaff(document.querySelector('.grama-container'), { level: level });
    },
    getOptions: function() {
        const generatedTimes = [
            this.staff.getCorrectUpperTime() 
        ];

        while(generatedTimes.length < 3) {
            const candidates = [2, 3, 4, 6]
            const candidateTimes = candidates.filter(time =>
                !generatedTimes.some(generatedTime => time === generatedTime)
            );
            const randomIndex = getRandom(candidateTimes.length);
            const result = candidateTimes[randomIndex];
        
            generatedTimes.push(result);
        }
        
        return generatedTimes;
    },
    timeToPrint: function(time) {
        return createElement({
            type: "span",
            class: "opt-time",
            textContent: time
        });
    },
    onResult: async function(success) {
        const msg = success ?
            '¡Genial, sigue así!' :
            '¡Ups! Inténtalo de nuevo';
        await showMessage({
            type: success ? 'success' : 'error',
            message: msg
        });

        if (success) {
            this.onSuccess();
        }
    },
    onSuccess: function() {
        setScore(getScore() + 10);
        updateScore();
        this.onNextLevel();
    },
    onNextLevel: function() {
        this.init();
    }
}

secondGame.init();
