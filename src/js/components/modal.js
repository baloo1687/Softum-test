import { generateCardMarkup, getCardData } from "./generateCardMarkup";

const modalNode = document.querySelector('.js-modal');

export const modal = (buttonNode) => {
    const modalContentNode = document.querySelector('.js-modal-content');
    const cardData = getCardData(buttonNode);
    modalContentNode.innerHTML = cardData.modalContent;
}

export const modalShow = () => {
    modalNode.classList.add('show');
}

export const modalHide = () => {
    modalNode.classList.remove('show');
}