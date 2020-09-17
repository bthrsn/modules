import {getResource} from '../services/services'

// Задача: шаблонизировать КАРТОЧКИ меню
function cards() {
const menuCards = document.querySelector('.menu_cards');

// Создаем класс для карточек
// В будущем мы не знаем сколько классов мы захотим изменить, потому добавляем rest оператор
    class MenuItem {
      constructor(img, altimg, title, descr, price, parentSelector, ...classes) {
        this.img = img;
        this.altimg = altimg;
        this.title = title;
        this.descr = descr;
        this.price = price;
        // classes будут массивом
        this.classes = classes;
        // передадим родителя, куда будем пушить элемент
        this.parent = document.querySelector(parentSelector);
        this.transfer = 27; 
        this.changeToUAH();
    }

  // метод для конвертации из долларов в гривны
    changeToUAH() {
      this.price = this.price * this.transfer;
    }

      render() {
        const element = document.createElement('div');
        // Rest оператор не поддерживает параметр по умолчанию, потому делаем параметр по умолчанию через логическое выражение
        if(this.classes.length === 0) {
          this.element = 'menu__item';
          element.classList.add(this.element);
        } else {
        // добавляем наш список классов к HTML разметке
        this.classes.forEach(className => element.classList.add(className));
        }

        element.innerHTML = `
        <img class="menu__item_img" src=${this.img} alt="${this.altimg}" />
        <h3 class="menu__item-subtitle">Меню ${this.title}</h3>
        <div class="menu__item-descr">
        ${this.descr}
        </div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;
      // добавим родителя
      this.parent.append(element);
      // Как я самостоятельно решал, это более гибкий метод!
      // return menuCards.insertAdjacentHTML('afterbegin', card);
      }
  }

  // Способ формирования верстки с помощью класов
  // getResource('http://localhost:3000/menu')
  //   .then(data => {
  //     data.forEach(({img, altimg, title, descr, price}) => {
  //       new MenuItem(img, altimg, title, descr, price, '.menu .container').render();
  //     });
  //   });

  // Используем библиотеку axios для создания карточек
  axios.get(' http://localhost:3000/menu')
    .then(data => {
          data.data.forEach(({img, altimg, title, descr, price}) => {
            new MenuItem(img, altimg, title, descr, price, '.menu .container').render();
          });
        });

  // Способ формирования верстки без классов - на лету. Он исполльзуется, когда такую верстку нужно построить только раз и не нужен шаблонизатор.
  // getResource('http://localhost:3000/menu')
  //   .then(data => createCard(data));

  //     function createCard(data) {
  //       data.forEach(({img, altimg, title, descr, price}) => {
  //         const element = document.createElement('div');
  //         // курс гривны к доллару
  //         const transfer = 27;

  //         element.classList.add('menu__item');

  //         element.innerHTML = `
  //         <img class="menu__item_img" src=${img} alt="${altimg}" />
  //         <h3 class="menu__item-subtitle">Меню ${title}</h3>
  //         <div class="menu__item-descr">
  //         ${descr}
  //         </div>
  //         <div class="menu__item-divider"></div>
  //         <div class="menu__item-price">
  //           <div class="menu__item-cost">Цена:</div>
  //           <div class="menu__item-total"><span>${price * transfer}</span> грн/день</div>
  //         </div>
  //         `;

  //         document.querySelector('.menu .container').append(element);
  //       });
  //     };

}

export default cards;