let form = document.forms["myForm"];
let counter = 3;
let All_entries = {};
let should_submit = true;
let s_num = 1;
let edit_row = -1;
let child_table_proto = '<thead><tr class="table-child-head-col"><td>Degree/ Board</td><td>School/ College</td><td>Start Date</td><td>Passout Year</td><td>Percentage</td><td>Backlog</td></tr></thead>';

var table = $('#myDataTable').DataTable({
  columnDefs: [
    {
      orderable: false,
      targets: [0,7]
    }
  ],
  order: [1, 'asc'],
});

// Adds new education rows in the form when user clicks plus icon
$('#add_btn').click(function () { 
  $('#extra_ed').append($('<div>').attr('id', `ed-${counter}`).html(ids()));
  counter++;
});


// returns extra education rows with dedicated IDs
let ids = function(){
    return `
    <hr class="my-3">
    <div class="d-flex justify-content-between">
      <div class="row w-100">
        <div class="col">
          <label for="deg-brd${counter}" class="form-label">Degree/ Board</label>
          <input type="text" class="form-control" onchange="validate_not_empty(this)" id="deg-brd${counter}" name="deg-brd" required>
          <div class="valid-feedback">Looks Good!</div>
          <div class="invalid-feedback">Can't leave empty</div>
        </div>
        <div class="col-xxl col-xl-4 col-lg-6">
          <label for="scl-clg${counter}" class="form-label">School/ College</label>
          <input type="text" class="form-control" onchange="validate_not_empty(this)" id="scl-clg${counter}" name="scl-clg" required>
          <div class="valid-feedback">Looks Good!</div>
          <div class="invalid-feedback">Can't leave empty</div>
        </div>
        <div class="col-xxl col-xl-4 col-lg-6">
          <label for="start-date${counter}" class="form-label">Start Date <span class="text-danger valid_text ms-2 invisible position-absolute">* Start &lt Passout</span></label>
          <input type="month" class="form-control" onchange="validate_pass_date(this)" id="start-date${counter}" name="start-date" required>
          <div class="valid-feedback">Looks Good!</div>
          <div class="invalid-feedback">Should be smaller than Pass year</div>
        </div>
        <div class="col-xxl col-xl-4 col-lg-6">
          <label for="pass-year${counter}" class="form-label">Passout Year <span class="text-danger valid_text ms-2 invisible position-absolute">* Start &lt Passout</span></label>
          <input type="month" class="form-control" onchange="validate_pass_date(this)" id="pass-year${counter}" name="pass-year" required>
          <div class="valid-feedback">Looks Good!</div>
          <div class="invalid-feedback">Should be greater than start year</div>
        </div>
        <div class="col-xxl col-xl-4 col-lg-6">
          <label for="percentage${counter}" class="form-label">Percentage <span class="text-danger valid_text ms-2 invisible position-absolute">* Invalid value</span></label>
          <input type="number" class="form-control" step="0.01" id="percentage${counter}" onkeyup="validate_percentage(this)" placeholder="Don't use % sign" name="percentage" required min="0" max="100">
          <div class="valid-feedback">Looks Good!</div>
          <div class="invalid-feedback">Value must be between 0 to 100</div>
        </div>
        <div class="col-xxl col-xl-4 col-lg-6">
          <label for="backlog${counter}" class="form-label">Backlog <span class="text-danger valid_text ms-2 invisible position-absolute">* Invalid Value</span></label>
          <input type="number" class="form-control" id="backlog${counter}" onkeyup="validate_backlog(this)" placeholder="if any" name="backlog" min="0" required>
          <div class="valid-feedback">Looks Good!</div>
          <div class="invalid-feedback">Can't leave empty</div>
        </div>
      </div>
      <div class="text-center d-flex align-items-center px-lg-5 ps-3">
        <i role="button" onclick="delete_row(this)" class="fa-solid fa-circle-minus fa-xl"></i>
      </div>
    </div>`
}

