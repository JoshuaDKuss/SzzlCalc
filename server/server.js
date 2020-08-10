// requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));
// globals

// heroku || 5000
const port = process.env.PORT || 5000;

let calc = [];
let answerOut = [];

let objectToReturn = [];
let datMath = [];

// spin up server
app.listen(port, () => {
    console.log('server up:', port);
});


// routes
app.get('/calc', (req, res) => {
        console.log('in /calc GET');
        res.send(datMath);
    }) // end /calc

app.post('/calc', (req, res) => {
    console.log('in calc POST:'); //req.body
    calc.push(req.body)
    calculateInServer();
    res.sendStatus(201);
}); // end post

function calculateInServer() {
    let current = calc.length - 1;
    console.log(calc[current].operator);
    console.log('did i get here?');
    if (calc[current].operator === '+') {
        answer = (Number(calc[current].num1)) + (Number(calc[current].num2)); // so it doesn't concatenate
        console.log(answerOut);
        objectToReturn = {
            num1: calc[current].num1,
            operator: "+",
            num2: calc[current].num2,
            answerOut: answer
        }
        datMath.push(objectToReturn);
        console.log(datMath);
    }
    if (calc[current].operator === '-') {
        answer = (calc[current].num1) - (calc[current].num2);
        console.log(answerOut);
        objectToReturn = {
            num1: calc[current].num1,
            operator: "-",
            num2: calc[current].num2,
            answerOut: answer
        }
        datMath.push(objectToReturn);
        console.log(datMath);
    }

    if (calc[current].operator === '*') {
        answer = (calc[current].num1) * (calc[current].num2);
        console.log(answerOut);
        objectToReturn = {
            num1: calc[current].num1,
            operator: "*",
            num2: calc[current].num2,
            answerOut: answer
        }
        datMath.push(objectToReturn);
        console.log(datMath);
    }
    if (calc[current].operator === '/') {
        answer = (calc[current].num1) / (calc[current].num2);
        console.log(answerOut);
        objectToReturn = {
            num1: calc[current].num1,
            operator: "/",
            num2: calc[current].num2,
            answerOut: answer
        }
        datMath.push(objectToReturn);
        console.log(datMath);
    }
} // end calculateInServer
