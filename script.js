const boxes = document.querySelectorAll(".box");
const players = ["fa-solid fa-xmark", "fa-solid fa-o"];
const message = document.querySelector("#message");
const matchBox = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [2, 5, 8], [0, 3, 6], [1, 4, 7], [2, 4, 6], [0, 4, 8]
];
let current = players[0];
let scoreX = 0;
let scoreO = 0;
let count = 0;

for (let x of boxes) {
    x.addEventListener("click", () => {
        if (x.innerHTML == "") {
            const icon = document.createElement("i");
            icon.className = current;
            x.appendChild(icon);
            count++;
            if (checkMatch(current)) {
                document.querySelector("#winner").className = current;
                message.textContent = "is Winner";
                document.querySelector("#scoreX").textContent = scoreX;
                document.querySelector("#scoreO").textContent = scoreO;
                for (let x of boxes) {
                    if (x.innerHTML == "") {
                        x.style.pointerEvents = "none";
                    }
                }
            }
            else if (count == boxes.length) {
                document.querySelector("#winner").className = "";
                message.textContent = `Match tie`;
            }
            current = (current == players[0]) ? players[1] : players[0];
            for (let x of document.querySelectorAll(".info i")) {
                if (x.className == current) {
                    x.closest("div").style.boxShadow = "0px 3px 8px #fff";
                }
                else {
                    x.closest("div").style.boxShadow = "none";
                }
            }
            document.querySelectorAll(".info i");
            document.querySelector("#active").textContent = (current == players[0]) ? "X" : "O";
        }
    })
}

const checkMatch = (current) => {
    for (let x in matchBox) {
        let [a, b, c] = matchBox[x];
        if (boxes[a].querySelector("i")?.className == current && boxes[b].querySelector("i")?.className == current &&
            boxes[c].querySelector("i")?.className == current) {
            (current == players[0]) ? scoreX++ : scoreO++;
            boxes[a].classList.add("zoom");
            boxes[b].classList.add("zoom");
            boxes[c].classList.add("zoom");
            return true;
        }
    }
    return false;
}

const resetGame = () => {
    count = 0;
    message.textContent = "";
    document.querySelector("#winner").className = "";
    for (let x of boxes) {
        x.innerHTML = "";
        x.style.pointerEvents = "auto";
        x.classList.remove("zoom");
    }
}

const startGame = () => {
    scoreO = scoreX = 0;
    document.querySelector("#scoreX").textContent = scoreX;
    document.querySelector("#scoreO").textContent = scoreO;
    reset();
}

const getPlayerNames = () => {
    let player1 = document.querySelector("#player1").value;
    let player2 = document.querySelector("#player2").value;
    document.querySelector("#p1").textContent = `(${player1})`;
    document.querySelector("#p2").textContent = `(${player2})`;
    document.querySelector("#player1").value = "";
    document.querySelector("#player2").value = "";
}