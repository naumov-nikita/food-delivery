function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
	//slider
	const slides = document.querySelectorAll(slide),
				slider = document.querySelector(container),
				prev = document.querySelector(prevArrow),
				next = document.querySelector(nextArrow),
				current = document.querySelector(currentCounter),
				total = document.querySelector(totalCounter),
				slideswrapper = document.querySelector(wrapper),
				slidesField = document.querySelector(field),
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

	slider.style.position = 'relative';

	const indicators = document.createElement('ol'),
				dots = [];
	indicators.classList.add('carousel-indicators');
	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.classList.add('dot');
		indicators.append(dot); 
		dots.push(dot); 
	}
	
	function toDigit(str) {
		return +str.replace(/\D/g, '');
	}

	next.addEventListener('click', () => {
		if (offset  ==  toDigit(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += toDigit(width);
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

		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex - 1].style.opacity = 1;
	});

	prev.addEventListener('click', () => {
		if (offset == 0) {
			offset  =   toDigit(width) * (slides.length - 1);
				} else {
			offset -= toDigit(width)
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

		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex - 1].style.opacity = 1;
	});

	dots.forEach(dot => {
		dot.addEventListener('click', e => {
			const slideTo = e.target.getAttribute('data-slide-to')	
		
			slideIndex = slideTo;
			offset = toDigit(width) * (slideTo - 1);

			slidesField.style.transform = `translateX(${-offset}px)`;

			dots.forEach(dot => dot.style.opacity = '.5');
			dots[slideIndex - 1].style.opacity = 1;

			if (slideIndex < 10) {
				current.textContent = `0${slideIndex}`;
			}  else {
				current.textContent = slideIndex;
			}

		});
	});
}

export default slider;