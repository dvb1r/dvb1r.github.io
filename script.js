function createDiv(rowNumber){
    const my_div = document.createElement("div");
    my_div.setAttribute("id", `row${rowNumber}`);
    document.getElementById("CalculatorBody").appendChild(my_div);
}

function createButton(idName, text, row){
    const but = document.createElement("button");
    but.textContent = text;
    but.setAttribute("class", "cell");
    but.setAttribute("id", idName);
    document.getElementById(`row${row}`).appendChild(but);
}

function updateNowNumber(txt){
    document.getElementById("prev_res").textContent = txt;
}
function updateRes(txt){
    updateNowNumber("");
    document.getElementById("pot_ans").textContent = txt;
}

function calc(){
    if(nowNumber == "") return;
    if (nowNumber[nowNumber.length-1] == "×" || nowNumber[nowNumber.length-1] == "+" || nowNumber[nowNumber.length-1] == "-" || nowNumber[nowNumber.length-1] == "÷") nowNumber = nowNumber.substring(0, nowNumber.length-1);
    let numbers = [];
    let now = 0;
    let isDrob = false;
    let pow_10 = 10;
    for(let i = 0; i <= nowNumber.length; i++){
        if (nowNumber[i] >= '0' && nowNumber[i] <= '9'){
            if(isDrob) {
                now = parseFloat(now) + (parseFloat(nowNumber[i])/pow_10);
                pow_10 *= 10;
            } else {
                now *= 10;
                now += parseInt(nowNumber[i]);
            }
        } else if(nowNumber[i] == '.') {
            isDrob = true;
        } else if (nowNumber[i] != '%') {
            numbers.push(now);
            now = 0;
            pow_10 = 10;
            isDrob = false;
        }
    }
    for(let i = 0; i < numbers.length; ++i) {
        console.log(numbers[i]);
    }
    let j = 0;
    for (let i = 0; i <= nowNumber.length; ++i){
        if (nowNumber[i] == "×") {
            numbers[j] = numbers[j] * numbers[j+1];
            numbers.splice(j + 1, 1);
            console.log(numbers[j]);
        } else if (nowNumber[i] == "÷") {
            numbers[j] = numbers[j] / numbers[j+1];
            numbers.splice(j+1, 1);
        } else if(nowNumber[i] == "%"){
            numbers[j] /= 100;
            for(let i = 0; i < numbers.length; ++i) {
                console.log(numbers[i]);
            }
        } else if(nowNumber[i] == '+' || nowNumber[i] == '-') j++;
    }
    j = 0;
    let res = numbers[0];
    for (let i = 0; i <= nowNumber.length; ++i){
        if (nowNumber[i] == '+'){
            res += numbers[j+1];
            j++;
        } else if (nowNumber[i] == '-'){
            res -= numbers[j+1];
            j++;
        }
    }
    updateRes(res.toString());
}

for (let i = 0; i < 5; ++i) {
    createDiv(i);
    if(i > 0 && (i-1)<3){
        for (let j = 1; j < 4; ++j) {
            createButton(`n${(i-1)*3+j}`, (i-1)*3+j, i);
        }
    }
    if (i == 0) { 
        createButton("AC", "AC", i);
        createButton("square", "х²", i);
        createButton("percent", "%", i);
        createButton("divide", "÷", i);
    } else if (i == 2) {
        createButton("plus", "+", i);
    } else if (i == 3) {
        createButton("minus", "-", i);
    } else if(i == 1) {
        createButton("multiply", "×", i);
    }
    else if (i == 4) {
        createButton("swap", "+/-", i);
        createButton("n0", "0", i);
        createButton("coma", ",", i);
        createButton("result", "=", i);
    }
}

let cntcomas = 0;
let prev_res = 0;
let nowNumber = "0";
let nowNumberFloat;
let multiplying = 0;
let dividing = 0;

