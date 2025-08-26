// Language Switcher Functionality
class LanguageSwitcher {
    constructor() {
        this.currentLanguage = localStorage.getItem('preferred-language') || 'en';
        this.init();
    }

    init() {
        this.createLanguageSwitcher();
        this.updateActiveLanguage();
    }

    createLanguageSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'language-switcher';
        switcher.innerHTML = `
            <div class="language-toggle">
                <div class="language-slider ${this.currentLanguage === 'fr' ? 'french' : ''}"></div>
                <button class="language-option ${this.currentLanguage === 'en' ? 'active' : ''}" data-lang="en">EN</button>
                <button class="language-option ${this.currentLanguage === 'fr' ? 'active' : ''}" data-lang="fr">FR</button>
            </div>
        `;

        document.body.appendChild(switcher);

        // Add event listeners
        const languageButtons = switcher.querySelectorAll('.language-option');
        languageButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const selectedLang = e.target.dataset.lang;
                this.switchLanguage(selectedLang);
            });
        });
    }

    switchLanguage(language) {
        this.currentLanguage = language;
        localStorage.setItem('preferred-language', language);
        this.updateActiveLanguage();
        this.redirectToLanguagePage(language);
    }

    updateActiveLanguage() {
        const slider = document.querySelector('.language-slider');
        const buttons = document.querySelectorAll('.language-option');
        
        buttons.forEach(button => {
            button.classList.remove('active');
            if (button.dataset.lang === this.currentLanguage) {
                button.classList.add('active');
            }
        });

        if (this.currentLanguage === 'fr') {
            slider.classList.add('french');
        } else {
            slider.classList.remove('french');
        }
    }

    redirectToLanguagePage(language) {
        // Get current page name
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const pageBase = currentPage.replace('.html', '').replace('-fr', '');
        
        let targetPage;
        if (language === 'fr') {
            targetPage = pageBase === 'index' ? 'index-fr.html' : `${pageBase}-fr.html`;
        } else {
            targetPage = pageBase === 'index' ? 'index.html' : `${pageBase}.html`;
        }

        // Only redirect if we're not already on the correct page
        if (currentPage !== targetPage) {
            window.location.href = targetPage;
        }
    }
}

// Initialize language switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LanguageSwitcher();
});
