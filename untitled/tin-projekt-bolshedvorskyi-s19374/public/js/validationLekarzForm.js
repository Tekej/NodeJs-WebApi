function validateForm() {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email')
    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorEmail = document.getElementById('errorEmail');
    const errorsSummaryLekarz = document.getElementById('errorsSummaryLekarz')
    resetErrors([firstNameInput, lastNameInput, emailInput], [errorFirstName, errorLastName, errorEmail], errorsSummaryLekarz);

    let validLekarz = true;

    if(!checkRequired(firstNameInput.value)){
        validLekarz = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole jest wymagane";
    }else if (!checkTextLengthRange(firstNameInput.value, 5, 60)){
        validLekarz = false;
        firstNameInput.classList.add("errorInput");
        errorFirstName.innerText = "Pole powinno zawierać od 5 do 60 znaków";
    }

    if(!checkRequired(lastNameInput.value)){
        validLekarz = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole jest wymagane";
    }else if (!checkTextLengthRange(lastNameInput.value, 5, 60)){
        validLekarz = false;
        lastNameInput.classList.add("errorInput");
        errorLastName.innerText = "Pole powinno zawierać od 5 do 60 znaków";
    }

    if(!checkRequired(emailInput.value)){
        validLekarz = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole jest wymagane";
    }else if (!checkTextLengthRange(emailInput.value, 5, 60)){
        validLekarz = false;
        emailInput.classList.add("errorInput");
        errorEmail.innerText = "Pole powinno zawierać od 5 do 60 znaków";
    }else if (!checkEmail(emailInput.value)){
        validLekarz = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole powinno zawierać prawidłowy adres email";
    }

    if (!validLekarz){
        errorsSummaryLekarz.innerText = "Formularz zawiera błędy";
    }

    return validLekarz;
}



