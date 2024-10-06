const myuizeapp = document.querySelector(".myuizeapp"),
RulesBox = document.querySelector(".RulesBox"),
QuesCall = document.querySelector(".Question"),
resultBox = document.querySelector(".resultBox"),

MyQuizeBtn = document.querySelector(".MyQuizeBtn"),
RullBtnExit = document.querySelector(".RullBtnExit"),
RullBtnNext = document.querySelector(".RullBtnNext"),
NextQue = document.querySelector(".NextQue"),
Replay = document.querySelector(".Replay"),
QuitQuize = document.querySelector(".QuitQuize"),

myOption = document.querySelector(".myOption"),
timeLine = document.querySelector(".timeLine"),
timeCount = document.querySelector(".timeCount"),
result = document.querySelector(".result"),
cradid = document.querySelector(".cradid");

var count = 0;
let tickIcon = '<i class="fas tic fa-check"></i>';
let crossIcon = '<i class="fas cros fa-times"></i>'
let resultNumber = 0;
var counter;
var Linetimer;

myuizeapp.classList.add("active");

MyQuizeBtn.addEventListener("click", () => {
    myuizeapp.classList.remove("active");
    RulesBox.classList.add("active");
});

RullBtnExit.addEventListener("click", () => {
    myuizeapp.classList.add("active");
    RulesBox.classList.remove("active");
});

RullBtnNext.addEventListener("click", () => {
    QuesCall.classList.add("active");
    RulesBox.classList.remove("active");
    NextQue.style.display = "none";
    questionCome(0);
    startTimer(15);
    TimerLine(0);
});

Replay.addEventListener("click", ()=>{
    window.location.reload();
});

QuitQuize.addEventListener("click", ()=>{
    window.close();
});

NextQue.addEventListener("click",()=>{
    if (count < Questions.length - 1) {
        count ++;
    }else{
        resultBox.classList.add("active");
        QuesCall.classList.remove("active");
    }
    NextQue.style.display = "none";
    questionCome(count);
    clearInterval(counter);
    clearInterval(Linetimer);
    startTimer(15);
    TimerLine(0);
});

function questionCome(index){
    const MainQuesan = document.querySelector(".MainQuesan");
    let headQues = "<h2>"+Questions[index].numb+"." +" "+Questions[index].Question+"<h2>";
    MainQuesan.innerHTML = headQues;

    let option1 = "<div class='Options'>"+"<p>"+ Questions[index].options[0]+"</p></div>"
                 +"<div class='Options'>"+"<p>"+ Questions[index].options[1]+"</p></div>"
                 +"<div class='Options'>"+"<p>"+ Questions[index].options[2]+"</p></div>"
                 +"<div class='Options'>"+"<p>"+ Questions[index].options[3]+"</p></div>"
    myOption.innerHTML = option1;

    const QuesanBottomBtn = document.querySelector(".QuesanBottomBtn p");
    let serial = Questions[index].numb+" " +"of 5 Questions";
    QuesanBottomBtn.innerHTML = serial;

    const AllOption = myOption.querySelectorAll(".Options");
    for (let i = 0; i < AllOption.length; i++) {
        AllOption[i].setAttribute("onclick", "optionSelected(this)"); 
    }
}

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(Linetimer);
    let useAns = answer.textContent;
    let correctAns =  Questions[count].answer;
    let orderOption =  myOption.children.length;

    if (useAns == correctAns) {
        resultNumber +=1;
        result.innerHTML = resultNumber;
        if (resultNumber < 3 ) {
            cradid.innerHTML = "Carry on"
        } else {
            cradid.innerHTML = "Congragulances";
        }
        answer.classList.add("correct");
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIcon);
    }
    for (let a = 0; a < orderOption; a++) {
        if (myOption.children[a].textContent == correctAns) {
            myOption.children[a].setAttribute("class", "correct");
            myOption.children[a].insertAdjacentHTML("beforeend", tickIcon);
        } 
    }

    for (let x = 0; x < orderOption; x++) {
        myOption.children[x].classList.add("disabel");
    }

    NextQue.style.display = "block";
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        (time == 0)?timeCount.textContent = "00":time--;
        (time < 10)?timeCount.textContent = "0"+time:timeCount.textContent = time;
        (time == 0)?myOption.classList.add("disabel"):myOption.classList.remove("disabel");
    }
}

function TimerLine(time){
    Linetimer = setInterval(timer, 150);
    function timer(){
        time++
        timeLine.style.width = time+"%";   
        (time == 0)?clearInterval(Linetimer) :time;   
    }
}




