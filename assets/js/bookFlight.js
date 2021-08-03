// *********** Global variables and consts
class FormData {
   constructor(id, date = "Tuesday, Aug 3, 2021", time = 3, duration = "30 mins", age = "30") {
      this.id = id
      this.date = date
      this.time = time
      this.duration = duration
      this.age = age
   }
}

let forms = [] // where all created form data is saved

const formsContainer = document.querySelector(".booking--form-container")
// ************

// Create the Forms
let addForm = (input) => {
   formsContainer.innerHTML += `
   <div id="${input.id}">
   <p id="remove-flight-button" onclick="removeFlight(${input.id})" style="cursor: pointer;">remove flight</p>
   <div class="row">
   <div class="col-md-6">
   <div class="form-group">
       <label>Flight Duration</label>
       <div class="input-group date" data-provider="datepicker">
           <input type="text" class="form-control" value="${input.date}" id="date_text" onchange="saveDate(${input.id}, this)">
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
   </div>`
}

document.addEventListener("DOMContentLoaded", () => {
   addFlight() // add first flight form at load
})

// ************** Form functions (called in html)
// when you press add flight
let addFlight = () => {
   let newForm = new FormData()
   // add new form on forms array
   forms.splice(forms.length, 1, newForm)
   updateIDs()
   renderForms() // forms array updated - requires redraw

   console.log(forms)
}

// Should be called everytime you introduce new data in forms array
let renderForms = () => {
   // clear everything inside formsContainer before redrawing everything based on form data
   formsContainer.innerHTML = ``

   forms.forEach(formData => {
      // add html forms using form data in each array (redraw everything)
      addForm(formData)

      if (formsContainer.firstElementChild.id == 1) {
         $("#remove-flight-button").hide() // first form cannot be removed
      }
   });

   $(".date").datepicker({
      format: "DD - MM dd, yyyy",
   }) // (why here?) to set format on each render because data is reset
}

// when you change date in datepicker
let saveDate = (id, element) => { 
   forms[id].date = element.value
}

// when you press remove flight
let removeFlight = (id) => {
   forms.splice(id, 1)
   updateIDs()
   renderForms() // removed item from forms array - requires redraw
}
// ***************

let updateIDs = () => {
   forms.forEach((e, index) => {
      e.id = index
   })
}