export { renderContent, reinforcedUp, playerTurnChange, expanse, totalTurnChange, resetGame };

import { showEndPopup } from "./endGame";

let cellsBoard = new Array(6).fill().map(() => Array(6).fill().map(() => ({owner: 0, reinforced: 0})));
let cellsMap = new Map();

//Turno jugador
let playerTurn = 1;
let turnDisplayElement = null;

//Turnos totales
let totalTurns = 0;
let totalTurnsDisplayElement = null;

function renderContent(){
    //Creamos el contenedor
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

    cellsBoard.forEach((row, rowIdx) => 
        row.forEach((cell, columnIdx) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cellBoard');
            cellElement.dataset.row = rowIdx;
            cellElement.dataset.column = columnIdx;

            // Inicializamos los datos solo en el primer render
            if(totalTurns === 0){
                if((rowIdx === 2 && columnIdx === 2) || (rowIdx === 3 && columnIdx === 3)){
                    cell.reinforced = 2;
                    cell.owner = (rowIdx === 2 ? 1 : 2);
                } else {
                    cell.reinforced = 0;
                    cell.owner = 0;
                }
            }

            // Actualizamos el HTML según el estado
            cellElement.textContent = cell.reinforced;
            const colorClass = colorCell(rowIdx, columnIdx);
            if (colorClass) cellElement.classList.add(colorClass);

            // Guardamos el elemento en el mapa
            cellsMap.set(`${rowIdx},${columnIdx}`, cellElement);

            board.appendChild(cellElement);
        })
    );

    container.appendChild(board);
    return container;
}

// Refresca el aspecto visual de una celda concreta
function refreshCell(row, column) {
    const cell = cellsBoard[row][column];
    const cellElement = cellsMap.get(`${row},${column}`);
    if (!cellElement) return;
    
    cellElement.textContent = cell.reinforced;
    cellElement.classList.remove('text-bg-primary', 'text-bg-danger');
    const colorClass = colorCell(row, column);
    if (colorClass) cellElement.classList.add(colorClass);
}


// Refuerza una celda si es del jugador actual
function reinforcedUp(row, column){
    if(cellsBoard[row][column].owner != playerTurn){
        return false;
    }
    
    cellsBoard[row][column].reinforced += 1;
    refreshCell(row, column);

    return true; 
    
}

// Expande el territorio a una celda vacia
function expanse(row, column){
    const cell = cellsBoard[row][column];
    cell.owner = playerTurn;
    cell.reinforced = 1;
    refreshCell(row, column);
}

//Cambia de turno
function playerTurnChange(){
    playerTurn = (playerTurn == 1) ? 2 : 1;
    if (turnDisplayElement) {
        turnDisplayElement.textContent = `Turno del Jugador ${playerTurn}`;
    }
}

// Aumenta los turnos totales
function totalTurnChange(){
    totalTurns += 1;
    if (totalTurnsDisplayElement) {
        totalTurnsDisplayElement.textContent = `Turnos totales: ${totalTurns}/20`;
    }
    if(totalTurns >= 20){
        showEndPopup();
    }
}

// Devuelve la clase de color según el owner
function colorCell(row, column){
    const cell = cellsBoard[row][column];
    if(cell.owner == 1){
        return 'text-bg-primary';
    } else if (cell.owner == 2) {
        return 'text-bg-danger';
    }
    return '';
}

// Resetea el juego
function resetGame(){
    cellsBoard = new Array(6).fill().map(() => Array(6).fill().map(() => ({owner: 0, reinforced: 0})));
    totalTurns = 0;
    playerTurn = 1;
    cellsMap.clear();

    // Vuelvemos a renderizar el contenido visual
    const container = document.getElementById('gameContainer');
    if (container.parentNode) {
        container.parentNode.replaceChild(renderContent(), container);
    }
}
