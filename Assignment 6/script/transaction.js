let PAGE_COUNT = 10
let PAGE_NUMBER = 1
let PAGE_END_INDEX = '';

let DISPLAY_MONTH_TOTAL = document.getElementById("amount-display-id")
let DISPLAY_DAY_TOTAL = document.getElementById("amount-day-display-id")

let AMOUNT_INPUT = document.getElementById("amount-id")
let AMOUNT_INPUT_ERROR = document.getElementById("amount-error-id")
let NAME_INPUT = document.getElementById("name-id")
let NAME_INPUT_ERROR = document.getElementById("name-error-id")
let DATE_INPUT = document.getElementById("date-input")
let DATE_INPUT_ERROR = document.getElementById("date-error-id")
let SELECT_CAT_INPUT = document.getElementById("select-category-id")
let SELECT_CAT_INPUT_ERROR = document.getElementById("select-category-error-id")

var updatedCheckId
var UPDATE_POP_UP = document.getElementById("pop-for-upload")

let POPUP_BLOCK = document.getElementById("popup-delete")
let POPUP_MESSAGE_TEXT_BLOCK = document.getElementById("message-text-id")
let POPUP_IMAGE_BLOCK = document.getElementById("popup-image-id")

let GRID_CONTAINER = document.getElementById("grid-container-id")
let LEFT_PANEL = document.getElementById("left-panel-id")

var WRAPPER = document.getElementById("table-wrapper-id")
var MOBILE_WRAPPER = document.getElementById("mobile-wrapper-id")

let MOBILE_SELECT_KEY = document.getElementById("field-options-key-id")
let MOBILE_SELECT_VALUE = document.getElementById("sort-options-sort-id")

let HAMBURGER_MENU = document.getElementById("hamburger-menu")

var STORE_ARRAY = []

document.getElementById("level-id-3").style.backgroundColor = "#c4e4ef"

document.addEventListener("DOMContentLoaded", function () {
    var selectedValue = document.getElementById("select-option-id");
    
    let newPageCount 
    if (sessionStorage.getItem("page-total-list") == null) {
        newPageCount = 10
    }else{
        newPageCount = parseInt(sessionStorage.getItem("page-total-list"), 10)
    }

    if (sessionStorage.getItem("page-number") != null && sessionStorage.getItem("page-count") != null) {
        PAGE_NUMBER = parseInt(sessionStorage.getItem("page-number"), 10)
        PAGE_COUNT = parseInt(sessionStorage.getItem("page-count"), 10)
        selectedValue.value = parseInt(newPageCount, 10)
        selectedValue.options[selectedValue.selectedIndex].text = newPageCount
        sessionStorage.removeItem("page-number")
        sessionStorage.removeItem("page-count")
        sessionStorage.removeItem("page-total-list")
    }
});

window.addEventListener('resize', function (event) {
    if (calculateScreenWidth() < 768) {
        HAMBURGER_MENU.style.display = "block"
    } else {
        HAMBURGER_MENU.style.display = "none"
    }
});

let USER_NAME_SESSION = sessionStorage.getItem("username")

var responseJsonLength

if (USER_NAME_SESSION === null || USER_NAME_SESSION.length === 0) {
    window.location.href = "index.html";
}

String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

if (calculateScreenWidth() < 768) {
    HAMBURGER_MENU.style.display = "block"
}else{
    HAMBURGER_MENU.style.display = "none"
}

const fetchTransactionData = async () => {
    const response = await fetch(`http://localhost:3000/expense?username=${USER_NAME_SESSION}&_sort=id&_order=desc`);
    const jsonData = await response.json();
    console.log("JSON ::->> ", jsonData);

    PAGE_END_INDEX = Math.ceil(jsonData.length / PAGE_COUNT)
    responseJsonLength = jsonData.length

    while (WRAPPER.lastChild) {
        WRAPPER.removeChild(WRAPPER.lastChild);
    }

    while (STORE_ARRAY.length > 0) {
        STORE_ARRAY.pop();
    }

    jsonData.map((data) => {
        STORE_ARRAY.push(data)
    })

    renderDataFromArray()

    // return jsonData;
};

const fetchSortedData = async (table_col, method) => {
    const response = await fetch(`http://localhost:3000/expense?_sort=${table_col}&_order=${method}&username=${USER_NAME_SESSION}`)
    const responseData = await response.json()
    responseJsonLength = responseData.length
    while (WRAPPER.lastChild) {
        WRAPPER.removeChild(WRAPPER.lastChild);
    }

    while (STORE_ARRAY.length > 0) {
        STORE_ARRAY.pop();
    }

    responseData.map((data) => {
        STORE_ARRAY.push(data)
    })
    renderDataFromArray()
}

