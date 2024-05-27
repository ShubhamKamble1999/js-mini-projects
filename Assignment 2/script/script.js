var MONTHLY_PRICE ={
    archad_plan : 9,
    advance_plan : 12,
    pro_plan : 15,
    online_service :1,
    large_service : 2,
    custom_service : 2
}
var YEARLY_PRICE ={
    archad_plan : 90,
    advance_plan : 120,
    pro_plan : 150,
    online_service :10,
    large_service : 20,
    custom_service : 20
}

var archad = {
    monthly : 9,
    yearly : 90
} 
var advanced = {
    monthly : 12,
    yearly : 120
} 
var pro = {
    monthly : 15,
    yearly : 150
} 

PERSONAL_BLOCK = document.getElementById("personal-info-id")
PLAN_BLOCK = document.getElementById("select-plan-id")
ADD_ON_BLOCK = document.getElementById("add-on-id")
FINISH_UP_BLOCK = document.getElementById("finish-up-id")
THANK_YOU_BLOCK = document.getElementById("thank-you-id")

PERSONAL_BLOCK.classList.add("active")

window.onbeforeunload = function (e) {
    sessionStorage.clear()
};

var personalNumberChange = document.getElementById('personal-info-contact')
var personalNameChange = document.getElementById('personal-info-name')

personalNumberChange.addEventListener('input', function (event) {
    var regex = /\D/g
    if (regex.test(this.value)){
        var inputNumberError = document.getElementById("error-number-1")
        inputNumberError.innerHTML = "Special character / character not allowed"
        setTimeout(function() {
            inputNumberError.innerHTML = ""
        }, 2000);
    }
    this.value = this.value.replace(/\D/g, '');
    
});

personalNameChange.addEventListener('input', function (event) {
    var regex = /^[A-Za-z\s]+$/;

    if (!regex.test(this.value)) {
        var inputNameError = document.getElementById("error-name-1")
        inputNameError.innerHTML = "Special character not allowed"
        setTimeout(function() {
            inputNameError.innerHTML = ""
        }, 3000);    
    }

    this.value = this.value.replace(/[^A-Za-z\s]/g, '');
});

function hasSpecialCharacters(inputString) {
    var specialCharacterRegex = /[^\w\s]/gi;
    return specialCharacterRegex.test(inputString);
}

// var createCircle = document.querySelector('step-circle[data-target="'+1+'"]')

var circle1 = document.getElementById("step-circle-1-id")
var circle2 = document.getElementById("step-circle-2-id")
var circle3 = document.getElementById("step-circle-3-id")
var circle4 = document.getElementById("step-circle-4-id")

circle1.classList.add("active")
circle2.classList.remove("active")
circle3.classList.remove("active")
circle4.classList.remove("active")

