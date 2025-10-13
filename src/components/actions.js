import {
  reinforcedUp,
  playerTurnChange,
  expanse,
  totalTurnChange,
} from "./content";

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
        <p>Elige una acción<br> Celda: Fila ${parseInt(row) + 1} / Columna ${
    parseInt(column) + 1
  }</p>
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
    totalTurnChange();
    document.body.removeChild(popupBackground);
  });

  reinforceBtn.addEventListener("click", () => {
    //Comprobar si el owner y el player es el mismo
    if (!reinforcedUp(row, column)) {
      //Comprobar si había una alerta previa y eliminarla para no superponerlas
      const oldAlert = popupContainer.querySelector(".alert");
      if (oldAlert){
        oldAlert.remove();
      } 

      // Crear el nuevo alert
      const alertDiv = document.createElement("div");
      alertDiv.className = "alert alert-danger mt-2";
      alertDiv.role = "alert";
      alertDiv.textContent = "No puedes reforzar esta celda.";

      // Añadir el alert al popup
      popupContainer.appendChild(alertDiv);
    } else {
      playerTurnChange();
      totalTurnChange();
      document.body.removeChild(popupBackground);
    }
  });

  closeBtn.addEventListener("click", () => {
    document.body.removeChild(popupBackground);
  });
}
