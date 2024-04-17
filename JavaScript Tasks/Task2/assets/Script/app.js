let add_new_education_row = document.getElementById("add_btn");
let records = document.getElementById("eds");
let recs = document.getElementById("extra_ed");
let sbt_btn = document.getElementById("sbt-btn");
let form = document.forms["myForm"];
let counter = 3;
let All_entries = {};
let t_body = document.getElementById("table-entries");
let should_submit = true;
let s_num = 1;
let edit_row = -1;


// Adds new education rows in the form when user clicks plus icon
add_new_education_row.addEventListener("click", function(){
    var tempDiv = document.createElement(`div`);
    tempDiv.setAttribute("id", `ed-${counter}`);
    tempDiv.innerHTML = ids();
    recs.appendChild(tempDiv);
    counter++;
})


// returns extra education rows with customized IDs
let ids = function(){
    return `
    <hr class="my-3">
    <div class="d-flex justify-content-between">
      <div class="row w-100">
        <div class="col">
          <label for="deg-brd${counter}" class="form-label">Degree/ Board</label>
          <input type="text" class="form-control" id="deg-brd${counter}" name="deg-brd" required>
        </div>
        <div class="col-xxl col-xl-4 col-lg-6">
          <label for="scl-clg${counter}" class="form-label">School/ College</label>
          <input type="text" class="form-control" id="scl-clg${counter}" name="scl-clg" required>
        </div>
        <div class="col-xxl col-xl-4 col-lg-6">
          <label for="start-date${counter}" class="form-label">Start Date <span class="text-danger valid_text ms-2 invisible position-absolute">* Start &lt Passout</span></label>
          <input type="month" class="form-control" onchange="validate_pass_date(this)" id="start-date${counter}" name="start-date" required>
        </div>
        <div class="col-xxl col-xl-4 col-lg-6">
          <label for="pass-year${counter}" class="form-label">Passout Year <span class="text-danger valid_text ms-2 invisible position-absolute">* Start &lt Passout</span></label>
          <input type="month" class="form-control" onchange="validate_pass_date(this)" id="pass-year${counter}" name="pass-year" required>
        </div>
        <div class="col-xxl col-xl-4 col-lg-6">
          <label for="percentage${counter}" class="form-label">Percentage <span class="text-danger valid_text ms-2 invisible position-absolute">* Invalid value</span></label>
          <input type="number" class="form-control" id="percentage${counter}" onkeyup="validate_percentage(this)" placeholder="Don't use % sign" name="percentage" required min="0" max="100">
        </div>
        <div class="col-xxl col-xl-4 col-lg-6">
          <label for="backlog${counter}" class="form-label">Backlog <span class="text-danger valid_text ms-2 invisible position-absolute">* Invalid Value</span></label>
          <input type="number" class="form-control" id="backlog${counter}" onkeyup="validate_backlog(this)" placeholder="if any" name="backlog" min="0" required>
        </div>
      </div>
      <div class="text-center d-flex align-items-center px-lg-5 ps-3">
        <i role="button" onclick="delete_row(this)" class="fa-solid fa-circle-minus fa-xl"></i>
      </div>
    </div>`
}


// Delete row 
// records.addEventListener('click', function(event){
//     if(event.target.classList.contains("fa-circle-minus")){
//         let parent = event.target.parentNode.parentNode.parentNode;
//         records.removeChild(parent);
//     }
// })


// Deletes education rows
const delete_row = function(obj){
  obj.parentNode.parentNode.parentNode.remove();
}


// Display User Filled Data in HTML table
let displayEntries = function(obj, sId){
  let row;
  //on edit_row != -1, we will target the existing row in admin table, so we can edit its 'tds' text, else we will create a brand new row with some new ID
  if(edit_row != -1){
    row = document.getElementById(edit_row);
    row.innerHTML = "";
  }
  else{
    row = document.createElement('tr');
    row.setAttribute("id", sId);
  }
  //filling text in TDs will be same for new or existing row,as we just need to fill the values we get in form.
  for(let inp in obj){
    let tmp = document.createElement('td');
    tmp.innerText = obj[inp];
    row.appendChild(tmp);
  }
  let tmp = Action_section();
  row.appendChild(tmp);
  //if we are editing an existing row, then our task has finished here by appending the TDs in existing TR
  //else we need to append the brand new row in the table
  if(edit_row == -1)
    t_body.appendChild(row);
}

