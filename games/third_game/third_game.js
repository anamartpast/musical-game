import MissingSeparatorStaff from "./missing_separator_staff.js";
import { showMessage, showLevelMessage } from "../../common/utils.js";
import { updateScore, setScore, getScore, getLevel, addStep, updateLevel } from "../../common/score.js";


const thirdGame = {
    name: "missingSeparator",
    init: function() {
        this.createStaff();
        updateScore();
        updateLevel(this.name);
        if (!this.submitEventAttached) {
            const button = document.querySelector("#check");
            button.addEventListener('click', () => this.onSubmit());
            this.submitEventAttached = true;
        }
        this.staff.onResult((data) => this.onResult(data));
    },
    createStaff: function() {
        this.staff?.destroy();
        let level = getLevel(this.name);
        
        this.staff = new MissingSeparatorStaff(document.querySelector('.grama-container'), { level: level });
    },
    onSubmit: function() {
        if (this.staff.selectedSeparator === undefined) {
            showMessage({
                message: "Tienes que mover el separador a su sitio correcto"
            })
            return;
        }

        this.staff.resolve();
    },
    onResult: async function(success) {
        const msgArr = [
            '¡Ups! Inténtalo de nuevo',
            '¡Genial, sigue así!',
            '¡Bien hecho, has completado el nivel!'
        ];

        let msgIndex = 0;

        if (success) {
            msgIndex = 1;
            const nextLevel = addStep(this.name);
            if (nextLevel)
                msgIndex = 2;
        }

        if (msgIndex === 2) {
            this.onLevelUp();
            return;
        }

        await showMessage({
            type: success ? 'success' : 'error',
            message: msgArr[msgIndex]
        });

        if (success) {
            this.onSuccess();
        }
    },
    onLevelUp: async function() {
        const selectedBtn = await showLevelMessage();
        if (selectedBtn === 1) {
            location.href = "/";
        } else {
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

thirdGame.init();