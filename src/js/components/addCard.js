import { generateCardMarkup } from "./generateCardMarkup";

export const addCard = () => {
    const cardNodes = document.querySelectorAll('.js-card');
    const removeButtonNode = document.querySelector('.js-control-remove');
    const clearButtonNode = document.querySelector('.js-control-clear');

    removeButtonNode.classList.remove('disabled');

    if (cardNodes.length) {
        clearButtonNode.classList.remove('disabled');
    }

    generateCardMarkup();
}