import Staff from "../staff/staff.js";
import { getRandom, createElement } from "../common/utils.js";
import { tones, tonePositions } from "../staff/tones.js";
import { noteScheme } from "../staff/note.js";

export default class MissingTimeStaff extends Staff {
    slotEnterCount = 0;

    constructor(hostElement, options = {}) {
        super(hostElement, options);
        this.drawSlot();
    }

    drawTimes() {
        createElement({
            type: "span",
            class: "lower-time",
            parentElement: this.staff,
            textContent: this.lowerTime
        })

    }

    drawSlot() {
        this.slot = createElement({
            type: "div",
            class: "event-slot-time",
            parentElement: this.staff
        });
       
        this.slot.addEventListener('dragover', (e) => e.preventDefault());
        this.slot.addEventListener('dragenter', () => this.onEnterSlot());
        this.slot.addEventListener('dragleave', () => this.onExitSlot());

        this.slot.addEventListener('drop', (e) => {
            this.onExitSlot(true);
            const value = e.dataTransfer.getData('text');
            const eq = parseInt(value);
            this.setSlotTime(eq);
            this.resolve(eq);
        });
    }

    onEnterSlot() {
        this.slotEnterCount++;
        
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

    setSlotTime(draggedTime) {
        if (this.slot.firstChild)
            this.slot.removeChild(this.slot.firstChild);
        
        createElement({
            type: "span",
            class: "upper-time",
            draggable: false,
            textContent: draggedTime,
            parentElement: this.slot
        });
    }

    resolve(draggedTime) {
        const upperTime = this.getCorrectUpperTime();
        const result = draggedTime === upperTime;
        this.dispatchResult(result);
    }

    getCorrectUpperTime() {
        return this.upperTime;
    }
}