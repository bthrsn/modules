const checkNumInputs = (selector) => {
  const numInputs = document.querySelectorAll(selector);

    // Проверка на не числа при вводе и их замена на пустую строку
    numInputs.forEach(input => {
      input.addEventListener('input', () => {
        input.value = input.value.replace(/\D/, '');
      });
    });
};

export default checkNumInputs;