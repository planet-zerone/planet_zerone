$(document).ready(function() {

    // ===== PRELOADER =====
    $(window).on('load', function() {
        $('#preloader').addClass('hidden');
    });
    // Fallback: hide preloader after 2s
    setTimeout(function() {
        $('#preloader').addClass('hidden');
    }, 2000);

    // ===== HAMBURGER MENU =====
    $('.hamburger').click(function() {
        $(this).toggleClass('active');
        $('.navbar').toggleClass('open');
    });
    $('.nav-link').click(function() {
        $('.hamburger').removeClass('active');
        $('.navbar').removeClass('open');
    });

    // ===== HEADER SCROLL =====
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 80) {
            $('#header').addClass('scrolled');
        } else {
            $('#header').removeClass('scrolled');
        }

        // Active nav link
        const scrollPos = $(this).scrollTop() + 150;
        $('.nav-link').each(function() {
            const target = $(this).attr('href');
            if (target.startsWith('#')) {
                const section = $(target);
                if (section.length && section.offset().top <= scrollPos &&
                    section.offset().top + section.height() > scrollPos) {
                    $('.nav-link').removeClass('active');
                    $(this).addClass('active');
                }
            }
        });
    });

    // ===== PARTICLES.JS =====
    if (typeof particlesJS !== 'undefined' && $('#particles-js').length) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#00bfff' },
                shape: { type: 'circle' },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: { enable: true, speed: 1, opacity_min: 0.1 }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: { enable: true, speed: 2, size_min: 0.1 }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00bfff',
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 0.3 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }

    // ===== GSAP ANIMATIONS =====
    if (typeof gsap !== 'undefined') {
        // Hero content entrance
        const heroTl = gsap.timeline({ delay: 0.5 });
        heroTl
            .from('.hero-tagline', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' })
            .from('.hero-btns a', { y: 30, opacity: 0, stagger: 0.2, duration: 0.6, ease: 'power3.out' }, '-=0.4')
            .from('.hero-scroll', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2');

        // Section entrance animations with ScrollTrigger
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header, {
                scrollTrigger: { trigger: header, start: 'top 80%', toggleActions: 'play none none none' },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        });

        // Stagger card reveals on scroll
        const cardGroups = [
            { selector: '.service-card', start: 'top 85%', stagger: 0.12 },
            { selector: '.portfolio-card', start: 'top 85%', stagger: 0.12 },
            { selector: '.team-card', start: 'top 85%', stagger: 0.12 },
        ];
        cardGroups.forEach(group => {
            gsap.utils.toArray(group.selector).forEach((card, i) => {
                gsap.set(card, { opacity: 0, y: 40 });
                gsap.to(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: group.start,
                        toggleActions: 'play none none none'
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    delay: i * group.stagger,
                    ease: 'power3.out'
                });
            });
        });

        // Stats counter animation
        gsap.utils.toArray('.counter-number').forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            gsap.fromTo(counter, { textContent: 0 }, {
                scrollTrigger: { trigger: counter, start: 'top 85%', toggleActions: 'play none none none' },
                textContent: target,
                duration: 2.5,
                ease: 'power2.out',
                snap: { textContent: target },
                onUpdate: function() {
                    counter.textContent = Math.round(counter.textContent);
                }
            });
        });
    }

    // ===== AOS INIT =====
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 80,
            easing: 'ease-out-cubic'
        });
    }

    // ===== OWL CAROUSELS =====
    if ($('.testimonials-carousel').length) {
        $('.testimonials-carousel').owlCarousel({
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            dots: true,
            loop: true,
            margin: 0,
            responsive: {
                0: { items: 1 },
                768: { items: 2 },
                992: { items: 3 }
            }
        });
    }

    if ($('.clients-carousel').length) {
        $('.clients-carousel').owlCarousel({
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            dots: true,
            loop: true,
            margin: 20,
            responsive: {
                0: { items: 2 },
                576: { items: 3 },
                768: { items: 4 },
                992: { items: 6 }
            }
        });
    }

    // ===== BACK TO TOP =====
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').addClass('show');
        } else {
            $('.back-to-top').removeClass('show');
        }
    });
    $('.back-to-top').click(function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800, 'easeInOutExpo');
    });

    // ===== 3D TILT ON CARDS =====
    function initTilt(selector, intensity) {
        intensity = intensity || 6;
        $(selector).each(function() {
            const card = $(this);
            card.css('transform-style', 'preserve-3d');
            card.on('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -intensity;
                const rotateY = ((x - centerX) / centerX) * intensity;
                const mx = (x / rect.width) * 100;
                const my = (y / rect.height) * 100;
                card.css({
                    transform: 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(1.02)'
                });
                card.find('.shine').css({ '--mx': mx + '%', '--my': my + '%' });
            });
            card.on('mouseleave', function() {
                card.css({ transform: '', transition: 'transform 0.5s ease' });
                setTimeout(function() { card.css('transition', ''); }, 500);
                card.find('.shine').css({ '--mx': '50%', '--my': '50%' });
            });
        });
    }
    initTilt('.testimonial-card[data-tilt]', 6);
    initTilt('.service-card', 4);
    initTilt('.team-card', 5);
    initTilt('.portfolio-card', 4);

    // ===== MAGNETIC BUTTONS =====
    $('.btn-primary, .btn-outline').each(function() {
        const btn = $(this);
        btn.on('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.css({ transform: 'translate(' + (x * 0.3) + 'px, ' + (y * 0.3) + 'px)' });
        });
        btn.on('mouseleave', function() {
            btn.css({ transform: '', transition: 'transform 0.4s ease' });
            setTimeout(function() { btn.css('transition', ''); }, 400);
        });
    });

    // ===== HERO SCROLL DOWN =====
    $('.hero-scroll').on('click', function() {
        $('html, body').animate({
            scrollTop: $('#about').offset().top - 80
        }, 800, 'easeInOutExpo');
    });

    // ===== FAQ ACCORDION =====
    $('.accordion').on('show.bs.collapse', function() {
        $(this).find('.accordion-header .accordion-icon').text('+');
    });
    $('.accordion').on('hidden.bs.collapse', function() {
        $(this).find('.accordion-header .accordion-icon').text('+');
    });
    $('.accordion').on('show.bs.collapse', function() {
        $(this).find('.accordion-icon').text('×');
    });

    // ===== SMOOTH SCROLL FOR NAV =====
    function scrollToHash(hash) {
        const target = $(hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800, 'easeInOutExpo');
            return true;
        }
        return false;
    }

    // Handle hash on page load (cross-page navigation fix)
    function handleHashOnLoad() {
        if (window.location.hash && window.location.hash.length > 1) {
            scrollToHash(window.location.hash);
        }
    }
    // Wait for preloader + images to finish
    $(window).on('load', function() {
        setTimeout(handleHashOnLoad, 600);
    });
    // Fallback if load already fired
    setTimeout(handleHashOnLoad, 1200);

    $('a[href*="#"]:not([href="#"])').click(function(e) {
        if (location.hostname === this.hostname) {
            const hash = this.hash;
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')) {
                e.preventDefault();
                scrollToHash(hash);
                // Update URL without jump
                if (history.pushState) {
                    history.pushState(null, null, hash);
                }
            }
        }
    });

    // ===== FORM VALIDATION & SUBMIT =====
    $('.contact-form input, .contact-form textarea').on('blur', function() {
        if ($(this).val().trim() === '') {
            $(this).css('border-color', '#ff4444');
        } else {
            $(this).css('border-color', '#00C851');
        }
    });
    $('.contact-form input, .contact-form textarea').on('focus', function() {
        $(this).css('border-color', '');
    });

    $('.contact-form').on('submit', function() {
        const btn = $(this).find('button[type="submit"]');
        btn.html('<i class="fas fa-spinner fa-spin"></i> Sending...').prop('disabled', true);
    });

    // ===== PARALLAX ON SCROLL (Counters & CTA) =====
    $(window).on('scroll', function() {
        const scrolled = $(this).scrollTop();
        $('.counters, .cta').each(function() {
            const offset = $(this).offset().top;
            const parallax = (scrolled - offset) * 0.3;
            if (scrolled > offset - $(window).height() && scrolled < offset + $(this).height()) {
                $(this).css('background-position-y', parallax + 'px');
            }
        });
    });

});