function renderContent(params) {

    
    // var createCircle = document.querySelector('step-circle[data-target="'+params+'"]')
    // createCircle.classList.add("active")

    var circle1 = document.getElementById("step-circle-1-id")
    var circle2 = document.getElementById("step-circle-2-id")
    var circle3 = document.getElementById("step-circle-3-id")
    var circle4 = document.getElementById("step-circle-4-id")

    var period = sessionStorage.getItem("period")
    var package = sessionStorage.getItem("package")

    if (params === 1) {
        PERSONAL_BLOCK.classList.add("active")
        PLAN_BLOCK.classList.remove("active")
        ADD_ON_BLOCK.classList.remove("active")
        FINISH_UP_BLOCK.classList.remove("active")
        THANK_YOU_BLOCK.classList.remove("active")

        circle1.classList.add("active")
        circle2.classList.remove("active")
        circle3.classList.remove("active")
        circle4.classList.remove("active")

    }else if (params === 2) {
        var stepNumber = sessionStorage.getItem("step")
        if (stepNumber < 2) {
            sessionStorage.setItem("step",2)
        }
        circle2.classList.add("active")
        circle1.classList.remove("active")
        circle3.classList.remove("active")
        circle4.classList.remove("active")

        var checkBox = document.getElementById("period-check-id")
        var yearDialog = document.getElementsByClassName("selection-details-span")
        var period1 = sessionStorage.getItem("period")
        if (checkBox.checked === true) {
            for(var i =0;i<yearDialog.length;i++){
                yearDialog[i].style.display = 'block'
            }
            sessionStorage.setItem("period","Yearly")
        }else{
            for(var i =0;i<yearDialog.length;i++){
                yearDialog[i].style.display = 'none'
            }
            sessionStorage.setItem("period","Monthly")
        }
        PLAN_BLOCK.classList.add("active")
        PERSONAL_BLOCK.classList.remove("active")
        ADD_ON_BLOCK.classList.remove("active")
        FINISH_UP_BLOCK.classList.remove("active")
        THANK_YOU_BLOCK.classList.remove("active")

        if(period1 === "Yearly"){
            checkBox.checked = true
        }else if(period === "Monthly"){
            checkBox.checked = false
        }
        
    }else if (params === 3) {
        var stepNumber = sessionStorage.getItem("step")
        if (stepNumber < 3) {
            sessionStorage.setItem("step",3)
        }
        circle3.classList.add("active")
        circle2.classList.remove("active")
        circle1.classList.remove("active")
        circle4.classList.remove("active")

        ADD_ON_BLOCK.classList.add("active")
        PLAN_BLOCK.classList.remove("active")
        PERSONAL_BLOCK.classList.remove("active")
        FINISH_UP_BLOCK.classList.remove("active")
        THANK_YOU_BLOCK.classList.remove("active")

        var onlineAddOnPrice = document.getElementById("online-price-id")
        var largeAddOnPrice = document.getElementById("large-price-id")
        var customAddOnPrice = document.getElementById("custom-price-id")

        if (period === "Yearly") {
            onlineAddOnPrice.innerHTML = formatServiceString("year",YEARLY_PRICE.online_service) 
            largeAddOnPrice.innerHTML = formatServiceString("year",YEARLY_PRICE.large_service) 
            customAddOnPrice.innerHTML = formatServiceString("year",YEARLY_PRICE.custom_service) 
        }else if(period === "Monthly"){
            onlineAddOnPrice.innerHTML = formatServiceString("month",MONTHLY_PRICE.online_service) 
            largeAddOnPrice.innerHTML = formatServiceString("month",MONTHLY_PRICE.large_service) 
            customAddOnPrice.innerHTML = formatServiceString("month",MONTHLY_PRICE.custom_service) 
        }


    }else if (params === 4) {
        var stepNumber = sessionStorage.getItem("step")
        if (stepNumber < 4) {
            sessionStorage.setItem("step",4)
        }
        sessionStorage.setItem("step",4)
        circle4.classList.add("active")
        circle3.classList.remove("active")
        circle2.classList.remove("active")
        circle1.classList.remove("active")

        FINISH_UP_BLOCK.classList.add("active")
        ADD_ON_BLOCK.classList.remove("active")
        PLAN_BLOCK.classList.remove("active")
        PERSONAL_BLOCK.classList.remove("active")
        THANK_YOU_BLOCK.classList.remove("active")

        var servicePriceArray = []

        var packageToLoad = document.getElementById("finish-package-name-id")
        var priceToLoad = document.getElementById("finish-package-price-id")

        var loadedOnlinePrice = sessionStorage.getItem('online_service-price')
        var loadedLargePrice = sessionStorage.getItem('large_service-price')
        var loadedCustomPrice = sessionStorage.getItem('custom_service-price')

        var loadedPeriod = sessionStorage.getItem('period')
        var loadedPackage = sessionStorage.getItem('package')
        var loadedPackagePrice = sessionStorage.getItem('package-price')

        var totalText = document.getElementById("finist-total-text-id")
        var totalValue = document.getElementById("finist-total-total-id")

        packageToLoad.innerHTML = loadedPackage + " ("+loadedPeriod+")"

        var total = Number(loadedPackagePrice) + Number(loadedOnlinePrice) + Number(loadedLargePrice) + Number(loadedCustomPrice)

        if (loadedPeriod === "Monthly") {
            priceToLoad.innerHTML = formatString("month",loadedPackagePrice)
            totalText.innerHTML = "Total (per month)"
            totalValue.innerHTML = formatServiceString("month",total)
        }else if (loadedPeriod === "Yearly") {
            priceToLoad.innerHTML = formatString("year",loadedPackagePrice)
            totalText.innerHTML = "Total (per year)"
            totalValue.innerHTML = formatServiceString("year",total)
        }
        

        if (loadedOnlinePrice != null) {
            if (loadedPeriod === "Yearly") {
                servicePriceArray.push({
                    "Online Service": formatServiceString("year",loadedOnlinePrice)
                })
            }else if (loadedPeriod === "Monthly") {
                servicePriceArray.push({
                    "Online Service": formatServiceString("month",loadedOnlinePrice)
                })
            }
            
        }

        if (loadedLargePrice != null) {
            if (loadedPeriod === "Yearly") {
                servicePriceArray.push({
                    "Large Storage": formatServiceString("year",loadedLargePrice)
                })
            }else if (loadedPeriod === "Monthly") {
                servicePriceArray.push({
                    "Large Storage": formatServiceString("month",loadedLargePrice)
                })
            }
            
        }

        if (loadedCustomPrice != null) {
            if (loadedPeriod === "Yearly") {
                servicePriceArray.push({
                    "Custom Service": formatServiceString("year",loadedCustomPrice)
                })
            }else if (loadedPeriod === "Monthly") {
                servicePriceArray.push({
                    "Custom Service": formatServiceString("month",loadedCustomPrice)
                })
            }
            
        }

        console.log("LOADED ARRAY : ",servicePriceArray);
        var wrapper = document.getElementById("add-on-wrapper-id")
        var htmlBlock = ""
        servicePriceArray.forEach(element =>{
            for (let key in element) {
                console.log(`${key}: ${element[key]}`)
                htmlBlock += '<div class="finish-add-on-block"><div class="finish-add-detail-block"><p>'+key+'</p></div><div class="finish-add-on-price-block"><p>'+element[key]+'</p></div></div>'
            }
        })
        wrapper.innerHTML = htmlBlock
        

    }else if (params === 5) {
        sessionStorage.clear();
        THANK_YOU_BLOCK.classList.add("active")
        FINISH_UP_BLOCK.classList.remove("active")
        ADD_ON_BLOCK.classList.remove("active")
        PLAN_BLOCK.classList.remove("active")
        PERSONAL_BLOCK.classList.remove("active")
    }
}

