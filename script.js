document.addEventListener('DOMContentLoaded', () => {
    // =======================================================================
    // 1. DARK MODE COM LOCALSTORAGE
    // =======================================================================
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // =======================================================================
    // 2. HEADER GLASSMORPHISM NO SCROLL
    // =======================================================================
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // =======================================================================
    // 3. MENU MOBILE
    // =======================================================================
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    if (menuBtn && mobileNav) {
        menuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
        });
        // Fechar ao clicar em um link
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => mobileNav.classList.remove('active'));
        });
    }

    // =======================================================================
    // 4. INTERSECTION OBSERVER PARA ANIMAÇÕES
    // =======================================================================
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .testimonial-card, .about-image, .about-text').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // =======================================================================
    // 5. FAQ ACCORDION
    // =======================================================================
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling;
            const isActive = button.classList.contains('active');
            
            // Fechar todos
            document.querySelectorAll('.faq-question').forEach(btn => {
                btn.classList.remove('active');
                btn.nextElementSibling.style.maxHeight = null;
            });

            // Abrir o clicado se não estava ativo
            if (!isActive) {
                button.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // =======================================================================
    // 6. RASTREAMENTO DE UTMs E INJEÇÃO NO WHATSAPP
    // =======================================================================
    function getUTMParams() {
        const params = new URLSearchParams(window.location.search);
        const utm = {};
        ['utm_source', 'utm_medium', 'utm_campaign'].forEach(key => {
            if (params.has(key)) {
                utm[key] = params.get(key);
                localStorage.setItem(key, params.get(key));
            } else {
                utm[key] = localStorage.getItem(key) || 'site_organico';
            }
        });
        return utm;
    }

    const utmData = getUTMParams();
    const whatsappMessage = `Olá! Vim pelo ${utmData.utm_source} (${utmData.utm_medium}) e gostaria de agendar um horário na Picanço Legacy.`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappNumber = '5511999998888'; // Substitua pelo número real

    // Atualizar todos os links do WhatsApp na página
    const whatsappLinks = document.querySelectorAll('#floating-whatsapp, #sticky-whatsapp-btn, .hero-ctas .btn-primary');
    whatsappLinks.forEach(link => {
        if (link.getAttribute('href') && link.getAttribute('href').includes('wa.me')) {
            link.setAttribute('href', `https://wa.me/${whatsappNumber}?text=${encodedMessage}`);
        }
    });

    // =======================================================================
    // 7. FUNÇÃO DE TRACKING COM CONSENTIMENTO
    // =======================================================================
    window.trackEvent = function(eventName, params = {}) {
        const consent = localStorage.getItem('cookie_consent');
        if (consent === 'accepted') {
            if (typeof gtag !== 'undefined') {
                gtag('event', eventName, params);
            }
            if (typeof fbq !== 'undefined') {
                fbq('trackCustom', eventName, params);
            }
        }
    };

    // Rastrear clique no WhatsApp
    whatsappLinks.forEach(link => {
        link.addEventListener('click', () => {
            trackEvent('whatsapp_click', { source: link.id || 'hero_button' });
        });
    });

    // =======================================================================
    // 8. FORMULÁRIO INTELIGENTE (FALLBACK MAILTO/WA)
    // =======================================================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Recuperar rascunho
        const savedData = localStorage.getItem('form_draft');
        if (savedData) {
            const data = JSON.parse(savedData);
            document.getElementById('name').value = data.name || '';
            document.getElementById('whatsapp').value = data.whatsapp || '';
        }

        // Salvar rascunho
        contactForm.addEventListener('input', () => {
            const draft = {
                name: document.getElementById('name').value,
                whatsapp: document.getElementById('whatsapp').value
            };
            localStorage.setItem('form_draft', JSON.stringify(draft));
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('whatsapp').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;

            const finalMsg = `Olá! Meu nome é ${name}.\nWhatsApp: ${phone}\nServiço de interesse: ${service}\nMensagem: ${message}`;
            const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(finalMsg)}`;
            
            // Limpar rascunho
            localStorage.removeItem('form_draft');
            
            // Simular modal de sucesso (alert simples para demo, ideal é modal customizado)
            alert('Redirecionando para o WhatsApp com seus dados pré-preenchidos!');
            window.open(waLink, '_blank');
            contactForm.reset();
            trackEvent('form_submit', { service: service });
        });
    }

    // =======================================================================
    // 9. BANNER DE COOKIES LGPD
    // =======================================================================
    const cookieBanner = document.getElementById('cookie-banner');
    const consent = localStorage.getItem('cookie_consent');

    if (!consent) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }

    document.getElementById('cookie-accept').addEventListener('click', () => {
        localStorage.setItem('cookie_consent', 'accepted');
        cookieBanner.classList.remove('show');
        // Recarregar para ativar scripts se necessário, ou apenas prosseguir
        trackEvent('cookie_consent', { status: 'accepted' });
    });

    document.getElementById('cookie-reject').addEventListener('click', () => {
        localStorage.setItem('cookie_consent', 'rejected');
        cookieBanner.classList.remove('show');
        trackEvent('cookie_consent', { status: 'rejected' });
    });

    document.getElementById('cookie-customize').addEventListener('click', () => {
        alert('Funcionalidade de personalização detalhada seria aberta aqui (ex: aceitar apenas analíticos).');
        localStorage.setItem('cookie_consent', 'custom');
        cookieBanner.classList.remove('show');
    });
});