const fetchTodaysData = async () => {
    const response = await fetch(`http://localhost:3000/expense?username=${USER_NAME_SESSION}&date=${todaysDate()}`);
    const jsonData = await response.json();

    // PAGE_END_INDEX = Math.ceil(jsonData.length / PAGE_COUNT)
    // responseJsonLength = jsonData.length

    // while (WRAPPER.lastChild) {
    //     WRAPPER.removeChild(WRAPPER.lastChild);
    // }

    // while (STORE_ARRAY.length > 0) {
    //     STORE_ARRAY.pop();
    // }

    // jsonData.map((data) => {
    //     STORE_ARRAY.push(data)
    // })

    // renderDataFromArray()
}

const fetchDataForThisMonth = async () => {
    let dates = getStartDateAndEndDate()
    const response = await fetch(`http://localhost:3000/expense?username=${USER_NAME_SESSION}&date_gte=${dates.firstDay}&date_lte=${dates.lastDay}`);  // http://localhost:3000/expense?date_gte=2024-02-20&date_lte=2024-02-22
    const jsonData = await response.json();

    let totalValue = jsonData.reduce((holder, current) => {
        let sum = holder + current.amount
        return sum
    }, 0)

    DISPLAY_MONTH_TOTAL.innerText = formatNumberToPrice(totalValue)
}

const fetchDataForCurrentDay = async () => {
    const response = await fetch(`http://localhost:3000/expense?username=${USER_NAME_SESSION}&date=${todaysDate()}`);  // http://localhost:3000/expense?date_gte=2024-02-20&date_lte=2024-02-22
    const jsonData = await response.json();

    let totalValue = jsonData.reduce((holder, current) => {
        let sum = holder + current.amount
        return sum
    }, 0)

    DISPLAY_DAY_TOTAL.innerText = formatNumberToPrice(totalValue)
}

const fetchSingleData = async (id) => {
    const response = await fetch(`http://localhost:3000/expense?id=${id}`);  // http://localhost:3000/expense?date_gte=2024-02-20&date_lte=2024-02-22
    const jsonData = await response.json();
    return jsonData
}

fetchDataForThisMonth()
fetchDataForCurrentDay()

function renderDataFromArray() {

    while (WRAPPER.lastChild) {
        WRAPPER.removeChild(WRAPPER.lastChild);
    }
    while (MOBILE_WRAPPER.lastChild) {
        MOBILE_WRAPPER.removeChild(MOBILE_WRAPPER.lastChild);
    }

    let width = calculateScreenWidth()
    STORE_ARRAY.map((data, index) => {
        index += 1;
        var startIndex = (PAGE_NUMBER * PAGE_COUNT) - (PAGE_COUNT - 1);
        var endIndex = (PAGE_NUMBER * PAGE_COUNT);
        if (index >= startIndex && index <= endIndex) {
            if (width < 786) {
                MOBILE_WRAPPER.append(createMobileHtml(data)) 
            }else{
                WRAPPER.append(createHtml(data));
            }
        }
    });

    updateIndex()
}

function digitCheck(input) {
    var reg = /^\d+$/;
    if (reg.test(input) === true) {
        return true
    } else {
        return false
    }
}

function updateIndex() {
    var currentIndexId = document.getElementById("span-current-page-id")
    var endIndexId = document.getElementById("span-end-page-id")
    PAGE_END_INDEX = Math.ceil(responseJsonLength / PAGE_COUNT)
    currentIndexId.innerHTML = PAGE_NUMBER
    endIndexId.innerHTML = PAGE_END_INDEX
}

function createHtml(data) {
    let td = document.createElement('tr');
    td.innerHTML = `

    <tr>
        <td>${data.description}</td>
        <td>${data.amount}</td>
        <td>${data.date}</td>
        <td>${data.category}</td>
        <td style="text-align: center;">
            <img class="icon-image" onclick="handleEdit(${data.id})" src="../assets/images/editing.png" alt=""></img>
        </td>
        <td style="text-align: center;">
            <img class="icon-image" onclick="handleDelete(${data.id})" src="../assets/images/delete.png" alt=""></img>
        </td>
    </tr>
    
    `;
    return td;
}

