$(document).ready(function() {

    // Preloader
    setTimeout(function() {
        $('#preloader').addClass('hidden');
    }, 1200);

    // Hamburger
    $('.hamburger').click(function() {
        $(this).toggleClass('active');
        $('.navbar').toggleClass('open');
    });
    $('.nav-link').click(function() {
        $('.hamburger').removeClass('active');
        $('.navbar').removeClass('open');
    });

    // Header scroll
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 80) {
            $('#header').addClass('scrolled');
        } else {
            $('#header').removeClass('scrolled');
        }
    });

    // AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true, offset: 80 });
    }

    // File input display
    $('#resume').change(function() {
        const fileName = $(this).val().split('\\').pop();
        if (fileName) {
            $(this).next('label').html('<i class="fas fa-check-circle"></i> ' + fileName);
        }
    });

    // Back to top
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

    // Form submit via AJAX
    $('.career-form-wrapper form').on('submit', function(e) {
        e.preventDefault();
        const form = this;
        const btn = $(form).find('button[type="submit"]');
        const origText = btn.html();
        btn.html('<i class="fas fa-spinner fa-spin"></i> Sending...').prop('disabled', true);

        const formData = new FormData(form);
        formData.append('_captcha', 'false');

        fetch(form.action, { method: 'POST', body: formData })
            .then(function() {
                $('.career-form-wrapper').html(`
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Application Submitted!</h3>
                        <p>Thanks for applying! We'll review your resume and contact you soon.</p>
                        <button class="btn-primary" onclick="location.reload()">Submit Another</button>
                    </div>
                `);
            })
            .catch(function() {
                btn.html(origText).prop('disabled', false);
                alert('Something went wrong. Please try again.');
            });
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
    setTimeout(handleHashOnLoad, 1200);

    $('a[href*="#"]:not([href="#"])').click(function(e) {
        if (location.hostname === this.hostname) {
            const hash = this.hash;
            // Only intercept same-page hash nav
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')) {
                e.preventDefault();
                scrollToHash(hash);
                if (history.pushState) {
                    history.pushState(null, null, hash);
                }
            }
        }
    });

});
