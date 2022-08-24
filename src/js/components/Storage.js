export default class Storage {
    constructor() {
        this.cardsData = [];
        this.isPromiseDone = true;
    }

    getData() {
        return this.cardsData;
    }

    setData(data) {
        this.cardsData.push(data);
    }

    removeData(node) {
        if (node) {
            this.cardsData.find(e => e.node === node).node.remove();
            this.cardsData.splice(this.cardsData.indexOf(this.cardsData.find(e => e.node === node)), 1);
        } else {
            this.cardsData[this.cardsData.length - 1].node.remove();
            this.cardsData.pop();
        }
    }
}