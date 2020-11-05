const checkTextInputs = (selector) => {
  const numInputs = document.querySelectorAll(selector);

    // Проверка на не числа при вводе и их замена на пустую строку
    numInputs.forEach(input => {
    input.addEventListener('keypress', (e) => {
      if (e.key.match(/[^?!,.а-яА-ЯёЁ0-9]/ig)) {
        e.preventDefault();
      }
      input.addEventListener('input', () => {
        input.value = input.value.replace(/[a-zA-Z]/g, '');
      });
    });
  });
};

export default checkTextInputs;