let ed_count = 3;
let should_submit = true;
let stud_id = 1;
let to_edit = -1;
const toastBootstrap = bootstrap.Toast.getOrCreateInstance($('#live-toast'));
var mediaQuery = window.matchMedia("(max-width: 750px)");

let data_table = $('#student-table').DataTable({
  responsive: true,
  columnDefs:[
    {
      orderable:false,
      targets:[3,4,6,7]
    },
    {
      render:(data,type,row)=> data + ' ' + row[1],
      targets:[0]
    },
    {
      visible:false,
      targets:[1]
    },
    {
      width:'10%',
      targets:[7]
    },
    { targets: '_all', className: 'dt-head-left dt-body-left' }
  ],
  lengthMenu: [10,25,50,-1]
})

const extra_ed_proto = () => {
  return `
      <div class="row mx-0 px-0 flex-nowrap" id="ed-${ed_count}">
        <div class="col-11 target-row row mx-0 px-0 flex-wrap">
          <div class="col-xl col-lg-4 col-md-6 col-12">
            <div class="form-floating mb-4">
              <input type="text" class="form-control" onchange="validate_empty(this)" id="degree-board-${ed_count}" placeholder="xyz" name="degree-board">
              <label for="fname">Degree/ Board</label>
              <div class="valid-feedback">Sahi hey boss</div>
              <div class="invalid-feedback">kuch gadbad he boss</div>
            </div>
          </div>
          <div class="col-xl col-lg-4 col-md-6 col-12">
            <div class="form-floating mb-4">
              <input type="text" class="form-control" onchange="validate_empty(this)" id="school-collage-${ed_count}" placeholder="xyz" name="school-collage">
              <label for="fname">School/ College</label>
              <div class="valid-feedback">Sahi hey boss</div>
              <div class="invalid-feedback">kuch gadbad he boss</div>
            </div>
          </div>
          <div class="col-xl col-lg-4 col-md-6 col-12">
            <div class="form-floating mb-4">
              <input type="month" class="form-control" onchange="validate_pass_year(this)" id="start-date-${ed_count}" placeholder="xyz" name="start-date">
              <label for="fname">Start Date</label>
              <div class="valid-feedback">Sahi hey boss</div>
                    <div class="invalid-feedback">kuch gadbad he boss</div>
            </div>
          </div>
          <div class="col-xl col-lg-4 col-md-6 col-12">
            <div class="form-floating mb-4">
              <input type="month" class="form-control" onchange="validate_pass_year(this)" id="Passout-Year-${ed_count}" placeholder="xyz" name="Passout-Year">
              <label for="fname">Passout Year</label>
              <div class="valid-feedback">Sahi hey boss</div>
              <div class="invalid-feedback">kuch gadbad he boss</div>
            </div>
          </div>
          <div class="col-xl col-lg-4 col-md-6 col-12">
            <div class="form-floating mb-4">
              <input type="number" class="form-control" onkeyup="validate_backlog_perct(this)" id="Percentage-${ed_count}" placeholder="xyz" name="Percentage" min="0" max="100">
              <label for="fname">Percentage</label>
              <div class="valid-feedback">Sahi hey boss</div>
                    <div class="invalid-feedback">kuch gadbad he boss</div>
            </div>
          </div>
          <div class="col-xl col-lg-4 col-md-6 col-12">
            <div class="form-floating mb-4">
              <input type="number" class="form-control" onkeyup="validate_backlog_perct(this)" id="Backlog-${ed_count}" placeholder="xyz" name="Backlog" min="0">
              <label for="fname">Backlog</label>
              <div class="valid-feedback">Sahi hey boss</div>
                    <div class="invalid-feedback">kuch gadbad he boss</div>
            </div>
          </div>
        </div>
        <div class="col">
          <button class="rounded-circle fs-bold" onclick="remove_row(this)">
            -
          </button>
        </div>                
      </div>`;
}

let All_records = {};

$('#add-ed-btn').on('click', function add_ed_rows(){
  $('#extra-ed-rec').append(extra_ed_proto);
  ed_count++;
})

const remove_row = (e)=>{
  $(e).closest('.row').remove()
}

$('#form').submit(function(e){
  e.preventDefault();
  should_submit = true;
  let new_rec = validate_all();
  if(!should_submit){
    console.log('failure')
    return;
  }
  if(to_edit != -1){
    All_records[to_edit] = new_rec;
    add_to_table(new_rec);
    reset_form();
    return;
  } 
  add_to_table(new_rec, `sid-${stud_id}`);
  All_records[`sid-${stud_id}`] = new_rec;
  stud_id++;
  console.log(All_records);
  reset_form();
})

const add_to_table = (cur_record, row_id)=>{
  let data_array = [];
  let student_detail = cur_record[0];
  $.each(student_detail, function(ind, ele){
    data_array.push(student_detail[ind]);
  })
  data_array.push('<div class="action-div d-flex flex-nowrap" id="action-div"><button class="btn btn-warning edit-btn me-2">edit</button><button class="btn btn-danger dlt-btn">delete</button></div>'); 
  data_array.push('<button class="btn btn-success" data-bs-target="#edu-modal" data-bs-toggle="modal" onclick="toggle_child_rows(this)">&gt</button>'); 
  if(to_edit != -1){
    data_table.row($(`#${to_edit}`)).data(data_array).draw();
    return;
  }
  let cur_row = data_table.row.add(data_array).draw().node();
  $(cur_row).attr('id', row_id);
}

