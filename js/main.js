"use strict"

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
	const deadline = "2021-12-29";

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
	modalTrigger = document.querySelectorAll('[data-modal]'),
	closeModal = modal.querySelector('[data-close]');
 console.log(modal);


	function openModal() {
		modal.classList.add('is-show');
		document.body.style.overflow = 'hidden';
					
	}
		
	function closePop() {
		modal.classList.remove('is-show');
		document.body.style.overflow = '';
	} 

	modalTrigger.forEach(item => {
		item.addEventListener('click', openModal);
		});

	closeModal.addEventListener('click', closePop);

	document.addEventListener('keydown', (e) => {

	if (e.code == 'Escape' && modal.classList.contains('is-show')) {
		closePop();

		}
	})
	
	modal.addEventListener('click', (e) => {
		if(e.target === modal) {
			closePop();
		}
	})

	
	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight ) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
		
	}

	window.addEventListener('scroll', showModalByScroll);
		
	});