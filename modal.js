  // функция для закрытия окна, так как она повторяется, а нужно следовать DRY = dont repeat yorself
  function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''
  }

  function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('hide');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    // Если пользователь уже открыл окно, оно не будет открываться снова через указанное время
    // Сделаем условие запуска, только если задан этот аргумент
    if (modalTimerId) {
      clearInterval(modalTimerId);
    }
  }

// Задача, сделать МОДАЛЬНОЕ ОКНО

function modal(triggerSelector, modalSelector, modalTimerId) {
  // Делаем через дата атрибуты
  const modal = document.querySelector(modalSelector),
        modalOpenBtn = document.querySelectorAll(triggerSelector);

  modalOpenBtn.forEach(item => {
    // Чтобы не вызвать функцию сразу при загрузке страницы - оборачиваем ее в другую колбэк функцию
    item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
  });

  // Остановим показ модального окна после первой прокрутки
  const showModalByScroll = () => {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);  
    }
  }
  
  // Вызываем модальное окно если пользователь проскролил страницу до конца
  window.addEventListener('scroll', showModalByScroll);
  
  // Если кликаем вне окна - оно закрывается
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });

  // Закрываем окно на клавишу esc
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });


}

export default modal;
export {closeModal, openModal};