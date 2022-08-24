export const removeCard = (storage, cardNode) => {
    const cardsData = storage.getData();

    if (!cardsData) return false;

    const removeButtonNode = document.querySelector('.js-control-remove');
    const clearButtonNode = document.querySelector('.js-control-clear');

    storage.removeData(cardNode ? cardNode : false);

    if (!cardsData.length) {
        removeButtonNode.classList.add('disabled');
        clearButtonNode.classList.add('disabled');
    } else if (cardsData.length === 1) {
        clearButtonNode.classList.add('disabled');
    }
}