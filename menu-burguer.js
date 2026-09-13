document.addEventListener('DOMContentLoaded', () => {
    
    const btnCat = document.getElementById('cat') 
    const navCat = document.querySelector('.menu-categoris-nav');
    const cascade = document.getElementById('cascade');
    const menuCategorias = document.querySelector('.menu-categorias');

    
    const btnBurger = document.getElementById('menu-burger');
    const navHeader = document.querySelector('.header-menu-nav');

    
    if (btnCat && navCat) {
        btnCat.addEventListener('click', (event) => {
            event.stopPropagation(); // Impede o clique de subir para o document
            navCat.classList.toggle('show');
        });
    }

    
    if (btnBurger && navHeader) {
        btnBurger.addEventListener('click', (event) => {
            event.stopPropagation(); // Impede o clique de subir para o document
            navHeader.classList.toggle('show');
        });
    }

  
    document.addEventListener('click', (event) => {
       
        if (navCat && navCat.classList.contains('show')) {
            if (!navCat.contains(event.target) && !btnCat.contains(event.target)) {
                navCat.classList.remove('show');
            }
        }

        
        if (navHeader && navHeader.classList.contains('show')) {
            if (!navHeader.contains(event.target) && !btnBurger.contains(event.target)) {
                navHeader.classList.remove('show');
            }
        }
    });

   
    if (menuCategorias && cascade) {
        menuCategorias.addEventListener('mouseleave', () => {
            cascade.classList.remove('ativo');
        });
    }
});