function manageClick(param){
    var stepNumber = sessionStorage.getItem("step")
    if (stepNumber == null) {
        sessionStorage.setItem("step",1)
    }else if(stepNumber >= param){
        // sessionStorage.setItem("step",param)
        if (param === 1) {
            renderContent(1)
        }else if(param === 2){
            renderContent(2)
        }else if(param === 3){
            renderContent(3)
        }else if(param === 4){
            renderContent(4)
        }
    }
}

function validateEmailExtension(string){
    var arr = string.split("@")
    var min = arr[1].split(".")
    console.log("ARR :: ",min)
    console.log("SET :: ",new Set(arr).size)
    const hasDuplicates = (arr) => arr.length !== new Set(arr).size;
    if (min.length > 2) {
        return false
    }else if(hasDuplicates(min)){
        return false
    }else{
        return true
    }

}

function onlyLettersAndNumbers(str) {
    return /^[A-Za-z0-9]*$/.test(str);
}

function emailValidation(params) {
    console.log("VALIDATION :: ",validateEmailExtension(params));
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(params) && validateEmailExtension(params) )
    {
        return (true)
    }
        return (false)
}

function numberValidation(params) {
    if (params.match(/\d/g).length===10)
    {
        return (true)
    }
        return (false)
}

function selectPackage(params) {
    for(var i =1 ; i<=3 ;i++){
        var selectedOption = document.getElementById("selection-"+i)
        selectedOption.classList.remove('active')
    }

    var myOption = document.getElementById("selection-"+params)
    myOption.classList.add('active')
    
    if (params === 1) {
        sessionStorage.setItem("package","Arcade")
    }else if(params === 2) {
        sessionStorage.setItem("package","Advanced")
    }else if(params === 3) {
        sessionStorage.setItem("package","Pro")
    }
}

function formatString(period,price){
    if(period === "year"){
        return `$${price}/yr`
    }else if(period === 'month'){
        return `$${price}/mo`
    }
}

function formatServiceString(period,price){
    if(period === "year"){
        return `+$${price}/yr`
    }else if(period === 'month'){
        return `+$${price}/mo`
    }
}

function updateChargeDetails(params) {
    for(var i = 1 ; i <= 3; i++){
        document.getElementById("price-3")
    }
    var packagePrice1 = document.getElementById("price-1")
    var packagePrice2 = document.getElementById("price-2")
    var packagePrice3 = document.getElementById("price-3")

    if(params === true){
        console.log("IN TRUE");
        packagePrice1.innerHTML = formatString('year',YEARLY_PRICE.archad_plan)
        packagePrice2.innerHTML = formatString('year',YEARLY_PRICE.advance_plan)
        packagePrice3.innerHTML = formatString('year',YEARLY_PRICE.pro_plan)
    }else if(params === false){
        console.log("IN FALSE");
        packagePrice1.innerHTML = formatString('month',MONTHLY_PRICE.archad_plan)
        packagePrice2.innerHTML = formatString('month',MONTHLY_PRICE.advance_plan)
        packagePrice3.innerHTML = formatString('month',MONTHLY_PRICE.pro_plan)
    }
}

