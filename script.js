// ========================
// INICIALIZAÇÃO DO DOCUMENTO
// ========================

document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initScrollAnimations();
    initHamburgerMenu();
    initSmoothScroll();
});

// ========================
// NAVBAR FIXA
// ========================

function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Atualizar link ativo conforme a página
    function updateActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            if (currentPage === '' && href === 'index.html') {
                link.classList.add('active');
            } else if (href === currentPage) {
                link.classList.add('active');
            } else if (href.includes('#') && currentPage === 'index.html') {
                link.classList.remove('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Adicionar efeito de transparência ao scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
    
    updateActiveLink();
}

// ========================
// MENU HAMBURGER
// ========================

function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.navbar-menu');
    
    if (!hamburger) return;
    
    hamburger.addEventListener('click', function() {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.flexDirection = 'column';
        navMenu.style.backgroundColor = 'var(--bg-primary)';
        navMenu.style.padding = 'var(--spacing-lg)';
        navMenu.style.borderBottom = '1px solid var(--border-color)';
    });
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.style.display = 'none';
        });
    });
}

// ========================
// SCROLL SUAVE
// ========================

function initSmoothScroll() {
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
}

// ========================
// ANIMAÇÕES AO SCROLL
// ========================

function initScrollAnimations() {
    // Observer para animações ao scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animar cards quando entram na viewport
                if (entry.target.classList.contains('tema-card')) {
                    animateCard(entry.target);
                }
                
                // Animar módulos
                if (entry.target.classList.contains('modulo')) {
                    animateModulo(entry.target);
                }
                
                // Animar passos
                if (entry.target.classList.contains('passo')) {
                    animatePasso(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos
    document.querySelectorAll('.tema-card, .modulo, .passo, .stat').forEach(el => {
        observer.observe(el);
    });
}

// ========================
// FUNÇÕES DE ANIMAÇÃO
// ========================

function animateCard(card) {
    card.style.animation = 'fadeInUp 0.6s ease-out forwards';
}

function animateModulo(modulo) {
    modulo.style.animation = 'fadeInUp 0.6s ease-out forwards';
}

function animatePasso(passo) {
    passo.style.animation = 'fadeInUp 0.6s ease-out forwards';
}

// ========================
// EFEITO HOVER NOS BOTÕES
// ========================

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        if (!this.style.position || this.style.position === 'static') {
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
        }
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ========================
// ANIMAÇÃO DE NÚMEROS
// ========================

function animateNumber(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const interval = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(interval);
        } else {
            if (target > 100) {
                element.textContent = Math.floor(start);
            } else {
                element.textContent = Math.floor(start);
            }
        }
    }, 16);
}

// ========================
// INTERATIVIDADE DE CARDS
// ========================

document.querySelectorAll('.tema-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ========================
// CARREGAMENTO DE PÁGINA
// ========================

window.addEventListener('load', function() {
    // Animar elementos quando a página carrega
    document.querySelectorAll('.hero-content').forEach(el => {
        el.style.animation = 'fadeInUp 1s ease-out';
    });
});

// ========================
// SCROLL PARALLAX (LEVE)
// ========================

window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    
    // Aplicar efeito leve em elementos com classe parallax
    document.querySelectorAll('.parallax').forEach(el => {
        el.style.transform = `translateY(${scrollY * 0.05}px)`;
    });
});

// ========================
// DETECTAR SEÇÃO ATIVA DURANTE SCROLL
// ========================

window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        if (section.offsetTop <= scrollPosition + 200) {
            const id = section.getAttribute('id');
            if (id) {
                document.querySelectorAll('a.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').includes(id)) {
                        link.classList.add('active');
                    }
                });
            }
        }
    });
});

// ========================
// ADICIONAR ANIMAÇÃO KEYFRAME DINAMICAMENTE
// ========================

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(100);
            opacity: 0;
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .visible {
        animation: fadeInUp 0.6s ease-out forwards !important;
    }
