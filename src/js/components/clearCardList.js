import { addCardWhileScroll } from "./fillCardList";
import { getCardData, removeCardData } from "./generateCardMarkup";

export const clearCardList = () => {
    const cardNodes = document.querySelectorAll('.js-card');
    const removeButtonNode = document.querySelector('.js-control-remove');
    const clearButtonNode = document.querySelector('.js-control-clear');
    const fillButtonNode = document.querySelector('.js-control-fill');

    if (!cardNodes.length) return false;

    cardNodes.forEach((e, i) => {
        if (i !== 0) {
            removeCardData(e);
            e.remove();
        }
    })

    fillButtonNode.classList.remove('active');
    clearButtonNode.classList.add('disabled');
}