function checkBox() {
    var checkBox = document.getElementById("period-check-id")
    var yearDialog = document.getElementsByClassName("selection-details-span")
    // var blueBox = document.querySelector(".selection-block")

    var blueBoxes = document.querySelectorAll('#selection-1 , #selection-2 , #selection-3 ');
    blueBoxes.forEach(box=>{
        box.classList.remove('active')
    })
    
    
    
    console.log("CHECKED :: ",checkBox.checked)
    sessionStorage.removeItem("package")
    
    if (checkBox.checked === true) {
        for(var i =0;i<yearDialog.length;i++){
            yearDialog[i].style.display = 'block'
        }
        updateChargeDetails(true)
        sessionStorage.setItem("period","Yearly")
    }else if (checkBox.checked === false) {
        for(var i =0;i<yearDialog.length;i++){
            yearDialog[i].style.display = 'none'
        }
        updateChargeDetails(false)
        sessionStorage.setItem("period","Monthly")
    } 
}

function setPrice(package,period) {
    if (package.toLowerCase() === "arcade") {
        var p = period.toLowerCase();
        sessionStorage.setItem("package-price",archad[`${p}`])
    }else if (package.toLowerCase() === "advanced") {
        var p = period.toLowerCase();
        sessionStorage.setItem("package-price",advanced[`${p}`])
    }else if (package.toLowerCase() === "pro") {
        var p = period.toLowerCase();
        sessionStorage.setItem("package-price",pro[`${p}`])
    }
}

function updateOnClickAddOn(params) {
    var boxx1 = document.getElementById("add-on-box-1")
    var boxx2 = document.getElementById("add-on-box-2")
    var boxx3 = document.getElementById("add-on-box-3")

    var boxxCheck1 = document.getElementById("add-on-id-1")
    var boxxCheck2 = document.getElementById("add-on-id-2")
    var boxxCheck3 = document.getElementById("add-on-id-3")

    if(params === 1){
        boxxCheck1.checked = !boxxCheck1.checked
    }else{
        boxx1.classList.remove("active")
    }

    if(params === 2){
        boxxCheck2.checked = !boxxCheck2.checked
    }else{
        boxx2.classList.remove("active")
    }

    if(params === 3){
        boxxCheck3.checked = !boxxCheck3.checked
    }else{
        boxx3.classList.remove("active")
    }

    if (boxxCheck1.checked === true) {
        boxx1.classList.add("active")
    }else if(boxxCheck1.checked === false){
        boxx1.classList.remove("active")
    }

    if (boxxCheck2.checked === true) {
        boxx2.classList.add("active")
    }else if(boxxCheck2.checked === false){
        boxx2.classList.remove("active")
    }

    if (boxxCheck3.checked === true) {
        boxx3.classList.add("active")
    }else if(boxxCheck3.checked === false){
        boxx3.classList.remove("active")
    }

    // if(params === 1){
    //     boxx1.classList.add("active")
    // }else{
    //     boxx1.classList.remove("active")
    // }
    
    // if(params === 2){
    //     var boxx = document.getElementById("add-on-box-2")
    //     boxx2.classList.add("active")
    // }else{
    //     boxx2.classList.remove("active")
    // }
    
    // if(params === 3){
    //     var boxx = document.getElementById("add-on-box-3")
    //     boxx3.classList.add("active")
    // }else{
    //     boxx3.classList.remove("active")
    // }
}

// function seeChanges(param) {
//     var inputName = document.getElementById("personal-info-name")
//     var inputEmail = document.getElementById("personal-info-email")
//     var inputContact = document.getElementById("personal-info-contact")

//     if (param === 1 && inputName.value != 0) {
        
//     }
// }

