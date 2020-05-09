
let boardFilled = false;
let board = [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
];

function fillBoard() {
    let fillit = true;
    if (boardFilled) {
        fillit = confirm("You sure you wanna start a new one?");
        if (fillit) {

            board = [
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ];
        }
    }
    else {
    }

    if (fillit) {

        let rows = document.querySelectorAll(".bingo-board tbody tr");
        let cells = [...rows].map(r => {
            return r.querySelectorAll(".bingo-cell");
        });

        for (var row = 0; row < 5; row++) {
            for (var col = 0; col < 5; col++) {
                let max = 15 * (col + 1);
                let min = max - 14;
                let num = Math.floor(Math.random() * (max - min + 1)) + min;
                cells[row][col].innerHTML = num;
                cells[row][col].classList.add("has-value");
                cells[row][col].classList.remove("binged");
                cells[row][col].classList.remove("winner-cell");
                cells[row][col].dataset.col = col;
                cells[row][col].dataset.row = row;
            }
        }
        if (!boardFilled)
            addCellClickEvents();

        boardFilled = true;
    }
}

function addCellClickEvents() {
    let cells = document.querySelectorAll(".bingo-cell");

    for (const cell of cells) {
        cell.addEventListener("click", cellClickEvent);
    }
}

function cellClickEvent() {
    if (this.classList.contains("binged")) {
        this.classList.remove("binged");
        board[this.dataset.row][this.dataset.col] = false;
    }
    else {
        this.classList.add("binged");
        board[this.dataset.row][this.dataset.col] = true;
    }
    var winner = checkWinner();
    if (winner) {
        for (const cell of winner) {
            document.querySelector(`.bingo-cell[data-row='${cell[0]}'][data-col='${cell[1]}']`).classList.add("winner-cell");
        }
    }
}

function checkWinner() {
    if (board.some(r => r.every(c => c))) {
        //rows
        let rowNum = board.findIndex(r => r.every(c => c));
        return [[rowNum, 0], [rowNum, 1], [rowNum, 2], [rowNum, 3], [rowNum, 4]];
    }
    if (board.some((r, i) => board.every(row => row[i]))) {
        //cols
        let colNum = board.findIndex((r, i) => board.every(row => row[i]));
        return [[0, colNum], [1, colNum], [2, colNum], [3, colNum], [4, colNum]];
    }
    if (board.every((r, i) => r[i])) {
        //diagDown
        return [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4]];
    }
    if (board.every((r, i) => r[4 - i])) {
        //diagUp
        return [[0, 4], [1, 3], [2, 2], [3, 1], [4, 0]];
    }
}
