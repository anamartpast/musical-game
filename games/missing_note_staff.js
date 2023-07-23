import Staff from "../staff/staff.js";
import { getRandom, createElement } from "../common/utils.js";
import { tones, tonePositions } from "../staff/tones.js";
import { noteScheme } from "../staff/note.js";

export default class MissingNoteStaff extends Staff {
    slotEnterCount = 0;

    constructor(hostElement, options = {}) {
        super(hostElement, options);
        this.drawSlot();
    }

    drawNotes() {
        let left = 130;
        const length = this.noteList.length;
        const positions = Object.values(tonePositions);

        this.indexCorrectNote = getRandom(this.noteList.length);

        this.noteList.forEach((note, index) => {
            if (index !== this.indexCorrectNote) {
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
            }
        });
    }

    drawSlot() {
        const left = 130;
        const defaultTop = tonePositions[tones.LA];

        this.slot = createElement({
            type: "div",
            class: "event-slot",
            parentElement: this.staff,
            style: {
                top: defaultTop,
                left: `calc((100% - ${left}px) / ${this.noteList.length} * ${this.indexCorrectNote} + ${left}px)`
            }
        });
        this.slot.addEventListener('dragover', (e) => e.preventDefault());
        this.slot.addEventListener('dragenter', () => this.onEnterSlot());
        this.slot.addEventListener('dragleave', () => this.onExitSlot());

        this.slot.addEventListener('drop', (e) => {
            this.onExitSlot(true);
            const value = e.dataTransfer.getData('text');
            const eq = parseInt(value);
            this.setSlotNote(eq);
            this.resolve(eq);
        });
    }

    onEnterSlot() {
        this.slotEnterCount++;
        console.log("enter", this.slotEnterCount)
        this.updateSlotClass();
    }

    onExitSlot(force) {
        if (force) {
            this.slotEnterCount = 0;
        } else {
            this.slotEnterCount--;
        }
        console.log("leave", this.slotEnterCount);
        this.updateSlotClass();
    }

    updateSlotClass() {
        if (this.slotEnterCount > 0 && !this.slot.classList.contains('over'))
            this.slot.classList.add('over');
        else if (this.slotEnterCount <= 0 && this.slot.classList.contains('over'))
            this.slot.classList.remove('over');
    }

    setSlotNote(eq) {
        if (this.slot.firstChild)
            this.slot.removeChild(this.slot.firstChild);

        const draggedNote = noteScheme.find(note => note.eq === eq);
        createElement({
            draggable: false,
            type: 'img',
            class: 'note',
            src: draggedNote.image,
            parentElement: this.slot
        });

    }

    resolve(eq) {
        const correctNode = this.getCorrectNote();
        const result = correctNode.eq === eq;
        this.dispatchResult(result);
    }

    getCorrectNote() {
        return this.noteList[this.indexCorrectNote];
    }
}