import { generateCardMarkup } from "./generateCardMarkup";
import { isInViewPort } from "./isInViewPort";

export const fillCardList = () => {
    const fillButtonNode = document.querySelector('.js-control-fill');
    const removeButtonNode = document.querySelector('.js-control-remove');
    const clearButtonNode = document.querySelector('.js-control-clear');

    removeButtonNode.classList.remove('disabled');
    clearButtonNode.classList.remove('disabled');
    fillButtonNode.classList.add('active');
    
    let cardNodes = document.querySelectorAll('.js-card');

    if (!cardNodes.length) {
        generateCardMarkup(() => {
            let cardSize = getCardSize();
            fillColumn(cardSize);
        });
    } else {
        let cardSize = getCardSize();
        fillColumn(cardSize);
    }
}

function getCardSize() {
    const firstCard = document.querySelector('.js-card');
    return {
        height: firstCard.getBoundingClientRect().height,
        width: firstCard.getBoundingClientRect().width,
    }
}

function fillRow(cardSize) {
    let cardNodes = document.querySelectorAll('.js-card');
    const containerWidth = document.querySelector('.js-cards').clientWidth;
    const cardsCountPerRow = Math.floor(containerWidth / cardSize.width);
    let addedCardCount = cardNodes.length;
    let needToAddCardsCount = cardsCountPerRow - (frac(addedCardCount / cardsCountPerRow) * cardsCountPerRow);

    for (let i = 0; i < needToAddCardsCount; i++) {
        generateCardMarkup();
    }
}

function frac(f) {
    return f % 1;
}

function fillColumn(cardSize) {
    let cardsContainerNode = document.querySelector('.js-cards');
    let viewPortBottomPos = window.innerHeight + document.documentElement.scrollTop;
    let cardsContainerBottomPos = cardsContainerNode.getBoundingClientRect().bottom + document.documentElement.scrollTop;

    if (viewPortBottomPos > cardsContainerBottomPos) {
        fillRow(cardSize);
        fillColumn(cardSize);
    }
}

export const addCardWhileScroll = () => {
    let cardNodes = document.querySelectorAll('.js-card');

    if (isInViewPort(cardNodes[cardNodes.length - 1])) {
        let cardSize = getCardSize();
        fillColumn(cardSize);
    }
}