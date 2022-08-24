import GenerateCard from "./GenerateCard";
import { isInViewPort } from "./isInViewPort";

export default class FillCard {
    constructor(storage) {
        this.storage = storage;
        this.buttonNodes = {
            'fill': document.querySelector('.js-control-fill'),
            'remove': document.querySelector('.js-control-remove'),
            'clear': document.querySelector('.js-control-clear'),
            'add': document.querySelector('.js-control-add')
        }
        this.cardsData = storage.getData();
        this.containerWidth = document.querySelector('.js-cards').clientWidth;
    }

    async init() {
        if (this.buttonNodes.fill.classList.contains('active')) return false

        if (!this.cardsData.length) {
            const card = new GenerateCard(this.storage);
            await card.createMarkup();
            this.filler();
        } else {
            this.filler();
        }
    }

    getCardSize() {
        const firstCard = document.querySelector('.js-card');
        return {
            height: firstCard.getBoundingClientRect().height,
            width: firstCard.getBoundingClientRect().width,
        }
    }

    async filler() {
        this.storage.isPromiseDone = false;
        this.buttonNodes.clear.classList.add('disabled');
        this.buttonNodes.fill.classList.add('active');
        this.buttonNodes.add.classList.add('disabled');

        const cardsContainerNode = document.querySelector('.js-cards');
        let viewPortBottomPos = window.innerHeight + document.documentElement.scrollTop;
        let cardsContainerBottomPos = cardsContainerNode.getBoundingClientRect().bottom + document.documentElement.scrollTop;

        if (viewPortBottomPos > cardsContainerBottomPos) {
            await this.rowFiller();
            this.filler();
        } else {
            this.storage.isPromiseDone = true;
            this.buttonNodes.clear.classList.remove('disabled');
            this.buttonNodes.add.classList.remove('disabled');
        }
    }

    async rowFiller() {
        let cardSize = this.getCardSize();
        let cardsCountPerRow = Math.floor(this.containerWidth / cardSize.width);
        let addedCardCount = this.cardsData.length;
        let needToAddCardsCount = cardsCountPerRow - (frac(addedCardCount / cardsCountPerRow) * cardsCountPerRow);

        for (let i = 0; i < needToAddCardsCount; i++) {
            const card = new GenerateCard(this.storage);
            await card.createMarkup();

            this.buttonNodes.remove.classList.remove('disabled');
        }

        function frac(f) {
            return f % 1;
        }
    }

    addingOnScroll() {
        if (isInViewPort(this.cardsData[this.cardsData.length - 1].node)) {
            if (this.storage.isPromiseDone) {
                this.filler();
            }
        }
    }
}