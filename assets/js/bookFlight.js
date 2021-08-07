// *********** Global variables and consts
// $.fn.selectpicker.Constructor.BootstrapVersion = '4';

class FormData {
   constructor(id = 0, date = "Tuesday, Aug 3, 2021", time = "2:00PM AST", duration = "30 minutes", age = "30") {
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
           <input type="text" class="form-control" value="${input.date}" id="date_text${input.id}" onchange="saveDate(${input.id}, this)">
           <div class="input-group-addon">
           <i style="color: #fdbe13;" class="far fa-calendar-alt"></i>
           </div>
       </div>
   </div>
   </div>
   <div class="col-md-6">
   <div class="form-group">
       <label>Time</label>
       <div class="input-group">
           <select class="form-control selectpicker" id="time_input${input.id}" data="${input.id}">
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
       <div class="input-group" >
           <select class="form-control selectpicker" id="duration_input${input.id}" data="${input.id}">
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
           <input type="text" class="form-control">
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
   console.log("adding flight")
   let newForm = new FormData()
   // add new form on forms array
   forms.splice(forms.length, 1, newForm)
   updateIDs() // assign index as id's (still unique)
   renderForms() // forms array updated - requires redraw

   console.log("form" + forms[forms.length - 1].id + " is loaded")
   console.log(forms)
   updateSelectData()
}

// Should be called everytime you introduce new data in forms array
let renderForms = () => {
   // clear everything inside formsContainer before redrawing everything based on form data
   formsContainer.innerHTML = ``
   forms.forEach(formData => {
      // add html forms using form data in each array (redraw everything)
      addForm(formData)

      if (formsContainer.firstElementChild.id == 0) {
         let el = document.getElementById("remove-flight-button")
         el.style.visibility = "hidden"
      }
   });

   $(".date").datepicker({
      format: "DD - MM dd, yyyy",
   }) // (why here?) to set format on each render because data is reset
}

// when you change date in datepicker
let saveDate = (id, element) => {
   forms[id].date = element.value
   console.log(element)
}

let saveTime = (id, value) => {
   forms[id].time = value
   console.log("time is changed through bs select, time of form"  + id + " is now " + value )
}

let saveDuration = (id, value) => {
   forms[id].duration = value
   console.log("duration is changed through bs select, duration of form"  + id + " is now " + value )
}

// when you press remove flight
let removeFlight = (id) => {
   forms.splice(id, 1)
   updateIDs() // assign index as id's (still unique)
   renderForms() // removed item from forms array - requires redraw

   updateSelectData()
}
// ***************

let updateIDs = () => {
   forms.forEach((e, index) => {
      e.id = index
   })
}

let updateSelectData = () => {
   forms.forEach((element, index) => {
      $('#time_input' + index).selectpicker('val', forms[index].time)
      $('#duration_input' + index).selectpicker('val', forms[index].duration)

      $('#time_input' + index).on('changed.bs.select', (e) => {
         saveTime($('#time_input' + index).attr("data"), e.target.value)
         console.log(forms)
      });

      $('#duration_input' + index).on('changed.bs.select', (e) => {
         saveDuration($('#duration_input' + index).attr("data"), e.target.value)
         console.log(forms)
      });
   });
   console.log("re-set all values of time base on forms data")
}