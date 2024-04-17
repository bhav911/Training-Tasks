let canva_btn = document.getElementById("canvas-btn");
let drop_btn = document.getElementById("drop-btn");
let drop_item = document.getElementById("drop-item");
let main = document.getElementById("mainKaMain");
let temp_sb = document.getElementById("sidebar");
let tsbul = document.getElementById("tsbul");
let active_li = document.getElementById("activeLi");

let btn_active = true;


canva_btn.addEventListener("click", function () {
    if (btn_active == true) {
        btn_active = false;
        temp_sb.classList.add("hidetsb");
        temp_sb.classList.remove("displaytsb");
        main.classList.remove("enlargeMain");
    }
    else {
        btn_active = true;
        temp_sb.classList.add("displaytsb");
        temp_sb.classList.remove("hidetsb");
        main.classList.add("enlargeMain");
    }
});


tsbul.addEventListener("click", function (event) {
    if (event.target.classList.contains("fa-xl")) {
        event.target.parentNode.parentNode.parentNode.classList.toggle("sbbtn");
        event.target.parentNode.parentNode.parentNode.classList.toggle("sbtbl");
        active_li.classList.toggle("sbtbl");
        active_li.classList.toggle("sbbtn");
        active_li = event.target.parentNode.parentNode.parentNode;
    }
    else if(event.target.classList.contains("persbp")){
        event.target.parentNode.parentNode.classList.toggle("sbbtn");
        event.target.parentNode.parentNode.classList.toggle("sbtbl");
        active_li.classList.toggle("sbtbl");
        active_li.classList.toggle("sbbtn");
        active_li = event.target.parentNode.parentNode;
    }
    else if(event.target.classList.contains("psbul")){
        event.target.parentNode.classList.toggle("sbbtn");
        event.target.parentNode.classList.toggle("sbtbl");
        active_li.classList.toggle("sbtbl");
        active_li.classList.toggle("sbbtn");
        active_li = event.target.parentNode;
    }
});

let to_edit = -1;
let edit_task_id = -1;
let ALL_HABITS = JSON.parse(localStorage.getItem('data'))|| {};
let total_habit_counter = JSON.parse(localStorage.getItem('h-counter')) || 1;

let currentDate;
const get_today_date = (date) => {
    currentDate = date == null ? new Date() : new Date(date);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
    const day = currentDate.getDate();            
    const fullDate = `${day}:${month}:${year}`;
    return fullDate
}

let user_date = get_today_date(null);

let draw_task_dt;

const show_task = () => {
    user_date = get_today_date(null);
    $('#main').html(todaytask)
    prepare_task();
    $('#man_date_form').submit(function (event) { 
        event.preventDefault();
        let form = event.target;
        user_date = get_today_date($(form).find('input').val());
        draw_task_dt();
    })
}

const show_goal = () => {
    $('#main').html(Add_Goal)
    prepare_goal();
}

const get_statistics = () => {
    $('#main').html(statistics_struct)
    prepare_habit_list();
}

