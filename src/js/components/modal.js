

export default class Modal {
    constructor(storage) {
        this.modalNode = document.querySelector('.js-modal');
        this.modalContentNode = document.querySelector('.js-modal-content');
        this.cardsData = storage.getData();
    }

    addModalContent(node) {
        let text = this.cardsData.find(e => e.node === node).modal;
        this.modalContentNode.innerHTML = text;
    }

    show() {
        this.modalNode.classList.add('show');
    }

    hide() {
        this.modalNode.classList.remove('show');
    }
}

// export const modal = (buttonNode) => {
//     const modalContentNode = document.querySelector('.js-modal-content');
//     const cardData = getCardData(buttonNode);
// }