// Deletes education rows
const delete_row = function(obj){
  $(obj).parents('div [id^="ed-"]').remove();
}


// Display User Filled Data in HTML table
let displayEntries = function(obj, sId){
  let arr =[];
  arr.push('<div class="text-center w-100"><i type="button" class="fa-solid fa-circle-chevron-right"></i></div>')
  for(let inp in obj){
    arr.push(obj[inp]);
  }
  arr.push(Action_section())
  if(edit_row != -1){
    table.row('#'+edit_row).data(arr).draw();
    return;
  }
  let new_row = table.row.add(arr).draw().node();
  $(new_row).attr('id', sId);
}

// Generate action buttons
function Action_section(){
  let action = '<div class="d-flex gap-2">';
  let edit = '<button class="bg-white"><i class="fa-solid fa-pencil" style="color: #ffa500" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i></button>';
  let del = '<button class="bg-white"><i class="fa-solid fa-trash-can" style="color: #ffa500"></i></button>';
  return action + edit + del + '</div>';
  // let td = $('<td>');
  // let action = $('<div>').addClass("d-flex gap-2");
  // let edit = $('<button>').addClass("bg-white");
  // let del = $('<button>').addClass("bg-white");
  // let editI = $('<i>').addClass("fa-solid fa-pencil").css('color', "#ffa500").attr({"data-bs-toggle":"modal", "data-bs-target": "#staticBackdrop"});
  // let delI = $('<i>').addClass("fa-solid fa-trash-can").css('color', "#ffa500");
  // return td.append(action.append(edit.append(editI), del.append(delI)));
}

// Extract form values on submission
$('#myForm').submit(function (e) {
    e.preventDefault();
    should_submit = true;
    // validate_all returns json object of single student details
    let entry = validate_all();
    $(e.target).addClass('was-validated');
    //after validating all input fields, if any of the field hold invalid input then we will not allow the form to be submitted
    if(!should_submit){
      $("#invalid_toast").css('display',"block");
      setTimeout(() => {
        $("#invalid_toast").css('display',"none");
      }, 4000);
      $(e.target).removeClass('was-validated');
      return;
    }
    $(e.target).removeClass('was-validated');
    $('#success_toast').css('display', 'block');
    if(edit_row != -1)
      $('#success_toast').find('.toast-body').text('Updated Successfully');
    else
      $('#success_toast').find('.toast-body').text('Form Submitted');
    setTimeout(() => {
      $('#success_toast').css('display', 'none');
    }, 4000);
    //edit_row represents the ID of row it holds when edit button is clicked, hence when it holds some value other than -1 then we will which row in admin table is to be altered
    let Idty = edit_row == -1 ? `SId-${s_num++}` : edit_row;
    All_entries[Idty] = entry;
    // displayEntries diplays student data in admin table
    displayEntries(entry[0], Idty);
    //edit_row is reseted so that when new row is created then it won't hold any ID 
    edit_row = -1;
    //recs content is erased so that extra education rows can be removed and form can attain its original structure.
    $('#extra_ed').html("");
    e.target.reset();
    console.log(All_entries);
    remove_classes();
});

//resets form inputs
let reset_form = function(){
  remove_classes();
};

let close_btn = ()=>{
  edit_row = -1;
  remove_classes();
}

function remove_classes(){
  form.reset();
  $('#extra_ed').html("");
  $('#myForm input').each(function (index, element) {
    $(element).removeClass("is-valid")
    $(element).removeClass("is-invalid")
  });
  $('#myForm').removeClass('was-validated')
}

