import { event } from "jquery";

const forms = () => {

  const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        phoneInputs = document.querySelectorAll('input[name="user_phone"]');

  // Проверка на не числа в номере телефона и их моментальное удаление 
  phoneInputs.forEach(input => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/\D/, '');
    });
  });

  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Мы скоро с вами свяжемся',
    failure: 'Что-то пошло не так...' 
  };

  // Функция для отправки данных
  const postData = async (url, data) => {
    document.querySelector('.status').textContent = message.loading;
    let result = await fetch(url, {
      method: "POST",
      body: data
    });
    return await result.text();
  };

  // Функция для очищения инпутов
  const clearInputs = () => {
    inputs.forEach(input => input.value ='');
  }

  form.forEach(item => {
    item.addEventListener('submit', (event) => {
      event.preventDefault();

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status')
      item.appendChild(statusMessage);

      const formData = new FormData(item);

      // Перевод в формат json
      // const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('assets/server.php', formData)
        .then(res => {
          console.log(res);
          statusMessage.textContent = message.success;
        })
        .catch(() => statusMessage.textContent = message.failure)
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove()
          }, 8000);
        });
    });
  });
}

export default forms;