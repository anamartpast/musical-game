import MissingNoteStaff from "./missing_note_staff.js";
import NoteOptions from "../games/note_options.js";
import { noteScheme } from "../staff/note.js";
import { createElement, getRandom, showMessage, shuffle } from "../common/utils.js";

// Partitura
const staff = new MissingNoteStaff(document.querySelector('.grama-container'));
// Cajita de opciones
const dashboard = new NoteOptions(document.querySelector('.options-container'));

const firstGame = {
    init: function() {
        // Recoger las posibles notas de las opciones
        const optionsNotes = this.getOptions();
        // Convertir las notas a opciones válidas para el dashboard de opciones
        const optionsElements = optionsNotes.map(option => ({
            value: option.eq, // El valor que luego se comprobará en staff
            element: this.noteToElement(option) // El elemento html
        }));
        shuffle(optionsElements); // Se mezcla para que salgan desordenadas
        dashboard.addOptions(optionsElements); // Se añaden al dashboard
        // Escucha al evento de resultado
        staff.onResult((data) => this.onResult(data));
    },
    getOptions: function() {
        // Array donde se almacenan las notas generadas
        // La nota correcta ya la sabemos, así que se añade primera
        const generatedNotes = [
            staff.getCorrectNote()
        ];

        // Máximo 3 notas generadas, contando la primera
        while(generatedNotes.length < 3) {
            // Se filtran las posibles notas para que no salgan repetidas
            const candidates = noteScheme.filter(note =>
                !generatedNotes.some(generatedNote => note.eq === generatedNote.eq)
            );
            // Se coge una cualquiera y se añade a las generadas
            const randomIndex = getRandom(candidates.length);
            const result = candidates[randomIndex];
            generatedNotes.push(result);
        }

        return generatedNotes;
    },
    noteToElement: function(note) {
        // Se convierte la nota a un elemento HTML visual
        return createElement({
            type: "img",
            class: "note",
            src: note.image
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

// Se inicia el juego
firstGame.init();
