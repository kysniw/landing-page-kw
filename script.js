let formSubmit;
let consent, consentLabel, fullname, email, phoneNumber, instaNick, message;
let errorCont, errorText, errorBtn;

const elements = () => {
  formSubmit = document.querySelector(".contact__form");
  consent = document.querySelector(".checkbox__input");
  consentLabel = document.querySelector(".checkbox__label");
  fullname = document.querySelector(".fullname");
  email = document.querySelector(".email");
  phoneNumber = document.querySelector(".phone-number");
  instaNick = document.querySelector(".insta-nick");
  message = document.querySelector(".message");
  errorCont = document.querySelector(".error-msg");
  errorText = document.querySelector(".error-msg p");
  errorBtn = document.querySelector(".error-msg button");
};

const listeners = () => {
  formSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    let fullnameVal = false;
    let emailVal = false;
    let phoneNumberVal = false;
    let instaNickVal = false;
    let messageVal = false;
    let consentVal = false;

    const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (
      fullname.value !== "" &&
      fullname.value.length > 3 &&
      fullname.value.indexOf(" ") !== -1
    ) {
      fullnameVal = true;
      fullname.style.border = "none";
    } else {
      fullname.style.border = "1px solid red";
      errorCont.style.display = "flex";
      errorText.innerHTML +=
        "<h3>Imię i nazwisko</h3> musi mieć co najmniej 3 znaki i spację!";
    }

    if (email.value !== "" && emailRegExp.test(email.value)) {
      emailVal = true;
      email.style.border = "none";
    } else {
      email.style.border = "1px solid red";
      errorCont.style.display = "flex";
      errorText.innerHTML += "<h3>Email</h3> musi mieć @ i .!";
    }

    if (
      phoneNumber.value !== "" &&
      phoneNumber.value.length === 9 &&
      phoneNumber.type === "number"
    ) {
      phoneNumberVal = true;
      phoneNumber.style.border = "none";
    } else {
      phoneNumber.style.border = "1px solid red";
      errorCont.style.display = "flex";
      errorText.innerHTML += "<h3>Numer</h3> musi mieć 9 cyfr";
    }

    if (instaNick.value !== "" && instaNick.value.indexOf("@") === 0) {
      instaNickVal = true;
      instaNick.style.border = "none";
    } else {
      instaNick.style.border = "1px solid red";
      errorCont.style.display = "flex";
      errorText.innerHTML +=
        "<h3>Nazwa na insta</h3> musi zaczynać się od @ i mieć co najmniej 3 znaki";
    }

    if (
      message.value !== "" &&
      message.value.length > 4 &&
      message.value.length < 500
    ) {
      messageVal = true;
      message.style.border = "none";
    } else {
      message.style.border = "1px solid red";
      errorCont.style.display = "flex";
      errorText.innerHTML += "<h3>Wiadomość</h3> mieć co najmniej 5 znaków";
    }

    if (consent.checked) {
      consentVal = true;
      consent.style.border = "none";
      consentLabel.style.border = "none";
    } else {
      consent.style.border = "1px solid red";
      consentLabel.style.border = "1px solid red";
    }
  });

  errorBtn.addEventListener("click", () => {
    errorCont.style.display = "none";
    errorText.innerHTML = "";
  });
};

document.addEventListener("DOMContentLoaded", () => {
  elements();
  listeners();
});
