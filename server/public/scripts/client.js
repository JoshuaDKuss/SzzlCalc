$(document).ready(onReady);

function onReady() {
    console.log('JQ');
    getItems();
    $('#addBtn').on('click', addFunction);
    $('#subtractBtn').on('click', subtractFunction);
    $('#multiplyBtn').on('click', multiplyFunction);
    $('#divideBtn').on('click', divideFunction);
    $('#equalsBtn').on('click', addItems); //equalsFunction //calcItems
    $('#clearBtn').on('click', clearInputs);
}

let operator = '';
// click functions
function addFunction() {
    operator = '+';
}

function subtractFunction() {
    operator = '-';
}

function multiplyFunction() {
    operator = '*';
}

function divideFunction() {
    operator = '/';
}

function clearInputs() {
    $('#input1').val('');
    $('#input2').val('');
}

function getItems() {
    //console.log('in getItems');
    // ajax get call
    $.ajax({
        type: 'GET',
        url: '/calc'
    }).then(function(response) {
        console.log('back from GET:', response);
        appendToDom(response);
    }).catch(function(err) {
        alert('error getting calculation. see console');
        //console.log(err)
    });
}

function addItems() {
    console.log('in addItems');
    //$('#calcOut').empty(); //clear
    let objectToSend = {
        num1: $('#input1').val(),
        operator: operator,
        num2: $('#input2').val()
    }
    console.log('sending:', objectToSend);
    // send to server via ajax post
    $.ajax({
            type: 'POST',
            url: '/calc',
            data: objectToSend
        }).then(function(response) {
            console.log('back from POST:', response);
            // update DOM
            getItems();
        }).catch(function(err) {
            alert('error posting item. see console for details');
            //console.log(err);
        }) // end Ajax
    clearInputs();
} // end addItems

function appendToDom(history) {
    let el = $('#history');
    el.empty();
    for (let i = 0; i < history.length; i++) {
        el.append(`<li>${history[i].num1} 
        ${history[i].operator} 
        ${history[i].num2} = ${history[i].answerOut}</li>`)
        if (i === history.length - 1) {
            $('#answerOut').empty().append(`${history[i].answerOut}`)
        }
    }
}

// function appendToDom(response) {
//     //console.log('does appendToDom get here?');
//     for (let i = 0; i < response.length; i++) {
//         $('#calcOut').append(`<li>${response[i]}</li>`);
//     }
// }


// function getHistory() {
//     $.ajax({
//         type: 'GET',
//         url: '/history'
//     }).then(function(response) {
//         console.log('back from GET:', response);
//         appendToDom2(response);
//     }).catch(function(err) {
//         alert('error getting calculation. see console');
//         //console.log(err)
//     });
// }


// function appendToDom2(history) {
//     console.log('does appendToDom2 get here?');
//     // let el = $('#history');
//     // el.empty();
//     // for (let i = 0; i < history.length; i++) {
//     //     el.append(`<li>${history[i].num1} ${history[i].operator} ${history[i].num2} = ${history[i].answer}</li>`)
//     //     if (i === history.length - 1) {
//     //         $('#answer').empty().append(`${history[i].answer}`)
//     //     }
//     // }
// }