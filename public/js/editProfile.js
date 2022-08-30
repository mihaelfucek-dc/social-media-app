$(document).ready(() => {
    setTimeout(() => {
        document.getElementById("password").value = "";
    }, 10)
    
})

$("#password").keydown(() => {
    setTimeout(() => {
        var passEl = document.getElementById("password");
        var errorEl = document.getElementById("passErrorMessageDisabled");
        var passVal = passEl.value;
        if ((containsAnyLetter(passVal) && 
        isLongEnough(passVal) && 
        containsAnyNumber(passVal) && 
        containsAnySpecial(passVal)) || 
        !passVal) {
            errorEl.classList.remove("passErrorMessageEnabled");
        } else {
            errorEl.classList.add("passErrorMessageEnabled");
            if (!containsAnyLetter(passVal)) {
                errorEl.innerHTML = "Add at least 1 letter character";
            } else if (!containsAnyNumber(passVal)) {
                errorEl.innerHTML = "Add at least 1 number character";
            } else if (!containsAnySpecial(passVal)) {
                errorEl.innerHTML = "Add at least 1 special character";
            } else if (!isLongEnough(passVal)) {
                errorEl.innerHTML = "Must be longer that 8 characters";
            }
        }
    }, 50)

})

function containsAnyLetter(str) {
    return /[a-zA-Z]/.test(str);
}

function isLongEnough(str) {
    return str.length > 8;
}

function containsAnyNumber(str) {
    return /\d+/.test(str);
}

function containsAnySpecial(str) {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return format.test(str);
}