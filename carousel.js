(function(){
    // 1. Carrossel do Banner
    function bannerCarousel(containerId, interval){
        const container = document.getElementById(containerId);
        if(!container) return;
        const track = container.querySelector('.carousel-track');
        if(!track) return;
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
        function stop(){ if(timer) { clearInterval(timer); timer = null; }}

        container.addEventListener('mouseenter', stop);
        container.addEventListener('mouseleave', start);

        goTo(0);
        start();
    }

    // 2. Carrossel de Distribuidores
    function distributorsCarousel(containerId, interval){
        const container = document.getElementById(containerId);
        if(!container) return;
        const viewport = container.closest('.carousel-viewport');
        const track = container;
        let items = [];
        const wrapper = container.closest('.main-content-distribuidores-wrapper');
        const prevBtn = wrapper && wrapper.querySelector('.carousel-btn.prev');
        const nextBtn = wrapper && wrapper.querySelector('.carousel-btn.next');
        let index = 0;
        let timer = null;

        function calcMetrics(){
            // AJUSTE CRÍTICO: Agora selecionamos os links (<a>) que envelopam os distribuidores
            items = Array.from(container.querySelectorAll('a'));
            if(items.length === 0) return { itemWidth: 0, visible: 1, maxIndex: 0 };
            
            const itemStyle = items[0].getBoundingClientRect();
            const itemWidth = itemStyle.width;
            const viewportWidth = viewport ? viewport.offsetWidth : container.offsetWidth;
           // Dentro da função calcMetrics() no JS:
            const visible = Math.max(1, Math.floor(viewport.offsetWidth / 210)); // 180px largura + 30px margem
            const maxIndex = Math.max(0, items.length - visible);
            // Dentro da função calcMetrics() no JS:

            return { itemWidth, visible, maxIndex };
        }

        function update(){
            const { itemWidth, maxIndex } = calcMetrics();
            if(!itemWidth) return;
            if(index > maxIndex) index = maxIndex;
            const translate = -(index * (itemWidth + 30));
            track.style.transform = `translateX(${translate}px)`;
        }

        prevBtn && prevBtn.addEventListener('click', ()=>{ index = Math.max(0, index-1); update(); });
        nextBtn && nextBtn.addEventListener('click', ()=>{ const { maxIndex } = calcMetrics(); index = (index + 1) > maxIndex ? 0 : index + 1; update(); });

        function start(){ 
            stop(); 
            timer = setInterval(()=>{ 
                const { maxIndex } = calcMetrics(); 
                index = (index + 4) > maxIndex ? 0 : index + 4; 
                update(); 
            }, interval || 4000); 
        }
        function stop(){ if(timer){ clearInterval(timer); timer = null; } }

        if(wrapper) {
            wrapper.addEventListener('mouseenter', stop);
            wrapper.addEventListener('mouseleave', start);
        }
        window.addEventListener('resize', ()=> setTimeout(update, 50));

        update();
        start();
    }

    // 3. Carregamento dos Distribuidores via JSON
    function loadDistributors(containerId, jsonPath, limit) {
        const container = document.getElementById(containerId);
        if (!container) return;

        fetch(jsonPath)
            .then(response => {
                if (!response.ok) throw new Error('Erro ao carregar o arquivo JSON');
                return response.json();
            })
            .then(distribuidores => {
                // Se um limite for especificado, corta o array
                const itemsToRender = limit ? distribuidores.slice(0, limit) : distribuidores;

                itemsToRender.forEach(item => {
                    const link = document.createElement('a');
                    link.href = item.siteUrl;
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                    link.style.display = 'inline-block'; // Garante dimensões corretas para o carrossel

                    const div = document.createElement('div');
                    div.className = 'distribuidor';

                    const img = document.createElement('img');
                    img.src = item.imgUrl;
                    img.alt = 'logo distribuidor';

                    div.appendChild(img);
                    link.appendChild(div);
                    container.appendChild(link);
                });

                // Inicia o carrossel SOMENTE APÓS as marcas serem renderizadas na tela
                distributorsCarousel(containerId, 4000);
            })
            .catch(error => console.error('Erro:', error));
    }

    // Inicialização
    document.addEventListener('DOMContentLoaded', ()=>{
        bannerCarousel('main-banner', 4000);
        // Carrega o JSON com o nome correto e inicia o carrossel dinamicamente
        loadDistributors('main-content-distribuidores', 'distributors.json');
    });
})();