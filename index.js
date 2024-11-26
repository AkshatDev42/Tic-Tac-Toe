let board = [
    ['','',''],
    ['','',''],
    ['','','']
];
let player1 = {
    name: "",
    sign: "X"
};
let player2 = {
    name: "",
    sign: "O"
};
let boxes = document.getElementsByClassName("boxes");
let p1_shade = document.getElementById("p1-turn-shade");
let p2_shade = document.getElementById("p2-turn-shade");
let n1 = document.getElementById("Player1");
let n2 = document.getElementById("Player2");
let t1 = document.getElementById("p1-turn");
let t2 = document.getElementById("p2-turn");
let currPlayer = player1; 
function clickHandler(event) {
    let element = event.target;
    let index = Array.from(boxes).indexOf(element);
    let row = Math.floor(index / 3);
    let col = index % 3;

    if (board[row][col] == "") {
        board[row][col] = currPlayer.sign;
        if (currPlayer.sign == 'X') {
            element.classList.add("x-board");
        }
        if (currPlayer.sign == "O") {
            element.classList.add("o-board");
        }
        element.textContent = currPlayer.sign;
        console.log("printed sign on board");
        if (checkWin(currPlayer.sign)) {
            declareWinner(currPlayer.name);
            return;
        }
        if (checkDraw()) {
            drawScreen();
            return;
        }
        currPlayer = currPlayer == player1 ? player2 : player1;
        console.log("player switched");
        if (currPlayer == player1) {
            console.log("player 1 animation");
            t1.classList.add("visible");
            t2.classList.remove("visible");
            p1_shade.classList.add("turn-shade");
            p2_shade.classList.remove("turn-shade");
        }
        if (currPlayer == player2) {
            console.log("player 2 animation");
            t2.classList.add("visible");
            t1.classList.remove("visible");
            p2_shade.classList.add("turn-shade");
            p1_shade.classList.remove("turn-shade");
        }
    }
}

let start = () => {
    console.log("reset")
    resetBoard();
    console.log("start")
    Array.from(boxes).forEach((element,index) => {
        element.addEventListener("click",clickHandler);
    });
}
let accept_name = ()=>{
    console.log("inside accept")
    let a = document.getElementById("enter-name");
    a.classList.add("visible");
    document.getElementById("submit-name").addEventListener('click',()=>{
        player1.name = document.getElementById("player1-name").value;
        player2.name = document.getElementById("player2-name").value;
        a.classList.remove("visible");
        n1.textContent=player1.name;
        n2.textContent=player2.name;
        choose_sign();
    });
} 
let resetBoard=()=>{
    for(i=0;i<3;++i){
        for(j=0;j<3;++j){
            board[i][j] = "";
        }
    }
    Array.from(boxes).forEach((element)=>{
        element.textContent="";         
        element.classList.remove("x-board");
        element.classList.remove("o-board");
    })
}
function chooseXHandler() {
    player1.sign = "X";
    player2.sign = "O";
    currPlayer = player1;
    let c = document.getElementById("choose");
    c.classList.remove("visible");
    n1.classList.add("visible");
    n2.classList.add("visible");
    t1.classList.add("visible");
    p1_shade.classList.add("turn-shade");
    start();
}
function chooseOHandler() {
    player1.sign = "O";
    player2.sign = "X";
    let c = document.getElementById("choose");
    c.classList.remove("visible");
    n1.classList.add("visible");
    n2.classList.add("visible");
    t1.classList.add("visible");
    p1_shade.classList.add("turn-shade");
    start();
}
let choose_sign = ()=>{
    console.log("inside choose")
    let c = document.getElementById("choose")
    c.classList.add("visible")
    player1.sign = "";
    player2.sign = "";
    document.querySelector("#choose > div").textContent = player1.name;
    document.getElementById("choose-x").addEventListener("click",chooseXHandler);
    document.getElementById("choose-o").addEventListener("click",chooseOHandler);
    return;
}
function toggleDeclareWinnerVisibility(event) {
    // Check if the key pressed is the top arrow key
    if (event.keyCode === 38) {
        let d = document.getElementById("declare-winner");
        if (d.classList.contains("visible")) {
            d.classList.remove("visible");
        } else {
            d.classList.add("visible");
        }
    }
}
let declareWinner = (name) =>{
    let d = document.getElementById("declare-winner")
    d.classList.add("visible");
    document.getElementById("winner-name").textContent = name;
    n1.classList.remove("visible")
    t1.classList.remove("visible");
    p1_shade.classList.remove("turn-shade")
    n2.classList.remove("visible")
    t2.classList.remove("visible")
    p2_shade.classList.remove("visible");
    document.removeEventListener("keyup",toggleDrawScreenVisibility)
    document.addEventListener("keyup",toggleDeclareWinnerVisibility)
    document.getElementsByClassName("play-again-button")[0].addEventListener("click",()=>{
    d.classList.remove("visible");
    removeEventListeners();
    choose_sign();
    })
}
function toggleDrawScreenVisibility(event) {
    // Check if the key pressed is the top arrow key
    if (event.keyCode === 38) {
        let f = document.getElementById("draw-match");
        if (f.classList.contains("visible")) {
            f.classList.remove("visible");
        } else {
            f.classList.add("visible");
        }
    }
}
let drawScreen=()=>{
    let f = document.getElementById("draw-match");
    f.classList.add("visible");
    n1.classList.remove("visible")
    t1.classList.remove("visible");
    p1_shade.classList.remove("turn-shade")
    n2.classList.remove("visible")
    t2.classList.remove("visible")
    p2_shade.classList.remove("visible")
    document.removeEventListener("keyup",toggleDeclareWinnerVisibility)
    document.addEventListener("keyup",toggleDrawScreenVisibility)
    document.getElementsByClassName("play-again-button")[1].addEventListener("click",()=>{
        f.classList.remove("visible");
        removeEventListeners();
        choose_sign();
    })
}

let checkWin = (sign) =>{
    for(let i = 0;i < 3;++i) {
        //row
        if(board[i][0] == sign && board[i][1] == sign && board[i][2] == sign)
            return true;
        //col
        if(board[0][i] == sign && board[1][i] == sign && board[2][i] == sign)
            return true;
    }
    if(board[0][0] == sign && board[1][1] == sign && board[2][2] == sign)
        return true;
    if(board[0][2] == sign && board[1][1] == sign && board[2][0] == sign)
        return true;
    return false;
}

let checkDraw = () => {
    for(let i = 0; i < 3;++i) {
        for(let j = 0;j < 3;++j) {
            if(board[i][j]=='')
                return false
        }
    }
    return true;
}

let removeEventListeners = () => {
    Array.from(boxes).forEach((element) => {
        element.removeEventListener("click",clickHandler);
    });
    document.getElementById("choose-x").removeEventListener("click",null)
    document.getElementById("choose-o").removeEventListener("click",null)
}
accept_name();
