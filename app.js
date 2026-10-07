let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highestScore = 0;

let h3 = document.querySelector("h3");

document.addEventListener("keypress", function () {
    if(started == false){
        console.log("games is started");
        started = true;

        levelUp();
    }
});

function gameFlash (btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 500);
}

function userFlash (btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 500);
}

function levelUp () {
    userSeq = [];
    level++;
    h3.innerText = `level ${level}`;

    //random btn choose
    let randomIndex = Math.floor(Math.random() * btns.length);
    let randomColor = btns[randomIndex];
    let randomBtn = document.querySelector(`.${randomColor}`);
    
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randomBtn);
};

function checkAns (index) {

    if(userSeq[index] === gameSeq[index]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else {
        if(level > highestScore){
            highestScore = level;
        }
        h3.innerHTML = `Game over! your score was <b>${level}</b> <br> Highest Score : <b>${highestScore}</b> press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 250);
        reset();
    }

};

function  btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
};

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
};

function reset () {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}