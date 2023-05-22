let formSubmit;
let consent, consentLabel, fullname, email, phoneNumber, instaNick;
let errorCont, errorText, errorBtn;

const elements = () => {
  formSubmit = document.querySelector(".contact__form");
  consent = document.querySelector(".checkbox__input");
  consentLabel = document.querySelector(".checkbox__label");
  fullname = document.querySelector(".fullname");
  email = document.querySelector(".email");
  phoneNumber = document.querySelector(".phone-number");
  instaNick = document.querySelector(".insta-nick");
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

    if (
      instaNick.value !== "" &&
      instaNick.value.indexOf("@") === 0 &&
      instaNick.value.length > 2
    ) {
      instaNickVal = true;
      instaNick.style.border = "none";
    } else {
      instaNick.style.border = "1px solid red";
      errorCont.style.display = "flex";
      errorText.innerHTML +=
        "<h3>Nazwa na insta</h3> musi zaczynać się od @ i mieć co najmniej 3 znaki";
    }

    if (consent.checked) {
      consentVal = true;
      consent.style.border = "none";
      consentLabel.style.border = "none";
    } else {
      consent.style.border = "1px solid red";
      consentLabel.style.border = "1px solid red";
    }

    if (
      fullnameVal &&
      emailVal &&
      phoneNumberVal &&
      instaNickVal &&
      consentVal
    ) {
      fetch("https://formsubmit.co/ajax/matchem.university@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          "Imię i Nazwisko": fullname.value,
          Email: email.value,
          Telefon: phoneNumber.value,
          Instagram: instaNick.value,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
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
