"use strict";

document.addEventListener('DOMContentLoaded', () => {

	// Tabs
	const tabs = document.querySelectorAll(".tabheader__item"),
	tabsContent = document.querySelectorAll('.tabcontent'),
	tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent(){
		tabsContent.forEach(item => {
			item.classList.add('hide');
		item.classList.remove('is-show', 'fade');
		
		});

		tabs.forEach(item => { 
			item.classList.remove('tabheader__item_active');
		});
	} 

	function showTabContent(i = 0) {
		tabsContent[i].classList.add('is-show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (event) => {
		const target = event.target;

		if (target && target.classList.contains('tabheader__item')){
			tabs.forEach((item, i) => {
				if( target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}})


	//Timer
	const deadline = "2021-11-24";

	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - new Date,
		days = Math.floor( t / (1000 * 60 *60 *24)),
		hours = Math.floor( t / (1000 *60 *60) % 24),
		minutes = Math.floor(( t / 1000 /60 ) % 60),
		seconds = Math.floor(( t / 1000 ) % 60); 

		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds,
		}
	}
	

	function getZero(num) {
		if( num >= 0 && num < 10 ) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	
	function setClock(selector, endtime) {	
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

			updateClock();

		function updateClock() {
			const	t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t. hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0 ) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock('.timer', deadline);


	//Modal
	const modal = document.querySelector('.modal'),
	modalTrigger = document.querySelectorAll('[data-modal]');
	
	function openModal() {
		modal.classList.add('is-show');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerId);
	}
		
	function closeModal() {
		modal.classList.remove('is-show');
		document.body.style.overflow = '';
	} 

	modalTrigger.forEach(item => {
		item.addEventListener('click', openModal);
	});

	document.addEventListener('keydown', (e) => {

	if (e.code == 'Escape' && modal.classList.contains('is-show')) {
		closeModal();
	  }
  });
 
	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttrubute('data-close') == '') {
			closeModal();
		}
	});

	//modal upgrade
	const modalTimerId= setInterval(openModal, 50000);

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight ) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
		
	}

	window.addEventListener('scroll', showModalByScroll);
	


 //Class for cards

 class MenuCard {
	 constructor(src, alt, title, description, price, parentSelector, ...classes) {
		 this.src = src;
		 this.alt = alt;
		 this.title = title;
		 this.description = description;
		 this.price = price;
		 this.classes = classes;
		 this.parent = document.querySelector(parentSelector)
		 this.transfer = 72;
		 this.changeToRUB();
		}

		changeToRUB() {
		this.price = this.price * this.transfer;
		}

		render() {
			const element = document.createElement('div');
			
			if (this.classes.length === 0) {
				element.classList.add('menu__item');
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}
			
		  element.innerHTML = `
				<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.description}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> руб/день</div>
				</div>
			`;

			this.parent.append(element);
		 		
		}
	}	

	new MenuCard(
		"img/tabs/vega.jpg", 
		"vegy", 
		'Меню “Вегетарианское“', 
		'Меню “Вегетарианское“ - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		20,
		".menu .container",
		'menu__item'
		).render();

	new MenuCard(
		"img/tabs/fasting.jpg", 
		"fasting", 
		'Меню “Снижение”', 
		'В меню “Снижение” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		15,
		".menu .container",
		'menu__item').render();
	new MenuCard(
		"img/tabs/sport.jpg", 
		"sport", 
		'Меню “Спортивное”', 
		'Меню “Спортивное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		17,
		".menu .container",
		'menu__item').render();

});
