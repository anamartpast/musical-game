import MissingSeparatorStaff from "./missing_separator_staff.js";
import { showMessage } from "../common/utils.js";
import { updateScore, setScore, getScore } from "../common/score.js";


const thirdGame = {

    init: function() {
        this.createStaff();
        updateScore();
        const button = document.querySelector("#check");
        button.addEventListener('click', () => this.onSubmit());
        this.staff.onResult((data) => this.onResult(data));
    },
    createStaff: function() {
        let level = this.staff?.options.level || 0;
        level++;
        
        this.staff?.destroy();
        this.staff = new MissingSeparatorStaff(document.querySelector('.grama-container'), { level: level });
    },
    onSubmit: function() {
        if (this.staff.selectedSeparator === undefined) {
            // TODO: "Tienes que mover el separador a su sitio correcto"
            return;
        }

        this.staff.resolve();
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

thirdGame.init();