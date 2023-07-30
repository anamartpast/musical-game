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
        const numeratorList = [2, 3, 4, 6];
        const index = getRandom(numeratorList.length - 1);
        return numeratorList[index];
    }

    generateLowerTime() {
        const denominatorList = [2, 4, 8];
        const index = getRandom(denominatorList.length - 1);
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
        let left = 130;
        const length = this.noteList.length;
        const positions = Object.values(tonePositions);

        this.staffNotes = [];
        this.staffNotes = this.noteList;

        this.staffNotes.forEach((note, index) => {
            createElement({
                draggable: false,
                type: "img",
                class: "note",
                src: note.image,
                parentElement: this.staff,
                style: {
                    top: positions[getRandom(positions.length)],
                    left: `calc((100% - ${left}px) / ${length} * ${index} + ${left}px)`
                }
            });
        });

    }

    onResult(fn) {
        this.resultFn = fn;
    }

    dispatchResult(data) {
        this.resultFn(data);
    }

    

}