const prepare_task = () => {   

    let edit_task_form = $('#edit_task_form');
    
    let task_dt = $('#newdt').DataTable({
        columnDefs:[
            {
                targets:'_all',
                className: 'dt-head-left dt-body-left'
            },
            {
                targets:[1,4],
                width: '30%'
            },
            {
                targets:[0],
                width: '5%'
            },
            {
                targets:[1],
                width: '7%'
            },
            {
                targets:[5],
                width: '5%',
                className: 'ps-2'
            },
            {
                orderable:false,
                target:[0,4,5]
            }
        ],
        order:[1,'asc'],
        paging:false,
        info:false,
        scrollX : true
    })

    const fill_todays_date = () => {
        let fullDate = user_date;
        let todays_date = new Date();
        $.each(ALL_HABITS, function(ind, ele){
            if(new Date(ALL_HABITS[ind]['habit_start_date']) > currentDate || new Date(ALL_HABITS[ind]['habit_end_date']) < currentDate || ALL_HABITS[ind]['data'][fullDate] ||ALL_HABITS[ind]['repeating days'].includes(currentDate.getDay().toString()) == false){
                return;
            }
            ALL_HABITS[ind]['data'][fullDate] = {
                'completed': 0,
                'Start Time' : "--:--:--",
                'End Time' : "--:--:--",
                'actual_duration': "",
                'Note' : ''
            }
        })
        localStorage.setItem('data', JSON.stringify(ALL_HABITS))
    }


    draw_task_dt = () => {
        task_dt.clear().draw()
        fill_todays_date();
        $.each(ALL_HABITS, function(ind, ele){
            const fullDate = user_date;
            let todays_date = new Date();
            if(new Date(ALL_HABITS[ind]['habit_start_date']) > currentDate || new Date(ALL_HABITS[ind]['habit_end_date']) < currentDate || ALL_HABITS[ind]['repeating days'].includes(currentDate.getDay().toString()) == false){
                return;
            }
            let is_completed = ALL_HABITS[ind]['data'][fullDate]['completed']
            let task_data = ALL_HABITS[ind]['data'][fullDate];
            let arr = [];
            arr.push(`<div class="form-check d-flex align-items-center justify-content-center rounded-3"><input class="task_comp_checkbox form-check-input" type="checkbox" value="" id="" /></div>`)
            arr.push(ALL_HABITS[ind]['habit_title']);
            arr.push(task_data['Start Time'])
            arr.push(task_data['End Time'])
            arr.push(task_data['Note'])
            arr.push('<div class="d-flex"><button data-bs-toggle="modal" data-bs-target="#task_edit_modal" class="btn btn-primary edit-task me-2">Edit</button></div>');
            
            let cur_task = task_dt.row.add(arr).draw().node();
            $(cur_task).attr('id', ind)
            if(is_completed){
                $(cur_task).addClass('bg-success-subtle');
                $(cur_task).find('.task_comp_checkbox').prop('checked',true);
            }
        })
    }

   

    draw_task_dt();


    const reset_task_form = () => {
        $(edit_task_form)[0].reset()
    }

    $('#task_form_close').click(reset_task_form);


    $(edit_task_form).submit(function (event) {
        event.preventDefault()
        
        let start_time = $(edit_task_form).find('#StartTime').val()
        let end_time = $(edit_task_form).find('#EndTime').val()
        let note = $(edit_task_form).find('#Note').val()


        let arr = [];
        arr.push(`<div class="form-check d-flex align-items-center justify-content-center rounded-3"><input class="task_comp_checkbox form-check-input border border-black" type="checkbox" value="" id="" /></div>`)
        arr.push($(edit_task_form).find('#taskTitle').val());
        arr.push(start_time)
        arr.push(end_time)
        arr.push(note)
        arr.push('<div class="d-flex"><button data-bs-toggle="modal" data-bs-target="#task_edit_modal" class="btn btn-primary edit-task me-2">Edit</button></div>');
          
        const fullDate = user_date;

        let cur_row = $('#'+edit_task_id);

        task_dt.row(cur_row).data(arr).draw();

        let actual_duration = new Date("1970-01-01T" + end_time + "Z") - new Date("1970-01-01T" + start_time + "Z");
        const hours = Math.floor(actual_duration / (1000 * 60 * 60));
        const minutes = Math.floor((actual_duration % (1000 * 60 * 60)) / (1000 * 60));
        ALL_HABITS[edit_task_id]['data'][fullDate] = {
            'completed': 1,
            'Start Time' : start_time,
            'End Time' : end_time,
            'actual_duration':`${hours}.${minutes}`, 
            'Note' : note
        }
        $(cur_row).addClass('bg-success-subtle');
        $(cur_row).find('.form-check-input').prop('checked', true)

        edit_task_id = -1;
        localStorage.setItem('data', JSON.stringify(ALL_HABITS));
    })


    $('tbody').click(function (event) {
        let target = event.target;
        let parent_row = $(target).closest('tr');
        let parent_row_id = $(parent_row).attr('id');
        let cur_habit_data = ALL_HABITS[parent_row_id]['data'];

        if($(target).hasClass('edit-task')){
            edit_task_id = parent_row_id;
            let task_title = $('#taskTitle')
            let start_time = $('#StartTime')
            let end_time = $('#EndTime')
            let note = $('#Note')
            task_title.val(ALL_HABITS[parent_row_id]['habit_title'])
     
            const fullDate = user_date
            let todays_detail = cur_habit_data[fullDate]

            if(todays_detail != null){
                $(start_time).val(todays_detail['Start Time'])
                $(end_time).val(todays_detail['End Time'])
                $(note).val(todays_detail['Note'])
            }

        }
        if($(target).hasClass('task_comp_checkbox')){            
            $(target).prop('checked',false)
            if($(parent_row).hasClass('bg-success-subtle')){
                $(parent_row).removeClass('bg-success-subtle');


                let arr = [];
                arr.push(`<div class="form-check d-flex align-items-center justify-content-center rounded-3"><input class="task_comp_checkbox form-check-input border border-black" type="checkbox" value="" id="" /></div>`)
                arr.push(ALL_HABITS[parent_row_id]['habit_title']);
                arr.push("--:--:--")
                arr.push("--:--:--")
                arr.push("---")
                arr.push('<div class="d-flex"><button data-bs-toggle="modal" data-bs-target="#task_edit_modal" class="btn btn-primary edit-task me-2">Edit</button></div>');
                task_dt.row(parent_row).data(arr).draw().node();


                ALL_HABITS[parent_row_id]['data'][user_date] = {
                    'completed': 0,
                    'Start Time' : "--:--:--",
                    'End Time' : "--:--:--",
                    'Note' : ''
                }
                localStorage.setItem('data', JSON.stringify(ALL_HABITS))
            }
            else
                $(parent_row).find('.edit-task').trigger('click')

        }



        // let all_inp = $(new_habit_form).find('.user-inp');
        // let repeat = $(new_habit_form).find('.form-check-input');

        // $.each(all_inp, function(ind, ele){
        //     $(ele).val(cur_habit_data[$(ele).attr('name')]);
        // })
        // let days = cur_habit_data['repeating days']
        // if(days.length == 8 || days.length == 7){
        //     $(repeat[0]).prop('checked', true);
        //     $.each(repeat, function(ind, ele){
        //         if(ind==0) return;
        //         $(ele).prop({'checked': true,'disabled':true});
        //     }) 
        //     return;
        // }
        // $.each(repeat, function(ind, ele){
        //     if(days.indexOf($(ele).attr('value')) != -1)
        //         $(ele).prop('checked', true);
        // })  
    })
  












}

