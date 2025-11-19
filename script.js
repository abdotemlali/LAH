/* SHOW MENU */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navLinks = document.querySelectorAll('.nav__link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
    });
}

/* REMOVE MENU MOBILE */
function linkAction() {
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));


/* CHANGE BACKGROUND HEADER */
function scrollHeader() {
    const header = document.getElementById('header');
    if (this.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);

/* SCROLL REVEAL ANIMATION (Optionnel, nécessite une bibliothèque comme ScrollReveal.js) */
// Pour une animation plus poussée, vous pouvez intégrer une bibliothèque externe.
// Voici un exemple avec ScrollReveal :
// 1. Ajoutez ce script à votre HTML : <script src="https://unpkg.com/scrollreveal"></script>
// 2. Décommentez le code ci-dessous :

/*
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true // Animations repeat
})

sr.reveal(`.hero__title, .section__title`)
sr.reveal(`.hero__subtitle`, {delay: 500})
sr.reveal(`.button`, {delay: 600})
sr.reveal(`.about__data`, {origin: 'left'})
sr.reveal(`.about__img`, {origin: 'right'})
sr.reveal(`.menu__card, .gallery__img, .footer__content`, {interval: 100})
*/

// VALIDATION FORMULAIRE (simple)
const bookingForm = document.querySelector('.booking__form');

bookingForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Empêche l'envoi du formulaire

    // Logique de validation simple
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const people = document.getElementById('people').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if(date && time && people && name && email) {
        alert('Votre réservation a bien été envoyée !');
        bookingForm.reset();
    } else {
        alert('Veuillez remplir tous les champs.');
    }
});