// Generate action buttons
function Action_section(){
  let td = document.createElement('td');
  let action = document.createElement('div');
  td.appendChild(action);
  action.classList = "d-flex gap-2";
  let edit = document.createElement('button');
  let del = document.createElement('button');
  edit.classList = "bg-white";
  del.classList = "bg-white";
  let editI = document.createElement('i');
  editI.classList = "fa-solid fa-pencil"
  editI.style.color = "#ffa500";
  editI.setAttribute("data-bs-toggle", "modal");
  editI.setAttribute("data-bs-target", "#staticBackdrop");
  let delI = document.createElement('i');
  delI.classList = "fa-solid fa-trash-can";
  delI.style.color = "#ffa500";
  edit.appendChild(editI);
  del.appendChild(delI);
  action.appendChild(edit);
  action.appendChild(del);
  return td;
  // return `<td>
  //   <div class="d-flex gap-2">
  //     <button class="bg-white"><i class="fa-solid fa-pencil" style="color:#ffa500" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i></button>
  //     <button class="bg-white"><i class="fa-solid fa-trash-can" style="color:#ffa500"></i></button>
  //   </div>
  // </td>`
}


// Extract form values on submission
form.addEventListener("submit", function form_submit(e) {
    e.preventDefault();
    should_submit = true;
    // validate_all returns json object of single student details
    let entry = validate_all();
    //after validating all input fields, if any of the field hold invalid input then we will not allow the form to be submitted
    if(should_submit == false){
      document.getElementById("liveToast").style.display = "block";
      setTimeout(() => {
        document.getElementById("liveToast").style.display = "none";
      }, 4000);
      return;
    }
    //edit_row represents the ID of row it holds when edit button is clicked, hence when it holds some value other than -1 then we will which row in admin table is to be altered
    let Idty = edit_row == -1 ? `SId-${s_num++}` : edit_row;
    All_entries[Idty] = entry;
    // displayEntries diplays student data in admin table
    displayEntries(entry[0], Idty);
    //edit_row is reseted so that when new row is created then it won't hold any ID 
    edit_row = -1;
    //recs content is erased so that extra education rows can be removed and form can attain its original structure.
    recs.innerHTML = "";
    e.target.reset();
    console.log(All_entries);
});

//resets form inputs
let reset_form = function(){
  form.reset();
  recs.innerHTML = "";
};


//action buttons event listener (edit and delete)
t_body.addEventListener("click", function(e){
  let parent = e.target.parentNode.parentNode.parentNode.parentNode;
  //if edit button is clicked
  if(e.target.classList.contains("fa-pencil")){
    form.reset();
    //fetching the values of specific row from all_records obj
    let entry = All_entries[parent.id];
    //we assigned ID of the row which need an edit to the global variable edit_row, so that it can be accessed by other funcations 
    edit_row = parent.id;
    fill_form(entry);
  }
  //if delete button is clicked
  if(e.target.classList.contains("fa-trash-can")){
    delete All_entries[parent.id];
    parent.remove();
    console.log(All_entries);
  }
})

//refills form when edit button is clicked
const fill_form = (entry)=>{
  //here we determine how many rows are present in the json object of this student
  let row_len = Object.keys(entry).length;
  let cur = 3; //our original form contains 3 rows initially hence 3
  //we will add new rows to the form untill cur becomes equal to the number of rows we have in json object
  while(cur++ < row_len){
    add_new_education_row.dispatchEvent(new Event('click'));
  }
  //In form, we target each row {personalDetail, eduRow1, eduRow2, ...}
  let all_rows = form.getElementsByClassName("row");

  // entry is the object in which we have single student data which is stored in rows like {row0, row1, ...}
  for(row in entry){
    //Similarily we will target each row in all_rows array
    let cur_row = all_rows[row];
    //we will loop on each key-value of each row of json obj
    for(key in entry[row]){
      //here we target the specific input field of form based on keys of obj, as we have set both of them to be same. And then we fill those input values from the obj values
      cur_row.querySelector(`[name="${key}"]`).value = entry[row][key];
    }
  }
}

