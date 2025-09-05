document.addEventListener("DOMContentLoaded", function() {
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

    // Array of content objects to loop through
    const content = [
        {
            lang: 'en',
            h1: 'Happening this Fall...',
            p: 'The first IBM-supported quantum event in Bangladesh. October 2025.'
        },
        {
            lang: 'bn',
            h1: 'আসছে এই হেমন্তে...',
            p: 'বাংলাদেশে প্রথম আইবিএম-সমর্থিত কোয়ান্টাম ইভেন্ট। অক্টোবর ২০২৫।'
        }
    ];

    let currentIndex = 0;
    const typeSpeed = 110; // Speed of typing
    const deleteSpeed = 40; // Speed of deleting
    const pauseAfterTyping = 500; // Pause after the full message is shown (in ms)

    /**
     * Helper function to create a delay.
     * @param {number} ms - Milliseconds to wait.
     */
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    /**
     * Types out text into an element.
     * @param {HTMLElement} el - The element to type into.
     * @param {string} text - The text to type.
     */
    async function typeText(el, text) {
        el.classList.add('typing-cursor');
        for (const char of text) {
            el.textContent += char;
            await wait(typeSpeed);
        }
        el.classList.remove('typing-cursor');
    }

    /**
     * Deletes text from an element.
     * @param {HTMLElement} el - The element to delete from.
     */
    async function deleteText(el) {
        el.classList.add('typing-cursor');
        const text = el.textContent;
        for (let i = text.length - 1; i >= 0; i--) {
            el.textContent = text.substring(0, i);
            await wait(deleteSpeed);
        }
        el.classList.remove('typing-cursor');
    }

    /**
     * The main loop to control the bilingual animation.
     */
    async function startBilingualLoop() {
        while (true) { // Infinite loop
            const currentContent = content[currentIndex];
            
            // Set language attribute for accessibility
            heroTitle.lang = currentContent.lang;
            heroSubtitle.lang = currentContent.lang;

            // --- Typing phase ---
            await typeText(heroTitle, currentContent.h1);
            await wait(200); // Short pause before typing subtitle
            await typeText(heroSubtitle, currentContent.p);
            
            // --- Pause phase ---
            await wait(pauseAfterTyping);

            // --- Deleting phase ---
            await deleteText(heroSubtitle);
            await wait(300); // Short pause before deleting title
            await deleteText(heroTitle);

            await wait(200); // Pause before next language starts

            // Move to the next content item in the array
            currentIndex = (currentIndex + 1) % content.length;
        }
    }

    // Start the animation
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