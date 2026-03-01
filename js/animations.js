// GSAP Animations Module - Production Version (No Console)
(function() {
    'use strict';
    
    // Check if GSAP is loaded
    if (!window.gsap) {
        return; // Exit silently if GSAP not loaded
    }

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
    }

    // Navbar animation on load
    function animateNavbar() {
        const navbar = document.querySelector('.navbar-glass');
        if (!navbar) return;
        
        gsap.from('.navbar-glass', {
            y: -100,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });

        gsap.from('.nav-link', {
            y: -20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.3,
            ease: 'power2.out'
        });

        gsap.from('.nav-icon-btn', {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.5,
            ease: 'back.out(1.7)'
        });
    }

    // Hero section animation
    function animateHero() {
        const hero = document.querySelector('#heroCarousel');
        if (!hero) return;
        
        const heroTimeline = gsap.timeline({ delay: 0.5 });
        
        heroTimeline
            .from('#heroCarousel h1', {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            })
            .from('#heroCarousel p', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            }, '-=0.5')
            .from('#heroCarousel a', {
                scale: 0,
                opacity: 0,
                duration: 0.6,
                ease: 'back.out(1.7)'
            }, '-=0.3');
    }

    // Categories animation
    function animateCategories() {
        const categories = document.querySelectorAll('.category-card');
        if (categories.length === 0) return;
        
        gsap.from('.category-card', {
            scrollTrigger: {
                trigger: '.bg-slate-900',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        });
    }

    // Scroll-triggered animations
    function animateOnScroll() {
        // Section titles
        gsap.utils.toArray('h2').forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                x: -100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        });

        // Floating animation for cart badge
        const cartBadge = document.querySelector('.cart-badge');
        if (cartBadge) {
            gsap.to('.cart-badge', {
                y: -5,
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut'
            });
        }
    }

    // Initialize all animations
    window.initAnimations = function() {
        try {
            animateNavbar();
            animateHero();
            animateCategories();
            animateOnScroll();
        } catch (e) {
            // Silent fail
        }
    };

    // Product cards animation
    window.animateProducts = function() {
        const products = document.querySelectorAll('.product-card');
        if (products.length === 0) return;
        
        try {
            gsap.from('.product-card', {
                scrollTrigger: {
                    trigger: '#featuredProducts',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out'
            });
        } catch (e) {
            // Silent fail
        }
    };

    // Product card hover animation
    window.setupProductHoverAnimations = function() {
        try {
            document.querySelectorAll('.product-card').forEach(card => {
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, {
                        y: -10,
                        boxShadow: '0 25px 50px rgba(59, 130, 246, 0.4)',
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        y: 0,
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            });
        } catch (e) {
            // Silent fail
        }
    };

    // Toast notification animation
    window.animateToast = function(element) {
        if (!element) return;
        try {
            gsap.fromTo(element,
                {
                    y: 100,
                    opacity: 0,
                    scale: 0.8
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    ease: 'back.out(1.7)'
                }
            );
        } catch (e) {
            // Silent fail
        }
    };

    // Page transition animation
    window.pageTransition = function() {
        try {
            gsap.from('body', {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        } catch (e) {
            // Silent fail
        }
    };

    // Cart item add animation
    window.animateCartAdd = function(element) {
        if (!element) return;
        try {
            gsap.fromTo(element,
                {
                    scale: 0,
                    opacity: 0,
                    x: -50
                },
                {
                    scale: 1,
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    ease: 'back.out(1.7)'
                }
            );
        } catch (e) {
            // Silent fail
        }
    };

    // Button click animation
    window.animateButtonClick = function(button) {
        if (!button) return;
        try {
            gsap.to(button, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
        } catch (e) {
            // Silent fail
        }
    };

})();
