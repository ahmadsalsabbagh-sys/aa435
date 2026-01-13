document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. BACKGROUND ENGINE: "TECH UNIVERSE"
    // ==========================================
    const canvas = document.getElementById('tech-universe');
    const ctx = canvas.getContext('2d');

    let w, h;

    const codeSnippets = [
        'function()', 'var x = 10;', 'if(true)', 'return;', 
        '<html>', 'npm install', 'console.log', 'import', 
        'class Tech', '=>', '</>', '{}', '[]', '// TODO'
    ];

    const techIcons = ['⚙️', '⚡', '💻', '🌐', '⌘', '⌥', '⎋', '🔗', '🔒'];

    let items = [];
    const maxItems = 130; 

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class TechObject {
        constructor() {
            this.reset();
            this.y = Math.random() * h;
        }

        reset() {
            this.x = Math.random() * w;
            this.y = Math.random() * -100;
            this.speed = Math.random() * 0.8 + 0.3;
            this.opacity = Math.random() * 0.25 + 0.05;
            
            const typeRand = Math.random();
            if (typeRand < 0.5) {
                this.type = 'code';
                this.content = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
                this.size = Math.floor(Math.random() * 10 + 12);
            } else if (typeRand < 0.8) {
                this.type = 'screen';
                this.width = Math.random() * 50 + 30;
                this.height = Math.random() * 35 + 25;
            } else {
                this.type = 'icon';
                this.content = techIcons[Math.floor(Math.random() * techIcons.length)];
                this.size = Math.floor(Math.random() * 14 + 14);
            }
        }

        update() {
            this.y += this.speed;
            if (this.y > h + 50) {
                this.reset();
            }
        }

        draw() {
            ctx.globalAlpha = this.opacity;
            
            if (this.type === 'screen') {
                ctx.strokeStyle = '#00f2ff';
                ctx.lineWidth = 1;
                ctx.strokeRect(this.x, this.y, this.width, this.height);
                ctx.fillStyle = 'rgba(0, 242, 255, 0.1)';
                ctx.fillRect(this.x, this.y, this.width, 8);
                ctx.fillStyle = '#00f2ff';
                ctx.beginPath();
                ctx.arc(this.x + 5, this.y + 4, 1.5, 0, Math.PI * 2);
                ctx.fill();

            } else if (this.type === 'code') {
                ctx.fillStyle = '#b0e0ff';
                ctx.font = `${this.size}px monospace`;
                ctx.fillText(this.content, this.x, this.y);

            } else if (this.type === 'icon') {
                ctx.fillStyle = '#00f2ff';
                ctx.font = `${this.size}px Arial`;
                ctx.fillText(this.content, this.x, this.y);
            }
            
            ctx.globalAlpha = 1; 
        }
    }

    for (let i = 0; i < maxItems; i++) {
        items.push(new TechObject());
    }

    function animate() {
        ctx.clearRect(0, 0, w, h);
        items.forEach(item => {
            item.update();
            item.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();


    // 2. TYPING EFFECT
    const typingElement = document.querySelector('.typing-text');
    if(typingElement) {
        const textToType = typingElement.getAttribute('data-text');
        typingElement.textContent = '';
        let charIndex = 0;
        function typeWriter() {
            if (charIndex < textToType.length) {
                typingElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 70);
            }
        }
        setTimeout(typeWriter, 500);
    }

    // 3. MOUSE CURSOR GLOW
    const cursorGlow = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // 4. SCROLL REVEAL
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.fade-in, .glass-card, .portfolio-item, .section-heading, .pricing-card, .threed-model-wrapper');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // 5. FAQ INTERACTION
    const accItems = document.querySelectorAll('.acc-item');
    accItems.forEach(item => {
        const header = item.querySelector('.acc-header');
        header.addEventListener('click', () => {
            accItems.forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    // 6. MOBILE MENU
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if(menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            const spans = menuToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
});