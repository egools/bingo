
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

        let rows = document.querySelectorAll(".bingo-board .cell-row");
        let cells = [...rows].map(r => {
            return r.querySelectorAll(".bingo-cell");
        });

        let validNums = [
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
            [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
            [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
            [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75]
        ];
        for (var row = 0; row < 5; row++) {
            for (var col = 0; col < 5; col++) {
                const cell = cells[row][col];
                let index = Math.floor(Math.random() * validNums[col].length);
                let num = validNums[col][index];
                validNums[col].splice(index, 1);
                cell.innerHTML = num;
                cell.classList.remove("binged");
                cell.classList.remove("winner-cell");
                if (!boardFilled) {
                    cell.classList.add("has-value");
                    cell.dataset.col = col;
                    cell.dataset.row = row;
                }
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