//action buttons event listener (edit and delete)
$('#table-entries').click(function(e){
  let tar = $(e.target);
  let parent = $(tar).parents('tr');
  let dt_row = table.row('#'+parent.attr('id'));
  let cur_rec = All_entries[parent.attr('id')];

  //if edit button is clicked
  if(tar.hasClass("fa-pencil")){
    if(dt_row.child.isShown()){
      dt_row.child.hide('slow');
      parent.removeClass('shown');
      parent.find('.fa-circle-chevron-right').css({'rotate': '0deg','color':'orange'})
    }
    form.reset();
    //fetching the values of specific row from all_records obj
    let entry = cur_rec;
    //we assigned ID of the row which need an edit to the global variable edit_row, so that it can be accessed by other funcations 
    edit_row = parent.attr('id');
    fill_form(entry);
  }

  //if delete button is clicked
  if(tar.hasClass("fa-trash-can")){
    if(dt_row.child.isShown()){
      dt_row.child.hide('slow');
      parent.removeClass('shown');
      parent.find('.fa-circle-chevron-right').css({'rotate': '0deg','color':'orange'})
    }
    function un_del(){
      $('#timer-bar').css('width', '100%');
      table.row.add($(deleted_row)).draw();
      cur_rec = deleted_data;
      All_entries[parent.attr('id')] = cur_rec; 
      console.log(All_entries);
      clearTimeout(del);
      changes();
    }
    let changes = ()=>{
      $("#delete_toast").css('display',"none");
      $('#undo_delete').off('click', un_del);
    }
    let deleted_data = cur_rec;
    delete cur_rec;
    let deleted_row = dt_row.node();
    dt_row.remove().draw();
    $("#delete_toast").css('display',"block");
    $('#timer-bar').css('width', '100%');
    $('#timer-bar').animate({width:'0%'}, 4000);
    let del = setTimeout(changes, 4000);
    $('#undo_delete').click(un_del);
    delete All_entries[parent.attr('id')];
    console.log(All_entries);
  }

  // if show-education-details button is clicked
  if(tar.hasClass('fa-circle-chevron-right')){
    let data = cur_rec;
    //if child row is already visible
    if(dt_row.child.isShown()){
      dt_row.child.hide('slow');
      parent.removeClass('shown');
      tar.css({'rotate': '0deg','color':'orange'})
    }
    //if child row is hidden
    else{
      tar.css({'color':'red','rotate': '90deg'})
      let child_row = create_child_row(data); // create_child_row returns a dynamically created table with all education details of current student
      dt_row.child(child_row).show('slow'); // nest the education table using child() method
      parent.addClass('shown');
    }
  }
});


//Dynamically create nested child row of current Student
function create_child_row(obj){
  let tab = $('<table>');
  tab.attr('id', 'myDataTable');
  tab.addClass("nested-table text-black w-100 table table-borderless text-nowrap border border-secondary border-bottom-2");
  // child_table_proto contains a pre-built header of nested child row 
  tab.append(child_table_proto);
  let tbody = $('<tbody>');
  tbody.addClass('table-body-col');
  tab.append(tbody);
  $('body').append(tab);
  //obj is the data record of currently selected student {personal-details, education details}
  for(let row in obj){
    if(row == 0)
      continue;
    let cur_row = $('<tr>')
    for(let key in obj[row]){
      cur_row.append($('<td>').text(obj[row][key]));
    }
    tbody.append(cur_row);
  }
  return tab;
}

//refills form when edit button is clicked
const fill_form = (entry)=>{
  //here we determine how many rows are present in the json object of this student
  let row_len = Object.keys(entry).length;
  let cur = 3; //our original form contains 3 rows initially hence 3
  //we will add new rows to the form untill cur becomes equal to the number of rows we have in json object
  while(cur++ < row_len){
    $('#add_btn').trigger('click');
  }
  //In form, we target each row {personalDetail, eduRow1, eduRow2, ...}
  let all_rows = $('#myForm .row');
  // entry is the object in which we have single student data which is stored in rows like {row0, row1, ...}
  for(row in entry){
    //Similarily we will target each row in all_rows array
    let cur_row = all_rows[row];
    //we will loop on each key-value of each row of json obj
    for(key in entry[row]){
      //here we target the specific input field of form based on keys of obj, as we have set both of them to be same. And then we fill those input values from the obj values
      $(cur_row).find(`[name="${key}"]`).val(entry[row][key]);
    }
  }
}