show_task()

const prepare_goal = () => {

    const reset_form = () => {
        new_habit_form[0].reset();
        let repeat = $(new_habit_form).find('.form-check-input');
        $.each(repeat, function (i,e) { 
            $(e).prop('disabled',false);
        })
        to_edit = -1;
    }
    let new_habit_form = $('#new-habit-form');
    $('#add_habit_btn_close').click(reset_form)
    let Habit_dt = $('#habit-table').DataTable({
        scrollX : true,
        pagination:false,
        info:false,
        order:[1, 'ASC'],
        columnDefs:[
            {
                orderable:false,
                targets:[0,3]
            },
            {
                width: '30%',
                className: 'pe-5 dt-head-left dt-body-left',
                targets:[1,2]
            },
            {
                width: '5%',
                targets:[0,3],
                className: 'dt-head-center dt-body-center'
            }
        ]
    })

    $(new_habit_form).submit(function(event){
        event.preventDefault();
        let new_habit = get_form_input();
        if(to_edit != -1)
            ALL_HABITS[to_edit] = new_habit;
        else{
            ALL_HABITS[`H-${total_habit_counter}`] = new_habit;
            total_habit_counter++;
        }
        localStorage.setItem('data', JSON.stringify(ALL_HABITS));
        draw_dt();
        localStorage.setItem('h-counter', total_habit_counter);
        console.log(ALL_HABITS) 
        to_edit = -1;
        reset_form();
    })
    
    const draw_dt = () => {  
        let ALL_HABITS_LS = JSON.parse(localStorage.getItem('data'));
        Habit_dt.clear().draw();
    
        $.each(ALL_HABITS_LS, function(index, habit_no){
            let arr = [];
            let cur_habit = ALL_HABITS_LS[index];
            arr.push('<i class="fa-solid fa-circle-info fa-xl" type="button" style="color: #74C0FC;"></i>')
            arr.push(cur_habit['habit_title']);
            arr.push(cur_habit['habit_note']);
            arr.push('<div class="d-flex"><button class="btn btn-primary edit-habit me-2">Edit</button><button class="btn btn-danger delete-habit">Delete</button></div>');
            let cur_row = Habit_dt.row.add(arr).draw().node();
            $(cur_row).attr('id', index)
        })
    }   
    
    const get_form_input = () => {
        let all_inp = $(new_habit_form).find('.user-inp');
        let repeat = $(new_habit_form).find('.form-check-input');
        let new_habit = {};
        $.each(all_inp, function(ind, ele){
            new_habit[$(ele).attr('name')] = $(ele).val()
        })
        let rep_val = [];
        $.each(repeat, function(ind, ele){
            if(ele.checked)
                rep_val.push($(ele).val());
        })
        new_habit['repeating days'] = rep_val
        if(to_edit != -1)
            new_habit['data'] = ALL_HABITS[to_edit]['data'];
        else
            new_habit['data'] = {}
        return (new_habit)
    }


    $('#rep_all').click(function (element) { 
        let all_days = $('.form-check-input')
        if(!element.target.checked){
            $.each(all_days, function(ind, ele){
    
                if($(ele).val() == -1)
                    return
                $(ele).prop('disabled', false);
                $(ele).prop('checked', false);
            })
        }
        else{
            $.each(all_days, function(ind, ele){
                if($(ele).val() == -1)
                return
                $(ele).prop('disabled', true);
                $(ele).prop('checked', true);
            })
        }
    })
    
    $('tbody').click(async function (event) { 
        let target = event.target;
        let parent_row = $(target).closest('tr');
        let parent_row_id = $(parent_row).attr('id');
        if($(target).hasClass('fa-circle-info')){
            let cur_habit_data = ALL_HABITS[parent_row_id];
            if(Habit_dt.row(parent_row).child.isShown()){
                Habit_dt.row(parent_row).child.hide();
            }   
            else{
                let table = await get_child_tab(cur_habit_data);   
                Habit_dt.row(parent_row).child(table).show();
            }  
        }
        else if($(target).hasClass('edit-habit')){
            to_edit = parent_row_id;
            let cur_habit_data = ALL_HABITS[parent_row_id];
            $(add_new_habit_btn).trigger('click');

            let all_inp = $(new_habit_form).find('.user-inp');
            let repeat = $(new_habit_form).find('.form-check-input');

            $.each(all_inp, function(ind, ele){
                $(ele).val(cur_habit_data[$(ele).attr('name')]);
            })
            let days = cur_habit_data['repeating days']
            if(days.length == 8 || days.length == 7){
                $(repeat[0]).prop('checked', true);
                $.each(repeat, function(ind, ele){
                    if(ind==0) return;
                    $(ele).prop({'checked': true,'disabled':true});
                }) 
                return;
            }
            $.each(repeat, function(ind, ele){
                if(days.indexOf($(ele).attr('value')) != -1)
                    $(ele).prop('checked', true);
            })             
        }
        else if($(target).hasClass('delete-habit')){
            delete ALL_HABITS[parent_row_id]
            localStorage.setItem('data', JSON.stringify(ALL_HABITS));
            draw_dt();
        }
    })
    
     const get_child_tab = (cur_habit_data) => {
        let table = $('<table>').addClass('table w-75 mx-auto text-nowrap table-bordered');
        let thead = $('<thead>');
        thead.append('<tr><th class="text-center">Start date</th><th class="text-center">End date</th><th class="text-center">Desired Time of Habit</th><th class="text-center">Desired Duration of Habit</th><th class="text-center">Repeat Every</th></tr>')
        let tbody = $('<tbody>')
        table.append(thead);
        table.append(tbody);
        let cur_row = $('<tr>').addClass('text-center')
        $.each(cur_habit_data, function(ind, ele){
            if(ind=='habit_title' || ind=='habit_note' || ind=='data')
                return;
            if(ind=='repeating days'){
                let td = $('<td>').attr('style','width:20%');
                let days = cur_habit_data[ind];
                let p = $('<p>').addClass('bg-success rounded-3 text-white px-2 py-1 d-inline-block me-2');                
                if(days.length == 8 || days.length == 7){
                    $(p).text('Everyday')
                    td.append(p);
                    cur_row.append(td);
                    return;
                }
                days.forEach(element => {
                    let p = $('<p>').addClass('bg-success rounded-3 text-white px-2 py-1 d-inline-block me-2');
                    if(element == 0){
                        $(p).text('Sun');
                    }
                    else if(element == 1){
                        $(p).text('Mon')
                    }
                    else if(element == 2){
                        $(p).text('Tue')
                    }
                    else if(element == 3){
                        $(p).text('Wed')
                    }
                    else if(element == 4){
                        $(p).text('Thur')
                    }
                    else if(element == 5){
                        $(p).text('Fri')
                    }
                    else{
                        $(p).text('Sat')
                    }
                    td.append(p);
                });
                cur_row.append(td);
                return;
            }
            let td = $('<td>').text(cur_habit_data[ind]).attr('style','width:20%')
            cur_row.append(td);
        })
        tbody.append(cur_row)
        return table
     }

     draw_dt()
}   


