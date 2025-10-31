// FAQ Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    const searchInput = document.getElementById('faqSearch');
    const categoryButtons = document.querySelectorAll('.category-btn');

    // FAQ Accordion
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(i => {
                if (i !== item) i.classList.remove('active');
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Search Functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const faqGroups = document.querySelectorAll('.faq-category-group');
        
        faqGroups.forEach(group => {
            let hasVisibleItems = false;
            const items = group.querySelectorAll('.faq-item');
            
            items.forEach(item => {
                const question = item.querySelector('h3').textContent.toLowerCase();
                const answer = item.querySelector('p').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                    hasVisibleItems = true;
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show/hide category group based on visible items
            group.style.display = hasVisibleItems ? 'block' : 'none';
        });
    });

    // Category Filtering
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter FAQ items
            const faqGroups = document.querySelectorAll('.faq-category-group');
            
            faqGroups.forEach(group => {
                if (category === 'all' || group.getAttribute('data-category') === category) {
                    group.style.display = 'block';
                    // Show all items in the group
                    const items = group.querySelectorAll('.faq-item');
                    items.forEach(item => item.style.display = 'block');
                } else {
                    group.style.display = 'none';
                }
            });
        });
    });

    // Auto-open FAQ item if URL contains hash
    if (window.location.hash) {
        const targetItem = document.querySelector(window.location.hash);
        if (targetItem && targetItem.classList.contains('faq-item')) {
            targetItem.classList.add('active');
            targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // Add smooth scrolling for FAQ items
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add a small delay to ensure the accordion animation completes
            setTimeout(() => {
                if (this.classList.contains('active')) {
                    this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 300);
        });
    });
});