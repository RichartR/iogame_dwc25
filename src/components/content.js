export { renderContent, reinforcedUp, playerTurnChange, expanse };

//Creamos las celdas
const boardCells = new Array(6).fill().map(() => Array(6).fill().map(() => ({owner: 0, reinforced: 0})));

//Turno jugador
let playerTurn = '1';
let turnDisplayElement = null;

function renderContent(){
    //Creamos el tablero
    const container = document.createElement('div');
    container.id = 'gameContainer';
    
    const turnDisplay = document.createElement('div');
    turnDisplay.id = 'turnDisplay';
    turnDisplay.textContent = `Turno del Jugador ${playerTurn}`;
    container.appendChild(turnDisplay);
    turnDisplayElement = turnDisplay;

    const board = document.createElement('div');
    board.id = 'gameBoard';

    //Recorremos las celdas y las añadimos a la tabla
    boardCells.forEach((row, rowIdx) => 
        row.forEach( (cell, columnIdx) => {
            //Creamos un div de la celda
            const cellElement = document.createElement('div');
            cellElement.classList.add('cellBoard');

            //Para poder modificarlo luego más sencillo
            cell.element = cellElement;
            
            //Añadimos las coordenadas
            cellElement.dataset.row = rowIdx;
            cellElement.dataset.column = columnIdx;

            //Añadimos los datos
            cellElement.innerHTML = cell.reinforced;

            //Añadir al tablero
            board.appendChild(cellElement);
        }));

    //Seteamos las casillas iniciales
    boardCells[2][2].element.classList.add('text-bg-primary');
    boardCells[2][2].element.textContent = (boardCells[2][2].element.reinforced = 2);
    boardCells[3][3].element.classList.add('text-bg-danger');
    boardCells[3][3].element.textContent = (boardCells[3][3].element.reinforced = 2);
    

    //Devolvemos el contenedor entero
    container.appendChild(board);
    return container;
}

function reinforcedUp(row, column){
    //Actualizamos el valor utilizando element que hemos generado antes
    console.log(boardCells[row][column].owner);
    console.log(playerTurn);
    if(boardCells[row][column].owner != playerTurn){
        return false;
    }
    boardCells[row][column].element.textContent = (boardCells[row][column].reinforced += 1);

    return true;
}

function expanse(row, column){
    //Actualizar el color de la casilla
    const cell = boardCells[row][column].element;
    
    if(playerTurn == 1){
        cell.classList.add('text-bg-primary');
        boardCells[row][column].owner = 1;
    } else {
        boardCells[row][column].owner = 2;
        cell.classList.add('text-bg-danger');
    }
    cell.textContent = 1;
}

function playerTurnChange(){
    playerTurn = (playerTurn == 1) ? 2 : 1;
    if (turnDisplayElement) {
        turnDisplayElement.textContent = `Turno del Jugador ${playerTurn}`;
    }
}
