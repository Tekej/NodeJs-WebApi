function validateForm(){
    const salaryInput = document.getElementById('salary');
    const dateFromInput = document.getElementById('dateFrom');
    const dateToInput = document.getElementById('dateTo')
    const errorSalary = document.getElementById('errorSalary');
    const errorDateFrom = document.getElementById('errorDateFrom');
    const errorDateTo = document.getElementById('errorDateTo');
    const errorsSummaryZatrudnienie = document.getElementById('errorsSummaryZatrudnienie')
    resetErrors([salaryInput, dateFromInput, dateToInput], [errorSalary, errorDateFrom, errorDateTo], errorsSummaryZatrudnienie);

    let validZatrudnienie = true;


    if (!checkRequired(salaryInput.value)){
        validZatrudnienie = false;
        salaryInput.classList.add("error-input");
        errorSalary.innerText = "Pole jest wymagane";
    } else if(!checkNumber(salaryInput.value)){
        validZatrudnienie = false;
        salaryInput.classList.add("error-input");
        errorSalary.innerText = "Pole powinno być liczbą";
    } else if(!checkNumberRange(salaryInput.value, 2000, 1_000_000)){
        validZatrudnienie = false;
        salaryInput.classList.add("error-input");
        errorSalary.innerText = "Pole powinno być liczbą w zakresie od 2000 do 1000000";
    }

    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDay(),
        year = nowDate.getFullYear();

    if(month.length < 2){
        month = '0' + month;
    }
    if(day.length < 2){
        day = '0' + day;
    }
    const nowString = [year, month, day].join('-')

    if(!checkRequired(dateFromInput.value)){
        validZatrudnienie = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = "Pole jest wymagane";
    } else if (!checkDate(dateFromInput.value)){
        validZatrudnienie = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = "Pole powinno zawierać datę w formacie yyyy-mm-dd (np. 2000-12-23)";
    } else if (checkDateIfAfter(dateFromInput.value, nowString)){
        validZatrudnienie = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = "Data od nie może być z przyszłości";
    } else if (checkRequired(dateFromInput.value) && checkDate(dateFromInput.value) && !checkDateIfAfter(dateToInput.value, dateFromInput.value)){
        validZatrudnienie = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = "Data od powinna być nie póżniejsza niż data do";
    }

    if(!checkRequired(dateToInput.value)){
        validZatrudnienie = false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText = "Pole jest wymagane";
    } else if (!checkDate(dateToInput.value)){
        validZatrudnienie = false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText = "Pole powinno zawierać datę w formacie yyyy-mm-dd (np. 2000-12-23)";
    } else if (checkRequired(dateToInput.value) && checkDate(dateToInput.value) && !checkDateIfAfter(dateToInput.value, dateFromInput.value)){
        validZatrudnienie = false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText = "Data do powinna być póżniejsza niż data od";
    }

    return validZatrudnienie;
}