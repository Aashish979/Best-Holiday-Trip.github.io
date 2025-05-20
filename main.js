// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form submission
// filepath: c:\xampp\htdocs\Best-Holiday-Trip.github.io\main.js
// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let formData = new FormData(this);
    
    // Show loading state
    Swal.fire({
        title: 'Sending...',
        text: 'Please wait while we process your request',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
            Swal.showLoading();
        }
    });

    fetch('process_contact.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === 'success') {
            Swal.fire({
                icon: 'success',
                title: 'Thank You!',
                text: 'Your message has been sent successfully. We will get back to you soon!',
                confirmButtonColor: '#28a745',
                timer: 3000
            });
            this.reset();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message || 'Something went wrong!',
                confirmButtonColor: '#dc3545'
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Connection Error',
            text: 'Please check your internet connection and try again.',
            confirmButtonColor: '#dc3545'
        });
    });
});

// Carousel settings
$(document).ready(function() {
    $('.carousel').carousel({
        interval: 3000,
        pause: 'hover'
    });
});