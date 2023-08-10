import MissingSeparatorStaff from "./missing_separator_staff.js";
import { showMessage } from "../common/utils.js";

// Partitura
const staff = new MissingSeparatorStaff(document.querySelector('.grama-container'), { level: 3 });

const thirdGame = {
    init: function() {
        const button = document.querySelector("#check");
        button.addEventListener('click', () => this.onSubmit());
        staff.onResult((data) => this.onResult(data));
    },
    onSubmit: function() {
        if (staff.selectedSeparator === undefined) {
            // TODO: "Tienes que mover el separador a su sitio correcto"
            return;
        }

        staff.resolve();
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

thirdGame.init();