import Cell from "./objects/Cell.js";

class Game {
    constructor() {
        this.size    = 4;
        this.boardEl = document.querySelector('.board');
        this.numbers = [];
        this.colors  = {
            2: ['#eee4da', '#776e65'],
            4: ['#eee1c9', '#776e65'],
            8: ['#f3b27a', '#f9f6f2'],
            16: ['#f69664', '#f9f6f2'],
            32: ['#f77c5f', '#f9f6f2'],
        }
        this.score = {
            el: document.querySelector('.score'),
            value: 0,
            increase: (val) => {
                this.score.value += val;
                this.score.el.innerHTML = this.score.value;
            }
        }
    }
    render() {
        this.create();
    }
    mount() {
        this.score.value = 0;
        this.score.increase(0);
        this.newNumber();
        this.newNumber();
    }
    create() {
        this.cells = [];
        this.boardEl.innerHTML = '';
        for (let y = 1; y <= this.size; y++) {
            for (let x = 1; x <= this.size; x++) {
                const cell = new Cell(y, x);
                cell.render();
                this.cells.push(cell);
            }
        }
    }
    newNumber(num = 2) {
        const availableCells = this.cells.filter(cell => !cell.number);
        const selectedCell = availableCells[Math.floor(Math.random() * availableCells.length)];
        if (selectedCell) {
            selectedCell.fillNumber(num, this.colors[num]);
        } else {
            this.gameOver();
        }
    }
    gameOver() {
        alert('Game Over');
        document.querySelectorAll('.number').forEach(num => num.remove());
        this.numbers = [];
        this.mount();
    }
    up() {
        for(let y = 1; y <= this.size; y++) {

            const numbers = this.numbers.filter(num => num.cell.col === y);
            numbers.sort((a, b) => a.cell.row - b.cell.row);
            numbers.forEach((number, i) => {
                const emptyCells = this.cells.filter(cell => cell.col === y && cell.row < number.cell.row && !cell.number);
                let offset = 0;
                if (numbers[i-1]?.num === number.num && this.numbers.find(num => num.id === numbers[i-1]?.id)) { offset ++; }
                number.moveTo( this.cells.find(cell => cell.col === y && cell.row === number.cell.row - emptyCells.length - offset), offset );
                if (offset) numbers[i-1]?.upgrade();
            });

        }
    }
    right() {
        for(let y = 1; y <= this.size; y++) {

            const numbers = this.numbers.filter(num => num.cell.row === y);
            numbers.sort((a, b) => b.cell.col - a.cell.col);
            numbers.forEach((number, i) => {
                const emptyCells = this.cells.filter(cell => cell.row === y && cell.col > number.cell.col && !cell.number);
                let offset = 0;
                if (numbers[i-1]?.num === number.num && this.numbers.find(num => num.id === numbers[i-1]?.id)) { offset ++; }
                number.moveTo( this.cells.find(cell => cell.row === y && cell.col === number.cell.col + emptyCells.length + offset), offset );
                if (offset) numbers[i-1]?.upgrade();
            });

        }
    }
    down() {
        for(let y = 1; y <= this.size; y++) {

            const numbers = this.numbers.filter(num => num.cell.col === y);
            numbers.sort((a, b) => b.cell.row - a.cell.row);
            numbers.forEach((number, i) => {
                const emptyCells = this.cells.filter(cell => cell.col === y && cell.row > number.cell.row && !cell.number);
                let offset = 0;
                if (numbers[i-1]?.num === number.num && this.numbers.find(num => num.id === numbers[i-1]?.id)) { offset ++; }
                number.moveTo( this.cells.find(cell => cell.col === y && cell.row === number.cell.row + emptyCells.length + offset), offset );
                if (offset) numbers[i-1]?.upgrade();
            });

        }
    }
    left() {
        for(let y = 1; y <= this.size; y++) {

            const numbers = this.numbers.filter(num => num.cell.row === y);
            numbers.sort((a, b) => a.cell.col - b.cell.col);
            numbers.forEach((number, i) => {
                const emptyCells = this.cells.filter(cell => cell.row === y && cell.col < number.cell.col && !cell.number);
                let offset = 0;
                if (numbers[i-1]?.num === number.num && this.numbers.find(num => num.id === numbers[i-1]?.id)) { offset ++; }
                number.moveTo( this.cells.find(cell => cell.row === y && cell.col === number.cell.col - emptyCells.length - offset), offset );
                if (offset) numbers[i-1]?.upgrade();
            });

        }
    }
}

export default Game;