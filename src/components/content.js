export { renderContent, reinforcedUp, playerTurnChange, expanse, totalTurnChange, resetGame };

import { showEndPopup } from "./endGame";

//Creamos las celdas
let cellsBoard = new Array(6).fill().map(() => Array(6).fill().map(() => ({owner: 0, reinforced: 0})));

//Turno jugador
let playerTurn = 1;
let turnDisplayElement = null;

//Turnos totales
let totalTurns = 0;
let totalTurnsDisplayElement = null;

function renderContent(){
    //Creamos el tablero
    const container = document.createElement('div');
    container.id = 'gameContainer';
    
    //Turno jugador
    const turnDisplay = document.createElement('div');
    turnDisplay.id = 'turnDisplay';
    turnDisplay.textContent = `Turno del Jugador ${playerTurn}`;
    container.appendChild(turnDisplay);
    turnDisplayElement = turnDisplay;

    //Turnos totales
    const totalTurnsDisplay = document.createElement('div');
    totalTurnsDisplay.id = 'totalTurnsDisplay';
    totalTurnsDisplay.textContent = `Turnos totales: ${totalTurns}/20`;
    container.appendChild(totalTurnsDisplay);
    totalTurnsDisplayElement = totalTurnsDisplay;

    //Tablero
    const board = document.createElement('div');
    board.id = 'gameBoard';

    //Recorremos las celdas y las añadimos a la tabla
    cellsBoard.forEach((row, rowIdx) => 
        row.forEach( (cell, columnIdx) => {
            //Creamos un div de la celda
            const cellElement = document.createElement('div');
            cellElement.classList.add('cellBoard');

            //Para poder modificarlo luego más sencillo
            /* cell.element = cellElement; */
            
            //Añadimos las coordenadas
            cellElement.dataset.row = rowIdx;
            cellElement.dataset.column = columnIdx;

            //Añadimos los datos
            if(totalTurns == 0){
                if((rowIdx == 2 && columnIdx == 2) || (rowIdx == 3 && columnIdx == 3)){
                    cell.reinforced = 2;
                    cellElement.innerHTML = cell.reinforced;
                    cell.owner = (rowIdx == 2 ? 1 : 2);
                    cellElement.classList.add(colorCell(rowIdx, columnIdx));
                } else {
                    cellElement.innerHTML = cell.reinforced;
                    cellElement.classList.add(colorCell(rowIdx, columnIdx));
                }
            } else {
                cellElement.innerHTML = cell.reinforced;
                cellElement.classList.add(colorCell(rowIdx, columnIdx));
            }
            
            //Añadir al tablero
            board.appendChild(cellElement);
        }));

    //Seteamos las casillas iniciales
    /* cellsBoard[2][2].owner = 1;
    cellsBoard[2][2].element.textContent = (cellsBoard[2][2].reinforced += 2);
    colorCell(2,2);

    cellsBoard[3][3].owner = 2;
    cellsBoard[3][3].element.textContent = (cellsBoard[3][3].reinforced += 2);
    colorCell(3,3); */
    
    //Devolvemos el contenedor entero
    container.appendChild(board);
    return container;
}

function reinforcedUp(row, column){
    //Actualizamos el valor utilizando element que hemos generado antes
    if(cellsBoard[row][column].owner != playerTurn){
        return false;
    }

    cellsBoard[row][column].reinforced += 1;

    return true;
}

function expanse(row, column){
    //Actualizar owner de la celda
    const cell = cellsBoard[row][column];
    
    if(playerTurn == 1){
        cell.owner = 1;
    } else {
        cell.owner = 2;
    }

    //cambiar color
    colorCell(row, column);

    //Actualizar el valor inicial
    cell.element.textContent = 1;
    cell.reinforced = 1;
}

function playerTurnChange(){
    playerTurn = (playerTurn == 1) ? 2 : 1;
    if (turnDisplayElement) {
        turnDisplayElement.textContent = `Turno del Jugador ${playerTurn}`;
    }
}

function totalTurnChange(){
    //Sumamos turno
    totalTurns += 1;

    //Actualizamos visualmente
    totalTurnsDisplayElement.textContent = `Turnos totales: ${totalTurns}/20`;

    //Comprobamos si sigue el juego
    if(totalTurns >= 5){
        //Fin del juego
        showEndPopup();
    }
}

function colorCell(row, column){
    //Color de la celda en función del owner
    const cell = cellsBoard[row][column];

    console.log(cell);

    if(cell.owner == 1){
        return 'text-bg-primary';
    } else if (cell.owner == 2) {
         return'text-bg-danger';
    }

}

function resetGame(){
    cellsBoard = new Array(6).fill().map(() => Array(6).fill().map(() => ({owner: 0, reinforced: 0})));
}