function createMobileHtml(data) {
    let div = document.createElement('div');
    div.innerHTML = `
        <div class="card-container">
            <div class="card-block">
                <div class="card-element">
                    <h4>Description</h4> <p id="card-description">: ${data.description}</p>
                </div>
            </div>
            <div class="card-block">
                <div class="card-element">
                    <h4>Amount</h4> <p id="card-description">: ${data.amount}</p>
                </div>
            </div>
            <div class="card-block">
                <div class="card-element">
                    <h4>Date</h4> <p id="card-description">: ${data.date}</p>
                </div>
            </div>
            <div class="card-block">
                <div class="card-element">
                    <h4>Cetegory</h4> <p id="card-description">: ${data.category}</p>
                </div>
            </div>
            <div class="card-block">
                <div class="card-element">
                    <button onclick="handleEdit(${data.id})" class="button">Edit</button>
                    <button onclick="handleDelete(${data.id})" class="button">Delete</button>
                </div>
            </div>
        </div>
    
    `;
    return div;
    // <img class="icon-image" src="../assets/images/editing.png" alt=""></img>
    // <img class="icon-image" src="../assets/images/delete.png" alt=""></img>
}

async function handleEdit(id) {
    var userResponse = await fetchSingleData(id)
    updatedCheckId = userResponse[0].id
    NAME_INPUT.value = userResponse[0].description
    AMOUNT_INPUT.value = userResponse[0].amount
    DATE_INPUT.value = userResponse[0].date
    SELECT_CAT_INPUT.value = userResponse[0].category

    document.getElementById('overlay').style.display = 'block';
    UPDATE_POP_UP.classList.add("active")

    document.getElementById('bar-id').classList.add("blur")
    GRID_CONTAINER.classList.add("blur")
}

function closeAddPopup() {
    document.getElementById('overlay').style.display = 'none';
    UPDATE_POP_UP.classList.remove("active")

    document.getElementById('bar-id').classList.remove("blur")
    GRID_CONTAINER.classList.remove("blur")
}

function handleDelete(id) {
    var selectedValue = document.getElementById("select-option-id").value;
    sessionStorage.setItem("page-number", PAGE_NUMBER)
    sessionStorage.setItem("page-count", PAGE_COUNT)
    sessionStorage.setItem("page-total-list", selectedValue)
    fetch("http://localhost:3000/expense/" + id, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    }).then(data => {
        if (data.status == 200) {
            POPUP_BLOCK.style.display = "block";
            POPUP_MESSAGE_TEXT_BLOCK.innerText = "Data Deleted successfully"
            POPUP_IMAGE_BLOCK.src = "../assets/images/remove.png"
            setTimeout(closePopup, 1500);
        }
    })
}

function closePopup() {
    POPUP_BLOCK.style.display = "none";
    location.reload();
}

function incrementPage() {
    document.getElementById("table-id").scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    if (parseInt(PAGE_NUMBER) < parseInt(PAGE_END_INDEX)) {
        PAGE_NUMBER += parseInt(1)
    }
    renderDataFromArray()
    updateIndex()
}

function decrementPage() {
    document.getElementById("table-id").scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    if (Number(PAGE_NUMBER) > Number(1)) {   // change it to parseInt
        PAGE_NUMBER -= 1
    }
    renderDataFromArray()

    updateIndex()
}

let descriptionFlag = 0
let amountFlag = 0
let dateFlag = 0
let categoryFlag = 0

