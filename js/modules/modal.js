function openModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add('is-show');
	document.body.style.overflow = 'hidden';

	if (modalTimerId) {	
		clearInterval(modalTimerId);
	}
}
	
function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);
	modal.classList.remove('is-show');
	document.body.style.overflow = '';
} 

function modal(trigerSelector, modalSelector, modalTimerId) {

	const modal = document.querySelector(modalSelector),
modalTrigger = document.querySelectorAll(trigerSelector);

modalTrigger.forEach(item => {
	item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
});

document.addEventListener('keydown', (e) => {

if (e.code == 'Escape' && modal.classList.contains('is-show')) {
	closeModal(modalSelector);
	}
});

modal.addEventListener('click', (e) => {
	if (e.target === modal || e.target.getAttribute('data-close') == "") {
			closeModal(modalSelector);
	}
});

function showModalByScroll() {
	if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight ) {
		openModal(modalSelector, modalTimerId);
		window.removeEventListener('scroll', showModalByScroll);
	}
	
}

window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal, openModal};
