let ALL_RECORDS = {}
let iid_counter = 2;
let form = $('#cat-form');
let C_id = 1;
let toast = bootstrap.Toast.getOrCreateInstance('#confirm-toast');
let toast_submit = bootstrap.Toast.getOrCreateInstance('#submit_toast');
let child_table_head_proto = "<thead><tr><th>Number</th> <th>item Name</th> <th>Food Type</th> <th>Price</th> <th>Discount</th> <th>Discounted Price</th></tr></thead>";
let to_edit = -1;
let can_submit = false;


let dataTable = $('#data-table').DataTable({
    columnDefs:[
        {
            orderable:false,
            targets:[5]
        },
        {
            targets : [0],
            className : 'dt-head-left dt-body-center'
        },
        {
            targets : [1,2],
            className : 'dt-head-left dt-body-left'
        },
        {
            className: 'dt-control',
            orderable: false,
            data: null,
            defaultContent: '',
            targets : [0],
            width : '5%'
        },
    ],
    order: [1, 'asc'],
    scrollX:true
})


$('#add-item').click(function (event) {
    if ($('#extra-items .row').eq(8).length == 1)
        return
    $('#extra-items').append(get_item_row);
    iid_counter++;
})

const get_item_row = () => {
    return (
    ` <hr> 
    <div class="d-flex align-items-center gap-4 mb-2">
    <div class="row align-items-end" id="IID-${iid_counter}">
        <div class="col-lg-3 mb-lg-0 mb-2">
            <label for="Item-name-${iid_counter}" class="form-label">Item Name</label>
            <input type="text" class="form-control user-data" onkeyup="validate_alpha_only(this, false)" id="Item-name-${iid_counter}" name="Item name" required>
            <div class="invalid-feedback">
                Alphabets Only
            </div>
        </div>
        <div class="col-lg-3 mb-lg-0 mb-2">
            <label for="Item-Description-${iid_counter}" class="form-label">Item Description</label>
            <input type="text" onkeyup="validate_alphaNum_spChar(this)" class="form-control user-data" id="Item-Description-${iid_counter}" name="Item Description">
            <div class="invalid-feedback">
                Alpha-Num only
            </div>
        </div>
        <div class="col-lg-3 mb-lg-0 mb-2">
            <label for="food-type-${iid_counter}" class="form-label">Food Type</label>
            <select class="form-select user-data" name="food-type" id="food-type-${iid_counter}">
                <option selected>Select one</option>
                <option value="Veg" selected>Veg</option>
                <option value="Dairy Food">Dairy Food</option>
                <option value="Carbonated Food">Carbonated Food</option>
                <option value="Sea Food">Sea Food</option>
                <option value="Vegan">Vegan</option>
                <option value="Nonveg">Nonveg</option>
            </select>
        </div>
        <div class="col-lg-3 mb-lg-0 mb-2">
            <label for="Item-Price-${iid_counter}" class="form-label">Price</label>
            <input type="number" class="form-control user-data" onkeyup="validate_figures(this)" id="item-Price-${iid_counter}" name="Price" required min="1">
            <div class="invalid-feedback">
                input &gt; 0
            </div>
        </div>
        <div class="col-lg-3 mb-lg-0 mb-2">
            <label for="Item-discount-${iid_counter}" class="form-label">Discount</label>
            <input type="number" class="form-control user-data" id="Item-discount-${iid_counter}" onkeyup="validate_figures(this)" name="Discount" min="1" max="15" required>
            <div class="invalid-feedback">
                0 &lt; input &lt;= 15
            </div>
        </div>
        <div class="col-lg-3 mb-lg-0 mb-2">
            <label for="Item-gst-${iid_counter}" class="form-label">GST</label>
            <input type="number" class="form-control user-data" id="Item-gst-${iid_counter}" onkeyup="validate_figures(this)" name="GST" min="0" required>
            <div class="invalid-feedback">
                input &gt;= 0
            </div>
        </div>
        <div class="col-lg-3 mb-lg-0 mb-2">
            <div class="form-check form-check-inline ">
                <input class="form-check-input user-data" type="checkbox" id="itemisActive-${iid_counter}" value="yes" checked name="Active"/>
                <label class="form-check-label" for="itemisActive-${iid_counter}">Active</label>
            </div>
        </div>
    </div>
    <div>
        <button class="btn btn-danger invisible">-</button>
    </div>
</div>`)
}

