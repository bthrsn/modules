// HTML для бургер-меню
// {/* <div class="burger" id="burger">
//   <span></span>
//   <span></span>
//   <span></span>
// </div> */}

function createBurgerMenu(burgerBtn) { 
  // спрятали кнопку бургер, если не с телефона
  let clientWidth = document.documentElement.clientWidth;
  if (clientWidth < 768) {
    burgerBtn.style.display = "flex";
  } else {
    burgerBtn.style.display = "none";
  }

  //обработчик событий на изменение размера окна и появление меню-бургера
  window.addEventListener("resize", function () {
    let clientWidth = document.documentElement.clientWidth;
    if (clientWidth < 768) {
      burgerBtn.style.display = "flex";
    } else {
      burgerBtn.style.display = "none";
    }
  });

  // открываем окно по клику на меню-burger если с телефона
  burgerBtn.addEventListener("click", function () {
    burgerBtn.classList.add("active");
    modalBlock.classList.add("d-block");
    getData();
  });

  // обработчик событий открываем окно по клику на кнопку "Пройди тест"
  btnOpenModal.addEventListener("click", () => {
    burgerBtn.classList.add("active");
    modalBlock.classList.add("d-block");
    getData();
  });

  // закрываем окно на крестик
  closeModal.addEventListener("click", () => {
    modalBlock.classList.remove("d-block");
    burgerBtn.classList.remove("active");
  });

  // закрываем модальное кно при клике мимо него
  document.addEventListener("click", (event) => {
    // функция делегирования на дочерний элемент
    if (
      !event.target.closest(".modal-dialog") &&
      !event.target.closest(".open-modal-button") &&
      !event.target.closest(".burger")
    ) {
      modalBlock.classList.remove("d-block");
      // возвращает меню-бургер в стандартный вид
      burgerBtn.classList.remove("active");
    }
  });
}

export default createBurgerMenu;

// Стили для бургер-меню
// .burger {
//   width: 30px;
//   height: 30px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   cursor: pointer;
// }
// .burger span {
//   width: 30px;
//   height: 5px;
//   display: block;
//   background-color: #3cb371;
//   border: 2px solid #000;
//   transition: all 0.3s;
// }
// .burger.active span:nth-child(1) {
//   transform: rotate(405deg) translate(8px, 14px);
// }
// .burger.active span:nth-child(2) {
//   transform: rotate(45deg) translate(-1px, 5px);
// }
// .burger.active span:nth-child(3) {
//   transform: rotate(-45deg) translate(4px, -9px);
// }
// {display:inline-block!important}.d-block