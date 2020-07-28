

const Player = (name, shape) => {
    const setName = (n) => name = n;
    const setShape = (s) => shape = s; //shape will be set by GameBoard
    const getName = () => name;
    const getShape = () => shape;
    return {setName, setShape, getName, getShape};
}

const GameBoard = (() => {
    let p1 = Player();
    let p2 = Player();
    let current_player = p1;
    /*
     * Collect players' name and set shape.
     */
    const setPlayerInfo = () => {
        p1.setShape('black');
        p2.setShape('red');
        if(submit.getAttribute("data-clicked") == "1"){
            alert("The game has already begun! Please click reset to start over.");
        }
        else if(!document.getElementById("player1").value || !document.getElementById("player2").value){
            alert("Please enter your names!");
        }
        else{
            p1.setName(document.getElementById("player1").value);
            p2.setName(document.getElementById("player2").value);
            beginGame();
        }

    }
    /**
     * Begins the game.
     * 
     * 1. Attach listeners to cells in container.
     * 2. ???
     */
    const beginGame = () => {
        if(submit.getAttribute("data-clicked") == "0"){
            clearBoard();
            attachCellListeners();
        } 
    }
    /*
     * Attach event listeners to cells in container. Will play animation when clicked, but only works when the game has begun. Changes player's turn.
     */
    const attachCellListeners = () => {
        submit.setAttribute("data-clicked", "1");
        let cells = document.getElementById("cell-container").getElementsByTagName("*");
        for (let i=0; i<cells.length; i++){
            cells[i].setAttribute("data-clicked", "0");
            cells[i].addEventListener('click', () => {
                if(cells[i].getAttribute("data-clicked") == "0"){
                    if(current_player == p1){
                        cells[i].classList.add("cell-animated-p1");
                        cells[i].classList.remove("cell");
                        cells[i].setAttribute("data-clicked", "1");
                        current_player = p2;
                    }
                    else if(current_player == p2){
                        cells[i].classList.add("cell-animated-p2");
                        cells[i].classList.remove("cell");
                        cells[i].setAttribute("data-clicked", "1");
                        current_player = p1;
                    }
                }
            });
        }
    }
    /**
     * 
     * Call to this function will reset all passed-in cells.
     */
    const clearBoard = () => {
        let cell_container = document.getElementById("cell-container").getElementsByTagName("*");
        for (let i=0; i<cell_container.length; i++){
            cell_container[i].setAttribute("data-clicked", "0");
            cell_container[i].classList.remove("cell-animated-p1");
            cell_container[i].classList.remove("cell-animated-p2");
            if(!("cell" in cell_container[i].classList)){
                cell_container[i].classList.add("cell");
            }
        }
        submit.setAttribute("data-clicked", "0");
        clearPlayerInfo();
    }
    /**
     * Call to this function will clear players' info.
     */
    const clearPlayerInfo = () => {
        document.getElementById("player1").value = "";
        document.getElementById("player2").value = "";
    }
    /*
     * Attach event listener to submit button to initiate game start.
     */
    let submit = document.getElementById("name-submit");
    submit.setAttribute("data-clicked", "0");
    submit.addEventListener("click", setPlayerInfo);
    /**
     * Attach event listener to reset gameboard.
     */
    let reset = document.getElementById("reset");
    reset.addEventListener("click", clearBoard);
})();

