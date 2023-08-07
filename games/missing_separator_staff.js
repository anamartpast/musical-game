import Staff from "../staff/staff.js";
import { createElement } from "../common/utils.js";

import { Note, noteScheme } from "../staff/note.js";

export default class MissingSeparatorStaff extends Staff {
    generate() {
        this.generateMeasure();
        this.generateNotes();
        this.saveCorrectSeparator();
        this.generateAdditionalNotes();
        this.attachEventListeners();
    }
    draw() {
        this.drawContainer();
        this.drawClef();
        this.drawTimes();
        this.drawNotes();
        this.drawSeparators();
        this.drawMovableLine();
    }
    saveCorrectSeparator() {
        this.separatorIndex = this.noteList.length -1;
    }
    generateAdditionalNotes() {
        let remainingTime = this.totalTime;
        let initialScheme = noteScheme;
        // Si solo hay una nota en el lado izquierdo
        // Se evita generar una sola nota adicional, de forma que haya más de un separador posible
        if (this.noteList.length === 1) {
            initialScheme = initialScheme.filter(noteInfo => noteInfo.time !== this.totalTime);
        }
        
        while (remainingTime !== 0) {
            const allowedNotes = initialScheme
                .filter(noteInfo => noteInfo.time <= remainingTime);
            allowedNotes.sort((a, b) => {
                return a.time < b.time ? 1 : -1;
            });

            const note = allowedNotes[0];
            this.noteList.push(note);

            remainingTime = remainingTime - note.time;
        }
    }
    drawSeparators() {
        const separatorCount = this.noteList.length - 1;
        let index = 0;
        while (index < separatorCount) {
            createElement({
                type: 'div',
                class: 'separator-slot',
                'data-index': index,
                parentElement: this.notesContainer,
                style: {
                    left: this.getSeparatorPosition(index)
                }
            });
            index++;
        }

    }
    getSeparatorPosition(index) {
        const numParts = this.noteList.length + 1;
        const sectionPerc = 100 / numParts;
        const left = sectionPerc / 2 + sectionPerc * (index + 1);

        return `calc(${left}% - 10px)`;
    }
    drawMovableLine() {
        this.lineWrapper = createElement({
            type: 'div',
            class: 'line-wrapper',
            parentElement: this.notesContainer
        });

        createElement({
            type: 'div',
            class: 'line',
            parentElement: this.lineWrapper
        })

        createElement({
            type: 'div',
            class: 'comment',
            parentElement: this.lineWrapper,
            textContent: '¡Muéveme!'
        })
    }
    
    attachEventListeners() {
        // Usuario hace clic en cualquier parte del documento
        document.body.addEventListener("pointerdown", (event) => this.onMouseDown(event));
        document.body.addEventListener("pointermove", (event) => this.onMouseMove(event));
        document.body.addEventListener("pointerup", (event) => this.onMouseUp(event));
    }

    onMouseDown(event) {
        const target = event.target;
        const seizeLine =  this.lineWrapper.contains(target);
        this.lineSeized = seizeLine;
    }

    onMouseMove(event) {
        console.warn("MOVIENDO");
        if (!this.lineSeized)
            return;
            
        const pageX = event.pageX;
        const separators = [...this.notesContainer.querySelectorAll(".separator-slot")];
        const distances = separators
            .map(sep => Math.abs(pageX - sep.getBoundingClientRect().x));
        const min = Math.min(...distances);
        const index = distances.indexOf(min);
        const closestSeparator = separators[index];

        const left = closestSeparator.style.left;
        this.lineWrapper.style.left = left;
        this.selectedSeparator = index;
        console.warn(pageX, left, distances);
    }

    onMouseUp() {
        this.lineSeized = false;
    }

    resolve() {
        this.dispatchResult(this.selectedSeparator === this.separatorIndex);
    }
}