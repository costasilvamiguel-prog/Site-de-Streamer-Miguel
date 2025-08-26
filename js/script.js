// Menu Mobile Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navList.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navList.classList.remove('active');
        });
    });
    
    // Smooth scrolling para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Filtro da galeria
    const filterButtons = document.querySelectorAll('.filtro-btn');
    const galleryItems = document.querySelectorAll('.galeria-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona a classe active ao botão clicado
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'todos' || item.getAttribute('data-categoria') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Navegação do calendário de horários
    const prevWeekBtn = document.getElementById('prev-week');
    const nextWeekBtn = document.getElementById('next-week');
    const weekRangeElement = document.getElementById('week-range');
    
    let currentDate = new Date();
    
    function updateWeekRange() {
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1); // Ajuste para segunda-feira
        
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        
        const options = { day: 'numeric', month: 'long' };
        const startFormatted = startOfWeek.toLocaleDateString('pt-BR', options);
        const endFormatted = endOfWeek.toLocaleDateString('pt-BR', options);
        
        weekRangeElement.textContent = `${startFormatted} - ${endFormatted}`;
    }
    
    prevWeekBtn.addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() - 7);
        updateWeekRange();
    });
    
    nextWeekBtn.addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() + 7);
        updateWeekRange();
    });
    
    // Inicializar a exibição da semana atual
    updateWeekRange();
    
    // Botão de ativar notificações
    const notifyBtn = document.querySelector('.btn-notificacao');
    if (notifyBtn) {
        notifyBtn.addEventListener('click', () => {
            if ('Notification' in window) {
                if (Notification.permission === 'default') {
                    Notification.requestPermission().then(permission => {
                        if (permission === 'granted') {
                            alert('Notificações ativadas com sucesso! Você será avisado sobre as próximas transmissões.');
                        }
                    });
                } else if (Notification.permission === 'granted') {
                    alert('Você já ativou as notificações!');
                } else {
                    alert('As notificações estão bloqueadas para este site. Por favor, altere as configurações do seu navegador.');
                }
            } else {
                alert('Seu navegador não suporta notificações.');
            }
        });
    }
    
    // Validação do formulário de contato
    const contactForm = document.getElementById('formContato');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const assunto = document.getElementById('assunto').value;
            const mensagem = document.getElementById('mensagem').value;
            
            if (!nome || !email || !assunto || !mensagem) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Se a validação passar, o formulário será enviado
            this.submit();
        });
    }
    
    // Animação de scroll para elementos
    function animateOnScroll() {
        const elements = document.querySelectorAll('.destaque-item, .produto-item, .jogo-item, .conquista-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Configuração inicial para elementos animados
    const animatedElements = document.querySelectorAll('.destaque-item, .produto-item, .jogo-item, .conquista-item');
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Disparar a animação quando a página carrega e quando o usuário faz scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});