const remove_item_row = (event) => {
    $(event).closest('div.d-flex').remove()
}

$(form).submit(function (event) {
    event.preventDefault();
    can_submit = true;
    let cur_cat = get_form_date();
    if(!can_submit){
        return;
    }
    if(to_edit != -1){
        ALL_RECORDS[to_edit] = cur_cat;
    }
    else{
        ALL_RECORDS[`C-id-${C_id}`] = cur_cat;
    }    
    add_to_datatable(cur_cat);
    console.log(ALL_RECORDS)
    reset_form()
    toast_submit.show();
    function sub_int(){
        toast_submit.hide() 
    }
    setInterval(sub_int, 5000)
})

const reset_form = () => {
    $('#extra-items').html('')
    iid_counter = 2;
    to_edit = -1;
    $(form)[0].reset()
    $.each($('.user-data'), function(ind, ele){
        $(ele).removeClass('is-invalid')
    })
}


const add_to_datatable = (cur_cat) => {
    let arr = [''];
    let cat_det = cur_cat['category'];
    $.each(cat_det, function (i, e) {
        if (i == 'Active') {
            if (cat_det[i] == true)
                arr.push('Yes')
            else
                arr.push('No')
            return;
        }
        if (i == 'Launch Date') {
            let today = new Date()
            let ld = new Date(cat_det[i])
            let days = (today - ld) / (1000 * 60 * 60 * 24);
            if (days > 7) {
                arr.push('Old')
            }
            else {
                arr.push('New')
            }
            return;
        }
        arr.push(cat_det[i])
    })
    arr.push('<div class="d-flex"><button  class="btn btn-warning me-2" > Edit</button ><button class="btn btn-danger">Delete</button></div > ')
    if(to_edit != -1){
        dataTable.row($(`#${to_edit}`)).data(arr).draw();
        return;
    }
    let cur_row = dataTable.row.add(arr).draw().node();
    $(cur_row).attr('id', `C-id-${C_id}`);
    C_id++;
}

const add_extra_row = (len) => {
    while(len > 2){
        $('#add-item').trigger('click')
        len--;
    }
}

const fill_data_in_form = (row_id) => {
    let cur_row = ALL_RECORDS[row_id];
    add_extra_row(Object.keys(cur_row).length);
    let all_row = $(form).find('.row');
    $.each(all_row, function (ind, ele) { 
        let all_inp = $(ele).find('.user-data')
        if(ind == 0){
            let cat_det = cur_row['category'];
            $.each(all_inp, function(i,e){
                if($(e).attr('type') == 'checkbox'){
                    let val = cat_det[$(e).attr('name')];
                    $(e).attr('checked', val == true ? true : false);
                     
                }
                if($(e).attr('type') == 'date'){
                    let val = new Date(cat_det[$(e).attr('name')]);
                    $(e).val(val.getDate());                    
                }
                $(e).val(cat_det[$(e).attr('name')]);
            })
        }
        else{
            let item_det = cur_row[`item-${ind}`];
            $.each(all_inp, function(i,e){
                if($(e).attr('type') == 'checkbox'){
                    let val = item_det[$(e).attr('name')];
                    $(e).attr('checked', val == true ? true : false);                     
                }
                $(e).val(item_det[$(e).attr('name')]);
            })
        }
     })
    
}

$('tbody').click(function (event) {
    let target = event.target;
    let cur_row = $(target).closest('tr');
    let cur_row_id = $(cur_row).attr('id');
    //edit
    if ($(target).hasClass('btn-warning')) {
        if(dataTable.row(cur_row).child.isShown()){
            dataTable.row(cur_row).child.hide()
        }
        fill_data_in_form(cur_row_id);
        $('#add_cat').trigger('click');
        to_edit = cur_row_id
    }
    //delete
    else if ($(target).hasClass('btn-danger')) {
        toast.show()
        $('#del-yes').click(function () {
            dataTable.row(cur_row).remove().draw();
            toast.hide()
            delete ALL_RECORDS[cur_row_id];
            $('#del-yes').off('click')
            $('#del-no').off('click')
        })
        $('#del-no').click(function () {
            toast.hide()
            $('#del-yes').off('click')
            $('#del-no').off('click')
        })
    }
})

