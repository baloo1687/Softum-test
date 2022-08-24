/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/components/Controller.js":
/*!*****************************************!*\
  !*** ./src/js/components/Controller.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Controller)
/* harmony export */ });
/* harmony import */ var _addCard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addCard */ "./src/js/components/addCard.js");
/* harmony import */ var _clearCard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clearCard */ "./src/js/components/clearCard.js");
/* harmony import */ var _removeCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./removeCard */ "./src/js/components/removeCard.js");
/* harmony import */ var _FillCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FillCard */ "./src/js/components/FillCard.js");
/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Storage */ "./src/js/components/Storage.js");
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Modal */ "./src/js/components/Modal.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







class Controller {
  constructor() {
    _defineProperty(this, "clickHandler", () => {
      this.nodes.control.addEventListener('click', e => {
        if (e.target.classList.contains('js-control-add')) {
          if (this.storage.isPromiseDone) {
            this.storage.isPromiseDone = false;
            (0,_addCard__WEBPACK_IMPORTED_MODULE_0__.addCard)(this.storage);
          }
        }

        if (e.target.classList.contains('js-control-remove')) {
          (0,_removeCard__WEBPACK_IMPORTED_MODULE_2__.removeCard)(this.storage);
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
            (0,_clearCard__WEBPACK_IMPORTED_MODULE_1__.clearCard)(this.storage);
          }
        }
      });
      this.nodes.cards.addEventListener('click', e => {
        if (e.target.classList.contains('js-card-open')) {
          this.modal.addModalContent(e.target.closest('.js-card'));
          this.modal.show();
        }

        if (e.target.classList.contains('js-card-remove')) {
          (0,_removeCard__WEBPACK_IMPORTED_MODULE_2__.removeCard)(this.storage, e.target.closest('.js-card'));
        }
      });
      this.nodes.modal.addEventListener('click', e => {
        if (e.target.classList.contains('js-modal-overlay')) {
          this.modal.hide();
        }
      });
    });

    this.nodes = {
      control: document.querySelector('.js-control'),
      cards: document.querySelector('.js-cards'),
      modal: document.querySelector('.js-modal')
    };
    this.storage = new _Storage__WEBPACK_IMPORTED_MODULE_4__["default"]();
    this.fillCard = new _FillCard__WEBPACK_IMPORTED_MODULE_3__["default"](this.storage);
    this.boundScrollHandler = this.fillCard.addingOnScroll.bind(this.fillCard);
    this.modal = new _Modal__WEBPACK_IMPORTED_MODULE_5__["default"](this.storage);
    this.clickHandler();
  }

}

/***/ }),

/***/ "./src/js/components/FillCard.js":
/*!***************************************!*\
  !*** ./src/js/components/FillCard.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FillCard)
/* harmony export */ });
/* harmony import */ var _GenerateCard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GenerateCard */ "./src/js/components/GenerateCard.js");
/* harmony import */ var _isInViewPort__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isInViewPort */ "./src/js/components/isInViewPort.js");


class FillCard {
  constructor(storage) {
    this.storage = storage;
    this.buttonNodes = {
      'fill': document.querySelector('.js-control-fill'),
      'remove': document.querySelector('.js-control-remove'),
      'clear': document.querySelector('.js-control-clear'),
      'add': document.querySelector('.js-control-add')
    };
    this.cardsData = storage.getData();
    this.containerWidth = document.querySelector('.js-cards').clientWidth;
  }

  async init() {
    if (this.buttonNodes.fill.classList.contains('active')) return false;

    if (!this.cardsData.length) {
      const card = new _GenerateCard__WEBPACK_IMPORTED_MODULE_0__["default"](this.storage);
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
      width: firstCard.getBoundingClientRect().width
    };
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
    let needToAddCardsCount = cardsCountPerRow - frac(addedCardCount / cardsCountPerRow) * cardsCountPerRow;

    for (let i = 0; i < needToAddCardsCount; i++) {
      const card = new _GenerateCard__WEBPACK_IMPORTED_MODULE_0__["default"](this.storage);
      await card.createMarkup();
      this.buttonNodes.remove.classList.remove('disabled');
    }

    function frac(f) {
      return f % 1;
    }
  }

