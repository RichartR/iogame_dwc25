import { resetGame } from "./content";

export { showEndPopup };

function showEndPopup() {
  //Creamos el fondo del popup
  const popupBackground = document.createElement("div");
  popupBackground.classList.add("popupBackground");

  //Creamos el contenido del popup
  const popupContainer = document.createElement("div");
  popupContainer.classList.add("popupContainer");
  popupContainer.innerHTML = `
        <h3>Fin del juego</h3>
        <div class="popupButtonsContainer">
            <button id="resetBtn" class="btn btn-success popupButton">Reiniciar Juego</button>
        </div>
    `;
    
  //Añadimos los elementos para mostrarlos
  popupBackground.appendChild(popupContainer);
  document.body.appendChild(popupBackground);

  //Obtenemos los id de los botones
  const resetBtn = document.querySelector("#resetBtn");

  //Eventos al clickar los botones
  resetBtn.addEventListener("click", () => {
    resetGame();
    document.body.removeChild(popupBackground);
  });
}
