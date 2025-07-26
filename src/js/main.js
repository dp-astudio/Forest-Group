const mobileNav = document.querySelector('.mobile')
const hamburgerBtn = document.querySelector('.hamburger')
const navList = document.querySelector('.mobile .nav-items')
const navListItems = document.querySelectorAll('.mobile .nav-items .nav-link')
const navLinks = document.querySelectorAll('.mobile .nav-items .nav-link a')
const nav = document.querySelector('.navbar')

const homeLink = document.querySelector('.navbar .nav-items .home-link')
const aboutLink = document.querySelector('.navbar .nav-items .about-link')
const offerLink = document.querySelector('.navbar .nav-items .offer-link')
const contactLink = document.querySelector('.navbar .nav-items .contact-link')
const sections = document.querySelectorAll('.section')
const header = document.querySelector('header')
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

	observer.observe(header)
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