  addingOnScroll() {
    if ((0,_isInViewPort__WEBPACK_IMPORTED_MODULE_1__.isInViewPort)(this.cardsData[this.cardsData.length - 1].node)) {
      if (this.storage.isPromiseDone) {
        this.filler();
      }
    }
  }

}

/***/ }),

/***/ "./src/js/components/GenerateCard.js":
/*!*******************************************!*\
  !*** ./src/js/components/GenerateCard.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GenerateCard)
/* harmony export */ });
/* harmony import */ var _GenerateString__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GenerateString */ "./src/js/components/GenerateString.js");

class GenerateCard {
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
    const cardTitle = new _GenerateString__WEBPACK_IMPORTED_MODULE_0__["default"](15).getString();
    const cardText = new _GenerateString__WEBPACK_IMPORTED_MODULE_0__["default"](50).getString();
    const modalText = new _GenerateString__WEBPACK_IMPORTED_MODULE_0__["default"](300).getString();
    return new Promise(resolve => {
      setTimeout(() => {
        cardNode.innerHTML = "\n                    <h2 class=\"cards__item-title\">".concat(cardTitle, "</h2>\n                    <p class=\"cards__item-text\">").concat(cardText, "</p>\n                    <button class=\"button button--default js-card-open\">Open modal</button>\n                    <button class=\"button button--purple js-card-remove\">Remove card</button>\n                ");
        const newCardData = {
          'node': cardNode,
          'title': cardTitle,
          'text': cardText,
          'modal': modalText
        };
        this.storage.setData(newCardData);
        resolve(true);
      }, 3000);
    });
  }

}

/***/ }),