function handleDataSort(param) {
    let arrow1 = document.getElementById("arr1")
    let arrow2 = document.getElementById("arr2")
    let arrow3 = document.getElementById("arr3")
    let arrow4 = document.getElementById("arr4")

    switch (param) {
        case 1:
            descriptionFlag += 1
            arrow2.classList.remove("active")
            arrow3.classList.remove("active")
            arrow4.classList.remove("active")

            arrow2.style.transform = `rotate(${0}deg)`;
            arrow3.style.transform = `rotate(${0}deg)`;
            arrow4.style.transform = `rotate(${0}deg)`;

            amountFlag = 0
            dateFlag = 0
            categoryFlag = 0

            if (descriptionFlag == 1) {
                arrow1.classList.add("active")
                fetchSortedData("description", "asc")
            } else if (descriptionFlag == 2) {
                var rotation = 180;
                arrow1.style.transform = `rotate(${rotation}deg)`;
                fetchSortedData("description", "desc")
            } else if (descriptionFlag == 3) {
                var rotation = 0;
                arrow1.style.transform = `rotate(${rotation}deg)`;
                arrow1.classList.remove("active")
                descriptionFlag = 0
                fetchTransactionData()
            }
            break

        case 2:
            amountFlag += 1
            arrow1.classList.remove("active")
            arrow3.classList.remove("active")
            arrow4.classList.remove("active")

            arrow1.style.transform = `rotate(${0}deg)`;
            arrow3.style.transform = `rotate(${0}deg)`;
            arrow4.style.transform = `rotate(${0}deg)`;

            descriptionFlag = 0
            dateFlag = 0
            categoryFlag = 0

            if (amountFlag == 1) {
                arrow2.classList.add("active")
                fetchSortedData("amount", "asc")
            } else if (amountFlag == 2) {
                var rotation = 180;
                arrow2.style.transform = `rotate(${rotation}deg)`;
                fetchSortedData("amount", "desc")
            } else if (amountFlag == 3) {
                var rotation = 0;
                arrow2.style.transform = `rotate(${rotation}deg)`;
                arrow2.classList.remove("active")
                amountFlag = 0
                fetchTransactionData()
            }
            break

        case 3:
            dateFlag += 1
            arrow1.classList.remove("active")
            arrow2.classList.remove("active")
            arrow4.classList.remove("active")

            arrow1.style.transform = `rotate(${0}deg)`;
            arrow2.style.transform = `rotate(${0}deg)`;
            arrow4.style.transform = `rotate(${0}deg)`;

            descriptionFlag = 0
            amountFlag = 0
            categoryFlag = 0

            if (dateFlag == 1) {
                arrow3.classList.add("active")
                fetchSortedData("date", "asc")
            } else if (dateFlag == 2) {
                var rotation = 180;
                arrow3.style.transform = `rotate(${rotation}deg)`;
                fetchSortedData("date", "desc")
            } else if (dateFlag == 3) {
                var rotation = 0;
                arrow3.style.transform = `rotate(${rotation}deg)`;
                arrow3.classList.remove("active")
                dateFlag = 0
                fetchTransactionData()
            }
            break

        case 4:
            categoryFlag += 1
            arrow1.classList.remove("active")
            arrow2.classList.remove("active")
            arrow3.classList.remove("active")

            arrow1.style.transform = `rotate(${0}deg)`;
            arrow2.style.transform = `rotate(${0}deg)`;
            arrow3.style.transform = `rotate(${0}deg)`;

            descriptionFlag = 0
            amountFlag = 0
            dateFlag = 0

            if (categoryFlag == 1) {
                arrow4.classList.add("active")
                SORTING_COUNTER = true
                fetchSortedData("category", "asc")
            } else if (categoryFlag == 2) {
                var rotation = 180;
                arrow4.style.transform = `rotate(${rotation}deg)`;
                fetchSortedData("category", "desc")
            } else if (categoryFlag == 3) {
                var rotation = 0;
                arrow4.style.transform = `rotate(${rotation}deg)`;
                arrow4.classList.remove("active")
                categoryFlag = 0
                fetchTransactionData()
            }
            break
    }
}

function handleSelectionChange() {

    let arrow1 = document.getElementById("arr1")
    let arrow2 = document.getElementById("arr2")
    let arrow3 = document.getElementById("arr3")
    let arrow4 = document.getElementById("arr4")

    arrow1.classList.remove("active")
    arrow2.classList.remove("active")
    arrow3.classList.remove("active")
    arrow4.classList.remove("active")

    arrow1.style.transform = `rotate(${0}deg)`;
    arrow2.style.transform = `rotate(${0}deg)`;
    arrow2.style.transform = `rotate(${0}deg)`;
    arrow3.style.transform = `rotate(${0}deg)`;

    descriptionFlag = 0
    amountFlag = 0
    dateFlag = 0
    categoryFlag = 0

    var selectedValue = document.getElementById("select-option-id").value;
    PAGE_NUMBER = 1
    PAGE_COUNT = selectedValue
    fetchTransactionData()
}

let toggleFlag = false
function handleToggleButton() {
    toggleFlag = !toggleFlag
    if (toggleFlag === true) {
        fetchTodaysData()
    }
}


function todaysDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var day = new Date(`${yyyy}-${mm}-${dd}`).toLocaleDateString('en-CA')
    return day
}

function formatNumberToPrice(number) {
    var format = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 1,
    });

    return format.format(number)
}

function getStartDateAndEndDate() {

    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toLocaleDateString('en-CA');
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toLocaleDateString('en-CA');
    return {
        firstDay,
        lastDay
    }
}

