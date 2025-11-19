// Menu mobile
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

// Smooth scroll avec offset pour le header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Lightbox galerie
const galleryImages = document.querySelectorAll('.gallery__img img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Fermer lightbox avec Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// Validation formulaire de réservation
const bookingForm = document.getElementById('booking-form');
const formSuccess = document.getElementById('form-success');

bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset erreurs
    document.querySelectorAll('.form__error').forEach(error => {
        error.style.display = 'none';
    });

    let isValid = true;

    // Validation date
    const dateInput = document.getElementById('date');
    const selectedDate = new Date(dateInput.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (!dateInput.value || selectedDate < today) {
        document.getElementById('date-error').style.display = 'block';
        document.getElementById('date-error').textContent = 'Veuillez sélectionner une date future';
        isValid = false;
    }

    // Validation heure
    const timeInput = document.getElementById('time');
    if (!timeInput.value) {
        document.getElementById('time-error').style.display = 'block';
        isValid = false;
    }

    // Validation nombre de personnes
    const peopleInput = document.getElementById('people');
    if (!peopleInput.value || peopleInput.value < 1 || peopleInput.value > 10) {
        document.getElementById('people-error').style.display = 'block';
        isValid = false;
    }

    // Validation nom
    const nameInput = document.getElementById('name');
    if (!nameInput.value || nameInput.value.trim().length < 2) {
        document.getElementById('name-error').style.display = 'block';
        document.getElementById('name-error').textContent = 'Veuillez entrer un nom valide (min 2 caractères)';
        isValid = false;
    }

    // Validation email
    const emailInput = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value || !emailRegex.test(emailInput.value)) {
        document.getElementById('email-error').style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        // Afficher message de succès
        formSuccess.style.display = 'block';
        
        // Simuler l'envoi (ici vous ajouteriez votre logique d'envoi backend)
        console.log('Réservation envoyée:', {
            date: dateInput.value,
            time: timeInput.value,
            people: peopleInput.value,
            name: nameInput.value,
            email: emailInput.value
        });

        // Reset formulaire après 2 secondes
        setTimeout(() => {
            bookingForm.reset();
            formSuccess.style.display = 'none';
        }, 3000);

        // Scroll vers le message de succès
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});

// Newsletter
const newsletterForm = document.getElementById('newsletter-form');
newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[type="email"]');
    
    if (emailInput.value) {
        alert('Merci de votre inscription à notre newsletter!');
        emailInput.value = '';
    }
});

// Animation au scroll (fade-in elements)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les cartes menu et images galerie
document.querySelectorAll('.menu__card, .gallery__img').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Définir date minimum (aujourd'hui) pour le formulaire
const dateInputForm = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInputForm.setAttribute('min', today);