/***/ "./src/js/components/GenerateString.js":
/*!*********************************************!*\
  !*** ./src/js/components/GenerateString.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GenerateStrting)
/* harmony export */ });
class GenerateStrting {
  constructor(stringLength) {
    this.stringLength = stringLength;
    this.lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at aliquam nunc, hendrerit ornare eros. Nunc blandit aliquet lobortis. Proin consequat mauris consequat velit dictum rutrum. Nulla ac semper lectus. Nullam tortor diam, volutpat et convallis blandit, commodo id purus. Ut varius mi in velit finibus, sed efficitur erat tristique. Nunc et diam vestibulum, sagittis ligula fringilla, bibendum orci. Mauris eget dui faucibus, tristique dui sit amet, egestas sapien. Sed placerat malesuada ipsum id vulputate. Aliquam maximus mi sed nibh gravida mattis. Nam in mattis ligula. Proin non ante at tortor tincidunt varius. Suspendisse sit amet sapien sed magna varius maximus. Maecenas sollicitudin velit id urna vestibulum, in condimentum quam lacinia. Suspendisse sed purus quis tortor rutrum pulvinar. Pellentesque maximus nunc neque. Mauris finibus aliquam ex, euismod suscipit sem congue in. Mauris eu vestibulum elit. Fusce eu aliquam libero. Suspendisse lacinia turpis a lacinia semper. Cras scelerisque augue ac quam dictum laoreet. Aenean luctus ligula sed justo placerat ultricies mollis nec ante. Quisque vestibulum eget velit id efficitur. Aenean ut varius nulla, a porta massa. Sed vulputate a massa a sollicitudin. Etiam elit nulla, efficitur ut sapien vel, pulvinar pellentesque augue. Cras at dignissim lorem. Quisque convallis urna ut ipsum viverra, eu molestie felis blandit. Phasellus vel enim ac lectus tempor viverra. Fusce non elit ut lectus ullamcorper consequat. Integer ultricies blandit arcu. Nunc faucibus nisl lorem, at malesuada felis hendrerit et. Cras tincidunt enim in ligula tincidunt maximus. In at ipsum nisi. Maecenas blandit dignissim ornare. Donec imperdiet ante ex, at accumsan turpis accumsan nec. Nam et metus id lacus pulvinar iaculis nec at sem. Nunc quis sapien a nulla venenatis viverra. Praesent id massa eu velit porttitor tristique. Phasellus porttitor gravida risus. Morbi semper dignissim ultricies. Donec tempus at ex sed aliquam. Cras risus libero, viverra id justo vel, mollis feugiat dolor. Aenean pretium et nulla vel aliquet. Proin sagittis, quam at ornare tempor, nibh tellus rutrum dui, at pharetra sem lorem vel justo. Nunc ligula nunc, consequat tincidunt finibus ac, rutrum eu libero. Donec non arcu id felis viverra pretium faucibus at ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum velit ex, rhoncus sit amet molestie eget, luctus ac nibh. Fusce placerat in purus nec placerat. Mauris sit amet scelerisque tortor, et varius nisi. Nulla facilisi. Pellentesque non quam at lectus varius cursus. Mauris pulvinar in eros non scelerisque. Integer faucibus lorem vel libero interdum scelerisque. Praesent sit amet est sodales, sagittis purus vel, pulvinar ex. Integer sit amet ipsum ac lacus rhoncus auctor. In hac habitasse platea dictumst. Morbi sodales, purus eget placerat viverra, eros ante congue neque, vel facilisis augue nulla a metus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam a ex quam. Maecenas imperdiet massa sed risus viverra convallis. Donec congue, justo nec malesuada ultrices, libero arcu cursus nisi, quis vulputate ipsum leo et ante. Nunc accumsan in est et lacinia. Suspendisse ut odio vehicula, euismod enim non, porta ex. Mauris ac porttitor quam. Fusce in velit et dui sagittis consectetur. Integer pretium maximus lorem, ut accumsan ex vehicula ut. Cras molestie, massa a maximus dictum, magna sem porta nisi, a convallis tortor risus quis quam. In porta fermentum varius. Aenean non ornare erat.';
    this.randomStartNum = this.stringLength > this.lorem.length ? 0 : Math.floor(Math.random() * (this.lorem.length - this.stringLength));
    this.randomEndNum = this.stringLength > this.lorem.length ? this.lorem.length : this.stringLength ? this.randomStartNum + this.stringLength : this.randomStartNum + 50;
  }

  getString() {
    if (this.randomEndNum - this.randomStartNum > this.stringLength && this.randomEndNum - this.randomStartNum <= 5) {
      this.getString();
    } else {
      let result = this.lorem.slice(this.randomStartNum + 1, this.randomEndNum);

      if (result.slice(0, 1) === ',' || result.slice(0, 1) === '.' || result.slice(0, 1) === ' ') {
        result = result.replace(result.slice(0, 1), '');
      }

      let upperLetter = result.slice(0, 1).toUpperCase();
      return upperLetter + result.slice(1, result.length);
    }
  }

}

/***/ }),

/***/ "./src/js/components/Modal.js":
/*!************************************!*\
  !*** ./src/js/components/Modal.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Modal)
/* harmony export */ });
class Modal {
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

/***/ }),

/***/ "./src/js/components/Storage.js":
/*!**************************************!*\
  !*** ./src/js/components/Storage.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Storage)
/* harmony export */ });
class Storage {
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

/***/ }),

/***/ "./src/js/components/addCard.js":
/*!**************************************!*\
  !*** ./src/js/components/addCard.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addCard": () => (/* binding */ addCard)
/* harmony export */ });
/* harmony import */ var _GenerateCard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GenerateCard */ "./src/js/components/GenerateCard.js");

