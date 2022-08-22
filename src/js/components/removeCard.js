import { removeCardData } from "./generateCardMarkup";

export const removeCard = (node) => {
    const cardNodes = document.querySelectorAll('.js-card');
    const removeButtonNode = document.querySelector('.js-control-remove');
    const clearButtonNode = document.querySelector('.js-control-clear');
    
    if (!cardNodes.length) return false;

    if (node) {
        node.remove();
        removeCardData(node);
    } else {
        cardNodes[cardNodes.length - 1].remove();
        removeCardData(cardNodes[cardNodes.length - 1]);
    }


    if (cardNodes.length === 1) {
        removeButtonNode.classList.add('disabled');
        clearButtonNode.classList.add('disabled');
    } else if (cardNodes.length === 2) {
        clearButtonNode.classList.add('disabled');
    }
}