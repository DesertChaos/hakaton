document.addEventListener('DOMContentLoaded', function () {
    // Элементы меню настроек и история запросов
    const settingsMenu = document.getElementById('settings-menu');
    const historyMenu = document.getElementById('history-menu');

    // Кнопки открытия и закрытия меню
    const settingsToggle = document.querySelector('.settings-toggle');
    const historyToggle = document.getElementById('history-toggle');
    const closeButtons = document.querySelectorAll('.close-btn');

    // Открытие меню настроек
    settingsToggle.addEventListener('click', () => {
        settingsMenu.style.left = '0';
    });

    document.addEventListener('DOMContentLoaded', function () {
        const form = document.querySelector('form');
        const outputScreen = document.getElementById('output-screen'); // Элемент для вывода результата нейросети
        
        form.addEventListener('submit', function (e) {
            e.preventDefault();
        
            const formData = new FormData(form);
        
            fetch('/process', { // URL обработчика на сервере
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('Ответ от сервера:', data);  // Логируем ответ от сервера
                if (data.output) {
                    const imgElement = document.createElement('img');
                    imgElement.src = data.output;  // Подставляем ссылку
                    imgElement.alt = 'Результат нейросети';
                    outputScreen.innerHTML = '';  // Очистка экрана
                    outputScreen.appendChild(imgElement);  // Отображение результата
                } else {
                    console.error('Ошибка при выводе результата:', data.error);
                }
            })
            .catch(error => {
                console.error('Ошибка при отправке файла:', error);
            });            
        });
    });
    
    

    // Закрытие меню по нажатию на крестик
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            settingsMenu.style.left = '-300px';
            historyMenu.style.right = '-300px';
        });
    });

    // Переход на главный экран при клике на Home
    const homeButton = document.querySelector('.home-btn');
    homeButton.addEventListener('click', () => {
        window.location.href = 'index.html'; // Замените 'index.html' на нужный URL главного экрана
    });


    // Функция для установки темы
    function setTheme() {
        const currentTheme = localStorage.getItem('theme');

        if (currentTheme === 'dark') {
            document.head.innerHTML += '<link rel="stylesheet" href="upload-dark.css">';
        } else {
            document.head.innerHTML += '<link rel="stylesheet" href="upload-light.css">';
        }
    }

    setTheme();
});
