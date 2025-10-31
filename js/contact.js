// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const contactSuccess = document.getElementById('contactSuccess');
    const sendAnotherBtn = document.getElementById('sendAnother');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual form submission)
                setTimeout(() => {
                    // Hide form and show success message
                    contactForm.style.display = 'none';
                    contactSuccess.classList.add('visible');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }
    
    if (sendAnotherBtn) {
        sendAnotherBtn.addEventListener('click', function() {
            contactSuccess.classList.remove('visible');
            contactForm.style.display = 'block';
        });
    }
    
    // Form validation
    function validateForm() {
        let isValid = true;
        const formGroups = contactForm.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea, select');
            const errorMessage = group.querySelector('.error-message');
            
            if (input.hasAttribute('required') && !input.value.trim()) {
                group.classList.add('error');
                isValid = false;
            } else if (input.type === 'email' && input.value.trim()) {
                if (!isValidEmail(input.value.trim())) {
                    group.classList.add('error');
                    errorMessage.textContent = 'Please enter a valid email address';
                    isValid = false;
                } else {
                    group.classList.remove('error');
                }
            } else {
                group.classList.remove('error');
            }
        });
        
        return isValid;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Real-time validation
    const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea, #contactForm select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            const group = this.closest('.form-group');
            const errorMessage = group.querySelector('.error-message');
            
            if (this.hasAttribute('required') && !this.value.trim()) {
                group.classList.add('error');
                errorMessage.textContent = 'This field is required';
            } else if (this.type === 'email' && this.value.trim()) {
                if (!isValidEmail(this.value.trim())) {
                    group.classList.add('error');
                    errorMessage.textContent = 'Please enter a valid email address';
                } else {
                    group.classList.remove('error');
                }
            } else {
                group.classList.remove('error');
            }
        });
        
        input.addEventListener('input', function() {
            const group = this.closest('.form-group');
            if (this.value.trim()) {
                group.classList.remove('error');
            }
        });
    });
    
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
});