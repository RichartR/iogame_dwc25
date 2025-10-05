import { reinforcedUp, playerTurnChange, expanse } from "./content";

export { showActionsPopup };

function showActionsPopup(row, column) {
  //Creamos el fondo del popup
  const popupBackground = document.createElement("div");
  popupBackground.classList.add("popupBackground");

  //Creamos el contenido del popup
  const popupContainer = document.createElement("div");
  popupContainer.classList.add("popupContainer");
  popupContainer.innerHTML = `
        <button id="closeBtn" class="popupClose">x</button>
        <h3>Acciones</h3>
        <p>Elige una acción<br> Celda: Fila ${row} / Columna ${column}</p>
        <div class="popupButtonsContainer">
            <button id="expanseBtn" class="btn btn-warning popupButton">Expandir</button>
            <button id="reinforceBtn" class="btn btn-info popupButton">Reforzar</button>
        </div>
    `;
  //Añadimos los elementos para mostrarlos
  popupBackground.appendChild(popupContainer);
  document.body.appendChild(popupBackground);

  //Obtenemos los id de los botones
  const expanseBtn = document.querySelector("#expanseBtn");
  const reinforceBtn = document.querySelector("#reinforceBtn");
  const closeBtn = document.querySelector("#closeBtn");

  //Eventos al clickar los botones
  expanseBtn.addEventListener("click", () => {
    expanse(row, column);
    playerTurnChange();
    document.body.removeChild(popupBackground);
  });

  reinforceBtn.addEventListener("click", () => {
    if(!reinforcedUp(row, column)){
        console.log("hola")
    }
    playerTurnChange();
    document.body.removeChild(popupBackground);
  });

  closeBtn.addEventListener("click", () => {
    document.body.removeChild(popupBackground);
  });
}
