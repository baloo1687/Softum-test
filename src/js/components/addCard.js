import GenerateCard from "./GenerateCard";

export const addCard = async (storage) => {
    const cardsData = storage.getData();
    const addButtonNode = document.querySelector('.js-control-add');
    const removeButtonNode = document.querySelector('.js-control-remove');
    const fillButtonNode = document.querySelector('.js-control-fill');
    const clearButtonNode = document.querySelector('.js-control-clear');
    addButtonNode.classList.add('disabled');
    clearButtonNode.classList.add('disabled');
    fillButtonNode.classList.add('disabled');

    const card = new GenerateCard(storage);
    await card.createMarkup();

    addButtonNode.classList.remove('disabled');
    removeButtonNode.classList.remove('disabled');
    fillButtonNode.classList.remove('disabled');

    if (cardsData.length > 1) {
        clearButtonNode.classList.remove('disabled');
    }

    storage.isPromiseDone = true;
}