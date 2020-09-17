import {closeModal, openModal} from './modal';
import {postData} from '../services/services';
// Задача: все ФОРМЫ принимают данные и отправляют на сервер
function forms(formSelector, modalTimerId) {
  // выполним сначала с помощью XML 
  const forms = document.querySelectorAll(formSelector);

  // создадим объект, в котором будут тексты сообщений
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Мы скоро с вами свяжемся',
    failure: 'Что-то пошло не так...' 
  } 

  // Повязываем нашу функцию получения данных к формам
  forms.forEach(item => {
    bindPostData(item);
  })

  // функция получения данных из формы
  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      // в первую очередь отменим перезагрузку старницы
      e.preventDefault();

      //  блок с сообщением
      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
          display: block;
          margin: 0 auto;
          `;
      // Пока наше сообщение существует только в HTML коде и его нужно добавить на страницу методом append к форме
      // form.append(statusMessage);

      // Так как формы разные, делаем так, чтобы спиннер одинаково хорошо отображалмся
      form.insertAdjacentElement('afterend', statusMessage);
      
      // const request = new XMLHttpRequest();
      // request.open('POST', 'server.php');

      // сохраним данные с помощью FormData
      const formData = new FormData(form);

      // Прием для изменения формата передачи данных из XML в JSON - создаем новый объект и переберем старые данные в него
      // const object = {};
      //   formData.forEach(function(value, key) {
      //     object[key] = value;
      //   });

      // Изменим код выше с помощью новых методов
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      // Пример метода entries, превращая объект в массив массивов - матрицу
      // const obj = {a: 23, b: 50};
      // console.log(Object.entries(obj));

      // Тогда сюда вместо formData помещаем object
      // request.send(formData);
      // request.send(json);

      // Функция работы с сервером
      postData('http://localhost:3000/requests', json)
      // Обрабатываем результат запроса с помощью then
      .then(data => {
        // заменили request.remove на data - это те данные, которые нам вернул сервер
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(() => {
        showThanksModal(message.failure);  
      }).finally(() => {
        form.reset(); 
      });

      // request.addEventListener('load', () => {
      //   if(request.status === 200) {
      //     console.log(request.response);
      //     showThanksModal(message.success);
      //     // очищаем форму после отправки
      //       form.reset();
      //       statusMessage.remove();
      //   } else {
      //     showThanksModal(message.failure);    }
      // });
    });
  }

    //  Делаем окно с красивым оповещением пользователя с помощью старого модального окна
    function showThanksModal(message) {
      const prevModalDialog = document.querySelector('.modal__dialog');
      // Сперва спрячем это окно
      prevModalDialog.classList.add('hide');
      openModal('.modal', modalTimerId);

      // Создадим новое окно с помощью js
      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
      <div class='modal__content'>
        <div class='modal__close' data-close>×</div>
        <div class='modal__title'>${message}</div>
      </div>
      `;

      document.querySelector('.modal').append(thanksModal);
    
      // Сделаем временной интервал на показ окна
      setTimeout(() => {
          thanksModal.remove();
          prevModalDialog.classList.add('show');
          prevModalDialog.classList.remove('hide');
          closeModal('.modal');
          }, 4000);
    }

    // разбираем fetch API
    // скопировано с jsonplaceholder.com - обращаемся к первой тудушке
    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //   method: 'POST',
    //   body: JSON.stringify({name: 'Alex'}),
    // всегда желательно указывать заголовки, чтобы понимать какой тип данных мы отправляем
    //   headers: {
    //     'Content-type': 'application/json'
    //   }
    // })
    //   .then(response => response.json())
    //   .then(json => console.log(json));
  

  // получим доступ к базе данных db.json
  // fetch('http://localhost:3000/menu')
  //   .then(data => data.json())
  //   .then(res => console.log(res));

}

export default forms;