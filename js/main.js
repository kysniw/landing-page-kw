let headerBtn;
let contactSection;
let footerBtn;

headerBtn = document.querySelector(".header__link");
contactSection = document.querySelector(".contact");
footerBtn = document.querySelector(".footer__iconTop a");

function showForm() {
  contactSection.classList.remove("hide");
  const self = this;
  setTimeout(() => {
    window.location.href = "#contact";
  }, 300);
}

const hideForm = () => {
  contactSection.classList.add("hide");
};

headerBtn.addEventListener("click", showForm);
footerBtn.addEventListener("click", hideForm);
