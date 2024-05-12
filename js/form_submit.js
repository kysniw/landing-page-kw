let formSubmit;
let consent,
  consentLabel,
  consentTwo,
  consentLabelTwo,
  fullname,
  email,
  phoneNumber,
  instaNick;
let errorCont, errorText, errorBtn;

const elements = () => {
  formSubmit = document.querySelector(".contact__form");
  consent = document.querySelector(".checkbox__input-one");
  consentLabel = document.querySelector(".checkbox__label-one");
  consentTwo = document.querySelector(".checkbox__input-two");
  consentLabelTwo = document.querySelector(".checkbox__label-two");
  fullname = document.querySelector(".fullname");
  email = document.querySelector(".email");
  phoneNumber = document.querySelector(".phone-number");
  instaNick = document.querySelector(".insta-nick");
  errorCont = document.querySelector(".error-msg");
  errorText = document.querySelector(".error-msg p");
  errorBtn = document.querySelector(".error-msg button");
};

const listeners = () => {
  formSubmit.addEventListener("submit", async (e) => {
    e.preventDefault();
    let fullnameVal = false;
    let emailVal = false;
    let phoneNumberVal = false;
    let instaNickVal = false;
    let consentVal = false;
    let consentTwoVal = false;

    const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (
      fullname.value !== "" &&
      fullname.value.length > 3 &&
      fullname.value.indexOf(" ") !== -1 &&
      fullname.value.indexOf(" ") !== fullname.value.length - 1
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

    if (consentTwo.checked) {
      consentTwoVal = true;
      consentTwo.style.border = "none";
      consentLabelTwo.style.border = "none";
    } else {
      consentTwo.style.border = "1px solid red";
      consentLabelTwo.style.border = "1px solid red";
    }

    if (
      fullnameVal &&
      emailVal &&
      phoneNumberVal &&
      instaNickVal &&
      consentVal &&
      consentTwoVal
    ) {
      errorCont.style.display = "flex";
      errorText.innerHTML =
        "Wysyłanie wiadomości <span class='dot-one'>.</span><span class='dot-two'>.</span><span class='dot-three'>.</span>";
      errorBtn.style.display = "none";

      await fetch("https://formsubmit.co/ajax/matchem.university@gmail.com", {
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
        .then((data) => {
          errorCont.style.display = "flex";
          errorText.innerHTML = "Wiadomość wysłana!";
          errorBtn.style.display = "block";
          fullname.value = "";
          email.value = "";
          phoneNumber.value = "";
          instaNick.value = "";
          consent.checked = false;
          consentTwo.checked = false;
        })
        .catch((error) => {
          errorCont.style.display = "flex";
          errorText.innerHTML = "Błąd wysyłania wiadomości!";
          errorText.innerHTML += error;
        });
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