function handleEditData() {
    event.preventDefault()
    var idUpdate = updatedCheckId
    var name = NAME_INPUT.value
    var amount = AMOUNT_INPUT.value
    var selectCat = SELECT_CAT_INPUT.value

    var selectedValue = document.getElementById("select-option-id").value;
    sessionStorage.setItem("page-number", PAGE_NUMBER)
    sessionStorage.setItem("page-count", PAGE_COUNT)
    sessionStorage.setItem("page-total-list", selectedValue)

    fetch("http://localhost:3000/expense/" + idUpdate, {
        method: "PATCH",
        body: JSON.stringify({
            description: name,
            amount: parseInt(amount.trim()),
            category: selectCat,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(data => {
        // handleClosePopup()
        closeAddPopup()
        if (data.status == 200) {
            POPUP_BLOCK.style.display = "block";
            POPUP_MESSAGE_TEXT_BLOCK.innerText = "Data Updated successfully"
            POPUP_IMAGE_BLOCK.src = "../assets/images/checked.png"
            setTimeout(closePopup, 1500);
        }
    }).catch(error => {
        console.error("Something went wrong", error);
    });


}

AMOUNT_INPUT.addEventListener("keyup", (e) => {
    if (e.target.value) {
        var alphabetPressed = digitCheck(e.target.value)
    }
    if (alphabetPressed === false) {
        AMOUNT_INPUT_ERROR.innerText = "Only number allowed"
    } else if (e.target.value.length === 0) {
        AMOUNT_INPUT_ERROR.innerText = "Field required"
    } else {
        AMOUNT_INPUT_ERROR.innerText = ""
    }
    // e.target.value = e.target.value.replace(/\D/g, '');
});

NAME_INPUT.addEventListener("keyup", (e) => {
    // if (e.target.value) {
    //     var alphabetPressed = nameCheck(e.target.value)
    // }

    if (e.target.value.length === 0) {
        NAME_INPUT_ERROR.innerText = "Field required"
    }else if (e.target.value.length === 50) {
        NAME_INPUT_ERROR.innerText = "Reached Max Limit"
        setTimeout(()=>{
            NAME_INPUT_ERROR.innerText = ""
        },1000)
    } else {
        NAME_INPUT_ERROR.innerText = ""
    }
})

DATE_INPUT.addEventListener("input", (e) => {
    let selectedDate = new Date(e.target.value)
    let todayDate = todaysDate()
    if (selectedDate.toLocaleDateString('en-CA') > todayDate) {
        DATE_INPUT_ERROR.innerText = "Date should not be in future"
    } else {
        DATE_INPUT_ERROR.innerText = ""
    }
})

SELECT_CAT_INPUT.addEventListener("input", (e) => {
    if (e.target.value === "none") {
        SELECT_CAT_INPUT_ERROR.innerText = "Please select category"
    } else {
        SELECT_CAT_INPUT_ERROR.innerText = ""
    }
})

function handleLogout(){
    sessionStorage.clear()
    window.location.href = "index.html";

}

function handleSwitchToTodayExpense() {
    sessionStorage.setItem("page-number", 1)
    sessionStorage.setItem("page-count", 10)
    location.href='todayTransaction.html'
}

let barFlag = false
function displaySideBar(){
    barFlag = !barFlag
    if (barFlag === true) {
        GRID_CONTAINER.style.gridTemplateColumns = "100% auto"
        LEFT_PANEL.style.display = "flex"
        HAMBURGER_MENU.src = "../assets/images/close.png"
    }else{
        GRID_CONTAINER.style.gridTemplateColumns = "auto 100%"
        LEFT_PANEL.style.display = "none"
        HAMBURGER_MENU.src = "../assets/images/menu.png"
    }    
    
}

function calculateScreenWidth() {
    let width = screen.width
    return width
}
// calculateScreenWidth()
MOBILE_SELECT_VALUE.style.display = "none"
MOBILE_SELECT_KEY.addEventListener("change",(e) => {
    let sortSelect = MOBILE_SELECT_VALUE.value
    let selectedItem = e.target.value

    if (sortSelect != "none") {
        fetchSortedData(selectedItem, sortSelect)
        
    }else{
        MOBILE_SELECT_VALUE.style.display = "none"
    }

    if (selectedItem != "none") {
        MOBILE_SELECT_VALUE.style.display = "inline-block"
    }else{
        MOBILE_SELECT_VALUE.style.display = "none"
        fetchTransactionData()
    }
})

MOBILE_SELECT_VALUE.addEventListener('change',(e) => {
    let keySelect = MOBILE_SELECT_KEY.value
    let selectedValue = e.target.value

    if (selectedValue != "none") {
        fetchSortedData(keySelect, selectedValue)
    }else{
        fetchTransactionData()        
    }
})

fetchTransactionData()

