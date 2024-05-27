var sportList = ["Football","Cricket","Hockey","Batminton"]

var selection = document.getElementById("select-sport-id")
var popUpId = document.getElementById("pop-up-id")

var selectedSport;

sportList.forEach((sport,index)=>{
    var newOption = document.createElement("option");
    newOption.text = sport;
    newOption.value = index
    selection.add(newOption);
})

function callListChange() {
    var value = selection.value;
    var text = selection.options[selection.selectedIndex].text;
    selectedSport = text
    console.log("VALUE :: ",value);
    console.log("TEXT  :: ",text);
    console.log("OPTION :: ",selection.options.length);
}

function calculateAge (birthDate) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    console.log(` year - ${yyyy} | day - ${dd} | month - ${mm}`);
    birthDate = new Date(birthDate);
    todayDate = new Date(`${yyyy}/${mm}/${dd}`);

    var years = (todayDate.getFullYear() - birthDate.getFullYear());

    return years;
}

function updateAge() {
    var birthdate = document.getElementById("birthdate-input")
    var errorMessage = document.getElementById("age-diff-error-id")
    var age = document.getElementById("age-input")

    var calculatedAge = calculateAge(birthdate.value)
    age.value = calculatedAge

    if (calculatedAge<16){
        errorMessage.innerHTML = "Age should not be less then 16"
    }else if (calculatedAge>24) {
        errorMessage.innerHTML = "Age should not be greater then 24"
    }else{
        errorMessage.innerHTML = ""
    }
}

function submitForm(params) {
    event.preventDefault();
    console.log(params);
    var background = document.getElementById("main-container")
    var name = document.getElementById("name-input")
    var age = document.getElementById("age-input")
    var email = document.getElementById("email-input")
    var contact = document.getElementById("contact-input")
    var sport = document.getElementById("select-sport-id")
    var extraText = document.getElementById("extra-text-id")
    var birthdate = document.getElementById("birthdate-input")

    var calculatedAge = calculateAge(birthdate.value)
    age.innerHTML = calculatedAge

    var name_error = document.getElementById("name-error-id")
    // var age_error = document.getElementById("age-error-id")
    var email_error = document.getElementById("email-error-id")
    var gender_error = document.getElementById("gender-error-id")
    var contact_error = document.getElementById("contact-error-id")
    var sport_error = document.getElementById("sport-error-id")
  
    if (name.value.length === 0){
        name_error.innerHTML = "Field require"
    }else if (name.value.length > 0) {
        name_error.innerHTML = ""
    }

    // if (age.value.length === 0){
    //     age_error.innerHTML = "Field require"
    // }else if (age.value.length > 0) {
    //     age_error.innerHTML = ""
    // }

    if (email.value.length === 0){
        email_error.innerHTML = "Field require"
    }else if (!emailValication(email.value)) {
        email_error.innerHTML = "Enter correct email id"
    }else if (email.value.length > 0) {
        email_error.innerHTML = ""
    }

    var gender_select = document.getElementsByName('gender');
    var gender_value;
    for(var i = 0; i < gender_select.length; i++){
        if(gender_select[i].checked){
            gender_value = gender_select[i].value;
        }
    }

    if (gender_value == undefined){
        gender_error.innerHTML = "Field require"
    }else  {
        gender_error.innerHTML = ""
    }

    if (contact.value.length === 0){
        contact_error.innerHTML = "Field require"
    }else if (contact.value.length > 0) {
        contact_error.innerHTML = ""
    }

    if (sport.value === 'none'){
        sport_error.innerHTML = "Field require"
    }else if (sport.value != "none") {
        sport_error.innerHTML = ""
    }

    if (name.value.length > 0 && age.value.length > 0 && emailValication(email.value) && gender_value != undefined && contact.value.length == 10 && sport.value != "none" && age.value >=16  && age.value <= 24) {
        console.log("IN TRUE BLOCK");
        popUpId.classList.add("active")  
        background.classList.add('blur')
        var popUpName = document.getElementById("pop-name")
        var popUpAge = document.getElementById("pop-age")
        var popUpBirthDate = document.getElementById("pop-birth-date")
        var popUpEmail = document.getElementById("pop-email")
        var popUpGender = document.getElementById("pop-gender")
        var popUpContact = document.getElementById("pop-contact")
        var popUpSport = document.getElementById("pop-sport")
        var popUpExtraText = document.getElementById("pop-extra")

        popUpName.innerHTML = name.value
        popUpAge.innerHTML = age.value
        popUpBirthDate.innerHTML = birthdate.value
        popUpEmail.innerHTML = email.value
        popUpGender.innerHTML = gender_value
        popUpContact.innerHTML = contact.value
        popUpSport.innerHTML = selectedSport
        if (extraText.value.length == 0){
            popUpExtraText.innerHTML = ""
        }else{
            popUpExtraText.innerHTML = extraText.value
        }
        
    }

}


function handleClosePopup() {
    console.log("HANDLE CLOSE POPUP");
    var background = document.getElementById("main-container")
    var form = document.getElementById("form-fields-block-id");
    popUpId.classList.remove("active")
    background.classList.remove('blur')

    form.reset();
}

function handleResetFields() {
    var name = document.getElementById("name-input")
    var age = document.getElementById("age-input")
    var contact = document.getElementById("contact-input")
    var sport = document.getElementById("select-sport-id")
}

function handleKeyPress() {
    var age = document.getElementById("age-input")
    var age_error = document.getElementById("age-error-id")

    if (age.value < 16) {
        age_error.innerHTML = "Age should less then 16"
    }else if (age.value > 24) {
        age_error.innerHTML = "Age should greater then 24"
    }else{
        age_error.innerHTML = ""
    }
}

function validateEmailExtension(string){
    var arr = string.split("@")
    var min = arr[1].split(".")
    const hasDuplicates = (arr) => arr.length !== new Set(arr).size;
    if (min.length > 2) {
        return false
    }else if(hasDuplicates(string)){
        return true
    }else{
        return false
    }

}

function emailValication(params) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(params) && validateEmailExtension(params))
    {
        return (true)
    }
        return (false)
}

function textAreaLength() {
    var extraText = document.getElementById("extra-text-id")
    var extraTextError = document.getElementById("extra-text-error-id")

    if (extraText.value.length === 80) {
        extraTextError.innerHTML = "Reached max limit"
    }else{
        extraTextError.innerHTML = ""
    }
}

var personalNameChange = document.getElementById('name-input')


personalNameChange.addEventListener('input', function (event) {
    var regex = /^[A-Za-z\s]+$/;

    if (!regex.test(this.value)) {
        var inputNameError = document.getElementById("name-error-id");
        inputNameError.innerHTML = "Only characters are allowed";
        setTimeout(function () {
            inputNameError.innerHTML = "";
        }, 2000);
    }

    this.value = this.value.replace(/[^A-Za-z\s]/g, ''); 
});

