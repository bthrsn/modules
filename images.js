// При клике на любую из восьми картинок - она открывается на весь экран с полупрозрачной, темной подложкой. При клике на подложку - все исчезает. Верстка отдельных блоков запрещена. 

const images = (imgParentSelector) => {
  const imgPopup = document.createElement('div'),
        workSection = document.querySelector(imgParentSelector),
        bigImage = document.createElement('img');

  // Модальные окна в верстке были с классом popup
  // imgPopup.classList.add('popup');
  workSection.append(imgPopup);
  // Можно через класс в bootstrap, а можно через css стили
  imgPopup.style.justifyContent = 'center';
  imgPopup.style.alignItems = 'center';
  imgPopup.style.display = 'none';

  // Ддоавляем элемент с большим изображением
  imgPopup.append(bigImage);
  //Задать размер изображению - нужно для маленьких экранов
  bigImage.style.maxWidth = `${window.innerWidth / 2}px`;

  workSection.addEventListener('click', (e) => {
    e.preventDefault();
    let target = e.target;

    // Создаем модальное окно с большим изображением
    if (target && target.classList.contains('preview')) {
        imgPopup.classList.add('popup');
        imgPopup.style.display = 'flex';
        // Убрать прокрутку
        document.body.style.overflow = 'hidden';  
        // У родител изображения есть ссылка, которую мы получаем
        const path = target.parentNode.getAttribute('href');
        // А потом устанавливаем как свойство картинки на которую кликнули
        bigImage.setAttribute('src', path);
    }

    // Закрытие по клику на подложку
    if (target && target.matches('div.popup')) {
      imgPopup.style.display = 'none';
      imgPopup.classList.remove('popup');
      document.body.style.overflow = '';  
    }
  });
};

export default images;
