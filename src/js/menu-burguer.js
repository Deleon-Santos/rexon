document.addEventListener('DOMContentLoaded', () => {
    // Seleção dos elementos do Menu de Categorias
    const btnCat = document.getElementById('cat') || document.querySelector('.toggle');
    const navCat = document.querySelector('.menu-categoris-nav');
    const cascade = document.getElementById('cascade');
    const menuCategorias = document.querySelector('.menu-categorias');

    // Seleção dos elementos do Menu Burger (Topo)
    const btnBurger = document.getElementById('menu-burger');
    const navHeader = document.querySelector('.header-menu-nav');

    // Toggle do Menu de Categorias
    if (btnCat && navCat) {
        btnCat.addEventListener('click', (event) => {
            event.stopPropagation();
            
            // FECHA O MENU BURGER (se estiver aberto)
            if (navHeader) {
                navHeader.classList.remove('show');
            }

            // Alterna o Menu de Categorias
            navCat.classList.toggle('show');
            
            const icon = btnCat.querySelector('i');

            if (icon) {
                if (navCat.classList.contains('show')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                    cascade.classList.remove('show');
                }
            }
        });
    }

    // Toggle do Menu Burger
    if (btnBurger && navHeader) {
        btnBurger.addEventListener('click', (event) => {
            event.stopPropagation();

            // FECHA O MENU DE CATEGORIAS (se estiver aberto)
            if (navCat) {
                navCat.classList.remove('show');
                const icon = btnCat.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
            
            // Alterna o Menu Burger
            navHeader.classList.toggle('show');
            const icon = btnBurger.querySelector('i');

            if (icon) {
                if (navHeader.classList.contains('show')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Fechar Menus ao Clicar Fora
    document.addEventListener('click', (event) => {
        // Fechar Menu de Categorias se o clique for fora dele e do botão
        if (navCat && navCat.classList.contains('show')) {
            if (!navCat.contains(event.target) && !btnCat.contains(event.target)) {
                navCat.classList.remove('show');
                cascade.classList.remove('show','ativo');
                
                const icon = btnCat.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
            
        }

        // Fechar Menu Burger se o clique for fora dele e do botão
        if (navHeader && navHeader.classList.contains('show')) {
            if (!navHeader.contains(event.target) && !btnBurger.contains(event.target)) {
                navHeader.classList.remove('show');
                const icon = btnBurger.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        }
    });

    // Fechar Cascade ao passar o mouse fora do container
    if (menuCategorias && cascade) {
        menuCategorias.addEventListener('mouseleave', () => {
            cascade.classList.remove('ativo','show');
        });
    }
});