import { addCard } from "./addCard"
import { clearCardList } from "./clearCardList";
import { addCardWhileScroll, fillCardList } from "./fillCardList";
import { modal, modalHide, modalShow } from "./modal";
import { removeCard } from "./removeCard";

export const controler = () => {
    const nodes = {
        control: document.querySelector('.js-control'),
        cards: document.querySelector('.js-cards'),
        modal: document.querySelector('.js-modal')
    }

    nodes.control.addEventListener('click', e => {
        if (e.target.classList.contains('js-control-add')) {
            addCard();
        }
        if (e.target.classList.contains('js-control-remove')) {
            removeCard();
        }
        if (e.target.classList.contains('js-control-clear')) {
            window.removeEventListener('scroll', addCardWhileScroll);
            clearCardList();
        }
        if (e.target.classList.contains('js-control-fill')) {
            fillCardList();
            window.addEventListener('scroll', addCardWhileScroll);
        }
    })

    nodes.cards.addEventListener('click', e => {
        if (e.target.classList.contains('js-card-open')) {
            modal(e.target);
            modalShow();
        }
        if (e.target.classList.contains('js-card-remove')) {
            removeCard(e.target.closest('.js-card'));
        }
    })

    nodes.modal.addEventListener('click', e => {
        if (e.target.classList.contains('js-modal-overlay')) {
            modalHide();
        }
    })
}