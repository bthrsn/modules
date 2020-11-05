const mask = (selector) => {

  let setCursorPosition = (pos, elem) => {
    // Вручную установим фокус на элементе
    elem.focus();
    
    // Вручную установим курсор в позицию, на самом деле - это выделение куска текста
    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
      // Ручной полифил для IE
    } else if (elem.createTextRange) {
      let range = elem.createTextRange();
      
      // Объединим точки диапазона выделения, чтобы вместо выделения был только курсор
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }
  function createMask(event) {
    // Создаем матрицу для телефона
    let matrix = '+7 (___) ___ __ __',
        i  = 0,
        // Проверки на нецифры
        def = matrix.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');
        
        // Если пользователь удалит +7, то мы их вернем обратно
        if(def.length >= val.length) {
          val = def;
        }
        
        this.value = matrix.replace(/./g, (a) => {
        // /Проверяем на цифры и нижнее подчеркивание и то, что мы находимся в конце ввода чисел в переменную val
          return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;;
        });
        
        // Очистка маски при расфокусировке - blur
        if (event.type === 'blur') {
        // Условие, если маска пустая: 2 символа это +7, правильно отработает только при условии в условии
          if (this.value.length == 2) {
            this.value = '';
          }
        // Условие для событий focus и input
        } else {
          setCursorPosition(this.value.length, this);
        }
  }
  
  // Получаем элементы, куда будем применять маски
  let inputs = document.querySelectorAll(selector);
  // Обработчики каждого события, с которыми работали выше в этом файле
  inputs.forEach(input => {
    input.addEventListener('input', createMask);
    input.addEventListener('focus', createMask);
    input.addEventListener('blur', createMask);
  });
};

export default mask;