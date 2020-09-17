    // Задача, сделать ТАЙМЕР

function timer(id, deadline) {

    const getTimeRemaining = (endtime) => {
      // делаем тех переменную, в которой будет количество оставшихся миллисекунд
      const t = Date.parse(endtime) - Date.parse(new Date()),
        // Переменные в которые помещаем остаток времени
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor((t / (1000 * 60 * 60) % 24)),
        minutes = Math.floor((t / 1000 / 60) % 60),
        seconds = Math.floor((t / 1000) % 60);
  
      // Но возвращаем мы объект с данными
      return {
        'total': t,
        days,
        hours,
        minutes,
        seconds
      }
    }
    // Функция добавления нуля
    function getZero(num) {
      if (num >= 0 && num < 10) {
        return `0${num}`
      } else {
        return num
      }
    }
    // Функция устанавливает таймер на страницу
    const setClock = (selector, endtime) => {
      // берем первый таймер на странице
      const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds');
  
      // внутри функция обновляет часы
      const updateClock = () => {
        // Сколько осталось времени до дедлайна
        const t = getTimeRemaining(endtime);
  
        // Выводим полученные значения на страницу
        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);
  
        // Останавливаем таймер
        if (t.total <= 0) {
          clearInterval(timeInterval)
        }
      }
      // Запускаем обновление времени каждую секунду
      const timeInterval = setInterval(updateClock, 1000);
      // Вызов функции, чтобы не было моргания верстки через 1 секунду
      updateClock();
    }
  
    setClock(id, deadline);
  
}

export default timer;