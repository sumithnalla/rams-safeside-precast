document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. Rotating Image Carousel (2s Interval)
    // ==========================================
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlideIndex = 0;
    const slideIntervalTime = 2000; // 2 seconds

    function showNextSlide() {
        if (slides.length === 0) return;

        // Remove active class from the current slide
        slides[currentSlideIndex].classList.remove('active');

        // Increment index, looping back to 0 if at the end
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;

        // Add active class to the new slide
        slides[currentSlideIndex].classList.add('active');
    }

    // Initialize the interval
    let carouselInterval = setInterval(showNextSlide, slideIntervalTime);


    // ==========================================
    // 2. Form Input Sanitization & Validation
    // ==========================================
    const leadForm = document.getElementById('lead-form');
    const userNameInput = document.getElementById('user-name');
    const userPhoneInput = document.getElementById('user-phone');
    const nameError = document.getElementById('name-error');
    const phoneError = document.getElementById('phone-error');
    
    const successCard = document.getElementById('form-success-card');
    const successPhoneSpan = document.getElementById('success-phone');
    const successResetBtn = document.getElementById('success-reset-btn');

    // Live phone input formatting (restrict to digits only, max 10 chars)
    userPhoneInput.addEventListener('input', function() {
        // Strip out all non-digits
        let value = this.value.replace(/\D/g, '');
        
        // Limit to 10 digits
        if (value.length > 10) {
            value = value.substring(0, 10);
        }
        
        this.value = value;

        // Dynamic validation clearing if input becomes valid
        if (value.length === 10 && /^[6-9]/.test(value)) {
            phoneError.style.display = 'none';
            userPhoneInput.closest('.phone-input-wrapper').style.borderColor = '';
        }
    });

    userNameInput.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            nameError.style.display = 'none';
            this.style.borderColor = '';
        }
    });

    // Handle Form Submission
    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameValue = userNameInput.value.trim();
        const phoneValue = userPhoneInput.value.trim();
        let isValid = true;

        // Validate Name
        if (nameValue === '') {
            nameError.textContent = 'Please enter your name.';
            nameError.style.display = 'block';
            userNameInput.style.borderColor = '#dc2626';
            isValid = false;
        } else {
            nameError.style.display = 'none';
            userNameInput.style.borderColor = '';
        }

        // Validate Phone (Indian numbers: starts with 6-9, exactly 10 digits)
        const indianPhoneRegex = /^[6-9]\d{9}$/;
        if (phoneValue === '') {
            phoneError.textContent = 'Please enter your phone number.';
            phoneError.style.display = 'block';
            userPhoneInput.closest('.phone-input-wrapper').style.borderColor = '#dc2626';
            isValid = false;
        } else if (phoneValue.length !== 10) {
            phoneError.textContent = 'Phone number must be exactly 10 digits.';
            phoneError.style.display = 'block';
            userPhoneInput.closest('.phone-input-wrapper').style.borderColor = '#dc2626';
            isValid = false;
        } else if (!indianPhoneRegex.test(phoneValue)) {
            phoneError.textContent = 'Please enter a valid Indian number starting with 6, 7, 8, or 9.';
            phoneError.style.display = 'block';
            userPhoneInput.closest('.phone-input-wrapper').style.borderColor = '#dc2626';
            isValid = false;
        } else {
            phoneError.style.display = 'none';
            userPhoneInput.closest('.phone-input-wrapper').style.borderColor = '';
        }

        // If form is valid, trigger success state
        if (isValid) {
            // Show Success UI
            successPhoneSpan.textContent = `+91 ${phoneValue}`;
            leadForm.style.display = 'none';
            successCard.style.display = 'block';
        }
    });

    // Reset Form from Success State
    successResetBtn.addEventListener('click', () => {
        // Clear inputs
        userNameInput.value = '';
        userPhoneInput.value = '';
        
        // Hide Success Card and Show Form
        successCard.style.display = 'none';
        leadForm.style.display = 'block';
    });
});