const addCard = async storage => {
  const cardsData = storage.getData();
  const addButtonNode = document.querySelector('.js-control-add');
  const removeButtonNode = document.querySelector('.js-control-remove');
  const fillButtonNode = document.querySelector('.js-control-fill');
  const clearButtonNode = document.querySelector('.js-control-clear');
  addButtonNode.classList.add('disabled');
  clearButtonNode.classList.add('disabled');
  fillButtonNode.classList.add('disabled');
  const card = new _GenerateCard__WEBPACK_IMPORTED_MODULE_0__["default"](storage);
  await card.createMarkup();
  addButtonNode.classList.remove('disabled');
  removeButtonNode.classList.remove('disabled');
  fillButtonNode.classList.remove('disabled');

  if (cardsData.length > 1) {
    clearButtonNode.classList.remove('disabled');
  }

  storage.isPromiseDone = true;
};

/***/ }),

/***/ "./src/js/components/clearCard.js":
/*!****************************************!*\
  !*** ./src/js/components/clearCard.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clearCard": () => (/* binding */ clearCard)
/* harmony export */ });
const clearCard = storage => {
  const cardsData = storage.getData();
  const clearButtonNode = document.querySelector('.js-control-clear');
  const fillButtonNode = document.querySelector('.js-control-fill');
  if (!cardsData.length) return false;

  while (cardsData.length > 1) {
    storage.removeData();
  }

  fillButtonNode.classList.remove('active');
  clearButtonNode.classList.add('disabled');
};

/***/ }),

/***/ "./src/js/components/isInViewPort.js":
/*!*******************************************!*\
  !*** ./src/js/components/isInViewPort.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isInViewPort": () => (/* binding */ isInViewPort)
/* harmony export */ });
const isInViewPort = element => {
  let bounding = element.getBoundingClientRect();

  if (bounding.top >= 0 && bounding.left >= 0 && bounding.right <= (window.innerWidth || document.documentElement.clientWidth) && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
    return true;
  } else {
    return false;
  }
};

/***/ }),

/***/ "./src/js/components/removeCard.js":
/*!*****************************************!*\
  !*** ./src/js/components/removeCard.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "removeCard": () => (/* binding */ removeCard)
/* harmony export */ });
const removeCard = (storage, cardNode) => {
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
};

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Controller */ "./src/js/components/Controller.js");

