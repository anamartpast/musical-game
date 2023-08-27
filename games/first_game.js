import MissingNoteStaff from "./missing_note_staff.js";
import NoteOptions from "../games/note_options.js";
import { noteScheme } from "../staff/note.js";
import { createElement, getRandom, showMessage, shuffle } from "../common/utils.js";
import { updateScore, setScore, getScore } from "../common/score.js";

const firstGame = {
    dashboard: new NoteOptions(document.querySelector('.options-container')),
    nextLevelButton: document.querySelector("#next-level"),

    init: function() {
        this.createStaff();
        updateScore();
        // Recoger las posibles notas de las opciones
        const optionsNotes = this.getOptions();
        // Convertir las notas a opciones válidas para el dashboard de opciones
        const optionsElements = optionsNotes.map(option => ({
            value: option.eq, // El valor que luego se comprobará en staff
            element: this.noteToElement(option) // El elemento html
        }));
        shuffle(optionsElements); // Se mezcla para que salgan desordenadas
        this.dashboard.addOptions(optionsElements); // Se añaden al dashboard
        // Escucha al evento de resultado
        this.staff.onResult((data) => this.onResult(data));
    },
    createStaff: function() {
        let level = this.staff?.options.level || 0;
        level++;
        
        this.staff?.destroy();
        this.staff = new MissingNoteStaff(document.querySelector('.grama-container'), { level: level });
    },
    getOptions: function() {
        // Array donde se almacenan las notas generadas
        // La nota correcta ya la sabemos, así que se añade primera
        const generatedNotes = [
            this.staff.getCorrectNote()
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

// Se inicia el juego
firstGame.init();