function seeEntry(){

    var regex = /^[A-Za-z\s]+$/;

    // if (!regex.test(this.value)) {
    //     var inputNameError = document.getElementById("error-name")
    //     inputNameError.innerHTML = "Special character not allowed"
    //     setTimeout(function() {
    //         inputNameError.innerHTML = ""
    //     }, 3000);    
    // }

    var inputName = document.getElementById("personal-info-name")
    var inputEmail = document.getElementById("personal-info-email")
    var inputContact = document.getElementById("personal-info-contact")

    var inputNameError = document.getElementById("error-name")
    var inputEmailError = document.getElementById("error-email")
    var inputNumberError = document.getElementById("error-number")

    if(inputName.value.length > 0 ){
        inputName.classList.remove("error")
        // inputNameError.innerHTML = ""
    }

    if(inputEmail.value.length > 0 ){
        console.log("In here ");
        inputEmail.classList.remove("error")
        inputEmailError.innerHTML = ""
    }

    if(inputContact.value.length > 0 ){
        inputContact.classList.remove("error")
        // inputNumberError.innerHTML = ""
    }
}

function formatStringBracket(string){
    var regex = / \(.*?\)/g; 
    if (regex.test(string)) {
      console.log(` Needed :: ${string}`);
      var result = string.replace(regex, "");
      var trimedResult = result.trim()
      return trimedResult
    }
    return string
}
  

function setAddOnPrice(period,service) {
    if (period == "Monthly") {
        sessionStorage.setItem(service+"-price",MONTHLY_PRICE[`${service}`])
    }else if(period == "Yearly") {
        sessionStorage.setItem(service+"-price",YEARLY_PRICE[`${service}`])
    }
}

function submitPersonalInfo() {
    event.preventDefault()
    var inputName = document.getElementById("personal-info-name")
    var inputEmail = document.getElementById("personal-info-email")
    var inputContact = document.getElementById("personal-info-contact")

    var inputNameError = document.getElementById("error-name")
    var inputEmailError = document.getElementById("error-email")
    var inputNumberError = document.getElementById("error-number")

    if (inputName.value.length === 0) {
        inputNameError.innerHTML = "Feild required"
        inputName.classList.add("error")
    }else{
        inputNameError.innerHTML = ""
        inputName.classList.remove("error")

    }

    if (inputEmail.value.length === 0) {
        inputEmailError.innerHTML = "Feild required"
        inputEmail.classList.add("error")
    }else if(!emailValidation(inputEmail.value)){
        inputEmailError.innerHTML = "Enter valid email"
        inputEmail.classList.add("error")
    }else{
        inputEmailError.innerHTML = ""
        inputEmail.classList.remove("error")

    }

    if (inputContact.value.length === 0) {
        inputNumberError.innerHTML = "Feild required"
        inputContact.classList.add("error")

    }else if(!numberValidation(inputContact.value)){
        inputNumberError.innerHTML = "Enter valid number"
        inputContact.classList.add("error")

    }else{
        inputNumberError.innerHTML = ""
        inputContact.classList.remove("error")

    }

    if (inputName.value.length > 0 && inputEmail.value.length > 0 && emailValidation(inputEmail.value) && inputContact.value.length > 0 && numberValidation(inputContact.value)) {
        sessionStorage.setItem("username",inputName.value.replace(/\s+/g, ' '))
        inputName.value = inputName.value.replace(/\s+/g, ' ')
        renderContent(2)
    }

}

function submitPlan() {
    var package = sessionStorage.getItem("package")
    var period = sessionStorage.getItem("period")
    var errorPackage = document.getElementById("error-package")
    
    if (package === null){
        errorPackage.innerHTML = "Please select the option"
    }else{
        errorPackage.innerHTML = ""
    }

    console.log("PERIOD :: ",period);
    if (package != null && period != null){
        setPrice(package,period)
        renderContent(3)
    }

}

function submitAddOn() {
    var onlineServiceCheck = document.getElementById('add-on-id-1')
    var largeStorageServiceCheck = document.getElementById('add-on-id-2')
    var customiseServiceCheck = document.getElementById('add-on-id-3')

    sessionStorage.removeItem("online_service-price")
    sessionStorage.removeItem("large_service-price")
    sessionStorage.removeItem("custom_service-price")

    if (onlineServiceCheck.checked === true) {
        var period = sessionStorage.getItem("period")
        setAddOnPrice(period,"online_service")
    }
    
    if(largeStorageServiceCheck.checked === true){
        var period = sessionStorage.getItem("period")
        setAddOnPrice(period,"large_service")
    }
    
    if(customiseServiceCheck.checked === true){
        var period = sessionStorage.getItem("period")
        setAddOnPrice(period,"custom_service")
    }

    renderContent(4)
}

