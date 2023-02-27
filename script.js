'use strict'

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const btnCloseModal = document.querySelector('.btn--close-modal')
const btnsOpenModal = document.querySelectorAll('.btn--show-modal')

const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden')
  overlay.classList.remove('hidden')
}

const closeModal = function () {
  modal.classList.add('hidden')
  overlay.classList.add('hidden')
}

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal)

btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal)

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal()
  }
})

// console.log(document.documentElement)

// const allSections = document.querySelectorAll('section')
// console.log(allSections)

// document.getElementById('section--1')

// const allButtons = document.getElementsByTagName('button')
// rgb(255,255,255)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min)

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`
// console.log(randomColor())

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor()
//   console.log('LINK', e.target)
//   e.stopPropagation()
// })

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor()
//   console.log('CONTAINER', e.target)
// })

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor()
//   console.log('NAV', e.target)
// })

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault()
//     const id = this.getAttribute('href')
//     console.log(id)
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
//   })
// })

// 1) add event listener to common parent element
// 2) determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault()
  // console.log(e.target)

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href')
    // console.log(id)
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
  }
})

const h1 = document.querySelector('h1')

// going downwards: child

// console.log(h1.querySelectorAll('.highlight'))
// console.log(h1.parentNode)

// h1.closest('.header').style.background = 'var(--gradient-secondary)'

// going sideways: siblings
// console.log(h1.previousElementSibling)
// console.log(h1.nextElementSibling)

// console.log(h1.previousSibling)
// console.log(h1.nextSibling)

// console.log(h1.parentElement.children)
// ;[...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)'
// })

// tabbed component
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')

// tabs.forEach((t) => t.addEventListener('click', () => console.log('TAB')))
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab')
  // console.log(clicked)
  if (!clicked) return

  // remove active classes
  tabs.forEach((t) => t.classList.remove('operations__tab--active'))
  clicked.classList.add('operations__tab--active')

  // active tab
  tabsContent.forEach((c) => c.classList.remove('operations__content--active'))

  // activate content area
  // console.log(clicked.dataset.tab)
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active')
})

// --------------menu fade animation------------------
const handleHover = function (e, opacity) {
  // console.log(e.target.classList)
  if (e.target.classList.contains('nav__link')) {
    // console.log(e)
    const link = e.target
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    // console.log(siblings)
    const logo = link.closest('.nav').querySelector('img')

    siblings.forEach((el) => {
      if (el !== link) {
        // console.log(link)
        // console.log(el)
        el.style.opacity = this
      }
    })

    logo.style.opacity = this
  }
}

const nav = document.querySelector('.nav')
nav.addEventListener('mouseover', handleHover.bind(0.5))
nav.addEventListener('mouseout', handleHover.bind(1))

// ------------------sticky navigation(not efficient)------------------
// const section1 = document.querySelector('#section--1')

// const initialCoords = section1.getBoundingClientRect()
// // console.log(initialCoords)
// window.addEventListener('scroll', function () {
//   // console.log(this.window.scrollY)
//   if (this.window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky')
//   } else {
//     nav.classList.remove('sticky')
//   }
// })

// const obsCallback = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry)
//   })
// }

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// }

// ------------------sticky navigation: intersection observer api------------------
const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height

const stickyNav = function (entries) {
  const [entry] = entries
  // console.log(entry)
  if (!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
})
headerObserver.observe(header)

// ------------------reveal sections------------------
const allSections = document.querySelectorAll('.section')

const revealSection = function (entries, observer) {
  const [entry] = entries
  // console.log(entry)
  if (!entry.isIntersecting) return
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
})

allSections.forEach(function (section) {
  sectionObserver.observe(section)
  // section.classList.add('section--hidden')
})

// ------------------lazy loading image------------------
const imgTargets = document.querySelectorAll('img[data-src]')
// console.log(imgTargets)
const loadImg = function (entries, observer) {
  const [entry] = entries
  console.log(entry)
  if (!entry.isIntersecting) return

  // replace src with data-src
  entry.target.src = entry.target.dataset.src
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img')
  })

  observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
})

imgTargets.forEach((img) => imgObserver.observe(img))

// ------------------slider------------------
const slides = document.querySelectorAll('.slide')
const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')

let curSlide = 0
const maxSlide = slides.length

// const slider = document.querySelector('.slider')
// slider.style.transform = 'scale(0.4) translateX(-100px)'
// slider.style.overflow = 'visible'

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  )
}

goToSlide(0)

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0
  } else {
    curSlide++
  }

  goToSlide(curSlide)
}

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1
  } else {
    curSlide--
  }

  goToSlide(curSlide)
}

btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', prevSlide)
