var swiper = new Swiper(".home--slide", {
    slidesPerView: 2,
    centeredSlides: true,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    },
})

var swiper = new Swiper(".recommendation--slide2", {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
})

class FormData {
    constructor(id, date = "2021, July 21", time = 3, duration = "30 mins", age = "30") {
        this.id = id
        this.date = date
        this.time = time
        this.duration = duration
        this.age = age
    }
}

let forms = []
let id = forms.length + 1
const formsContainer = document.querySelector(".booking--form-container")

let renderForm = () => {
    formsContainer.innerHTML = ``
    forms.forEach(element => {
        addForm(element)
        if (formsContainer.firstElementChild.id == 1) {
            $("#remove-flight-button").hide()
        }
    });
}

// Creating the Forms
let addForm = (input) => {
    formsContainer.innerHTML += `
    <div id="${input.id}">
        <p id="remove-flight-button" onclick="removeFlight(${input.id})" style="cursor: pointer;">remove flight</p>
        <div class="row">
        <div class="col-md-6">
        <div class="form-group">
            <label>Flight Duration</label>
            <div class="input-group date" data-provider="datepicker">
                <input type="text" class="form-control" value="${input.date}" id="date_text">
                <div class="input-group-addon">
                <i style="color: #fdbe13;" class="far fa-calendar-alt"></i>
                </div>
            </div>
        </div>
        </div>
        <div class="col-md-6">
        <div class="form-group">
            <label>Time</label>
            <div class="input-group" id="time_input" value="${input.time}">
                <select class="form-control">
                    <option>11:00AM AST</option>
                    <option>12:00NN AST</option>
                    <option>1:00PM AST</option>
                    <option>2:00PM AST</option>
                    <option>3:00PM AST</option>
                    <option>4:00PM AST</option>
                </select>
                <div class="input-group-addon">
                    <i style="color: #fdbe13;" class="far fa-clock"></i>
                </div>
            </div>
        </div>
        </div>
        </div>
        <div class="row">
        <div class="col-md-6">
        <div class="form-group">
            <label>Flight Duration</label>
            <div class="input-group" id="duration_input">
                <select class="form-control">
                    <option>30 minutes</option>
                    <option>1 hour</option>
                </select>
                <div class="input-group-addon">
                <i style="color: #fdbe13;" class="far fa-clock"></i>
                </div>
            </div>
        </div>
        </div>
        <div class="col-md-6">
        <div class="form-group">
            <label>Age</label>
            <div class="input-group" id="age_input">
                <input type="text" class="form-control" value="${input.age}">
            </div>
        </div>
        </div>
        </div>
    </div>
    `
}


document.addEventListener("DOMContentLoaded", () => {
    let initialForm = new FormData(id)

    forms.push(initialForm)
    renderForm()
})

let addFlight = () => {
    id += 1
    let newForm = new FormData(id)
    forms.push(newForm)
    renderForm()

    $(".date").datepicker({
        format: "DD - MM dd, yyyy",
    })

    $(".date")
        .datepicker()
        .on("changeDate", (e) => {
            forms[id - 1].date = document.querySelector("#date_text").value
        })
}

let removeFlight = (inputID) => {
    forms.splice(inputID - 1, 1)
    id -= 1
    renderForm()
}