const prepare_habit_list = () => {
    let habit_list_div = $('#habit_dd_item_list');
    if(habit_list_div.find('a').length == 0){
        $('#habit_list_dropdown').click(function(event){
            $.each(ALL_HABITS, function(ind, ele){
                let item = $('<a>').addClass('dropdown-item stat_drop bg-primary-subtle').attr('id',ind).css('cursor','pointer').text(ALL_HABITS[ind]['habit_title'])
                habit_list_div.append(item)
            })
            $('#habit_list_dropdown').off('click');
        })

        $(habit_list_div).click(function(event){
            let target = event.target;
            if($(target).hasClass('dropdown-item')){
                $('.graph_div').removeClass('d-none')
                $('#bar-chart').empty();
                $('#line-chart').empty();
                $('#pie-chart').empty();
                let data = ALL_HABITS[$(target).attr('id')]['data'];
                $('#habit_list_dropdown').val($(target).attr('id'))
                $('#habit_list_dropdown').text($(target).text())
                create_bar_chart(data);
                let ret_data = create_line_chart(data);
                create_pie_chart(ret_data);
            }
        })
    }

}

const create_bar_chart = (records) => {
    let comp = not_comp = 0;
    $.each(records, function(ind, ele){
        if(records[ind]['completed'] == 1)
            comp++;
        else    
            not_comp++;
    })
    // Define your dataset

    if (comp == 0 && not_comp == 0) {
        // Append text element for insufficient data message
        d3.select('#bar-chart')
          .append('text')
          .attr('x', 250)
          .attr('y', 150)
          .attr('text-anchor', 'middle')
          .style('font-size', '26px')
          .text('Insufficient Data');
          return;
      } 

    const data = [
        { category: 'Completed', value: comp },
        { category: 'Not Completed', value: not_comp }
    ];

  
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 472 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;
  
      const svg = d3.select('#bar-chart')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left + 10},${margin.top})`);
  
      const x = d3.scaleBand()
        .domain(data.map(d => d.category))
        .range([0, width])
        .padding(0.1);
  
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value) + 1])
        .nice()
        .range([height, 0]);

        svg.append('text')
        .attr('transform', `translate(${width / 2},${height + margin.top + 4})`)
        .style('text-anchor', 'middle')
        .text('Status')

        svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left - 10)
        .attr('x', 0 - (height / 2))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text('Days');
  
      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));
  
      svg.append('g')
        .attr('class', 'y axis')
        .call(d3.axisLeft(y).ticks(5));

        const tooltip = d3.select('#tooltip');
  
      svg.selectAll('.comp_bar')
        .data(data)
        .enter().append('rect')
        .attr('class', 'comp_bar')
        .attr('x', d => x(d.category))
        .attr('y', height)
        .attr('width', x.bandwidth())
        .attr('height', 0)
        .on('mousemove', (event, d) => {
            tooltip
              .style('left', `${event.pageX}px`)
              .style('top', `${event.pageY}px`)
              .style('display', 'block')
              .html(`${d.category}: ${d.value} day(s)`);
              svg.selectAll('.comp_bar')
              .style('cursor', 'pointer')
        })
        .on('mouseout', () => {
          tooltip.style('display', 'none');
        })
        .transition()
        .duration(800)
        .attr('y', d => y(d.value))
        .attr('height', d => height - y(d.value));
  
}

const create_line_chart = (records, to_ret) => {
    const data = [];

      $.each(records, function(ind, ele){
        if(records[ind]['completed'] == 0)
            return;
        let duration = records[ind]['actual_duration'];

        let obj = {
            date: ind,
            value: parseFloat(duration)
        }
        data.push(obj);
      })

      if (data.length == 0) {
        // Append text element for insufficient data message
        d3.select('#line-chart')
          .append('text')
          .attr('x', 250)
          .attr('y', 150)
          .attr('text-anchor', 'middle')
          .style('font-size', '26px')
          .text('Insufficient Data');
          return;
      } 

      if(to_ret){
        create_pie_chart(data);
        return;
      }

  
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 472 - margin.left - margin.right - 20;
      const height = 400 - margin.top - margin.bottom;
  
      const svg = d3.select('#line-chart')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left + 10},${margin.top})`);
  
      const x = d3.scaleBand()
        .domain(data.map(d => d.date))
        .range([0, width])
        .padding(0.1);
  
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value) + 1])
        .nice()
        .range([height, 0]);
  
      const line = d3.line()
        .x(d => x(d.date) + x.bandwidth() / 2)
        .y(d => y(d.value))
        
        const tooltip = d3.select('#tooltip')
  
      svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2)
        .attr('d', line)
        .attr('stroke-dasharray', function() {
            const length = this.getTotalLength();
            return `${length} ${length}`;
          })
          .attr('stroke-dashoffset', function() {
            return this.getTotalLength();
          })
          .transition()
          .duration(1000) // Animation duration
          .ease(d3.easeLinear)
          .attr('stroke-dashoffset', 0)
          .on('start', function() {
            // Append dots after the line transition completes
            svg.selectAll('.dot')
              .data(data)
              .enter().append('circle')
              .attr('class', 'dot')
              .attr('cx', d => x(d.date) + x.bandwidth() / 2)
              .attr('cy', d => y(d.value))
              .attr('r', 0) // Initial radius set to 0
              .attr('fill', 'steelblue')
              .on('mousemove', (event, d) => {
                tooltip
                .style('left', `${event.pageX}px`)
                .style('top', `${event.pageY}px`)
                .style('display', 'block')
                .html(`${d.date}---${d.value} Hour(s)`)
                svg.selectAll('.dot')
                  .style('cursor', 'pointer')
            })
            .on('mouseout', function(){
                tooltip.
                style('display', 'none')
            })
              .transition()
              .duration(500) // Dot appearance duration
              .delay((d, i) => i * 100) // Delay each dot's appearance
              .attr('r', 5) // Increase radius to make dots appear
              
          });  
      
        

        svg.append('text')
        .attr('transform', `translate(${width / 2},${height + margin.top + 4})`)
        .style('text-anchor', 'middle')
        .text('Through Out')

        svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left - 10)
        .attr('x', 0 - (height / 2))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text('Value (Hours)');
                
        svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .attr('class','to_hide')
        .call(d3.axisBottom(x));
    
        svg.append('g')
        .call(d3.axisLeft(y))

        return data;
}

