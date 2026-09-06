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

    // Carrossel para distribuidores (mostra múltiplos por view) com autoplay
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
            items = Array.from(container.querySelectorAll('.distribuidor'));
            if(items.length === 0) return { itemWidth: 0, visible: 1, maxIndex: 0 };
            const itemStyle = items[0].getBoundingClientRect();
            const itemWidth = itemStyle.width;
            const visible = Math.max(1, Math.floor(viewport.offsetWidth / (itemWidth + 30)));
            const maxIndex = Math.max(0, items.length - visible);
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

        function start(){ stop(); timer = setInterval(()=>{ const { maxIndex } = calcMetrics(); index = (index + 1) > maxIndex ? 0 : index + 1; update(); }, interval || 4000); }
        function stop(){ if(timer){ clearInterval(timer); timer = null; } }

        wrapper && wrapper.addEventListener('mouseenter', stop);
        wrapper && wrapper.addEventListener('mouseleave', start);
        window.addEventListener('resize', ()=> setTimeout(update,50));

        update();
        start();
    }

    // Carrega imagens de distribuidores a partir de um JSON e injeta no container
    async function loadDistributors(containerId, jsonPath, limit){
        const container = document.getElementById(containerId);
        if(!container) return;
        try{
            let urls = null;
            // tenta fetch do arquivo JSON
            try{
                const res = await fetch(jsonPath);
                if(!res.ok) throw new Error('HTTP ' + res.status);
                urls = await res.json();
            }catch(fetchErr){
                // fallback: procura um <script type="application/json" id="distributors-data"> no HTML
                const script = document.getElementById('distributors-data');
                if(script){
                    try{ urls = JSON.parse(script.textContent); }catch(e){ urls = null }
                }else{
                    console.warn('Falha ao carregar', jsonPath, fetchErr);
                }
            }
            const urlsArr = urls;
            const items = Array.isArray(urls) ? urls : [];
            items.forEach(u=>{
                const div = document.createElement('div');
                div.className = 'distribuidor';
                const img = document.createElement('img');
                img.src = u;
                img.alt = 'logo distribuidor';
                div.appendChild(img);
                container.appendChild(div);
            });
            // inicializa o carrossel após injetar os itens (autoplay a cada 4s)
            distributorsCarousel(containerId, 4000);
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
