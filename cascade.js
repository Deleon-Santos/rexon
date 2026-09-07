
const categorias = {
    correias: [
        "Correias em V",
        "Sincronizadoras de borracha",
        "Sincronizadoras de PU"
    ],

    fixacao: [
        "Abraçadeiras de nylon",
        "Abraçadeiras galvanizadas",
        "Abraçadeiras de carbono"
    ],

    laminas: [
        "Lâminas de borracha",
        "Piso de borracha"
    ],

    mangueira: [
        "Mangueiras hidráulicas",
        "Mangueiras a óleo"
    ],

    lonas: [
        "Lonas de polietileno"
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
                        <a href="#">${produto}</a>
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