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
		if (e.target === modal || e.target.getAttribute('data-close') == "") {
				closeModal();
		}
	});

	const modalTimerId= setInterval(openModal, 500000);

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

	const getResource = async (url) => {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status ${res.status}`);
		}

		return await res.json();
	};

	getResource('http://localhost:3000/menu')
	.then(data => {
		data.forEach(({img, altimg, title, descr, price}) => {
			new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
		});
	});


	//Forms

	const forms = document.querySelectorAll('form');
	const message = {
		loading: 'img/spinner.svg',
		success: 'Спасибо! Мы свяжемся с вами в течение часа',
		failure: 'Что-то пошло не так…',
	};
 
	forms.forEach(item => {
		blindPostData(item);
	});

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
					'Content-Type': 'application/json'
			},
			body: data
		});

		return await res.json();
	};

	function blindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			let statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.textContent = message.loading;
			statusMessage.style.cssText = `
					display: block;
					margin: 0 auto;
			`;
			form.insertAdjacentElement('afterend', statusMessage);

			
			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

		
			postData('http://localhost:3000/requests', json)
			.then(data => {
					console.log(data);
					showThanksModal(message.success);
					statusMessage.remove();
			}).catch(() => {
					showThanksModal(message.failure);
			}).finally(() => {
					form.reset();
			});
		});
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		openModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
				<div class="modal__content">
						<div class="modal__close" data-close>×</div>
						<div class="modal__title">${message}</div>
				</div>
		`;
		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
				thanksModal.remove();
				prevModalDialog.classList.add('is-show');
				prevModalDialog.classList.remove('hide');
				closeModal();
		}, 4000);
	}
	
	fetch('http://localhost:3000/menu')
		.then(data => data.json())
		.then(res => console.log(res));


	//slider
	const slides = document.querySelectorAll('.offer__slide'),
				prev = document.querySelector('.offer__slider-prev'),
				next = document.querySelector('.offer__slider-next'),
				current = document.querySelector('#current'),
				total = document.querySelector('#total'),
				slideswrapper = document.querySelector('.offer__slider-wrapper'),
				slidesField = document.querySelector('.offer__slider-inner'),
				width = window.getComputedStyle(slideswrapper).width;
	
	let slideIndex = 1;
	let offset = 0;

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}

	slidesField.style.width = 100 * slides.length + '%';
	slides.forEach(slide => {	slide.style.width = width; });

	next.addEventListener('click', () => {
		if (offset  ==  +width.slice(0, width.length - 2) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += +width.slice(0, width.length - 2)
		}

		slidesField.style.transform = `translateX(${-offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;			
		} else {
			slideIndex++;
		}

		if (slideIndex < 10) {
			current.textContent = `0${slideIndex}`;
		}  else {
			current.textContent = slideIndex;
		}
	});

	prev.addEventListener('click', () => {
		if (offset == 0) {
			offset  =   +width.slice(0, width.length - 2) * (slides.length - 1);
				} else {
			offset -= +width.slice(0, width.length - 2)
		}

		slidesField.style.transform = `translateX(${-offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;			
		} else {
			slideIndex--;
		}

		if (slideIndex < 10) {
			current.textContent = `0${slideIndex}`;
		}  else {
			current.textContent = slideIndex;
		}
	});


});
