import GenerateString from "./GenerateString";

export default class GenerateCard {
    constructor(storage) {
        this.cardsContainerNode = document.querySelector('.js-cards');
        this.storage = storage;
    }

    async createMarkup() {
        let cardNode = document.createElement('div');
        cardNode.classList.add('cards__item');
        cardNode.classList.add('js-card');

        let preloader = document.createElement('div');
        preloader.classList.add('preloader');

        cardNode.appendChild(preloader);
        this.cardsContainerNode.appendChild(cardNode);

        const cardTitle = new GenerateString(15).getString();
        const cardText = new GenerateString(50).getString();
        const modalText = new GenerateString(300).getString();

        return new Promise((resolve) => {
            setTimeout(() => {
                cardNode.innerHTML = `
                    <h2 class="cards__item-title">${cardTitle}</h2>
                    <p class="cards__item-text">${cardText}</p>
                    <button class="button button--default js-card-open">Open modal</button>
                    <button class="button button--purple js-card-remove">Remove card</button>
                `;

                const newCardData = {
                    'node': cardNode,
                    'title': cardTitle,
                    'text': cardText,
                    'modal': modalText
                }

                // this.storage.isAllSyncDone = false;
                this.storage.setData(newCardData);

                resolve(true)
            }, 3000);
        })
    }
}