import Game from "./Game.js";

export const game = new Game();

(() => {
    game.render();
    game.mount();

    window.addEventListener('keydown', (e) => {
        const key = e.keyCode;
        switch (key) {
            case 37:
                return game.left();
            case 38:
                return game.up();
            case 39:
                return game.right();
            case 40:
                return game.down();
        }
    })

    window.addEventListener('keyup', (e) => {
       const key = e.keyCode;

       if ([37, 38, 39, 40].includes(key)) {
           game.newNumber();
       }
    });
})()