// Validates All input together and on success returns an object consisting of all the values we got in the form
function validate_all(){
  let obj = {};//holds data of form row wise
  let keyup = ["f-name", "l-name", "backlog", "percentage"]; //the input fields working on keyup
  let rows = document.getElementsByClassName("row"); //targeting each row of form {personalDetail, eduRow1, eduRow2, ...}
  for(let row = 0 ; row < rows.length ; row++){
      let tmp = {}; //holds data of form input wise
      let input = rows[row].getElementsByTagName("input");
      for(let inp = 0 ; inp < input.length ; inp++){
          let key = input[inp].name;
          tmp[key] = input[inp].value; // mapping input.name as key and input.value as value in tmp
          //manually firing event to validate values in form
          if(keyup.indexOf(input[inp].name) >= 0){
            input[inp].dispatchEvent(new Event('keyup'))
          }
          else{
            input[inp].dispatchEvent(new Event('change'))
          }
      }
      obj[row] = tmp;
  }
  return obj;
}


// Validations

//validate F-name, L-name
function validate_name(e){
  let name = e.value.trim();
  let war = e.previousElementSibling.firstElementChild; //it is the element which shows erroe message
  let pattern = /^[A-Za-z]+$/;
  if(pattern.test(name)){
    war.classList.add("invisible");
    e.classList.remove("fail");
  }
  else{
    war.classList.remove("invisible");
    e.classList.add("fail");
    should_submit = false;
  }
}

//Validate DOB
function validate_dob(e){
  let today = new Date();
  let dob = new Date(e.value);
  let age = today.getFullYear() - dob.getFullYear();
  const hasBirthdayOccurred = (today.getMonth() > dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate()));

  if (!hasBirthdayOccurred) {
    age--;
  }
  let war = e.previousElementSibling.firstElementChild;

  if(age >= 18){
    war.classList.add("invisible");
    e.classList.remove("fail");
  }
  else{
    war.classList.remove("invisible");
    e.classList.add("fail");
    should_submit = false;
  }
}

//validate Email
function validate_email(e){
  let war = e.previousElementSibling.firstElementChild;
  let inp = e.value.trim();
  let email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(email_pattern.test(inp)){
    war.classList.add("invisible");
    e.classList.remove("fail");
  }
  else{
    war.classList.remove("invisible");
    e.classList.add("fail");
    should_submit = false;
  }
}

//Validate start-date and pass-year
function validate_pass_date(e, toReturn){
  let pass;
  let start;
  if(e.name == "pass-year"){
    start = e.parentNode.previousElementSibling.lastElementChild.value;
    pass = e.value;
  }
  else{
    start = e.value;
    pass = e.parentNode.nextElementSibling.lastElementChild.value;
  }

  if(start == "" || pass == "")
    return;
  start = new Date(start);
  pass = new Date(pass);
  let war = e.previousElementSibling.firstElementChild;
  if(start >= pass){
    war.classList.remove("invisible");
    e.classList.add("fail");
    should_submit = false;
  }
  else{
    war.classList.add("invisible");
    e.classList.remove("fail");
  } 
  if(toReturn)
    return;
  if(e.name == "pass-year")
    validate_pass_date(e.parentNode.previousElementSibling.lastElementChild, true); //calling this same function again to validate for start date
  else
    validate_pass_date(e.parentNode.nextElementSibling.lastElementChild, true);  //calling this same function again to validate for pass year
}

//Validate percentage
function validate_percentage(e){ 
  let war = e.previousElementSibling.firstElementChild;
  if(e.checkValidity()){
    war.classList.add("invisible")
    e.classList.remove("fail")
  }
  else{
    war.classList.remove("invisible");
    should_submit = false;
    e.classList.add("fail")
  }
}

//Validate backlog
function validate_backlog(e){
  let war = e.previousElementSibling.firstElementChild;
  if(e.checkValidity()){
    war.classList.add("invisible");
     e.classList.remove("fail");
  }
  else{
    war.classList.remove("invisible");
    e.classList.add("fail")
    should_submit = false;
  }
}