const create_pie_chart = (records) => {

    const vals = new Array(7);
    vals.fill(0)
    $.each(records, function(ind, ele){
        let fi = records[ind]['date'].indexOf(':');
        let li = records[ind]['date'].lastIndexOf(':');
        let date = records[ind]['date'].substring(0, fi);
        let month = records[ind]['date'].substring(fi+1, li);
        let year = records[ind]['date'].substring(li+1);
        let new_date = new Date(year, month-1, date);
        vals[new_date.getDay()] += records[ind]['value'];
    })

    const data = [];

    vals.forEach((ele,ind) => {
        let lab;
        if(ele == 0)
            return;
        switch (ind) {
            case 0:
                lab = 'Sunday'
                break;
            case 1:
                lab = 'Monday'
                break;
            case 2:
                lab = 'Tuesday'
                break;
            case 3:
                lab = 'Wednesday'
                break;
            case 4:
                lab = 'Thursday'
                break;
            case 5:
                lab = 'Friday'
                break;
            case 6:
                lab = 'Saturday'
                break;
            default:
                break;
        }
        let temp = {
            label : lab,
            value : ele
        }
        data.push(temp)
    })

    if (data.length == 0) {
        // Append text element for insufficient data message
        d3.select('#pie-chart')
          .append('text')
          .attr('x', 250)
          .attr('y', 150)
          .attr('text-anchor', 'middle')
          .style('font-size', '26px')
          .text('Insufficient Data');
          return;
      } 


      // Set up pie chart parameters
      const width = 400;
      const height = 400;
      const radius = Math.min(width, height) / 2;
      const colors = ['#0095FF','#0085FF','#0075FF','#0055FF','#0045FF','#0065FF','#0095FF'];   
  
      // Create SVG element
      const svg = d3.select('#pie-chart')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);
  
      // Define pie layout
      const pie = d3.pie()
        .value(d => d.value)
        .sort(null);
  
      // Define arc
      const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);
  
      // Create arcs
      const arcs = svg.selectAll('.arc')
        .data(pie(data))
        .enter().append('g')
        .attr('class', 'arc');
  
        const tooltip = d3.select('#tooltip')
      // Append path elements
      arcs.append('path')
        .attr('d', arc)
        .attr('fill', (d, i) => colors[i])
        .on('mousemove', function (event, d) {
            d3.select(this).attr('opacity', 0.7)
            tooltip
            .style('left', `${event.pageX}px`)
            .style('top', `${event.pageY}px`)
            .style('display', 'block')
            .html(`${d.data.label} => ${d.value} Hour(s)`)
            svg.selectAll('.arc')
            .style('cursor', 'pointer')
        })
        .on('mouseout', function (event, d){
            d3.select(this).attr('opacity', 1);
            tooltip
            .style('display', 'none')
        })
        .transition().duration(1000) // Animation duration
        .attrTween('d', function (d) {
          const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
          return function (t) {
            return arc(interpolate(t));
          };
        });
  
      // Append text labels
      arcs.append('text')
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .attr('text-anchor', 'middle')
        .text(d => d.data.label);
}

