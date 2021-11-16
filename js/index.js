"use strict";

import calc from './modules/calc';
import cards from './modules/cards';		
import forms from './modules/forms';		
import tabs from './modules/tabs';		
import slider from './modules/slider';		
import timer from './modules/timer';		
import modal from './modules/modal';
import {openModal} from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {
	
	const modalTimerId = setInterval(() => openModal('.modal', modalTimerId), 500000);

	calc();
	cards();
	forms(modalTimerId, 'form');
	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	slider({
		container: '.offer__slider',
		slide: '.offer__slide',
		nextArrow: '.offer__slider-next',
		prevArrow: '.offer__slider-prev' ,
		totalCounter: '#total',
		currentCounter: '#current',
		wrapper: '.offer__slider-wrapper',
		field: '.offer__slider-inner' ,
	});
	timer('.timer', "2021-11-24");
	modal('[data-modal]', '.modal', modalTimerId);
});



	