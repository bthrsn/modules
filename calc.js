// Задача сделать КАЛЬКУЛЯТОР калорий на сайте
  // алгоритм: собираем данные и подставляем в формулы.

function calc() {

  const result = document.querySelector('.calculating__result span');

  let sex, height, weight, age, ratio;

  // Условия, если уже до этого  выбирали пол и активность 
   if (localStorage.getItem('sex')) {
     sex = localStorage.getItem('sex');
   } else {
     sex = 'female';
     localStorage.setItem('sex', 'female');
   }

   
   if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = '1.375';
    localStorage.setItem('ratio', 1.375);
  }

  // Функция для запоминания выбора с предыдущего входа на страницу
  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.classList.remove(activeClass);
      // Условия для пола в localStorage
      if (elem.getAttribute('id') === localStorage.getItem('sex')) {
        elem.classList.add(activeClass);
      }
      // Условие для активности в localStorage
      if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        elem.classList.add(activeClass);
      }
    })
    
  }

  // Вызов 2 раза для пола и активности
  // ВАЖНО так как обращаемся к блокам внутри указанного селектора, указываем div после селектора
  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
  // функция для расчета суточной нормы калорий
  function calcTotal() {
    // Начать с проверки, все ли данные собрали
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '____';
      return;
    }

    // Теперь условия для формулы для женщин и мужчин
    if (sex === 'female') {
      result.textContent = Math.round(ratio * (447.36 + (9.2 * weight) + (3.1 * height) - (4.3 * age)));
    } else {
      result.textContent = Math.round(ratio * (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)));
    }
  }
  calcTotal()
  // Функция для приема данных с дивов переключателей, для нее нужен родитель и класс активности
  function getStaticInfo(selector, activeClass) {
    // Сначала получим все дивы в родителе
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', e.target.getAttribute('id'));
        }
  
        // Удаляем у всех элементов класс активности 
        elements.forEach(elem => elem.classList.remove(activeClass));
        // Назначаем его элементу, по которому кликнули
        e.target.classList.add(activeClass);
        calcTotal();
      });
      });
    }

  // Вызываем эту функцию 2 раза для блока с гендерами и активностью
  // ВАЖНО так как обращаемся к блокам внутри указанного селектора, указываем div после селектора
  getStaticInfo('#gender div', 'calculating__choose-item_active');
  getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

  // Принимаем данные от пользователя - рост, вес и возраст
  function getDynamicInfo(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
      // условие для ввода не чисел
      if (input.value.match(/\D/g)) {
        input.style.backgroundColor = 'red';
      } else {
        input.style.backgroundColor = '';
      }
      // удобнее всего проверять данные можно с помощью switch case
      switch(input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }
      calcTotal();
    });
  }

  // Вызвать функцию 3 раза сс разными аргументами
  getDynamicInfo('#height');
  getDynamicInfo('#weight');
  getDynamicInfo('#age');

}

export default calc;