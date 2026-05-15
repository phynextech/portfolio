/* ================================================
   NEXUS SYMPOSIUM — Main Application Script
   Three.js + GSAP + Lenis
   ================================================ */

(function () {
    'use strict';

    // ============ CUSTOM CURSOR ============
    // Skip on touch devices or narrow screens (mobile)
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.innerWidth <= 768);
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    if (!isTouchDevice) {
        // Use transform-only positioning to avoid layout thrashing
        // All cursor movement is GPU-composited via translate()
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX, ringY = mouseY;
        // Separate magnetic pull offset (set by card hover effects)
        let magX = 0, magY = 0;
        let magRingX = 0, magRingY = 0;
        let magActive = false;

        // Position dot immediately, ring follows with lerp
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Single rAF loop drives both dot and ring
        function animateCursor() {
            // Lerp ring toward dot
            ringX += (mouseX - ringX) * 0.20;
            ringY += (mouseY - ringY) * 0.20;

            // Blend magnetic pull back to zero when not hovering
            if (!magActive) {
                magX *= 0.80;
                magY *= 0.80;
                magRingX *= 0.80;
                magRingY *= 0.80;
            }

            cursorDot.style.transform = `translate(${mouseX + magX - 4}px, ${mouseY + magY - 4}px)`;
            cursorRing.style.transform = `translate(${ringX + magRingX - 20}px, ${ringY + magRingY - 20}px)`;

            requestAnimationFrame(animateCursor);
        }

        // Remove old left/top approach from CSS for dot — use transform now
        cursorDot.style.left = '0';
        cursorDot.style.top = '0';
        cursorRing.style.left = '0';
        cursorRing.style.top = '0';
        animateCursor();

        // Hover detection
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('a, button, .highlight-card, .speaker-item')) {
                document.body.classList.add('cursor-hover');
            }
        });
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('a, button, .highlight-card, .speaker-item')) {
                document.body.classList.remove('cursor-hover');
            }
        });

        // Expose magnetic pull so card interactions can use it without touching the style directly
        window._cursorMag = { set(px, py, rx, ry) { magX = px; magY = py; magRingX = rx; magRingY = ry; magActive = true; }, clear() { magActive = false; } };
    } // end !isTouchDevice

    // ============ LENIS SMOOTH SCROLL ============
    const lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
        infinite: false,
    });

    // Single RAF loop — only GSAP ticker drives Lenis (remove duplicate rAF)
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.on('scroll', ScrollTrigger.update);

    // ============ LOADING SCREEN ============
    (function initLoader() {
        const loader = document.getElementById('loader');
        const fill = document.getElementById('loaderBarFill');
        const pctEl = document.getElementById('loaderPercentage');
        if (!loader || !fill || !pctEl) return;

        let progress = 0;
        // Simulate loading sequence
        function simulateLoad() {
            // Random small steps for realistic chunk loading feel
            const step = Math.random() * 5 + 1;
            progress += step;

            if (progress >= 100) {
                progress = 100;
                fill.style.width = progress + '%';
                pctEl.textContent = progress + '%';

                // Done loading, fade out
                setTimeout(() => {
                    // Trigger hero reveal animations if any
                    loader.classList.add('hidden');
                }, 400); // short delay after hitting 100%
                return;
            }

            fill.style.width = progress + '%';
            // Output rounded integer percentage
            pctEl.textContent = Math.floor(progress) + '%';

            // Random delay before the next chunk
            const delay = Math.random() * 80 + 20;
            setTimeout(simulateLoad, delay);
        }

        // Start loading simulation
        setTimeout(simulateLoad, 500); // 500ms initial wait to let UI settle
    })();

    // ============ GRID BACKGROUND (Canvas 2D) ============
    function initGrid(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let w, h;

        function resize() {
            const rect = canvas.parentElement.getBoundingClientRect();
            w = canvas.width = rect.width * window.devicePixelRatio;
            h = canvas.height = rect.height * window.devicePixelRatio;
            canvas.style.width = rect.width + 'px';
            canvas.style.height = rect.height + 'px';
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            draw();
        }

        function draw() {
            const rw = canvas.clientWidth;
            const rh = canvas.clientHeight;
            ctx.clearRect(0, 0, rw, rh);

            const spacing = 60;
            const crossSize = 4;

            // Grid lines
            ctx.strokeStyle = 'rgba(40, 80, 160, 0.08)';
            ctx.lineWidth = 0.5;
            for (let x = 0; x <= rw; x += spacing) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, rh);
                ctx.stroke();
            }
            for (let y = 0; y <= rh; y += spacing) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(rw, y);
                ctx.stroke();
            }

            // + markers at intersections
            ctx.strokeStyle = 'rgba(60, 120, 220, 0.15)';
            ctx.lineWidth = 0.8;
            for (let x = 0; x <= rw; x += spacing) {
                for (let y = 0; y <= rh; y += spacing) {
                    ctx.beginPath();
                    ctx.moveTo(x - crossSize, y);
                    ctx.lineTo(x + crossSize, y);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(x, y - crossSize);
                    ctx.lineTo(x, y + crossSize);
                    ctx.stroke();
                }
            }
        }

        window.addEventListener('resize', resize);
        resize();
    }

    initGrid('gridCanvas');
    initGrid('gridCanvas2');
    initGrid('gridCanvas3');
    initGrid('gridCanvas5');

    // ============ THREE.JS WEBGL SCENE (CONVERZAA NEON TUNNEL) ============
    function initWebGL() {
        const canvas = document.getElementById('webglCanvas');
        if (!canvas) return;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000008, 0.018);

        const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 200);
        camera.position.set(0, 0, 18);

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;

        // ---- LIGHTING ----
        scene.add(new THREE.AmbientLight(0x080820, 3));

        // Cyan main fill
        const cyanLight = new THREE.PointLight(0x00eeff, 4, 60);
        cyanLight.position.set(0, 0, 5);
        scene.add(cyanLight);

        // Orange accent from behind
        const orangeLight = new THREE.PointLight(0xff6600, 3, 50);
        orangeLight.position.set(0, 0, -25);
        scene.add(orangeLight);

        // Pink/magenta side lights
        const pinkL = new THREE.PointLight(0xff00aa, 2, 40);
        pinkL.position.set(-8, 0, 0);
        scene.add(pinkL);
        const pinkR = new THREE.PointLight(0xaa00ff, 2, 40);
        pinkR.position.set(8, 0, 0);
        scene.add(pinkR);

        // ---- NEON TUNNEL / ROOM ----
        // Big cylinder — inside face is the "tunnel walls"
        const tunnelGeo = new THREE.CylinderGeometry(10, 10, 80, 24, 20, true);
        const tunnelMat = new THREE.MeshBasicMaterial({
            color: 0x001833,
            wireframe: true,
            transparent: true,
            opacity: 0.09,
            side: THREE.BackSide,
        });
        const tunnel = new THREE.Mesh(tunnelGeo, tunnelMat);
        tunnel.rotation.x = Math.PI / 2; // axis along Z
        scene.add(tunnel);

        // Glowing neon rings inside the tunnel
        const ringColors = [0x00eeff, 0xff4400, 0x00eeff, 0xaa00ff, 0x00eeff, 0xff6600];
        const rings = [];
        for (let i = 0; i < 12; i++) {
            const ringGeo = new THREE.TorusGeometry(10, 0.04, 8, 24);
            const col = ringColors[i % ringColors.length];
            const ringMat = new THREE.MeshBasicMaterial({
                color: col,
                transparent: true,
                opacity: 0.55,
            });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.rotation.x = Math.PI / 2;
            ring.position.z = -i * 6 + 10;
            scene.add(ring);
            rings.push(ring);
        }

        // Neon floor grid lines
        const floorGeo = new THREE.PlaneGeometry(20, 80, 10, 30);
        const floorMat = new THREE.MeshBasicMaterial({
            color: 0x003355,
            wireframe: true,
            transparent: true,
            opacity: 0.18,
        });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.position.set(0, -10, -20);
        scene.add(floor);

        // Ceiling grid
        const ceilMesh = floor.clone();
        ceilMesh.position.set(0, 10, -20);
        ceilMesh.rotation.x = Math.PI / 2;
        scene.add(ceilMesh);

        // ---- IRIDESCENT PRISM (centre of scene) ----
        const prismGeo = new THREE.ConeGeometry(2.6, 5.0, 3, 1, false);
        // Iridescent effect via vertex colors + MeshPhongMaterial
        const prismMat = new THREE.MeshPhongMaterial({
            color: 0x112255,
            emissive: 0x0a0a40,
            specular: 0xffffff,
            shininess: 180,
            transparent: true,
            opacity: 0.82,
            flatShading: true,
        });
        const prism = new THREE.Mesh(prismGeo, prismMat);
        prism.position.set(0, 0, 4);
        scene.add(prism);

        // Bright glowing wireframe edges on the prism (neon pink/cyan)
        const prismWireGeo = new THREE.ConeGeometry(2.6, 5.0, 3, 1, false);
        const prismWireMat = new THREE.MeshBasicMaterial({
            color: 0x00ffee,
            wireframe: true,
            transparent: true,
            opacity: 0.7,
        });
        const prismWire = new THREE.Mesh(prismWireGeo, prismWireMat);
        prismWire.position.copy(prism.position);
        scene.add(prismWire);

        // Inner glowing core
        const coreGeo = new THREE.OctahedronGeometry(0.8, 0);
        const coreMat = new THREE.MeshPhongMaterial({
            color: 0x00ccff,
            emissive: 0x004488,
            specular: 0xffffff,
            shininess: 200,
            transparent: true,
            opacity: 0.85,
            flatShading: true,
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        core.position.copy(prism.position);
        scene.add(core);

        // ---- SPEED PARTICLES ----
        const pCount = 400;
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount; i++) {
            pPos[i * 3] = (Math.random() - 0.5) * 18;
            pPos[i * 3 + 1] = (Math.random() - 0.5) * 18;
            pPos[i * 3 + 2] = (Math.random()) * -60;
        }
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        const pMat = new THREE.PointsMaterial({
            color: 0x88ddff,
            size: 0.06,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });
        const pts = new THREE.Points(pGeo, pMat);
        scene.add(pts);

        // ---- MOUSE PARALLAX ----
        let mouseX = 0, mouseY = 0;
        let camX = 0, camY = 0;
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });

        // ---- SCROLL-DRIVEN CAMERA ----
        let scrollZ = 0;
        let scrollProgress = 0;
        ScrollTrigger.create({
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            onUpdate: (self) => {
                scrollProgress = self.progress;
                scrollZ = self.progress * 30;
            },
        });

        const clock = new THREE.Clock();
        let ringOffset = 0;

        function animate() {
            requestAnimationFrame(animate);
            const time = clock.getElapsedTime();
            const delta = clock.getDelta ? 0.016 : 0.016;

            // Smooth camera parallax from mouse
            camX += (mouseX * 1.5 - camX) * 0.04;
            camY += (-mouseY * 1.0 - camY) * 0.04;
            camera.position.x = camX;
            camera.position.y = camY;
            camera.position.z = 18 - scrollZ;
            camera.lookAt(0, 0, camera.position.z - 20);

            // Scroll rings forward (gives infinite fly-through effect)
            ringOffset += 0.05;
            rings.forEach((ring, i) => {
                ring.position.z = (((-i * 6 + 10 + ringOffset) % 72) - 36) + 6;
                // Pulse opacity
                ring.material.opacity = 0.3 + Math.sin(time * 2 + i) * 0.2;
                // Color shift
                const hue = (time * 0.05 + i * 0.15) % 1;
                ring.material.color.setHSL(hue, 1, 0.6);
            });

            // Prism rotation (iridescent shifting)
            prism.rotation.y = time * 0.3;
            prismWire.rotation.y = prism.rotation.y;
            // Iridescent color shift on prism material
            const hue = (time * 0.1) % 1;
            prismMat.emissive.setHSL(hue, 0.8, 0.15);
            prismWireMat.color.setHSL((hue + 0.33) % 1, 1, 0.7);

            // Core spin + pulse
            core.rotation.y = -time * 0.7;
            core.rotation.x = time * 0.5;
            const pulse = 1 + Math.sin(time * 3) * 0.08;
            core.scale.setScalar(pulse);
            coreMat.emissive.setHSL((hue + 0.5) % 1, 1, 0.3);

            // Prism float
            prism.position.y = Math.sin(time * 0.6) * 0.2;
            prismWire.position.y = prism.position.y;
            core.position.y = prism.position.y;

            // Light color shift
            cyanLight.color.setHSL((time * 0.07) % 1, 1, 0.6);
            pinkL.color.setHSL((time * 0.05 + 0.8) % 1, 1, 0.5);

            // Particles — slow drift
            pts.rotation.z = time * 0.01;

            // Scroll fade-out
            const opacity = Math.max(0, 1 - scrollProgress * 2.0);
            canvas.style.opacity = opacity;

            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    initWebGL();






    // ============ HORIZONTAL SCROLL (HIGHLIGHTS) ============
    function initHighlightsScroll() {
        const section = document.querySelector('.highlights');
        const pin = document.getElementById('highlightsPin');
        const track = document.getElementById('highlightsTrack');
        const cards = track.querySelectorAll('.highlight-card');
        const counter = document.getElementById('currentSlide');

        // On mobile (≤768px) skip GSAP pin — CSS handles vertical layout, but add scroll reveal logic
        if (window.innerWidth <= 768) {
            gsap.registerPlugin(ScrollTrigger);

            cards.forEach((card) => {
                // Setup initial state: start from the right and transparent
                gsap.set(card, { x: 80, opacity: 0 });

                ScrollTrigger.create({
                    trigger: card,
                    start: "top 88%",    // When card's top enters from bottom
                    end: "top 30%",      // When card's top reaches upper-center (next card arriving)
                    onEnter: () => {
                        // Scrolling down, enters screen from bottom right, much slower now
                        gsap.to(card, { x: 0, opacity: 1, duration: 2.0, ease: "power2.out", overwrite: "auto" });
                    },
                    onLeave: () => {
                        // Scrolling down, leaves screen from center to the left
                        gsap.to(card, { x: -120, opacity: 0, duration: 0.85, ease: "power2.in", overwrite: "auto" });
                    },
                    onEnterBack: () => {
                        // Scrolling up, enters screen from upper-center (slide in from left)
                        gsap.to(card, { x: 0, opacity: 1, duration: 2.0, ease: "power2.out", overwrite: "auto" });
                    },
                    onLeaveBack: () => {
                        // Scrolling up, leaves screen from bottom (slide out to right)
                        gsap.to(card, { x: 80, opacity: 0, duration: 1.2, ease: "power2.in", overwrite: "auto" });
                    }
                });
            });

            return;
        }

        // Force GPU layer on track to prevent black flash
        track.style.willChange = 'transform';
        pin.style.overflow = 'hidden';

        gsap.registerPlugin(ScrollTrigger);

        // Use a matchMedia context so dimensions are recalculated correctly
        ScrollTrigger.matchMedia({
            '(min-width: 769px)': function () {
                const getScrollAmt = () => track.scrollWidth - window.innerWidth;

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: 'top top',
                        end: () => '+=' + getScrollAmt(),
                        pin: pin,
                        pinSpacing: true,
                        scrub: 0.8,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        onUpdate: (self) => {
                            if (!self.isActive) return;
                            const idx = Math.min(
                                cards.length,
                                Math.round(self.progress * (cards.length - 1)) + 1
                            );
                            counter.textContent = String(idx).padStart(2, '0');
                        },
                    },
                });

                tl.to(track, {
                    x: () => -getScrollAmt(),
                    ease: 'none',
                    duration: 1,
                });
            }
        });
    }

    initHighlightsScroll();

    // ============ SCROLL REVEAL ANIMATIONS ============
    function initRevealAnimations() {
        // Reveal text elements
        gsap.utils.toArray('.reveal-text').forEach((el) => {
            ScrollTrigger.create({
                trigger: el,
                start: 'top 85%',
                onEnter: () => el.classList.add('visible'),
            });
        });

        // Reveal up elements with stagger
        gsap.utils.toArray('.reveal-up').forEach((el, i) => {
            gsap.from(el, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                },
            });
        });

        // Nav fade in
        // ---- Staggered nav entrance (like alche.studio) ----
        // Logo slides in first, then each link with offset, then button
        const navTl = gsap.timeline({ delay: 2.3 });
        navTl
            .to('.nav', { opacity: 1, y: 0, duration: 0 }) // make nav container visible
            .from('.nav-logo', {
                y: -16, opacity: 0, duration: 0.55, ease: 'power3.out'
            })
            .from('.nav-link', {
                y: -12, opacity: 0, duration: 0.45, ease: 'power3.out',
                stagger: 0.08
            }, '-=0.3')
            .from('.nav-btn', {
                y: -12, opacity: 0, duration: 0.45, ease: 'power3.out'
            }, '-=0.2');

        // ============ SCRAMBLE TEXT EFFECT (nav links only) ============
        (function initScramble() {
            const CHARS_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const CHARS_LOWER = 'abcdefghijklmnopqrstuvwxyz';

            function randomChar(isUpper) {
                const pool = isUpper ? CHARS_UPPER : CHARS_LOWER;
                return pool[Math.floor(Math.random() * pool.length)];
            }

            document.querySelectorAll('.scramble-link').forEach((link) => {
                const original = link.getAttribute('data-original') || link.textContent;
                let timer = null;
                let resolveTimer = null;

                function scramble() {
                    // Stop any ongoing scramble
                    clearInterval(timer);
                    clearTimeout(resolveTimer);

                    const letters = original.split('');
                    let resolved = new Array(letters.length).fill(false);
                    let iterations = 0;
                    const maxIterations = 10; // how many random cycles before starting resolve

                    timer = setInterval(() => {
                        iterations++;

                        // Resolve one letter per 3 iterations (left to right)
                        const resolveIdx = Math.floor(iterations / 3);
                        for (let i = 0; i < resolveIdx && i < letters.length; i++) {
                            resolved[i] = true;
                        }

                        // Build the display string
                        const display = letters.map((ch, i) => {
                            if (ch === ' ') return ' ';
                            if (resolved[i]) return ch;
                            return randomChar(ch === ch.toUpperCase());
                        }).join('');

                        link.textContent = display;

                        // All resolved — stop
                        if (resolved.every(Boolean)) {
                            clearInterval(timer);
                            link.textContent = original;
                        }
                    }, 50);
                }

                function restore() {
                    clearInterval(timer);
                    link.textContent = original;
                }

                link.addEventListener('mouseenter', scramble);
                link.addEventListener('touchstart', scramble, { passive: true });
                link.addEventListener('mouseleave', restore);
                link.addEventListener('touchend', restore, { passive: true });
            });
        })();

        // Footer parallax
        gsap.from('.footer-logo', {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.footer',
                start: 'top 80%',
            },
        });

        gsap.from('.footer-col', {
            y: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.footer-cols',
                start: 'top 85%',
            },
        });
    }

    initRevealAnimations();

    // ============ HERO TITLE CHARACTER ANIMATION ============
    function splitTextToChars(element) {
        const text = element.textContent;
        element.textContent = '';
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(30px) rotateX(-40deg)';
            span.style.transition = `opacity 0.5s ${i * 0.06 + 2}s, transform 0.5s ${i * 0.06 + 2}s`;
            element.appendChild(span);

            // Trigger after a frame
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0) rotateX(0)';
                });
            });
        });
    }

    // Override CSS animation for hero title with JS character reveal
    const heroTitle = document.getElementById('heroTitle');
    heroTitle.style.opacity = '1';
    heroTitle.style.transform = 'scale(1)';
    heroTitle.style.animation = 'none';
    splitTextToChars(heroTitle);

    // ============ SPEAKER PHOTOS (GENERATE GRADIENT PLACEHOLDERS) ============
    document.querySelectorAll('.speaker-photo').forEach((photo) => {
        // Add a subtle shimmer overlay
        const shimmer = document.createElement('div');
        shimmer.style.cssText = `
      position: absolute; inset: 0; 
      background: linear-gradient(135deg, transparent 40%, rgba(100,150,255,0.08) 50%, transparent 60%);
      background-size: 200% 200%;
      animation: shimmer 3s infinite;
    `;
        photo.style.position = 'relative';
        photo.style.overflow = 'hidden';
        photo.appendChild(shimmer);
    });

    // Add shimmer keyframes dynamically
    const shimmerStyle = document.createElement('style');
    shimmerStyle.textContent = `
    @keyframes shimmer {
      0% { background-position: -200% -200%; }
      100% { background-position: 200% 200%; }
    }
  `;
    document.head.appendChild(shimmerStyle);

    // ============ PARALLAX ON MOUSE MOVE FOR ABOUT ============
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        aboutSection.addEventListener('mousemove', (e) => {
            const rect = aboutSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            const grid = aboutSection.querySelector('.grid-canvas');
            if (grid) {
                grid.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
            }
        });
    }

    // ============ PAGE VISIBILITY ============
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            lenis.stop();
        } else {
            lenis.start();
        }
    });

    // ============ INTERACTIVE EVENT CARDS ============
    function initCardInteractions() {
        const cards = document.querySelectorAll('.highlight-card');

        cards.forEach((card) => {
            const media = card.querySelector('.card-media');
            const img = card.querySelector('.card-img');
            const info = card.querySelector('.card-info');

            // --- Inject overlay elements ---
            // Wrap media children in card-inner for 3D tilt
            const inner = document.createElement('div');
            inner.className = 'card-inner';
            // Move media inside inner
            media.parentNode.insertBefore(inner, media);
            inner.appendChild(media);

            // Spotlight overlay (follows cursor inside the card image)
            const spotlight = document.createElement('div');
            spotlight.className = 'card-spotlight';
            media.appendChild(spotlight);

            // Border glow
            const borderGlow = document.createElement('div');
            borderGlow.className = 'card-border-glow';
            inner.appendChild(borderGlow);

            // "View Session" tag
            const viewTag = document.createElement('span');
            viewTag.className = 'card-view-tag';
            viewTag.textContent = 'View Session';
            media.appendChild(viewTag);

            // --- State ---
            let raf = null;
            let currentTiltX = 0, currentTiltY = 0;
            let targetTiltX = 0, targetTiltY = 0;
            let isHovered = false;

            function lerp(a, b, t) { return a + (b - a) * t; }

            function tick() {
                currentTiltX = lerp(currentTiltX, targetTiltX, 0.12);
                currentTiltY = lerp(currentTiltY, targetTiltY, 0.12);

                inner.style.transform = isHovered
                    ? `rotateY(${currentTiltX}deg) rotateX(${-currentTiltY}deg) translateZ(10px)`
                    : `rotateY(${currentTiltX}deg) rotateX(${-currentTiltY}deg)`;

                // Subtle parallax on the image (moves opposite to tilt)
                if (img) {
                    img.style.transform = isHovered
                        ? `scale(1.08) translate(${-currentTiltX * 0.5}px, ${-currentTiltY * 0.3}px)`
                        : `scale(1.0)`;
                }

                // Info text follows tilt slightly
                if (info) {
                    info.style.transform = `translate(${currentTiltX * 0.4}px, ${currentTiltY * 0.3}px)`;
                }

                if (Math.abs(currentTiltX - targetTiltX) > 0.01 || Math.abs(currentTiltY - targetTiltY) > 0.01 || isHovered) {
                    raf = requestAnimationFrame(tick);
                } else {
                    cancelAnimationFrame(raf);
                    raf = null;
                }
            }

            card.addEventListener('mouseenter', () => {
                isHovered = true;
                if (!raf) raf = requestAnimationFrame(tick);
            });

            card.addEventListener('mouseleave', () => {
                isHovered = false;
                targetTiltX = 0;
                targetTiltY = 0;
                if (!raf) raf = requestAnimationFrame(tick);
            });

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;   // 0-1
                const y = (e.clientY - rect.top) / rect.height;    // 0-1

                // Tilt: map to ±8deg
                targetTiltX = (x - 0.5) * 16;
                targetTiltY = (y - 0.5) * 10;

                // Spotlight: use percentage position within the card-media
                const mediaRect = media.getBoundingClientRect();
                const sx = ((e.clientX - mediaRect.left) / mediaRect.width * 100).toFixed(1) + '%';
                const sy = ((e.clientY - mediaRect.top) / mediaRect.height * 100).toFixed(1) + '%';
                spotlight.style.setProperty('--sx', sx);
                spotlight.style.setProperty('--sy', sy);
                borderGlow.style.setProperty('--sx', sx);
                borderGlow.style.setProperty('--sy', sy);

                // Magnetic cursor pull toward center of card — use shared API, NOT direct style mutation
                const cardCX = rect.left + rect.width / 2;
                const cardCY = rect.top + rect.height / 2;
                const pullX = (e.clientX - cardCX) * 0.06;
                const pullY = (e.clientY - cardCY) * 0.06;
                if (window._cursorMag) window._cursorMag.set(pullX, pullY, pullX * 0.4, pullY * 0.4);
            });

            // Reset magnetic pull via shared API on leave
            card.addEventListener('mouseleave', () => {
                if (window._cursorMag) window._cursorMag.clear();
            });

            // Click ripple and modal open
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const rect = media.getBoundingClientRect();
                const ripple = document.createElement('div');
                ripple.className = 'card-ripple';
                ripple.style.left = (e.clientX - rect.left) + 'px';
                ripple.style.top = (e.clientY - rect.top) + 'px';
                media.appendChild(ripple);
                setTimeout(() => ripple.remove(), 700);

                // Open modal if valid event data exists
                const eventId = card.getAttribute('data-event');
                if (eventId && typeof window.openEventModal === 'function') {
                    window.openEventModal(eventId);
                }
            });
        });
    }

    initCardInteractions();

    // ============ COUNTDOWN TIMER ============
    (function initCountdown() {
        // March 13, 2026 at 00:00:00 local time
        const eventDate = new Date('2026-03-13T00:00:00');
        const cdDays = document.getElementById('cdDays');
        const cdHours = document.getElementById('cdHours');
        const cdMins = document.getElementById('cdMins');
        const cdSecs = document.getElementById('cdSecs');
        const cdEl = document.getElementById('countdown');

        function pad(n) { return String(Math.max(0, n)).padStart(2, '0'); }

        function setVal(el, val) {
            const str = pad(val);
            if (el.textContent !== str) {
                el.textContent = str;
                el.classList.remove('flip');
                void el.offsetWidth; // force reflow
                el.classList.add('flip');
            }
        }

        function tick() {
            const now = Date.now();
            const diff = eventDate.getTime() - now;

            if (diff <= 0) {
                // Event is live / has passed
                cdEl.classList.add('ended');
                setVal(cdDays, 0);
                setVal(cdHours, 0);
                setVal(cdMins, 0);
                setVal(cdSecs, 0);
                const label = cdEl.querySelector('.countdown-label');
                if (label) label.textContent = 'LIVE NOW';
                return; // stop ticking
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((diff % (1000 * 60)) / 1000);

            setVal(cdDays, days);
            setVal(cdHours, hours);
            setVal(cdMins, mins);
            setVal(cdSecs, secs);

            setTimeout(tick, 1000);
        }

        tick();
    })();

    // ============ REGISTRATION FORM ============
    (function initRegForm() {
        const form = document.getElementById('regForm');
        const success = document.getElementById('regSuccess');
        const submitBtn = document.getElementById('regSubmitBtn');
        if (!form) return;

        // Field validation helpers
        function setError(input, msg) {
            input.classList.add('error');
            let errEl = input.parentElement.querySelector('.reg-error-msg');
            if (!errEl) {
                errEl = document.createElement('span');
                errEl.className = 'reg-error-msg';
                input.after(errEl);
            }
            errEl.textContent = msg;
            errEl.style.display = 'block';
        }

        function clearError(input) {
            input.classList.remove('error');
            const errEl = input.parentElement.querySelector('.reg-error-msg');
            if (errEl) errEl.style.display = 'none';
        }

        // Live clear-on-input
        form.querySelectorAll('.reg-input').forEach(inp => {
            inp.addEventListener('input', () => clearError(inp));
        });

        // Submit handler
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            let valid = true;

            // Gather all inputs
            const fields = {
                name: document.getElementById('regName'),
                email: document.getElementById('regEmail'),
                phone: document.getElementById('regPhone'),
                year: document.getElementById('regYear'),
                college: document.getElementById('regCollege'),
                dept: document.getElementById('regDept'),
                regNum: document.getElementById('regNumber'),
                city: document.getElementById('regCity'),
                event: document.getElementById('regEvent'),
                teamName: document.getElementById('regTeamName'),
                teamMembers: document.getElementById('regTeamMembers'),
                message: document.getElementById('regMessage')
            };

            // Reset all errors
            Object.values(fields).forEach(f => {
                if (f && f.parentElement) f.parentElement.classList.remove('error');
            });

            // Required fields validation
            const required = ['name', 'email', 'phone', 'year', 'college', 'event'];
            required.forEach(key => {
                const el = fields[key];
                if (!el || !el.value.trim()) {
                    if (el && el.parentElement) el.parentElement.classList.add('error');
                    valid = false;
                }
            });

            // Email format validation
            const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (fields.email && fields.email.value.trim() && !emailRe.test(fields.email.value.trim())) {
                fields.email.parentElement.classList.add('error');
                valid = false;
            }

            if (!valid) {
                const firstError = form.querySelector('.error');
                if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }

            // ============ GOOGLE SHEETS SUBMISSION ============
            // STEP: Replace the URL below with your Google Apps Script deployment URL
            const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx4q4OEjeGz3Gv9GzbZBwb8oiU2VR81GQmzcruKPaYAcR6m2oM363-ejdMj2ugE-MNv/exec';

            // Encode all data as a single JSON param — survives Google's redirect chain
            const payload = encodeURIComponent(JSON.stringify({
                name: fields.name.value.trim(),
                email: fields.email.value.trim(),
                phone: fields.phone.value.trim(),
                year: fields.year.value,
                college: fields.college.value.trim(),
                dept: fields.dept ? fields.dept.value.trim() : '',
                regNum: fields.regNum ? fields.regNum.value.trim() : '',
                city: fields.city ? fields.city.value.trim() : '',
                event: fields.event.value,
                teamName: fields.teamName ? fields.teamName.value.trim() : '',
                teamMembers: fields.teamMembers ? fields.teamMembers.value.trim() : '',
                message: fields.message ? fields.message.value.trim() : ''
            }));

            // Loading state
            const btn = document.getElementById('regSubmitBtn');
            const btnText = btn ? btn.querySelector('.reg-btn-text') : null;
            if (btn) { btn.classList.add('loading'); btn.disabled = true; }
            if (btnText) btnText.textContent = 'SENDING...';

            function showToast(msg) {
                let toast = document.getElementById('regToast');
                if (!toast) {
                    toast = document.createElement('div');
                    toast.id = 'regToast';
                    toast.style.cssText = `position:fixed;bottom:32px;left:50%;transform:translateX(-50%);
                        background:rgba(255,60,60,0.12);border:1px solid rgba(255,80,80,0.4);
                        color:#fff;font-family:'Inter',sans-serif;font-size:.9rem;
                        padding:14px 28px;border-radius:40px;z-index:99999;
                        backdrop-filter:blur(12px);opacity:0;transition:opacity .3s ease;
                        text-align:center;max-width:90vw;`;
                    document.body.appendChild(toast);
                }
                toast.textContent = msg;
                toast.style.opacity = '1';
                setTimeout(() => { toast.style.opacity = '0'; }, 5000);
            }

            try {
                if (SCRIPT_URL === 'YOUR_SCRIPT_URL_HERE') {
                    throw new Error('SETUP_NEEDED');
                }

                // Single encoded JSON param — survives Google's redirect chain
                await new Promise((resolve) => {
                    const img = new Image();
                    img.onload = img.onerror = resolve;
                    img.src = `${SCRIPT_URL}?payload=${payload}`;
                    setTimeout(resolve, 5000);
                });

                // Show success state (fetch completed without error = data was sent)
                form.style.opacity = '0';
                form.style.transform = 'translateY(-10px)';
                form.style.transition = 'opacity .35s ease, transform .35s ease';
                setTimeout(() => {
                    form.style.display = 'none';
                    const successEl = document.getElementById('regSuccess');
                    if (successEl) successEl.classList.add('visible');
                }, 350);
            } catch (err) {
                if (err.message === 'SETUP_NEEDED') {
                    showToast('⚠ Setup required: paste your Apps Script URL in app.js');
                } else {
                    showToast('❌ Submission failed. Please try again.');
                }
            } finally {
                if (btn) { btn.classList.remove('loading'); btn.disabled = false; }
                if (btnText) btnText.textContent = 'SUBMIT REGISTRATION →';
            }
        });

        // Perks scroll-reveal with stagger
        const perks = document.querySelectorAll('.reg-perk');
        if (perks.length) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        perks.forEach((p, i) => {
                            setTimeout(() => p.classList.add('visible'), i * 120);
                        });
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.2 });
            observer.observe(document.querySelector('.reg-perks'));
        }

        // Also initialise grid canvas for reg section (reuse same drawGrid logic)
        const regCanvas = document.getElementById('gridCanvas4');
        if (regCanvas && typeof drawGrid === 'function') {
            drawGrid(regCanvas);
        }
    })();



    // ============ EVENT DATA & MODAL ============
    const eventData = {
        "adzap": {
            title: "Ad-zap",
            subtitle: "Theme: e.g. Stationery",
            rules: [
                "Minimum 4, maximum 5 participants.",
                "Time limit: 4-5 minutes.",
                "Properties can be used.",
                "No vulgarity or offensive statements (disqualified).",
                "Should not exceed the time limit.",
                "Can showcase maximum 4 ads (different ads)."
            ]
        },
        "coding": {
            title: "Coding Debugging & Reverse Coding",
            subtitle: "Round 1 & Round 2",
            rules: [
                "<strong>Coding Debugging (1st Round)</strong>",
                "Find the error.",
                "Time limit: 30 min. Participant: 1.",
                "Language used. Problems will be given on spot.",
                "<strong>Reverse Coding (2nd Round)</strong>",
                "Prelims may happen.",
                "Logic efficiency. Time limit: 30 minutes. Participant: 1.",
                "Languages used: Python, Java, C, C++. (System/Laptop will be provided by us)."
            ]
        },
        "ai": {
            title: "Generate Image by using Prompt (AI)",
            subtitle: "Create Stunning Art with AI",
            rules: [
                "Almost 2.",
                "Time limit: 30 min.",
                "Context/Content on the spot.",
                "Chat GPT, Gemini.",
                "Systems will be provided by us.",
                "Prelims will be held.",
                "No preparation time will be given."
            ]
        },
        "ppt": {
            title: "Power Point Presentation",
            subtitle: "Showcase Your Presentation Skills",
            rules: [
                "Team: Maximum 2 members. Slides: 10-12.",
                "Submission of the PPT must be on.",
                "<strong>Topics (B.Com):</strong> Fin tech innovation, Block chain in Banking and payments",
                "<strong>Topics (BBA):</strong> AI powered digital marketing, Social media & influencer marketing",
                "<strong>Topics (Cyber Security):</strong> AI driven Threat detection, Zero Trust security Model",
                "<strong>Topics (B.Sc. AI):</strong> AI in space exploration, World model AI for predict future events and plan actions like (Google dreamer)",
                "Time limit: 7 minutes, questions will be asked by the judges."
            ]
        },
        "frozen": {
            title: "Frozen Moment",
            subtitle: "Capture the Perfect Still Life",
            rules: [
                "Participants: 1.",
                "No edit, no filter, camera mobile allowed.",
                "Duration 1 hr.",
                "Raw image only. No vulgarity.",
                "After photo taken, send to the mail."
            ]
        },
        "talent": {
            title: "Talent Hunt",
            subtitle: "Unleash Your Hidden Talents",
            rules: [
                "Maximum 4 to 5 participants.",
                "Can showcase maximum of 3 talents.",
                "No vulgarity, offensive languages are strictly prohibited.",
                "Participants are responsible for their own equipment."
            ]
        },
        "talk": {
            title: "Instant Talk",
            subtitle: "Speak Your Mind on the Spot",
            rules: [
                "Participants: 1.",
                "Topic will be given on-spot.",
                "Preparation time: 2 minutes.",
                "Speech: maximum of 3 minutes.",
                "Judges decision will be finalized."
            ]
        },
        "book": {
            title: "Book Review",
            subtitle: "Discuss and Review Masterpieces",
            rules: [
                "Participant: 1.",
                "Rounds: 2. Round 1 (Quiz). Round 2 (Book review).",
                "\"1984\" : George Orwell",
                "\"Flesh\" : David Szalay",
                "விழியும் பேசும் காலம் - மலர்விழி மணியம்",
                "நீர் வழி பசுவும் - தேவி பாரதி"
            ]
        },
        "gaming": {
            title: "Gaming",
            subtitle: "Compete in Intense E-Sports",
            rules: [
                "Participants: 4.",
                "No vulgar words should be used (disqualified).",
                "Multiple rounds will be held.",
                "Judges decision will be final.",
                "Free fire and PubG game will be held.",
                "Exploitation and hacking will be disqualified."
            ]
        },
        "manager": {
            title: "Best Manager",
            subtitle: "Prove Your Leadership Skills",
            rules: [
                "Participants: 1 member.",
                "2 rounds.",
                "1st round: Quiz, Logo (Prelims).",
                "2nd round: Scenario."
            ]
        }
    };

    (function initEventModal() {
        const modal = document.getElementById('eventModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalSubtitle = document.getElementById('modalSubtitle');
        const modalRules = document.getElementById('modalRules');

        if (!modal || !modalTitle || !modalSubtitle || !modalRules) return;

        // Make openModal globally available so initCardInteractions can call it
        window.openEventModal = function (eventId) {
            const data = eventData[eventId];
            if (!data) return;

            modalTitle.innerHTML = data.title;
            modalSubtitle.innerHTML = data.subtitle;
            modalRules.innerHTML = data.rules.map(r => `<li>${r}</li>`).join('');

            modal.classList.add('visible');
            modal.setAttribute('aria-hidden', 'false');
            if (typeof lenis !== 'undefined') lenis.stop();
        };

        function closeModal() {
            modal.classList.remove('visible');
            modal.setAttribute('aria-hidden', 'true');
            if (typeof lenis !== 'undefined') lenis.start();
        }

        document.body.addEventListener('click', function (e) {
            // Check if click was on the back button
            if (e.target.closest('#modalBack')) {
                e.preventDefault();
                closeModal();
                return;
            }

            // Check if click was on the register button
            if (e.target.closest('#modalRegister')) {
                closeModal();
            }
        });
    })();

    // ============ HAMBURGER / MOBILE MENU ============
    (function initMobileMenu() {
        const hamburger = document.getElementById('navHamburger');
        const menu = document.getElementById('mobileMenu');
        if (!hamburger || !menu) return;

        function openMenu() {
            hamburger.classList.add('open');
            hamburger.setAttribute('aria-expanded', 'true');
            menu.classList.add('open');
            menu.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            if (typeof lenis !== 'undefined') lenis.stop();
        }

        function closeMenu() {
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            menu.classList.remove('open');
            menu.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            if (typeof lenis !== 'undefined') lenis.start();
        }

        hamburger.addEventListener('click', () => {
            if (menu.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close on any link inside the mobile menu
        menu.querySelectorAll('[data-close]').forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
        });
    })();
})();


