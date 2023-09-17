'use strict';
const header = document.querySelector('.header');
const headerContainer = document.querySelector('.sticky-header');
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const nav = document.querySelector('.nav');
const gallerySection = document.querySelector('.gallery-section');
const galleryImage = document.querySelector('.gallery-section-img');
const reviewSectionSlides = document.querySelectorAll('.review-section-slide');
const reviewSection = document.querySelector('.review-section');
const reviewSectionSlider = document.querySelector('.review-section-slider');
const reviewSectionDots = document.querySelectorAll('.review-section-dot');
const faqContainer = document.querySelector('.faq-container');
const faqsAnswers = document.querySelectorAll('.faq-ans');
const faqIcons = document.querySelectorAll('.faq-icon');

const numOfImages  = 4;
let count = 1;
let curSlide = 0;
let changeImage;
let changeComment;


//functions

function toggleMobileMenu() {
    const visibility = nav.getAttribute('data-visible');
    if(visibility === "false") {
        mobileNavToggle.setAttribute('aria-expanded', true);
        nav.setAttribute('data-visible', true);
    } else {
        mobileNavToggle.setAttribute('aria-expanded', false);
        nav.setAttribute('data-visible', false);
    }
};

function stickyHeader(entries) {
    const [entry] = entries;
    if(!entry.isIntersecting) headerContainer.classList.add('sticky');
    if(entry.isIntersecting) headerContainer.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyHeader, {
    root: null,
    threshold: 0,
});

headerObserver.observe(header);


function changeDisplayImage(entries) {
    const [entry] = entries;

    if(!entry.isIntersecting) {
        clearInterval(changeImage);
    };

    if(entry.isIntersecting) {

        changeImage = setInterval(() => {
                let image = `images/maf-gallery-${count}.jpg`;
                galleryImage.setAttribute('src', `${image}`); 
                count++;
                if(count > numOfImages) count = 1;              
            }, 2500);

    };
    
};

const galleryObserver = new IntersectionObserver(changeDisplayImage, {
    threshold: 0.2,
});

galleryObserver.observe(gallerySection);

function nextSlide(curSlide) {
    reviewSectionSlides.forEach((slide, i) => {
        slide.style.transform = `translateX(${100 * (i - curSlide)}%)`;
        reviewSectionDots.forEach(dot => dot.classList.remove('review-section-dot--active'));
        document.querySelector(`.review-section-dot[data-slide="${curSlide}"]`).classList.add('review-section-dot--active');
    })
}

function changeDisplayComment(entries) {
    const [entry] = entries;

    if(!entry.isIntersecting) clearInterval(changeComment);

    if(entry.isIntersecting) {
  
        changeComment = setInterval(() => {
            nextSlide(curSlide);
            curSlide++;
            if(curSlide === reviewSectionSlides.length) curSlide = 0;
        }, 2500)
    }
}

const reviewObserver = new IntersectionObserver(changeDisplayComment, {
    threshold: 0,
    rootMargin: '1000px'

});

reviewObserver.observe(reviewSection);

function revealAnswer(e) {
    const clicked = e.target.closest('.faq-q');
    if(!clicked) return;
    
    const response = document.querySelector(`.faq-ans--${clicked.dataset.tab}`);
    const responseIcon = document.querySelector(`.faq-icon--${clicked.dataset.tab}`);

    faqsAnswers.forEach(answer => {
        if(answer !== response) answer.classList.remove('faq-ans--active');
        if(answer === response) response.classList.toggle('faq-ans--active');
    });


    faqIcons.forEach(icon => {
        if(icon !== responseIcon) icon.classList.remove('arrow-flip');
        if(icon === responseIcon) responseIcon.classList.toggle('arrow-flip');
    });        

    
}

//EventListeners
mobileNavToggle.addEventListener('click', toggleMobileMenu);
faqContainer.addEventListener('click', revealAnswer);