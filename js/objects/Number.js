import { game } from "../main.js";

class Number {
    constructor(cell, num = 2, colors = ['gray', 'black']) {
        this.cell = cell;
        this.num  = num;
        this.colors = colors;
    }
    render() {
        this.create();
    }
    create() {
        this.id = Math.floor(Math.random() * 9999999999999);
        this.el = document.createElement('div');
        this.el.classList.add('number');
        this.updateStyles();
        this.updatePos();
        game.boardEl.append(this.el);
    }
    updateStyles() {
        this.el.innerHTML = this.num.toString();
        this.el.style.width = this.cell.el.scrollWidth + 'px';
        this.el.style.height = this.cell.el.scrollHeight + 'px';
        this.el.style.backgroundColor = this.colors[0];
        this.el.style.color = this.colors[1];
    }
    updatePos() {
        this.el.style.left = this.cell.el.offsetLeft + 'px';
        this.el.style.top = this.cell.el.offsetTop + 'px';
    }
    moveTo(cell, withDestroy = false) {
        if (cell) {
            this.cell = cell;
            this.updatePos();
            withDestroy && this.destroy();
        }
    }
    destroy() {
        this.el.classList.add('release');
        setTimeout(() => { this.el.remove() }, 100);
        game.numbers.splice(game.numbers.findIndex(number => number.id === this.id), 1);
    }
    upgrade() {
        this.num = this.num * 2;
        game.score.increase(this.num);
        if (game.colors[this.num]) this.colors = game.colors[this.num];
        this.updateStyles();
    }
}

export default Number;