new _components_Controller__WEBPACK_IMPORTED_MODULE_0__["default"]();

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js!./src/scss/index.scss":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js!./src/scss/index.scss ***!
  \********************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "html, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nbody {\n  line-height: 1;\n}\n\nol, ul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n* {\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: \"Montserrat\", sans-serif;\n  background: #0f1015;\n  max-width: 1200px;\n  margin: 0 auto;\n  overflow-x: hidden;\n  color: #fff;\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n}\n\n.header {\n  padding: 20px 15px;\n  position: fixed;\n  left: 50%;\n  top: 0;\n  transform: translateX(-50%);\n  width: 100%;\n  max-width: 1200px;\n  background: #0f1015;\n  z-index: 100;\n}\n.header__buttons {\n  display: flex;\n  justify-content: space-between;\n}\n@media (max-width: 656px) {\n  .header__buttons .button {\n    font-size: 14px;\n  }\n}\n\n.main {\n  padding: 20px 15px;\n  margin-top: 96px;\n}\n\n.cards {\n  display: flex;\n  flex-wrap: wrap;\n}\n@media (max-width: 656px) {\n  .cards {\n    justify-content: center;\n  }\n}\n.cards__item {\n  min-width: 277px;\n  min-height: 277px;\n  max-width: calc((100% - 60px) / 4);\n  margin-right: 20px;\n  margin-bottom: 20px;\n  border: 1px solid #fff;\n  border-radius: 10px;\n  padding: 15px;\n  position: relative;\n}\n@media (min-width: 1200px) {\n  .cards__item:nth-child(4n), .cards__item:last-child {\n    margin-right: 0;\n  }\n}\n@media (max-width: 1200px) {\n  .cards__item {\n    max-width: 33.3333333333%;\n    width: calc(33.3333333333% - 13.3333333333px);\n    margin-left: 0;\n    margin-right: 20px;\n  }\n  .cards__item:nth-child(3n) {\n    margin-right: 0;\n  }\n}\n@media (max-width: 920px) {\n  .cards__item {\n    max-width: 50%;\n    width: calc((100% - 20px) / 2);\n    margin-right: 0;\n    margin-left: 20px;\n  }\n  .cards__item:nth-child(odd) {\n    margin-left: 0;\n  }\n}\n@media (max-width: 656px) {\n  .cards__item {\n    max-width: 100%;\n    width: 100%;\n    height: auto;\n    margin-left: 0;\n  }\n}\n.cards__item-title {\n  font-size: 18px;\n  padding-bottom: 15px;\n  font-weight: bold;\n}\n.cards__item-text {\n  font-size: 16px;\n  padding-bottom: 25px;\n}\n.cards__item .button {\n  width: 100%;\n  font-size: 20px;\n  margin-bottom: 15px;\n}\n.cards__item .button:last-child {\n  margin-bottom: 0;\n}\n\n.button {\n  font-size: 24px;\n  padding: 15px 20px;\n  border-radius: 10px;\n  cursor: pointer;\n  transition: 0.3s;\n  color: #fff;\n}\n.button--default {\n  border: 1px solid #fff;\n  background-color: transparent;\n}\n.button--default:hover {\n  color: #ff186c;\n  border-color: #ff186c;\n}\n.button--purple {\n  border: 1px solid #ff186c;\n  background-color: #ff186c;\n}\n.button--purple:hover {\n  background-color: transparent;\n}\n.button.disabled {\n  border-color: #b2b2b2;\n  color: #b2b2b2;\n  cursor: default;\n}\n.button.active {\n  position: relative;\n  overflow: hidden;\n  border: none;\n  color: #f2ff00;\n}\n.button.active:before {\n  content: \"\";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background-color: #0f1015;\n  border-radius: 10px;\n  width: calc(100% - 2px);\n  height: calc(100% - 2px);\n  z-index: 10;\n}\n.button.active:after {\n  content: \"\";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 50%;\n  height: 200%;\n  transform: translate(-50%, -50%);\n  background-color: #f2ff00;\n  border-radius: 10px;\n  -webkit-animation: spin 2s linear infinite;\n          animation: spin 2s linear infinite;\n  z-index: 5;\n}\n.button span {\n  position: relative;\n  z-index: 100;\n}\n@-webkit-keyframes spin {\n  from {\n    transform: translate(-50%, -50%) rotate(0);\n  }\n  to {\n    transform: translate(-50%, -50%) rotate(360deg);\n  }\n}\n@keyframes spin {\n  from {\n    transform: translate(-50%, -50%) rotate(0);\n  }\n  to {\n    transform: translate(-50%, -50%) rotate(360deg);\n  }\n}\n\n.preloader {\n  width: 50%;\n  height: 50%;\n  border-radius: 10px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  overflow: hidden;\n}\n.preloader:before {\n  content: \"\";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background-color: #0f1015;\n  border-radius: 10px;\n  width: calc(100% - 2px);\n  height: calc(100% - 2px);\n  z-index: 10;\n}\n.preloader:after {\n  content: \"\";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 50%;\n  height: 200%;\n  transform: translate(-50%, -50%);\n  background-color: #f2ff00;\n  border-radius: 10px;\n  -webkit-animation: spin 1s linear infinite;\n          animation: spin 1s linear infinite;\n  z-index: 5;\n}\n@media (max-width: 656px) {\n  .preloader:after {\n    width: 20%;\n  }\n}\n@keyframes spin {\n  from {\n    transform: translate(-50%, -50%) rotate(0);\n  }\n  to {\n    transform: translate(-50%, -50%) rotate(360deg);\n  }\n}\n\n.modal {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 1000;\n  opacity: 0;\n  transition: 0.4s;\n  z-index: 0;\n}\n.modal__overlay {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.3);\n}\n.modal__content {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  width: 50%;\n  height: auto;\n  background-color: #0f1015;\n  color: #fff;\n  font-size: 18px;\n  line-height: 22px;\n  border-radius: 20px;\n  padding: 15px;\n}\n@media (max-width: 920px) {\n  .modal__content {\n    width: 90%;\n  }\n}\n.modal.show {\n  opacity: 1;\n  z-index: 1000;\n}", "",{"version":3,"sources":["webpack://./src/css/reset.css","webpack://./src/scss/index.scss","webpack://./src/scss/_variables.scss","webpack://./src/scss/_header.scss","webpack://./src/scss/_mixins.scss","webpack://./src/scss/_main.scss","webpack://./src/scss/components/_cards.scss","webpack://./src/scss/components/_buttons.scss","webpack://./src/scss/components/_preloader.scss","webpack://./src/scss/components/_modal.scss"],"names":[],"mappings":"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","sourcesContent":["html, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}","@import '../css/reset';\n@import 'variables';\n@import 'mixins';\n\n* {\n    box-sizing: border-box;\n}\n\nbody {\n\tfont-family: 'Montserrat', sans-serif;\n\tbackground: $background-color;\n\tmax-width: 1200px;\n\tmargin: 0 auto;\n    overflow-x: hidden;\n\tcolor: $white-color;\n\tmin-height: 100vh;\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n@import 'header';\n@import 'main';\n@import './components/cards';\n@import './components/buttons';\n@import './components/preloader';\n@import './components/modal';\n","$sm-phone: 360px;\n$phone: 656px;\n$sm-tablet: 920px;\n$desktop: 1200px;\n\n\n$purple-color: #ff186c;\n$white-color: #fff;\n$gray-color: #b2b2b2;\n$yellow-color: #f2ff00;\n$background-color: #0f1015;\n$light-black-color: rgba(0, 0, 0, 0.3);",".header {\n    padding: 20px 15px;\n    position: fixed;\n    left: 50%;\n    top: 0;\n    transform: translateX(-50%);\n    width: 100%;\n\tmax-width: 1200px;\n\tbackground: $background-color;\n    z-index: 100;\n    &__buttons {\n        display: flex;\n        justify-content: space-between;\n        .button {\n            @include phone {\n                font-size: 14px;\n            }    \n        }\n    }\n}","@mixin sm-phone {\n    @media (min-width: $sm-phone) { @content; }\n}\n@mixin phone {\n    @media (max-width: $phone) { @content; }\n}\n@mixin sm-tablet {\n    @media (max-width: $sm-tablet) { @content; }\n}\n@mixin lg-tablet {\n    @media (max-width: $desktop) { @content; }\n}\n@mixin desktop {\n    @media (min-width: $desktop) { @content; }\n}",".main {\n    padding: 20px 15px;\n    margin-top: 96px;\n}",".cards {\n    display: flex;\n    flex-wrap: wrap;\n    @include phone {\n        justify-content: center;\n    }    \n    &__item {\n        min-width: 277px;\n        min-height: 277px;\n        max-width: calc((100% - 60px) / 4);\n        margin-right: 20px;\n        margin-bottom: 20px;\n        border: 1px solid $white-color;\n        border-radius: 10px;\n        padding: 15px;\n        position: relative;\n        @include desktop {\n            &:nth-child(4n), &:last-child {\n                margin-right: 0;\n            }\n        }\n        @include lg-tablet {\n            max-width: calc(100% / 3);\n            width: calc((100%/3) - (20px * 2 /3));\n            margin-left: 0;\n            margin-right: 20px;\n            &:nth-child(3n) {\n                margin-right: 0;\n            }\n        }\n        @include sm-tablet {\n            max-width: 50%;\n            width: calc((100% - 20px) / 2);\n            margin-right: 0;\n            margin-left: 20px;\n            &:nth-child(odd) {\n                margin-left: 0;\n            }\n        }\n        @include phone {\n            max-width: 100%;\n            width: 100%;\n            height: auto;\n            margin-left: 0;\n        }\n        &-title {\n            font-size: 18px;\n            padding-bottom: 15px;\n            font-weight: bold;\n        }\n        &-text {\n            font-size: 16px;\n            padding-bottom: 25px;\n        }\n        .button {\n            width: 100%;\n            font-size: 20px;\n            margin-bottom: 15px;\n            &:last-child {\n                margin-bottom: 0;\n            }\n        }\n    }\n}",".button {\n    font-size: 24px;\n    padding: 15px 20px;\n    border-radius: 10px;\n    cursor: pointer;\n    transition: .3s;\n    color: #fff;\n    &--default {\n        border: 1px solid $white-color;\n        background-color: transparent;\n        &:hover {\n            color: $purple-color;\n            border-color: $purple-color;\n        }\n    }\n    &--purple {\n        border: 1px solid $purple-color;\n        background-color: $purple-color;\n        &:hover {\n            background-color: transparent;\n        }\n    }\n    &.disabled {\n        border-color: $gray-color;\n        color: $gray-color;\n        cursor: default;\n    }\n    &.active {\n        position: relative;\n        overflow: hidden;\n        border: none;\n        color: $yellow-color;\n        &:before {\n            content: '';\n            position: absolute;\n            top: 50%;\n            left: 50%;\n            transform: translate(-50%, -50%);\n            background-color: $background-color;\n            border-radius: 10px;\n            width: calc(100% - 2px);\n            height: calc(100% - 2px);\n            z-index: 10;\n        }\n        &:after {\n            content: '';\n            position: absolute;\n            top: 50%;\n            left: 50%;\n            width: 50%;\n            height: 200%;\n            transform: translate(-50%, -50%);\n            background-color: $yellow-color;\n            border-radius: 10px;\n            animation: spin 2s linear infinite;\n            z-index: 5;\n        }\n    }\n    span {\n        position: relative;\n        z-index: 100;\n    }\n    @keyframes spin {\n        from {transform: translate(-50%, -50%) rotate(0);}\n        to   {transform: translate(-50%, -50%) rotate(360deg);}\n    }\n}",".preloader {\n    width: 50%;\n    height: 50%;\n    border-radius: 10px;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    overflow: hidden;\n    &:before {\n        content: '';\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        transform: translate(-50%, -50%);\n        background-color: $background-color;\n        border-radius: 10px;\n        width: calc(100% - 2px);\n        height: calc(100% - 2px);\n        z-index: 10;\n    }\n    &:after {\n        content: '';\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        width: 50%;\n        height: 200%;\n        transform: translate(-50%, -50%);\n        background-color: $yellow-color;\n        border-radius: 10px;\n        animation: spin 1s linear infinite;\n        z-index: 5;\n        @include phone {\n            width: 20%;\n        }\n    }\n    @keyframes spin {\n        from {transform: translate(-50%, -50%) rotate(0);}\n        to   {transform: translate(-50%, -50%) rotate(360deg);}\n    }\n}",".modal {\n    position: fixed;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 1000;\n    opacity: 0;\n    transition: .4s;\n    z-index: 0;\n    &__overlay {\n        position: absolute;\n        left: 0;\n        top: 0;\n        width: 100%;\n        height: 100%;\n        background-color: $light-black-color;\n    }\n    &__content {\n        position: absolute;\n        left: 50%;\n        top: 50%;\n        transform: translate(-50% , -50%);\n        width: 50%;\n        height: auto;\n        background-color: $background-color;\n        color: $white-color;\n        font-size: 18px;\n        line-height: 22px;\n        border-radius: 20px;\n        padding: 15px;\n        @include sm-tablet {\n            width: 90%;\n        }\n    }\n    &.show {\n        opacity: 1;\n        z-index: 1000;\n    }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/scss/index.scss":
/*!*****************************!*\
  !*** ./src/scss/index.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[0].use[2]!../../node_modules/sass-loader/dist/cjs.js!./index.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js!./src/scss/index.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/index.scss */ "./src/scss/index.scss");
/* harmony import */ var _js_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/index.js */ "./src/js/index.js");


})();

/******/ })()
;
//# sourceMappingURL=main.js.map