const get_form_date = () => {
    let cur_cat = {};
    let all_field = $('#cat-form .row');
    
    let cat_detail = {};
    $.each(all_field, function (ind, ele) {
        let cat = $(all_field[ind]).find('.user-data');
        if (ind == 0) {
            $.each(cat, function (i, e) {
                if ($(e).attr('name') == 'Active') {
                    cat_detail[$(e).attr('name')] = e.checked
                    return;
                }
                $(e).trigger('keyup')
                $(e).trigger('change')
                cat_detail[$(e).attr('name')] = $(e).val()
            })
        }
    })
    cur_cat['category'] = cat_detail
    
    $.each(all_field, function (ind, ele) {
        let cat = $(all_field[ind]).find('.user-data');
        let item_details = {};
        if (ind == 0) {
            return;
        }
        else {
            $.each(cat, function (i, e) {
                if ($(e).attr('name') == 'Active') {
                    item_details[$(e).attr('name')] = e.checked
                    return;
                }
                $(e).trigger('keyup')
                $(e).trigger('change')
                item_details[$(e).attr('name')] = $(e).val()
            })
            cur_cat[`item-${ind}`] = item_details;
        }
    })
    return cur_cat
}

let price = 0;
let dis_price = 0
$('tbody').click(function(event){
    let target = event.target;
    if($(target).hasClass('dt-control')){
        let parent = $(target).closest('tr')
        let parent_id = $(parent).attr('id')
        let dt_row = dataTable.row(parent);
        if(dt_row.child.isShown()){
            dt_row.child.hide();
        }
        else{
            price = 0;
            dis_price = 0
            let record_data = ALL_RECORDS[parent_id];
            let child_table = $('<table>').addClass('table mx-auto table-secondary text-secondary-emphasis');
            child_table.append(child_table_head_proto);
            let child_table_body = $('<tbody>')
            let child_table_foot = $('<tfoot>')
            child_table.append(child_table_body);
            child_table.append(child_table_foot);

            let item_counter = 1;
            $.each(record_data, function(ind,ele){
                if(ind == 'category'){
                    return;
                }
                child_table_body.append(create_child_table(record_data[ind], item_counter));
                item_counter++;
            })
            append_footer(child_table_foot);
            dt_row.child(child_table).show();

        }
    }
})

const create_child_table = (item_data, number) => {
    let cur_tab_row = $('<tr>'); 
    cur_tab_row.append($('<td>').text(number))
    
    $.each(item_data, function(i,e){
        if(i == 'Item Description' || i == 'GST' || i == 'Active'){
            return;
        }
        cur_tab_row.append($('<td>').text(item_data[i]))
    })
    let item_dis = (item_data['Price'] * item_data['Discount'] /100);
    price += +item_data['Price'];
    dis_price += (item_data['Price'] - item_dis);
    cur_tab_row.append($('<td>').text(item_data['Price'] - item_dis))
    return cur_tab_row;
}

const append_footer = (child_table_foot) => {
    let foot_row = $('<tr>')
    foot_row.append($('<th>').attr('colspan', '3').addClass("text-left").text('Total'));
    foot_row.append($('<th>').attr('colspan', '2').addClass("text-left").text(price));
    foot_row.append($('<th>').text(dis_price));
    child_table_foot.append(foot_row)
}


const final_validation = () => {

}



//validations

const validate_alpha_only = (element, isTextarea) => {
    let pattern = isTextarea ? /^[a-zA-Z ]*$/ : /^[a-zA-Z ]+$/
    let user_inp = $(element).val();
    if(pattern.test(user_inp)){
        $(element).removeClass('is-invalid')
    }
    else{
        $(element).addClass('is-invalid')
        can_submit = false;
    }
}

const validate_alphaNum_spChar = (element) => {
    let pattern = /^[a-zA-Z 0-9!#$&*()+:;<>,.-]*$/;
    let user_inp = $(element).val();
    if(pattern.test(user_inp)){
        $(element).removeClass('is-invalid')
    }
    else{
        $(element).addClass('is-invalid')
        can_submit = false;
    }
}


const validate_future_dates = (element) => {
    let user_inp = new Date($(element).val());
    if(user_inp < new Date()){
        $(element).removeClass('is-invalid')
    }
    else{
        $(element).addClass('is-invalid')
        can_submit = false;
    }
}

const validate_figures = (element) => {
    if(element.checkValidity()){
        $(element).removeClass('is-invalid')
    }
    else{
        $(element).addClass('is-invalid')
        can_submit = false;
    }
}