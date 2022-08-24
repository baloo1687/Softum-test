import { addCard } from "./addCard"
import { clearCard } from "./clearCard";
import { removeCard } from "./removeCard";
import FillCard from "./FillCard";
import Storage from "./Storage";
import Modal from "./Modal";

export default class Controller {
    constructor() {
        this.nodes = {
            control: document.querySelector('.js-control'),
            cards: document.querySelector('.js-cards'),
            modal: document.querySelector('.js-modal')
        }

        this.storage = new Storage();
        this.fillCard = new FillCard(this.storage);
        this.boundScrollHandler = this.fillCard.addingOnScroll.bind(this.fillCard);

        this.modal = new Modal(this.storage);

        this.clickHandler();
    }

    clickHandler = () => {
        this.nodes.control.addEventListener('click', e => {
            if (e.target.classList.contains('js-control-add')) {
                if (this.storage.isPromiseDone) {
                    this.storage.isPromiseDone = false;
                    addCard(this.storage)
                }
            }
            if (e.target.classList.contains('js-control-remove')) {
                removeCard(this.storage);
            }
            if (e.target.classList.contains('js-control-fill')) {
                if (this.storage.isPromiseDone) {
                    this.storage.isPromiseDone = false;
                    this.fillCard.init();
                }
                window.addEventListener('scroll', this.boundScrollHandler);
            }
            if (e.target.classList.contains('js-control-clear')) {
                window.removeEventListener('scroll', this.boundScrollHandler);
                if (this.storage.isPromiseDone) {
                    clearCard(this.storage);
                }
            }
        })

        this.nodes.cards.addEventListener('click', e => {
            if (e.target.classList.contains('js-card-open')) {
                this.modal.addModalContent(e.target.closest('.js-card'));
                this.modal.show();
            }
            if (e.target.classList.contains('js-card-remove')) {
                removeCard(this.storage, e.target.closest('.js-card'));
            }
        })

        this.nodes.modal.addEventListener('click', e => {
            if (e.target.classList.contains('js-modal-overlay')) {
                this.modal.hide();
            }
        })
    }
}