// Validates All input together and on success returns an object consisting of all the values we got in the form
function validate_all(){
  let obj = {};//holds data of form row wise
  let keyup = ["f-name", "l-name", "backlog", "percentage"]; //the input fields working on keyup
  let rows = $(".row"); //targeting each row of form {personalDetail, eduRow1, eduRow2, ...}
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

function validate_not_empty(e){
  let tar = $(e)
  let val = tar.val()
  if(val == ""){
    tar.removeClass("is-valid");
    tar.addClass("is-invalid");
  }
  else{
    tar.removeClass("is-invalid");
    tar.addClass("is-valid");
  }
}


//validate F-name, L-name
function validate_name(e){
  let tar = $(e);
  let name = tar.val().trim();
  if(tar.attr('name') == 'l-name' && name==""){
    return;
  }
  let pattern = /^[A-Za-z]+$/;
  if(pattern.test(name)){
    tar.removeClass("is-invalid");
    tar.addClass("is-valid");
  }
  else{
    tar.removeClass("is-valid");
    tar.addClass("is-invalid");
    should_submit = false;
  }
}

//Validate DOB
function validate_dob(e){
  let tar = $(e);
  let today = new Date();
  let dob = new Date(tar.val());
  let age = today.getFullYear() - dob.getFullYear();
  const hasBirthdayOccurred = (today.getMonth() > dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate()));

  if (!hasBirthdayOccurred) {
    age--;
  }

  if(age >= 18){
    tar.addClass("is-valid");
    tar.removeClass("is-invalid");
  }
  else{
    tar.removeClass("is-valid");
    tar.addClass("is-invalid");
    should_submit = false;
  }
}

//validate Email
function validate_email(e){
  let tar = $(e);
  let inp = tar.val().trim();
  let email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(email_pattern.test(inp)){
    tar.addClass("is-valid");
    tar.removeClass("is-invalid");
  }
  else{
    tar.removeClass("is-valid");
    tar.addClass("is-invalid");
    should_submit = false;
  }
}

//Validate start-date and pass-year
function validate_pass_date(e, toReturn){
  let tar = $(e);
  let pass;
  let start;
  if(tar.attr('name') == "pass-year"){
    start = tar.parent().prev().find('input').val();
    pass = tar.val()
  }
  else{
    start = tar.val()
    pass = tar.parent().next().find('input').val();
  }

  if(start == "" || pass == ""){
    tar.removeClass("is-valid");
    tar.addClass("is-invalid");
    return;
  }
  start = new Date(start);
  pass = new Date(pass);
  if(start >= pass){
    tar.removeClass("is-valid");
    tar.addClass("is-invalid");
    should_submit = false;
  }
  else{
    tar.addClass("is-valid");
    tar.removeClass("is-invalid");
  } 
  if(toReturn)
    return;
  if(tar.attr('name') == "pass-year")
    validate_pass_date(tar.parent().prev().find('input'), true); //calling this same function again to validate for start date
  else
    validate_pass_date(tar.parent().next().find('input'), true);  //calling this same function again to validate for pass year
}

//Validate percentage
function validate_percentage(e){ 
  let tar = $(e);
  if(e.checkValidity()){
    tar.addClass("is-valid");
    tar.removeClass("is-invalid");
  }
  else{
    should_submit = false;
    tar.removeClass("is-valid");
    tar.addClass("is-invalid");
  }
}

//Validate backlog
function validate_backlog(e){
  let tar = $(e);
  if(e.checkValidity()){
    tar.addClass("is-valid");
    tar.removeClass("is-invalid");
  }
  else{
    tar.removeClass("is-valid");
    tar.addClass("is-invalid");
    should_submit = false;
  }
}
