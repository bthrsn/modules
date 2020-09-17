  // Задача: реализовать СЛАЙДЕР, алгоритм в комментариях к коду
    // После здесь же делаем слайдер карусель
      // Затем делаем навигацию по слайдам в виде точек. Алгоритм 
      // 1. получаем весь слайдер со страницы и установить ему position relative, так как точки спозиционированы внизу слайдера абсолютно
      // 2. создать обертку для точек
      // 3. создать количество точек равное количеству слайдов (метод перебора или цикл). для каждой точки атрибут соответствия слайду и класс активности - какой слайд сейчас активен
      // 4. когда кликаем на точку - перемещаемся на соответствующий слайд


function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
  // получить элементы со страницы
  const slides = document.querySelectorAll(slide),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        current = document.querySelector(currentCounter),
        total = document.querySelector(totalCounter),
        // Тут элементы для карусели
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field), 
        width = window.getComputedStyle(slidesWrapper).width,
        // Получим весь слайдер для навигации
        slider = document.querySelector(container);

// сделать индекс текущего слайда и получить общее количество слайдов
// оставляем его для счетчика слайдов на странице
  let currentSlide = 1;

// Для счетчика возьмем функционал из предыдущего слайдера, но дополним, так как функции showSlides нет
  const addZeroToCountNumber = () => {
    if (slides.length < 10) {
      total.textContent = `0${slides.length}`;
      current.textContent = `0${currentSlide}`
    } else {
      total.textContent = slides.length;
      current.textContent = currentSlide;
    }
  };
  addZeroToCountNumber();

  // Перерменная-ориентрир, чтобы знать насколько мы отступили вправо или влево
  let offset = 0;

  // Назначаем ширину поля для слайдера карусели в css
  slidesField.style.width = 100 * slides.length +'%';

  // Следующий кусоклучше указать в css файле или короче будет с помощью свойства css текст
  // Выстроим слайды в полоску с помощью flex
  slidesField.style.display = 'flex';
  // Плавное передвижение достигается с помощью transition
  slidesField.style.transition = '0.5s all';
  // скрываем слайды не в области видимости
  slidesWrapper.style.overflow = 'hidden';

  // Убедимся, что все слайды равны по ширине
  slides.forEach(slide => {
  slide.style.width = width;
  });

  // Установить слайдеру относитильное позиционирование для правильного отображения навигации
  slider.style.position = 'relative';

  // Создаем контейнер для точек
  const sliderIndicators = document.createElement('ol'),
        // создадим пустой массив для внутренних точек
        dots = [];
  sliderIndicators.classList.add('slider-indicators');
  slider.append(sliderIndicators);

// создаем внутри точки по количеству слайдов
  slides.forEach((slide, index) => {
    const dot = document.createElement('li');
    dot.classList.add('dot');

      // Устанавливаем связь со слайдами: получается, что индекс = номеру слайда
      dot.setAttribute('data-slide-to', index + 1);

      // Проверка на активный слайд
    if (index == 0) {
      dot.style.opacity = 1;
    }

    sliderIndicators.append(dot);
    // Запушим точку в наш массив
    dots.push(dot);
  });

  // Функция установки размытия навигации на текущий слайд
  const changeNavigationOpacity = () => {
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[currentSlide - 1].style.opacity = 1;  
  }

  // Функция для перевода в число и удаления всех не цифр со строки
  const deleteNotDigits = (str) =>  +str.replace(/\D/g, '');

  // Обработчики событий
  next.addEventListener('click', () => {
  // Условие для возвращения слайдера в начальную позицию? когда промотали все слайды и значение офсета = ширина одного слайда умножить на количество слайдов
  if (offset == deleteNotDigits(width) * (slides.length - 1)){
      offset = 0;
  } else {
      offset += deleteNotDigits(width);
    }
// Двигаем слайдер
  slidesField.style.transform = `translateX(-${offset}px)`;

  // Условие переключения счетчика при переключении слайдов
  if (currentSlide == slides.length) {
    currentSlide = 1
  } else {
    currentSlide++;
}

  // Условие для 0 перед счетчиком меньше 10
  addZeroToCountNumber();

  // Для отображения навигации
  changeNavigationOpacity();
  });

  prev.addEventListener('click', () => {
  // Условие для возвращения слайдера в начальную позицию
  if (offset == 0){
    offset = deleteNotDigits(width) * (slides.length - 1);
  } else {
    offset -= deleteNotDigits(width);
  }
  // Двигаем слайдер
  slidesField.style.transform = `translateX(-${offset}px)`

  // Условие переключения счетчика при переключении слайдов
  if (currentSlide == 1) {
    currentSlide = slides.length;
  } else {
    currentSlide--;
  }

  // Условие для 0 перед счетчиком меньше 10
  addZeroToCountNumber();

  changeNavigationOpacity();
  });

  // Функционал: нажал на навигацию - переключился на соответствующий слайд
  // алгоритм: меняется offset, двигается слайд. меняется opacity, меняется счетчик
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');
      currentSlide = slideTo

      offset = deleteNotDigits(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;

      addZeroToCountNumber();

      changeNavigationOpacity();
    });
  });

  // // Вызов функции показа слайдов перед ее объеявлением
  // showSlides(currentSlide);

  // //  Отдельно вынесено получение общего количества слайдов в документе. чтобы сделать это один раз, а не каждый раз, когда вызываем функцию
  // if (slides.length < 10) {
  //   total.textContent = `0${slides.length}`;
  // } else {
  //   total.textContent = slides.length;
  // }

  // // 3. Функции показа слайда и сокрытия остальных, и проверять условие перехода с первого на последний и наоборот
  // function showSlides(item) {

  // // проверка переключения с первого на последний и наоборот
  // if (item > slides.length) {
  //   currentSlide = 1;
  // }
  // if(item < 1) {
  //   currentSlide = slides.length
  // }

  // slides.forEach(item => item.classList.add('hide'));
  // slides[currentSlide - 1].classList.remove('hide');

  // // Текст в переключателе слайда 
  // if (currentSlide < 10) {
  //   current.textContent = `0${currentSlide}`;
  // } else {
  //   current.textContent = currentSlide;
  // }
  // }

  // // Функция для стрелок
  // function plusSlides(n) {
  //   showSlides(currentSlide += n);
  // }
  // // Навешиваем обработчик события клика на каждую стрелку, работает только с колбэк функцией (ошибся сначала)
  // next.addEventListener('click', () => plusSlides(1));
  // prev.addEventListener('click', () => plusSlides(-1));

}

export default slider;