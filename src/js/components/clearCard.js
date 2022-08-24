export const clearCard = (storage) => {
    const cardsData = storage.getData();
    const clearButtonNode = document.querySelector('.js-control-clear');
    const fillButtonNode = document.querySelector('.js-control-fill');

    if (!cardsData.length) return false;

    while(cardsData.length > 1) {
        storage.removeData();
    }
    
    fillButtonNode.classList.remove('active');
    clearButtonNode.classList.add('disabled');
}