const get_filter_records = (interval) => {
    let todays_date = new Date();
    let year = todays_date.getFullYear();
    let month = todays_date.getMonth()+1; 
    let date = todays_date.getDate();
    let start_month = interval == 'year' ? 1 : month;
    let start_date = interval == 'week' ? getStartOfWeek() : 1; 
    let feb = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0) ? 29 : 28;
    let habit = ALL_HABITS[$('#habit_list_dropdown').val()]['data'];

    let records = {};
    
    while(start_month < month || (start_month == month && start_date <= date)){
        let key = get_today_date([year, start_month, start_date]);
        if(habit.hasOwnProperty(key)){
            records[key] = habit[key];
        }
        if(start_month > month || (start_month == month && start_date > date))
            break;
        if(start_date == 31 && [1, 3, 5, 7, 8, 10, 12].includes(start_month)){
            start_month++;
            start_date = 1;
        }
        else if(start_date == 30 && [4,6,9,11].includes(start_month)){
            start_month++;
            start_date = 1;
        }
        else if(start_date == feb && start_month == 2){
                start_date = 1;
                start_month++;
        }
        else
            start_date++;
    }

    return records;

}

function getStartOfWeek() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust when today is Sunday
    return diff;
}


const weekly_analysis = (event) => {
    let chart = $(event).parent().prev().attr('id');
    let records = get_filter_records('week');
    if(chart == 'bar-chart'){
        $('#bar-chart').empty();
        create_bar_chart(records);
    }
    else if(chart == 'line-chart'){
        $('#line-chart').empty();
        create_line_chart(records);
    }
    else if(chart == 'pie-chart'){
        $('#pie-chart').empty();
        create_line_chart(records, true);
    }
}


