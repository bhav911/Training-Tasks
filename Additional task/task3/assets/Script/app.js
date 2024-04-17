let cur_que_no = 0;
let question = $('#question').text('new question');
let opt_btn = $('#option-div button');
let result_div = $('#result-div')
let hour = 0;
let minute = 0;
let second = 0;
let score = 0;

$('#play-btn').click(function(){
    score = 0;
    hour = 0;
    minute = 0;
    second = 0;
    cur_que_no = 0;
    $('#next_que').text('Next');
    $(this).closest('.box1').attr('style', 'display: none !important');
    $('#quix-box').attr('style', 'display: block !important');
    $('#next_que').trigger('click');

})

$('#play-again').click(function(){
    $('#play-btn').trigger('click');
    $(result_div).attr('style', 'display: none !important');
})
let xyz = {
    'q1':{
        'que': 'this is a question',
        'options':{
            'a' : 'opt a',
            'b' : 'opt b',
            'c' : 'opt c',
            'd' : 'opt d',
        },
        'cor_opt': ' '
    }
}

let kbc = {
    0:{
        'que': 'What is the capital of France?',
        'options':{
            'a' : 'London',
            'b' : 'Paris',
            'c' : 'Berlin',
            'd' : 'Madrid',
        },
        'cor_opt': 'b'
    },
    1:{
        'que': 'Who wrote "To Kill a Mockingbird"?',
        'options':{
            'a' : 'Harper Lee',
            'b' : 'J.K. Rowling',
            'c' : 'Stephen King',
            'd' : 'Mark Twain',
        },
        'cor_opt': 'a'
    },
    2:{
        'que': 'Which planet is known as the Red Planet?',
        'options':{
            'a' : 'Mars',
            'b' : 'Venus',
            'c' : 'Jupiter',
            'd' : 'Mercury',
        },
        'cor_opt': 'a'
    },
    3:{
        'que': 'Who painted the Mona Lisa?',
        'options':{
            'a' : 'Vincent van Gogh',
            'b' : 'Leonardo da Vinci',
            'c' : 'Pablo Picasso',
            'd' : 'Michelangelo',
        },
        'cor_opt': 'b'
    },
    4:{
        'que': 'What is the chemical symbol for water?',
        'options':{
            'a' : 'O2',
            'b' : 'CO2',
            'c' : 'H2O',
            'd' : 'NaCl',
        },
        'cor_opt': 'c'
    },
    5:{
        'que': 'Who discovered penicillin?',
        'options':{
            'a' : 'Alexander Fleming',
            'b' : 'Louis Pasteur',
            'c' : 'Marie Curie',
            'd' : 'Isaac Newton',
        },
        'cor_opt': 'a'
    },
    6:{
        'que': 'What is the tallest mountain in the world?',
        'options':{
            'a' : 'Mount Kilimanjaro',
            'b' : 'Mount Everest',
            'c' : 'Mount Fuji',
            'd' : 'Mount McKinley',
        },
        'cor_opt': 'b'
    },
    7:{
        'que': 'Who wrote the play "Romeo and Juliet"?',
        'options':{
            'a' : 'William Shakespeare',
            'b' : 'Charles Dickens',
            'c' : 'Jane Austen',
            'd' : 'Emily Bronte',
        },
        'cor_opt': 'a'
    },
    8:{
        'que': 'What is the chemical symbol for gold?',
        'options':{
            'a' : 'Au',
            'b' : 'Ag',
            'c' : 'Fe',
            'd' : 'Pb',
        },
        'cor_opt': 'a'
    },
    9:{
        'que': 'Which is the largest ocean on Earth?',
        'options':{
            'a' : 'Atlantic Ocean',
            'b' : 'Indian Ocean',
            'c' : 'Arctic Ocean',
            'd' : 'Pacific Ocean',
        },
        'cor_opt': 'd'
    },
    10:{
        'que': 'Who was the first man to walk on the moon?',
        'options':{
            'a' : 'Buzz Aldrin',
            'b' : 'John Glenn',
            'c' : 'Neil Armstrong',
            'd' : 'Yuri Gagarin',
        },
        'cor_opt': 'c'
    }
}

function reset_options(){
    $.each(opt_btn, function (index, element) {
        $(element).css({'background-color': '#2d2b39', 'color': 'orange'});      
    });
}


let cor_ans;
$('#next_que').click(function (event) {
    if(cur_que_no == Object.keys(kbc).length){
        display_result();
        return;
    }
    $('#option-div').click(function (event) { 
        let binder = ans_eval.bind(null, event);
        binder(cor_ans)
    })
    change_que_count();
    reset_options();
    let cur_que = kbc[cur_que_no]
    $(question).text(cur_que['que']);
    cor_ans = cur_que['cor_opt'];
    let options = cur_que['options'];
    let count = 0;
    $.each(options, function (index, element) {
        $(opt_btn[count++]).text(element);      
    });
    if(cur_que_no == Object.keys(kbc).length-1){
        $('#next_que').text('Submit');
    }
    cur_que_no++;
 })

 function display_result(){
    $(result_div).attr('style', 'display: flex !important');
    $('#quix-box').attr('style', 'display: none !important');
    $(result_div).find('p').text(`Your score is ${score}`);
 }

 let change_que_count = () => {
    $('#que_info').text(`${cur_que_no+1} of ${Object.keys(kbc).length} Question`)
 }

 setInterval(function(){
    second++;
    if(second == 60){
        minute++;
        second = 0;
        if(minute == 60){
            hour++;
            minute = 0;
            if(hour == 24){
                hour = minute = second = 0;
            }
        }
    }
    let hrs,mns,scs;
    scs = second < 10 ? `0${second}` : second;
    mns = minute < 10 ? `0${minute}` : minute;
    hrs = hour < 10 ? `0${hour}` : hour;
    $('#timer').text(hrs+':'+mns+':'+scs);
 }, 1000)


 
 function ans_eval(event,correct_ans){
    let btn = $(event.target);
    let correct;
    if($(btn).hasClass('opt-btn')){
        if($(btn).attr('id') == correct_ans){
            correct = true
            score++;
        }
        else   
            correct = false
        show_ans(btn, correct);
    }
 }

 function show_ans(event, correct){
    if(!correct){
        $(event).css({'background-color':'rgb(116, 10, 10)', 'color':'white'})
        $(`#${cor_ans}`).css({'background-color':'orange', 'color':'black'})
    }
    else{
        $(event).css({'background-color':'orange', 'color':'black'})
    }
    $('#option-div').off('click');
 }
 




 