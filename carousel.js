// Carrossel para o banner (slides full-width)
(function(){
    function bannerCarousel(containerId, interval){
        const container = document.getElementById(containerId);
        if(!container) return;
        const track = container.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const prevBtn = container.querySelector('.carousel-btn.prev');
        const nextBtn = container.querySelector('.carousel-btn.next');
        let index = 0;
        const max = slides.length;

        function goTo(i){
            index = (i + max) % max;
            track.style.transform = `translateX(${ -index * 100 }%)`;
        }
        prevBtn && prevBtn.addEventListener('click', ()=> goTo(index-1));
        nextBtn && nextBtn.addEventListener('click', ()=> goTo(index+1));

        let timer = null;
        function start(){
            stop();
            timer = setInterval(()=> goTo(index+1), interval || 4000);
        }
        function stop(){ if(timer) { clearInterval(timer); timer = null }}

        container.addEventListener('mouseenter', stop);
        container.addEventListener('mouseleave', start);

        goTo(0);
        start();
    }

    // Carrossel para distribuidores (mostra múltiplos por view)
    function distributorsCarousel(containerId){
        const container = document.getElementById(containerId);
        if(!container) return;
        const viewport = container.closest('.carousel-viewport');
        const track = container;
        let items = [];
        const wrapper = container.closest('.main-content-distribuidores-wrapper');
        const prevBtn = wrapper.querySelector('.carousel-btn.prev');
        const nextBtn = wrapper.querySelector('.carousel-btn.next');
        let index = 0;

        function update(){
            items = Array.from(container.querySelectorAll('.distribuidor'));
            if(items.length === 0) return;
            const itemStyle = items[0].getBoundingClientRect();
            const itemWidth = itemStyle.width;
            const visible = Math.max(1, Math.floor(viewport.offsetWidth / (itemWidth + 30)));
            const maxIndex = Math.max(0, items.length - visible);
            if(index > maxIndex) index = maxIndex;
            const translate = -(index * (itemWidth + 30));
            track.style.transform = `translateX(${translate}px)`;
        }

        prevBtn && prevBtn.addEventListener('click', ()=>{ index = Math.max(0, index-1); update(); });
        nextBtn && nextBtn.addEventListener('click', ()=>{ index++; update(); });

        window.addEventListener('resize', ()=> setTimeout(update,50));
        update();
    }

    // Carrega imagens de distribuidores a partir de um JSON e injeta no container
    async function loadDistributors(containerId, jsonPath, limit){
        const container = document.getElementById(containerId);
        if(!container) return;
        try{
            const res = await fetch(jsonPath);
            if(!res.ok) throw new Error('HTTP ' + res.status);
            const urls = await res.json();
            const items = Array.isArray(urls) ? urls.slice(0, limit || 5) : [];
            items.forEach(u=>{
                const div = document.createElement('div');
                div.className = 'distribuidor';
                const img = document.createElement('img');
                img.src = u;
                img.alt = 'logo distribuidor';
                div.appendChild(img);
                container.appendChild(div);
            });
            // inicializa o carrossel após injetar os itens
            distributorsCarousel(containerId);
        }catch(err){
            console.error('Erro carregando distribuidores:', err);
        }
    }

    // Inicializa quando DOM estiver pronto
    document.addEventListener('DOMContentLoaded', ()=>{
        bannerCarousel('main-banner', 4000);
        // carrega distribuidores via JSON e mostra somente 5
        loadDistributors('main-content-distribuidores', 'distributors.json', 5);
    });
})();
