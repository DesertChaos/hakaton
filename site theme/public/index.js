document.addEventListener('DOMContentLoaded', () => {
    const themeButton = document.getElementById('theme-button');
    const themeStylesheet = document.getElementById('theme-stylesheet');
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        themeStylesheet.href = 'dark.css';
        themeButton.querySelector('img').src = 'pic/moon.png'; // путь к иконке луны
    }

    themeButton.addEventListener('click', () => {
        if (themeStylesheet.href.includes('light.css')) {
            themeStylesheet.href = 'dark.css';
            themeButton.querySelector('img').src = 'pic/moon.png';
            localStorage.setItem('theme', 'dark');
        } else {
            themeStylesheet.href = 'light.css';
            themeButton.querySelector('img').src = 'pic/sun.png';
            localStorage.setItem('theme', 'light');
        }
    });
});

// Функция смены языка
function changeLanguage(lang) {
    // Обращаемся к элементам на странице, которые нужно перевести
    const elements = document.querySelectorAll('[data-translate]');
    
    // Перебираем элементы и меняем их текст на выбранный язык
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Логика смены языка
document.querySelector('.lang-btn').addEventListener('click', () => {
    const currentLang = document.documentElement.lang;
    const lang = currentLang === 'en' ? 'ru' : 'en';
    document.documentElement.lang = lang;
    changeLanguage(lang);
});

// Объект с переводами
const translations = {
    en: {
      title: 'Neural Network for Defect Detection on Laptops',
     'menu-home': 'Home',
     'menu-language': 'Language',
      'about-project': 'ABOUT PROJECT',
      'project-description': 'Our project is called #LAPTOPS AI, and it utilizes machine learning to analyze laptop data and identify potential issues.',
      'tech-used': 'We utilized PyTorch and YOLOv3 for the development of the neural network.',
      'neural-network-capabilities': 'Currently, our neural network is capable of identifying various types of faults with high accuracy.',
      'team-description': 'Our team ANOTHER DAY WITHOUT SLEEP 52 has created a website featuring a neural network that helps identify laptop faults.',
      'project-goal': 'Our goal is to help people quickly and accurately identify problems with their laptops and find solutions.',
      'project-proud': 'We are proud of our project and hope it will be useful to many people.',
      'about-us': 'ABOUT US'
    },
    ru: {
      title: 'Нейросеть для определения дефектов на ноутбуках',
     'menu-home': 'Главная',
     'menu-language': 'Язык',
      'about-project': 'О ПРОЕКТЕ',
      'project-description': 'Наш проект называется #LAPTOPS AI, и он использует машинное обучение для анализа данных о ноутбуках и выявления потенциальных неисправностей.',
      'tech-used': 'Мы использовали PyTorch и YOLOv3 для разработки нейросети.',
      'neural-network-capabilities': 'На данный момент наша нейросеть может определить разные типы неисправностей с высокой точностью.',
      'team-description': 'Наша команда ANOTHER DAY WITHOUT SLEEP 52 создала сайт с нейросетью, которая помогает определить неисправности ноутбуков',
      'project-goal': 'Наша цель - помочь людям быстро и точно определить проблемы с их ноутбуками и найти решения.',
      'project-proud': 'Мы гордимся нашим проектом и надеемся, что он будет полезен многим людям.',
      'about-us': 'О НАС'
    }
  };
