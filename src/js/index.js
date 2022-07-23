import { featuresToggler, couponToggler, couponApplyer, payMethodToggler, languageToggler, footerMenuToggler } from "./components.js";

featuresToggler(document.querySelectorAll('.js-features-button'));
couponToggler(document.querySelector('.js-coupon-button'));
couponApplyer(document.querySelector('.js-coupon-apply'));
payMethodToggler(document.querySelector('.js-alternative-button'));
languageToggler(document.querySelector('.js-language-current'), document.querySelectorAll('.js-language-item'));
footerMenuToggler(document.querySelectorAll('.js-footer-menu-item'));
