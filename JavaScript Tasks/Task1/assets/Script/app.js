let add_entry_btn = document.getElementById("add_btn");
let records = document.getElementById("eds");
let form = document.forms["myForm"];
let counter = 2;
let All_entries = new Array();
let display = document.getElementById("display");


add_entry_btn.addEventListener("click", function(){
    var tempDiv = document.createElement(`div`);
    tempDiv.setAttribute("id", `ed-${counter}`);
    tempDiv.innerHTML = ids();
    records.appendChild(tempDiv);
    counter++;
})

let ids = function(){
    return `
    <hr class="my-3">
    <div class="d-flex justify-content-between">
      <div class="row w-100">
        <div class="col">
          <label for="deg-brd${counter}" class="form-label">Degree/ Board</label>
          <input type="text" class="form-control" id="deg-brd${counter}" name="deg-brd">
        </div>
        <div class="col-xxl col-xl-4 col-lg-6">
          <label for="scl-clg${counter}" class="form-label">School/ College</label>
          <input type="text" class="form-control" id="scl-clg${counter}" name="scl-clg">
        </div>
        <div class="col-xxl col-xl-4 col-lg-6">
          <label for="start-date${counter}" class="form-label">Date</label>
          <input type="month" class="form-control" id="start-date${counter}" name="start-date" value="2024-03">
        </div>
        <div class="col-xxl col-xl-4 col-lg-6">
          <label for="pass-year${counter}" class="form-label">Passout Year</label>
          <input type="month" class="form-control" id="pass-year${counter}" name="pass-year" value="2024-06"  >
        </div>
        <div class="col-xxl col-xl-4 col-lg-6">
          <label for="percentage${counter}" class="form-label">Percentage</label>
          <input type="number" class="form-control" id="percentage${counter}" placeholder="Don't use % sign" name="percentage">
        </div>
        <div class="col-xxl col-xl-4 col-lg-6">
          <label for="backlog${counter}" class="form-label">Backlog</label>
          <input type="number" class="form-control" id="backlog${counter}" placeholder="if any" name="backlog">
        </div>
      </div>
      <div class="text-center d-flex align-items-center px-lg-5 ps-3">
        <i role="button" class="fa-solid fa-circle-minus fa-xl"></i>
      </div>
    </div>`
}

records.addEventListener('click', function(event){
    if(event.target.classList.contains("fa-circle-minus")){
        let parent = event.target.parentNode.parentNode.parentNode;
        records.removeChild(parent);
    }
})

let displayEntries = function(obj){
  let table = document.createElement('table');
  let rno = 1;
  table.classList = "table text-nowrap table-with-gaps";
  let row = document.createElement('tr');
  for(let inp in obj[0]){
    let tmp = document.createElement('th');
    tmp.innerText = inp + ": " + obj[0][inp];
    row.appendChild(tmp);
  }
  table.appendChild(row);
  
  for(let r in obj){
    if(r == "0"){
      continue;
    }
    let row = document.createElement('tr');
    row.setAttribute("id", `row${rno++}`)
    if(r == "1")
      row.classList = "table-group-divider";
    for(let inp in obj[r]){
      let tmp = document.createElement('td');
      tmp.innerText = inp + ": " + obj[r][inp];
      row.appendChild(tmp);
    }
    table.appendChild(row)
  }
  display.innerHTML = "";
  display.appendChild(table);
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let obj = {};
    let rows = document.getElementsByClassName("row");
    for(let row = 0 ; row < rows.length ; row++){
        let tmp = {};
        let input = rows[row].getElementsByTagName("input");
        for(let inp = 0 ; inp < input.length ; inp++){
            let key = input[inp].previousElementSibling.textContent;
            tmp[key] = input[inp].value;
            if(tmp[key] == ""){
              document.getElementById("liveToast").style.display = "block";
              setTimeout(() => {
                document.getElementById("liveToast").style.display = "none";
              }, 4000);
              return;
            } 
        }
        obj[row] = tmp;
    }
    console.log(JSON.stringify(obj, null, 2))
    displayEntries(obj);
    e.target.reset();
});
