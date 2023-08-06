import { getRandom, createElement } from "../common/utils.js";
import { Note, noteScheme } from "./note.js";
import { tones, tonePositions } from "./tones.js";


export default class Staff {
    constructor(hostElement, options = {}) {
        this.hostElement = hostElement;
        this.options = options;
        this.init();
    }

    init() {
        this.generate();
        this.draw();
    }

    generate() {
        this.generateMeasure();
        this.generateNotes();
    }

    draw() {
        this.drawContainer();
        this.drawClef();
        this.drawTimes();
        this.drawNotes();
    }

    drawContainer() {
        this.staff = createElement({
            type: "div",
            class: "grama",
            parentElement: this.hostElement
        });

        const gramaBox = createElement({
            type: "div",
            class: "box",
            parentElement: this.staff
        })

        createElement({
            type: "div",
            class: "row",
            parentElement: gramaBox
        })

        createElement({
            type: "div",
            class: "row",
            parentElement: gramaBox
        })

        createElement({
            type: "div",
            class: "row",
            parentElement: gramaBox
        })

        
        this.notesContainer = createElement({
            type: 'div',
            class: 'notes-container',
            parentElement: this.staff
        })
    }

    drawClef() {
        this.clef = createElement({
            type: "img",
            draggable: false,
            class: "clef",
            src: "/images/clef.png",
            parentElement: this.staff
        })

    }

    generateUpperTime() {
        if (this.options.level === 3) {
            return 4;
        }
        let numeratorList = [2, 3];
        const index = getRandom(numeratorList.length);
        return numeratorList[index];
    }

    generateLowerTime() {
        if (this.options.level === 1) {
            return 4;
        }
        const denominatorList = [2, 4];
        const index = getRandom(denominatorList.length);
        return denominatorList[index];
    }

    drawTimes() {
        createElement({
            type: "span",
            class: "upper-time",
            parentElement: this.staff,
            textContent: this.upperTime

        })

        createElement({
            type: "span",
            class: "lower-time",
            parentElement: this.staff,
            textContent: this.lowerTime
        })

    }

    generateMeasure() {
        this.upperTime = this.generateUpperTime();
        this.lowerTime = this.generateLowerTime();

        const note = noteScheme.find(noteInfo => noteInfo.eq === this.lowerTime);

        const time = note.time;
        this.totalTime = time * this.upperTime;
    }

    generateNotes() {

        let remainingTime = this.totalTime;
        this.noteList = [];

        while (remainingTime !== 0) {
            const allowedNotes = noteScheme.filter(noteInfo => noteInfo.time <= remainingTime);
            const index = getRandom(allowedNotes.length);
            const note = allowedNotes[index];

            this.noteList.push(note);

            remainingTime = remainingTime - note.time;

            console.log(this.noteList);
        }
    }

    drawNotes() {
        const positions = Object.values(tonePositions);

        this.staffNotes = [];
        this.staffNotes = this.noteList;

        this.staffNotes.forEach((note, index) => {
            createElement({
                draggable: false,
                type: "img",
                class: "note",
                src: note.image,
                parentElement: this.notesContainer,
                style: {
                    top: positions[getRandom(positions.length)],
                    left: this.getNotePosition(index)
                }
            });
        });
    }

    getNotePosition(index) {
        // Mitad del ancho de una nota
        const noteHalf = 56 / 2;
        const numParts = this.noteList.length + 1;
        // Se divide el div de forma que las notas queden entre las secciones
        // se resta el ancho de las notas para que queden centradas en dichas divisiones
        const sectionPerc = 100 / numParts * (index + 1);

        return `calc(${sectionPerc}% - ${noteHalf}px)`;
    }

    onResult(fn) {
        this.resultFn = fn;
    }

    dispatchResult(data) {
        this.resultFn(data);
    }

    destroy() {
        this.staff.remove();
    }

}



