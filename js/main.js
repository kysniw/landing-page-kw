let headerBtn;
let contactSection;
let footerBtn;

headerBtn = document.querySelector(".header__link");
contactSection = document.querySelector(".contact");
footerBtn = document.querySelector(".footer__iconTop a");

const showForm = () => {
  contactSection.classList.remove("hide");
};

const hideForm = () => {
  contactSection.classList.add("hide");
};

headerBtn.addEventListener("click", showForm);
footerBtn.addEventListener("click", hideForm);
