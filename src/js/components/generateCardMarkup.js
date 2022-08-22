import { generateString } from "./generateString";

const cardsData = [];

export const generateCardMarkup = (cb, storageData) => {
    const cardsContainerNode = document.querySelector('.js-cards');
    let cardNode = document.createElement('div');
    cardNode.classList.add('cards__item');
    cardNode.classList.add('js-card');
    

    let preloader = document.createElement('div');
    preloader.classList.add('preloader');

    cardNode.appendChild(preloader);
    cardsContainerNode.appendChild(cardNode);

    setTimeout(() => {
        const title = generateString(15);
        const text = generateString(50);
        const modalContent = generateString(300);

        cardNode.innerHTML = `
            <h2 class="cards__item-title">${title}</h2>
            <p class="cards__item-text">${text}</p>
            <button class="button button--default js-card-open">Open modal</button>
            <button class="button button--purple js-card-remove">Remove card</button>
        `;

        setCardData(cardNode, modalContent);

        if (cb) cb();
    }, 3000);
}

export const setCardData = (node, modalContent) => {
    cardsData.push({'node': node, 'modalContent': modalContent});
}

export const getCardData = (node) => {
    const currentCardNode = node.closest('.js-card');
    const cardData = cardsData.find(e => e.node === currentCardNode);
    
    return cardData;
}

export const removeCardData = (node) => {
    cardsData.forEach((e, i) => {
        if (e.node === node) cardsData.splice(i, 1);
    })
}