const mobileNav = document.querySelector('.mobile')
const hamburgerBtn = document.querySelector('.hamburger')
const navList = document.querySelector('.mobile .nav-items')
const navListItems = document.querySelectorAll('.mobile .nav-items .nav-link')
const navLinks = document.querySelectorAll('.mobile .nav-items .nav-link a')
const nav = document.querySelector('.navbar')

const customerName = document.querySelector('#name')
const customerEmail = document.querySelector('#email')
const customerMessage = document.querySelector('#message')
const formBtn = document.querySelector('.form-btn')
const popup = document.querySelector('.popup')
const popupBtn = popup.querySelector('.close')
const popupBg = document.querySelector('.popup-background')

const homeLink = document.querySelector('.navbar .nav-items .home-link')
const aboutLink = document.querySelector('.navbar .nav-items .about-link')
const offerLink = document.querySelector('.navbar .nav-items .offer-link')
const contactLink = document.querySelector('.navbar .nav-items .contact-link')
const sections = document.querySelectorAll('.section')
// const header = document.querySelector('header')

const year = document.querySelector('.year')

//scrollspy

const options = {
	root: null,
	rootMargin: '-80px 0px 0px 0px',
	threshold: '0.55',
}

function handleIntersect(entries, observer) {
	entries.forEach(entry => {
		if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
			const currentActive = nav.querySelector('.active')
			if (currentActive) {
				currentActive.classList.remove('active')
			}
			let sectionID = entry.target.getAttribute('id')
			if (sectionID == 'home') {
				homeLink.classList.add('active')
			} else if (sectionID == 'about') {
				aboutLink.classList.add('active')
			} else if (sectionID == 'offer') {
				offerLink.classList.add('active')
			} else if (sectionID == 'contact') {
				contactLink.classList.add('active')
			}
		}
	})
}

const spySections = () => {
	const observer = new IntersectionObserver(handleIntersect, options)

	sections.forEach(section => {
		observer.observe(section)
	})

	// observer.observe(header)
}

//mobile nav

const showNavList = () => {
	let animationDelay = 0
	hamburgerBtn.classList.toggle('is-active')
	navList.classList.toggle('show-items')
	document.body.classList.toggle('no-scroll')
	navLinks.forEach(link => {
		link.classList.toggle('nav-links-animation')
		link.style.animationDelay = '.' + animationDelay + 's'
		animationDelay++
	})
}

//form check

const showError = (input, msg) => {
	const formBox = input.parentElement
	const errorMsg = formBox.querySelector('.error-message')
	formBox.classList.add('error')
	errorMsg.textContent = msg
}

const clearError = input => {
	const formBox = input.parentElement
	formBox.classList.remove('error')
}

const checkForm = input => {
	input.forEach(el => {
		if (el.value === '') {
			showError(el, el.placeholder)
		} else {
			clearError(el)
		}
	})
}

const checkLength = (input, min) => {
	if (input.value.length < min) {
		showError(
			input,
			`${input.previousElementSibling.innerText.replace(':', '')} musi składać się z min. ${min} znaków.`
		)
	}
}

const checkEmail = email => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	if (re.test(email.value)) {
		clearError(email)
	} else {
		showError(email, 'Adres email jest niepoprawny.')
	}
}

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.form-box')
	let errorCount = 0

	allInputs.forEach(el => {
		if (el.classList.contains('error')) {
			errorCount++
		}
	})

	if (errorCount === 0) {
		popup.classList.add('show-popup')
		popupBg.classList.add('popup-background-visible')
	}
}

//form button close + clear form
const cleanForm = () => {
	customerName.value = ''
	customerEmail.value = ''
	customerMessage.value = ''
}

const closePopup = () => {
	popup.classList.remove('show-popup')
	popupBg.classList.remove('popup-background-visible')
	cleanForm()
}

//current year in footer

const handleCurrentYear = () => {
	const currentYear = new Date().getFullYear()
	year.innerText = currentYear
}

handleCurrentYear()

//event listeners

window.addEventListener('load', spySections)

hamburgerBtn.addEventListener('click', showNavList)

navLinks.forEach(item =>
	item.addEventListener('click', () => {
		navList.classList.remove('show-items')
		hamburgerBtn.classList.remove('is-active')
		document.body.classList.remove('no-scroll')
	})
)

formBtn.addEventListener('click', e => {
	e.preventDefault()
	checkForm([customerName, customerEmail, customerMessage])
	checkLength(customerName, 3)
	checkLength(customerMessage, 3)
	checkEmail(customerEmail)
	checkErrors()
})

popupBtn.addEventListener('click', closePopup)
