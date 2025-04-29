// Espera o documento carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos do DOM
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const header = document.querySelector('.header');
    const backToTopButton = document.querySelector('#back-to-top');
    
    // Toggle para o menu móvel
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            document.body.classList.toggle('mobile-nav-active');
            this.classList.toggle('mobile-menu-open');
        });
    }
    
    // Funcionalidade Header Sticky ao rolar a página
    function handleScroll() {
        // Header com efeito de scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Botão voltar ao topo
        if (backToTopButton) {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Funcionalidade Botão "Voltar ao Topo"
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Fechar menu quando clica em um link (mobile)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (document.body.classList.contains('mobile-nav-active')) {
                document.body.classList.remove('mobile-nav-active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.classList.remove('mobile-menu-open');
                }
            }
        });
    });
    
    // Efeito de fade-in para elementos ao scrollar
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        const triggerBottom = window.innerHeight * 0.8;
        
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkFade);
    window.addEventListener('resize', checkFade);
    
    // Chama a verificação inicial
    checkFade();
    
    // Inicializa o contador no formulário de contato
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Formulário será manipulado pelo FormSubmit ou similar
            // Não é necessário impedir o comportamento padrão
            
            // Opcional: analytics de evento de envio de formulário
            if (typeof gtag === 'function') {
                gtag('event', 'form_submission', {
                    'event_category': 'Contact',
                    'event_label': 'Contact Form'
                });
            }
        });
    }
    
    // Adiciona máscaras e validações para campos de formulário
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            
            if (value.length > 7) {
                e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
            } else if (value.length > 2) {
                e.target.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            } else if (value.length > 0) {
                e.target.value = `(${value}`;
            } else {
                e.target.value = '';
            }
        });
    }
});