$('tbody').click(function(event){
  let cur_row
  let e = event.target;
  if (mediaQuery.matches) {
    cur_row = $(e).closest('tr.child').prev();
  }
  else{
    cur_row = $(e).closest('tr');
  }
  let cur_table_row = data_table.row(cur_row);
  let row_id = $(cur_row).attr('id');
  if($(e).hasClass("edit-btn")){
    to_edit = row_id;
    let stud_record = All_records[row_id];
    add_additional_rows(Object.keys(stud_record).length);
    $('#form .target-row').each(function(ind, ele){
      $(ele).find('input').each(function(i,e){
        $(e).val(stud_record[ind][$(e).attr('name')]);
      })
    })
    $('#add-student').trigger('click');
  }
  else if($(e).hasClass("dlt-btn")){
    toastBootstrap.show();
    $('.btn-danger').click(function(){
      cur_table_row.remove().draw();
      delete All_records[row_id];
      toastBootstrap.hide();
      $('.btn-success').off('click')
      $('.btn-danger').off('click')
      console.log(All_records)
    })
    $('.btn-success').click(function(){
      toastBootstrap.hide();
      $('.btn-success').off('click')
      $('.btn-danger').off('click')
    })
  }
})

const add_additional_rows = (rows) => {
  while(rows > 3){
    $('#add-ed-btn').trigger('click');
    rows--;
  }
}

const toggle_child_rows = (e) => {
  let parent;
  if(mediaQuery.matches){
    parent = $(e).closest('tr').prev();
  }
  else{
    parent = $(e).closest('tr');
  }
  let table_row = data_table.row(parent)
  get_Child_data($(parent).attr('id'));

}

const get_Child_data = (row_id) => {
  let string = "";
  let cur_stud_rec = All_records[row_id];
  $.each(cur_stud_rec, function (ind, ele) { 
    if(ind == 0)  
      return;
    string += '<tr>'
    let cur_ed_row = ele;
    $.each(cur_ed_row, function (i,e) { 
      string += `<td>${cur_ed_row[i]}</td>`
    })
    string += '</tr>'
  })
  $('#edu_table_body').html(string);
}

const reset_form = () => {
  to_edit = -1;
  $('#extra-ed-rec').text('');
  $.each($('#form input'), function(ind, ele){
    $(ele).removeClass('is-invalid');
    $(ele).removeClass('is-valid');
  })
  $('#form')[0].reset();
  // document.querySelector('#form').reset();
}

const validate_all = ()=>{
  let key_ups = ['fname', 'lname','Backlog', 'Percentage'];
  let all_rows = $('#form .target-row');
  let cur_stud = {};
  $.each(all_rows, function (ind, ele){
    let cur_row = {};
    let all_inps = $(ele).find('input');
    $.each(all_inps, function(i,e){
      let element_name = $(e).attr('name');
      cur_row[element_name] = $(e).val();
      if(key_ups.indexOf(element_name) != -1){
        $(e).trigger('keyup')
      }
      else{
        $(e).trigger('change')
      }
    })
    cur_stud[ind] = cur_row;
  })
  return cur_stud;
}


const validate_name = (e)=>{
  let pattern = /^[A-Za-z]+$/;
  let user_inp = $(e).val().trim()
  if(pattern.test(user_inp)){
    $(e).removeClass('is-invalid')
    $(e).addClass('is-valid')
  }
  else{
    should_submit=false;
    $(e).removeClass('is-valid')
    $(e).addClass('is-invalid')
  }
}

const validate_dob = (e)=>{
  let user_inp = new Date($(e).val())
  let today = new Date();
  let age = today.getFullYear() - user_inp.getFullYear();
  
  let hasbdoccr = (today.getMonth() > user_inp.getMonth() || (today.getMonth() == user_inp.getMonth() && today.getDate() > user_inp.getDate()))
  
    if(!hasbdoccr)
      age--;
  
    if(age > 18){
      $(e).addClass('is-valid')
      $(e).removeClass('is-invalid');
    }
    else{
      should_submit=false;
      $(e).addClass('is-invalid')
      $(e).removeClass('is-valid');
    }
}


const validate_email = (e) => {
  let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let user_inp = $(e).val().trim();
  if(pattern.test(user_inp)){
    $(e).addClass('is-valid')
    $(e).removeClass('is-invalid');
  }
  else{
    should_submit=false;
    $(e).addClass('is-invalid')
    $(e).removeClass('is-valid');
  }
}
      
const validate_empty = (e) => {
  let user_imp = $(e).val().trim();
  if(user_imp == ""){
    $(e).addClass('is-invalid')
    $(e).removeClass('is-valid');
    should_submit=false;
  }
  else{
    $(e).addClass('is-valid')
    $(e).removeClass('is-invalid');
  }
}
      

const validate_backlog_perct = (e) => {
  let user_inp = $(e)
  if(e.checkValidity() && $(e).val() != ""){
    $(user_inp).addClass('is-valid')
    $(user_inp).removeClass('is-invalid');
  }
  else{
    $(user_inp).addClass('is-invalid')
    should_submit=false;
    $(user_inp).removeClass('is-valid');
  }
}

const validate_pass_year = (e, toReturn) => {
  let start,pass;
  if($(e).attr('name') == 'Passout-Year'){
    start = $(e).parent().parent().prev().find('input').val()
    pass = $(e).val();
  }
  else{
    pass = $(e).parent().parent().next().find('input').val()
    start = $(e).val();
  }
  start = new Date(start);
  pass = new Date(pass);
  if(start < pass){
    $(e).addClass('is-valid')
    $(e).removeClass('is-invalid');
  }
  else{
    $(e).addClass('is-invalid')
    should_submit=false;
    $(e).removeClass('is-valid');
  }

  if(toReturn)
    return;
  if($(e).attr('name') == "Passout-Year")
    validate_pass_year($(e).parent().parent().prev().find('input'), true); //calling this same function again to validate for start date
  else
    validate_pass_year($(e).parent().parent().next().find('input'), true);  //calling this same function again to validate for pass year
}