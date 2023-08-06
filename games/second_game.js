import MissingTimeStaff from "./missing_time_staff.js";
import TimeOptions from "../games/time_options.js";
import Staff from "../staff/staff.js";
import { noteScheme } from "../staff/note.js";
import { createElement, getRandom, showMessage, shuffle } from "../common/utils.js";

// Partitura
const staff = new MissingTimeStaff(document.querySelector('.grama-container'), { level: 1 });
// Cajita de opciones 
const dashboard = new TimeOptions(document.querySelector('.options-container'));

const secondGame = {
    init: function() {
        // Recoger los posibles tiempos de opciones
        const optionsTimes = this.getOptions();
        // Convertir las notas a opciones válidas para el dashboard de opciones
        const optionsElements = optionsTimes.map(option => ({
            value: option, // El valor que luego se comprobará en staff
            element: this.timeToPrint(option) // El elemento html
        }));
        shuffle(optionsElements); // Se mezcla para que salgan desordenadas
        dashboard.addOptions(optionsElements); // Se añaden al dashboard
        // Escucha al evento de resultado
        staff.onResult((data) => this.onResult(data));
    },
    getOptions: function() {
        const generatedTimes = [
            staff.getCorrectUpperTime() 
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
    onResult: function(success) {
        const msg = success ?
            '¡Genial, sigue así!' :
            '¡Ups! Inténtalo de nuevo';
        showMessage({
            type: success ? 'success' : 'error',
            message: msg
        });
    }
}

secondGame.init();
