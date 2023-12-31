import { createElement } from "../../common/utils.js";


export default class NoteOptions {

    constructor(hostElement) {
        this.hostElement = hostElement;
        this.drawContainer();
    }

    drawContainer() {
        this.container = createElement({
            type: "div",
            class: "options",
            parentElement: this.hostElement
        });    
    }
    
    addOptions(items) {
        if (!Array.isArray(items)) {
            items = [items];
        }
        this.clean();
        
        items.forEach(item => {
            const wrapper = createElement({
                type: 'div',
                class: 'node',
                draggable: true
            });
            wrapper.appendChild(item.element);
            wrapper.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text", item.value);
            });
            this.container.appendChild(wrapper);
        });
    }

    clean() {
        this.container.innerHTML = '';
    }
}