`;
document.head.appendChild(style);

// ========================
// INCREMENTAR NÚMEROS DOS STATS
// ========================

const observerStats = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && statNumber.textContent !== '∞') {
                const number = parseInt(statNumber.textContent);
                if (!isNaN(number)) {
                    animateNumber(statNumber, number, 1500);
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    observerStats.observe(stat);
});

// ========================
// FEEDBACK VISUAL AOS CLIQUES
// ========================

document.addEventListener('click', function(e) {
    // Efeito de clique em botões
    if (e.target.classList.contains('btn')) {
        const btn = e.target;
        btn.style.transform = 'scale(0.98)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 100);
    }
});

// ========================
// CARREGAR MAIS CONTEÚDO (PREMIUM FEATURE)
// ========================

function addLoadMoreFeature() {
    const modulos = document.querySelectorAll('.modulo');
    if (modulos.length > 3) {
        let hidden = 0;
        modulos.forEach((modulo, index) => {
            if (index >= 3) {
                modulo.style.display = 'none';
                hidden++;
            }
        });
        
        if (hidden > 0) {
            const btn = document.createElement('button');
            btn.classList.add('btn', 'btn-primary');
            btn.textContent = `Carregar mais (${hidden} itens)`;
            btn.style.marginTop = 'var(--spacing-xl)';
            
            const temContent = document.querySelector('.tema-content');
            const lastModulo = Array.from(modulos).reverse().find((m, i) => i < modulos.length - hidden);
            
            if (temContent) {
                btn.addEventListener('click', function() {
                    modulos.forEach((modulo, index) => {
                        if (index >= 3) {
                            modulo.style.display = 'block';
                            modulo.style.animation = 'fadeInUp 0.6s ease-out';
                        }
                    });
                    btn.style.display = 'none';
                });
            }
        }
    }
}

// Chamar função após carregamento
window.addEventListener('load', addLoadMoreFeature);

// ========================
// NOTIFICAÇÃO DE DESENVOLVIMENTO
// ========================

console.log('%c🚀 Bem-vindo ao EducaMais!', 'font-size: 20px; color: #3b82f6; font-weight: bold;');
console.log('%cPlataforma de Educação e Desenvolvimento Pessoal', 'font-size: 14px; color: #60a5fa;');
console.log('%cTemas: Educação Financeira | Comunicação | Mercado de Trabalho | Inteligência Emocional', 'font-size: 12px; color: #b0b8c8;');

// ========================
// FUNCIONALIDADE DE FORMULÁRIO (FUTURO)
// ========================

function setupFormListeners() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aqui você pode adicionar lógica para enviar dados
            const submitBtn = form.querySelector('[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = '✓ Enviado!';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                form.reset();
            }, 2000);
        });
    });
}

setupFormListeners();

// ========================
// SUPORTE A TEMAS (LIGHT/DARK)
// ========================

function setupThemeToggle() {
    // Verificar se há suporte a preferência do sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    // Aplicar tema do sistema por padrão (este site está otimizado para dark)
    if (prefersLight) {
        console.log('Sistema em modo claro. EducaMais funciona melhor em modo escuro.');
    }
}

setupThemeToggle();

// ========================
// RASTREAMENTO DE ENGAJAMENTO
// ========================

let pageEngagement = {
    timeOnPage: 0,
    sectionsViewed: [],
    interactionsCount: 0
};

setInterval(() => {
    pageEngagement.timeOnPage++;
}, 1000);

document.addEventListener('click', () => {
    pageEngagement.interactionsCount++;
});

window.addEventListener('beforeunload', () => {
    // Você pode enviar dados de engajamento para um servidor aqui
    console.log('Engajamento da página:', pageEngagement);
});

// ========================
// DICAS EDUCACIONAIS
// ========================

const tips = [
    'Pequenas ações consistentes criam grandes transformações!',
    'O melhor momento para começar foi ontem. O segundo melhor é agora!',
    'Conhecimento sem ação é apenas informação.',
    'Disciplina é fazer o que precisa ser feito, independente de estar com vontade.',
    'Seu futuro é resultado das decisões que você toma hoje.'
];

// Mostrar dica aleatória no console a cada 5 minutos
setInterval(() => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    console.log('%c💡 Dica do Dia: ' + randomTip, 'font-size: 12px; color: #10b981; font-style: italic;');
}, 300000); // 5 minutos

// ========================
// PERFORMANCE E LAZY LOADING
// ========================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
