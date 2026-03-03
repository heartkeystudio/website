// Lista de mensagens para exibir
const mensagens = [
    "WE PUT OUR HEARTS INTO THAT!",
    "WHERE PASSION MEETS CREATIVITY.",
    "ART, SOUND, CODE – IN PERFECT HARMONY.",
    "EVERY PIXEL, EVERY NOTE – MADE WITH LOVE."
];

let indice = 0; // Índice da mensagem atual

function toggleMenu() {
    const nav = document.querySelector("nav");
    nav.classList.toggle("active");
}


function trocarTexto() {
    // Atualiza o texto
    document.getElementById("text_changer").textContent = mensagens[indice];

    // Incrementa o índice ou reinicia se chegar ao final
    indice = (indice + 1) % mensagens.length;
}

document.addEventListener("DOMContentLoaded", function () {
    // Mantém seu código original
    setInterval(trocarTexto, 6000); // Troca a cada 6 segundos

    // Código para mudar a cor do header no scroll
    window.addEventListener("scroll", function () {
        let header = document.querySelector("header");
        if (window.scrollY > 50) { 
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    const carousel = document.querySelector('.game-carousel');
    const prevBtn = document.getElementById('prev-game');
    const nextBtn = document.getElementById('next-game');

    if (carousel && prevBtn && nextBtn) {
        
        // Função para pegar a largura do card (incluindo padding/margin)
        const getCardWidth = () => {
            const firstCard = carousel.querySelector('.game-card');
            if (!firstCard) return 0;
            
            // getBoundingClientRect().width é mais preciso que offsetWidth
            return firstCard.getBoundingClientRect().width;
        };

        // Função para rolar para o próximo
        const scrollNext = () => {
            const cardWidth = getCardWidth();
            if (cardWidth === 0) return;

            // Verifica se está perto do final
            // (Usamos 10 pixels de margem de erro para cálculos)
            const isAtEnd = carousel.scrollWidth - carousel.scrollLeft - carousel.clientWidth < 10;

            if (isAtEnd) {
                // Se está no final, volta para o começo (loop)
                carousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                // Se não, avança um card
                // Usamos scrollBy para rolar *relativo* à posição atual
                carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
        };

        // Função para rolar para o anterior
        const scrollPrev = () => {
            const cardWidth = getCardWidth();
            if (cardWidth === 0) return;

            const isAtStart = carousel.scrollLeft < 10;

            if (isAtStart) {
                // Se está no começo, vai para o final (loop)
                carousel.scrollTo({ left: carousel.scrollWidth, behavior: 'smooth' });
            } else {
                // Se não, volta um card
                carousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
            }
        };

        // Adiciona os eventos aos botões
        nextBtn.addEventListener('click', scrollNext);
        prevBtn.addEventListener('click', scrollPrev);

        // Inicia o auto-play (troca a cada 5 segundos)
        // 5000 milissegundos = 5 segundos
        setInterval(scrollNext, 5000);
    }

    // SLIDESHOW NOS CARDS DO TIME
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach((member) => {
        const carousel = member.querySelector('.portfolio-carousel');
        const dots = member.querySelectorAll('.portfolio-dot');
        const media = carousel.querySelectorAll('img, video');
        
        if (media.length === 0) return; // Pula se não houver mídia
        
        let currentIndex = 0;
        let slideInterval;
        
        const showSlide = (index) => {
            // Remove a classe active de todos
            media.forEach((m) => m.classList.remove('active'));
            dots.forEach((d) => d.classList.remove('active'));
            
            // Adiciona a classe active ao slide atual
            media[index].classList.add('active');
            dots[index].classList.add('active');
            currentIndex = index;
        };
        
        const nextSlide = () => {
            const nextIndex = (currentIndex + 1) % media.length;
            showSlide(nextIndex);
        };
        
        // Inicia o slideshow ao passar o mouse
        member.addEventListener('mouseenter', () => {
            slideInterval = setInterval(nextSlide, 2000); // Troca a cada 2 segundos
        });
        
        // Para o slideshow ao tirar o mouse
        member.addEventListener('mouseleave', () => {
            clearInterval(slideInterval);
            showSlide(0); // Volta para o primeiro slide
        });
        
        // Permite clicar nos dots para navegar
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval);
                showSlide(index);
                slideInterval = setInterval(nextSlide, 2000);
            });
        });
    });

    // Evitar que clicar nos dots (ou nav) dispare a navegação do <a class="team-member">
    document.querySelectorAll('.portfolio-dot').forEach(dot => {
        dot.addEventListener('click', function (e) {
            e.stopPropagation(); // impede propagation para o <a>
            // opcional: caso já tenha handler para mudar slide, ele roda normalmente
        });
    });

    // Também impedir que clicar dentro do container .portfolio-nav propague
    document.querySelectorAll('.portfolio-nav').forEach(nav => {
        nav.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    });

    // Caso os controles do slideshow (dots) sejam criados dinamicamente,
    // garanta que o handler acima seja executado depois da criação dos dots.
});


