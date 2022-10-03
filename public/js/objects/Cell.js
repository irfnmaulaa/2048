import { game } from "../main.js";
import CellNumber from "./Number.js";

class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }
    get number() {
        return game.numbers.find(number => number.cell.row === this.row && number.cell.col === this.col);
    }
    render() {
        this.create();
    }
    create() {
        this.el = document.createElement('div');
        this.el.classList.add('cell');
        this.el.setAttribute('data-row', this.row);
        this.el.setAttribute('data-col', this.col);
        game.boardEl.append(this.el);
    }
    fillNumber(num, colors) {
        const number = new CellNumber(this, num, colors);
        number.render();
        game.numbers.push(number);
    }
}

export default Cell;