const monthly_analysis = (event) => {
    let chart = $(event).parent().prev().attr('id');
    let records = get_filter_records('month');
    if(chart == 'bar-chart'){
        $('#bar-chart').empty();
        create_bar_chart(records);
    }
    else if(chart == 'line-chart'){
        $('#line-chart').empty();
        create_line_chart(records);
    }
    else if(chart == 'pie-chart'){
        $('#pie-chart').empty();
        create_line_chart(records, true);
    }
}


const yearly_analysis = (event) => {
    let chart = $(event).parent().prev().attr('id');
    let records = get_filter_records('year');
    if(chart == 'bar-chart'){
        $('#bar-chart').empty();
        create_bar_chart(records);
    }
    else if(chart == 'line-chart'){
        $('#line-chart').empty();
        create_line_chart(records);
    }
    else if(chart == 'pie-chart'){
        $('#pie-chart').empty();
        create_line_chart(records, true);
    }
}


const max_analysis = (event) => {
    let chart = $(event).parent().prev().attr('id');
    if(chart == 'bar-chart'){
        $('#bar-chart').empty();
        create_bar_chart(ALL_HABITS[$('#habit_list_dropdown').val()]['data']);
    }
    else if(chart == 'line-chart'){
        $('#line-chart').empty();
        create_line_chart(ALL_HABITS[$('#habit_list_dropdown').val()]['data']);
    }
    else if(chart == 'pie-chart'){
        $('#pie-chart').empty();
        create_line_chart(ALL_HABITS[$('#habit_list_dropdown').val()]['data'], true);
    }
}