for(let i = 0; i < 10; ++i) {
    document.getElementById(`n${i}`).addEventListener('click', function(){
        if (nowNumber == "0") {
            nowNumber = `${i}`;
        } else nowNumber = `${nowNumber}${i}`;
        updateNowNumber(nowNumber);
    });
}
document.getElementById("AC").addEventListener('click', function(){
    nowNumber = "0";
    updateNowNumber("");
    updateRes(nowNumber);
    cntcomas = 0;
});
document.getElementById("coma").addEventListener('click', function(){
    if (nowNumber == "") nowNumber = "0";
    if (cntcomas == 0) nowNumber = `${nowNumber}.`;
    updateNowNumber(nowNumber);
    cntcomas++;
});
document.getElementById("square").addEventListener('click', function(){
    calc();
    prev_res = document.getElementById("pot_ans").textContent;

    let nowNfloat = parseFloat(prev_res);
    nowNfloat *= nowNfloat;
    prev_res = nowNfloat.toString();

    updateRes(prev_res);
    cntcomas = 0;
});
document.getElementById("percent").addEventListener('click', function(){
    if (nowNumber[nowNumber.length-1] == "%" || nowNumber[nowNumber.length-1] == "×" || nowNumber[nowNumber.length-1] == "+" || nowNumber[nowNumber.length-1] == "-" || nowNumber[nowNumber.length-1] == "÷") nowNumber = nowNumber.substring(0, nowNumber.length-1);
    nowNumber = `${nowNumber}%`;
    updateNowNumber(nowNumber);
});
document.getElementById("swap").addEventListener('click', function(){
    nowNumber = (parseFloat(nowNumber) * (-1)).toString();
    updateNowNumber(nowNumber);
});
document.getElementById("multiply").addEventListener('click', function(){
    if (nowNumber[nowNumber.length-1] == "×" || nowNumber[nowNumber.length-1] == "+" || nowNumber[nowNumber.length-1] == "-" || nowNumber[nowNumber.length-1] == "÷") nowNumber = nowNumber.substring(0, nowNumber.length-1);
    nowNumber = `${nowNumber}×`;
    updateNowNumber(nowNumber);
    cntcomas = 0;
});
document.getElementById("plus").addEventListener('click', function(){
    if (nowNumber[nowNumber.length-1] == "×" || nowNumber[nowNumber.length-1] == "+" || nowNumber[nowNumber.length-1] == "-" || nowNumber[nowNumber.length-1] == "÷") nowNumber = nowNumber.substring(0, nowNumber.length-1);
    nowNumber = `${nowNumber}+`;
    updateNowNumber(nowNumber);
    cntcomas = 0;
});
document.getElementById("minus").addEventListener('click', function(){
    if (nowNumber[nowNumber.length-1] == "×" || nowNumber[nowNumber.length-1] == "+" || nowNumber[nowNumber.length-1] == "-" || nowNumber[nowNumber.length-1] == "÷") nowNumber = nowNumber.substring(0, nowNumber.length-1);
    nowNumber = `${nowNumber}-`;
    updateNowNumber(nowNumber);
    cntcomas = 0;
});
document.getElementById("divide").addEventListener('click', function(){
    if (nowNumber[nowNumber.length-1] == "×" || nowNumber[nowNumber.length-1] == "+" || nowNumber[nowNumber.length-1] == "-" || nowNumber[nowNumber.length-1] == "÷") nowNumber = nowNumber.substring(0, nowNumber.length-1);
    nowNumber = `${nowNumber}÷`;
    updateNowNumber(nowNumber);
    cntcomas = 0;
});
document.getElementById("result").addEventListener('click', function(){
    calc();
    cntcomas = 0;
});
document.getElementById("delete").addEventListener('click', function(){
    if (nowNumber.length > 1)nowNumber = nowNumber.substring(0, nowNumber.length-1);
    else nowNumber = "0";
    updateNowNumber(nowNumber);
});
