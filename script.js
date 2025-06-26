let currentChapter = 0;
        const totalChapters = 7;
        let scrollY = 0;
        let maskOpacity = 0;

        // Crear espigas del virus principal
        function createVirusSpikes() {
            const spikesContainer = document.getElementById('virus-spikes');
            const spikeCount = 32;

            for (let i = 0; i < spikeCount; i++) {
                const angle = (i * 360) / spikeCount + (Math.random() - 0.5) * 20;
                const radian = (angle * Math.PI) / 180;
                const spikeLength = 35 + Math.random() * 25;
                const baseRadius = 180;
                const baseX = 500 + Math.cos(radian) * baseRadius;
                const baseY = 500 + Math.sin(radian) * baseRadius;
                const tipX = 500 + Math.cos(radian) * (baseRadius + spikeLength);
                const tipY = 500 + Math.sin(radian) * (baseRadius + spikeLength);
                const midX = 500 + Math.cos(radian) * (baseRadius + spikeLength * 0.7);
                const midY = 500 + Math.sin(radian) * (baseRadius + spikeLength * 0.7);

                // Crear grupo para la espiga
                const spikeGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");

                // Tallo de la espiga
                const spikeLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
                spikeLine.setAttribute("x1", baseX);
                spikeLine.setAttribute("y1", baseY);
                spikeLine.setAttribute("x2", midX);
                spikeLine.setAttribute("y2", midY);
                spikeLine.setAttribute("stroke", "#2E5F8A");
                spikeLine.setAttribute("stroke-width", "8");
                spikeLine.setAttribute("stroke-linecap", "round");
                spikeLine.setAttribute("opacity", "0.8");

                // Cabeza de la espiga
                const spikeHead = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                spikeHead.setAttribute("cx", tipX);
                spikeHead.setAttribute("cy", tipY);
                spikeHead.setAttribute("r", "12");
                spikeHead.setAttribute("fill", "url(#spikeGradient)");
                spikeHead.setAttribute("filter", "url(#depth)");

                // Detalle interno
                const spikeDetail = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                spikeDetail.setAttribute("cx", tipX - 2);
                spikeDetail.setAttribute("cy", tipY - 2);
                spikeDetail.setAttribute("r", "4");
                spikeDetail.setAttribute("fill", "#FF8A8A");
                spikeDetail.setAttribute("opacity", "0.6");

                spikeGroup.appendChild(spikeLine);
                spikeGroup.appendChild(spikeHead);
                spikeGroup.appendChild(spikeDetail);
                spikesContainer.appendChild(spikeGroup);
            }
        }

        // Crear plaga de virus para propagación global
        function createVirusPlague() {
            const plagueContainer = document.getElementById('virusPlague');
            const virusCount = 25;

            for (let i = 0; i < virusCount; i++) {
                const virus = document.createElement('div');
                virus.className = 'plague-virus';
                virus.style.left = Math.random() * 100 + '%';
                virus.style.top = Math.random() * 100 + '%';
                virus.style.animationDelay = Math.random() * 6 + 's';
                virus.style.animationDuration = (4 + Math.random() * 4) + 's';
                plagueContainer.appendChild(virus);
            }
        }

        // Actualizar estado del virus según capítulo
        function updateVirusState(chapter) {
            const virusMain = document.getElementById('virusMain');
            const virusPlague = document.getElementById('virusPlague');
            
            // Limpiar clases anteriores
            virusMain.className = 'virus-main';
            virusPlague.classList.remove('active');
            
            switch(chapter) {
                case 1: // Los Orígenes - Bandera de China
                    virusMain.classList.add('china');
                    break;
                case 2: // ¿Qué es COVID? - Normal
                    // Sin clases adicionales, virus normal
                    break;
                case 3: // Propagación Global - Plaga de virus
                    virusPlague.classList.add('active');
                    break;
                case 4: // Cuarentena - Virus en casa
                    virusMain.classList.add('house');
                    break;
                case 5: // Vacunas - Virus vacunándose
                    virusMain.classList.add('vaccine');
                    break;
                case 6: // Consecuencias - Virus muerto
                    virusMain.classList.add('dead');
                    break;
                case 7: // Fuentes - Virus con libro
                    virusMain.classList.add('book');
                    break;
            }
        }

        function updateTimeline() {
            scrollY = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            // Mostrar timeline después de pasar la portada
            const timelineContainer = document.getElementById('timelineContainer');
            const progressIndicator = document.getElementById('progress');
            const floatingVirus = document.getElementById('floatingVirus');
            const virusMask = document.getElementById('virus-mask');
            
            if (scrollY > windowHeight * 0.8) {
                timelineContainer.classList.add('visible');
                progressIndicator.classList.add('visible');
                floatingVirus.classList.add('visible');
            } else {
                timelineContainer.classList.remove('visible');
                progressIndicator.classList.remove('visible');
                floatingVirus.classList.remove('visible');
                return;
            }
            
            // ANIMAR VIRUS FLOTANTE
            const maxScroll = document.body.scrollHeight - windowHeight;
            const scrollProgress = (scrollY - windowHeight) / (maxScroll - windowHeight);
            const virusTop = 100 + (scrollProgress * (windowHeight - 300));
            floatingVirus.style.top = virusTop + 'px';
            
            // ANIMAR BARBIJO EN PORTADA
            const maskStart = windowHeight * 0.3;
            const maskEnd = windowHeight * 0.8;
            
            if (scrollY < maskStart) {
                maskOpacity = 0;
            } else if (scrollY > maskEnd) {
                maskOpacity = 1;
            } else {
                const progress = (scrollY - maskStart) / (maskEnd - maskStart);
                maskOpacity = progress;
            }
            
            if (virusMask) {
                virusMask.style.opacity = maskOpacity;
            }
            
            // Detectar capítulo actual
            const contentSections = document.querySelectorAll('.content-section');
            let newChapter = 0;
            
            contentSections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                const chapterNum = index + 1;
                
                if (rect.top < windowHeight * 0.6 && rect.bottom > windowHeight * 0.4) {
                    newChapter = chapterNum;
                }
            });
            
            if (newChapter !== currentChapter && newChapter > 0) {
                currentChapter = newChapter;
                updateChapterDisplay();
                updateVirusState(currentChapter);
                document.getElementById('progress').textContent = `${currentChapter}/7`;
            }
        }

        function updateChapterDisplay() {
            const timelineItems = document.querySelectorAll('.timeline-item');
            
            timelineItems.forEach((item, index) => {
                const chapterNum = index + 1;
                
                if (chapterNum === currentChapter) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }

        function navigateToChapter(chapterNum) {
            const targetSection = document.getElementById(`chapter-${chapterNum}`);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }

        // Event listeners
        window.addEventListener('scroll', updateTimeline);

        document.querySelectorAll('.timeline-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                navigateToChapter(index + 1);
            });
        });

        // Inicialización
        document.addEventListener('DOMContentLoaded', () => {
            createVirusSpikes();
            createVirusPlague();
            updateTimeline();
        });