
const categorias = {
    correias: [
        {
            nome: "Correias em V",
            url: "https://rexon.com.br/produto/correias-em-v/"
        },
        {
            nome: "Sincronizadoras de borracha",
            url: "https://rexon.com.br/produto/sincronizadoras-de-borracha/"
        },
        {
            nome: "Sincronizadoras de PU",
            url: "https://rexon.com.br/produto/sincronizadoras-de-pu/"
        }
    ],

    fixacao: [
        {
            nome: "Abraçadeiras de nylon",
            url: "https://rexon.com.br/produto/abracadeiras-de-nylon/"
        },
        {
            nome: "Abraçadeiras galvanizadas",
            url: "https://rexon.com.br/produto/abracadeiras-galvanizadas/"
        },
        {
            nome: "Abraçadeiras de carbono",
            url: "https://rexon.com.br/produto/abracadeiras-de-carbono/"
        }
    ],

    laminas: [
        {
            nome: "Lâminas de borracha",
            url: "https://rexon.com.br/produto/laminas-de-borracha/"
        },
        {
            nome: "Piso de borracha",
            url: "https://rexon.com.br/produto/piso-de-borracha/"
        }
    ],

    mangueira: [
        {
            nome: "Mangueiras hidráulicas",
            url: "https://rexon.com.br/produto/mangueiras-hidraulicas/"
        },
        {
            nome: "Mangueiras a óleo",
            url: "https://rexon.com.br/produto/mangueiras-a-oleo/"
        }
    ],

    lonas: [
        {
            nome: "Lonas de polietileno",
            url: "https://rexon.com.br/produto/lonas-de-polietileno/"
        }
    ]

};

const links = document.querySelectorAll(".link-cascade");
const cascade = document.getElementById("cascade");


// Quando passar o mouse em uma categoria
links.forEach(link => {

    link.addEventListener("mouseenter", () => {

        const categoria = link.id;

        const produtos = categorias[categoria];

        if (!produtos) {
            return;
        }


        cascade.innerHTML = `
            <ul class="cascade-list">
                ${produtos.map(produto => `
                    <li>
                        <a href="${produto.url}" target="_blank" rel="noopener noreferrer">${produto.nome}</a>
                    </li>
                `).join("")}
            </ul>
        `;
        // posição do link ativo
        const linkRect = link.getBoundingClientRect();
        const menuRect = cascade.parentElement.getBoundingClientRect();


        // posiciona exatamente abaixo do link
        cascade.style.left = `${linkRect.left - menuRect.left}px`;

        cascade.style.top = `${linkRect.bottom - menuRect.top}px`;
            

        cascade.classList.add("ativo");

    });

});


// Quando sair do menu inteiro
const menuCategorias = document.querySelector(".menu-categorias");

menuCategorias.addEventListener("mouseleave", () => {

    cascade.classList.remove("ativo");

});
document.addEventListener('DOMContentLoaded', () => {
    // Tenta encontrar o botão e a nav
    const btnToggle = document.getElementById('cat') || document.querySelector('.toggle');
    const menuNav = document.querySelector('.menu-categoris-nav');

    if (btnToggle && menuNav) {
        btnToggle.addEventListener('click', (event) => {
            event.preventDefault();
            menuNav.classList.toggle('show');
        });
    } else {
        console.warn('Verificação de elementos:', { 
            botaoEncontrado: !!btnToggle, 
            menuEncontrado: !!menuNav 
        });
    }
});