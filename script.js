document.addEventListener("DOMContentLoaded", function() {
    
    const hamburger = document.getElementById('hamburger-menu');
    const navUL = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navUL.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navUL.classList.remove('active');
        });
    });


    // --- 1. Schedule Tabs Logic ---
    document.getElementById("defaultOpen").click();

    // --- 2. Quantum Coin Flip for Register Buttons ---
    const registerBtns = [document.getElementById('register-btn'), document.getElementById('register-btn-footer')];
    let intervalId = null;
    registerBtns.forEach(btn => {
        if (!btn) return;
        const originalText = btn.innerHTML;
        btn.addEventListener('mouseenter', () => {
            intervalId = setInterval(() => {
                const state = Math.random() > 0.5 ? '|0⟩' : '|1⟩';
                btn.innerHTML = `Register ${state}`;
            }, 100);
        });
        btn.addEventListener('mouseleave', () => {
            clearInterval(intervalId);
            btn.innerHTML = originalText;
        });
    });

    // --- 3. Bilingual Looping Typewriter Logic ---
    const heroTitle = document.querySelector('#hero h1');
    const heroSubtitle = document.querySelector('#hero .subtitle');

    const content = [
        { lang: 'en', h1: 'Happening this Fall...', p: 'The first IBM-supported quantum event in Bangladesh. October 2025.' },
        { lang: 'bn', h1: 'আসছে এই হেমন্তে...', p: 'বাংলাদেশে প্রথম আইবিএম-সমর্থিত কোয়ান্টাম ইভেন্ট। অক্টোবর ২০২৫।' }
    ];

    let currentIndex = 0;
    const typeSpeed = 110;
    const deleteSpeed = 40;
    const pauseAfterTyping = 500;

    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async function typeText(el, text) {
        el.classList.add('typing-cursor');
        for (const char of text) {
            el.textContent += char;
            await wait(typeSpeed);
        }
        el.classList.remove('typing-cursor');
    }

    async function deleteText(el) {
        el.classList.add('typing-cursor');
        const text = el.textContent;
        for (let i = text.length - 1; i >= 0; i--) {
            el.textContent = text.substring(0, i);
            await wait(deleteSpeed);
        }
        el.classList.remove('typing-cursor');
    }

    async function startBilingualLoop() {
        while (true) {
            const currentContent = content[currentIndex];
            
            heroTitle.lang = currentContent.lang;
            heroSubtitle.lang = currentContent.lang;

            await typeText(heroTitle, currentContent.h1);
            await wait(200);
            await typeText(heroSubtitle, currentContent.p);
            
            await wait(pauseAfterTyping);

            await deleteText(heroSubtitle);
            await wait(300);
            await deleteText(heroTitle);

            await wait(200);

            currentIndex = (currentIndex + 1) % content.length;
        }
    }

    startBilingualLoop();
});

function openTab(tabName, elmnt) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName).style.display = "block";
    elmnt.classList.add("active");
}