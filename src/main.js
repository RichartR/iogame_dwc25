import "./style.scss";

//eslint-disable-next-line
import * as bootstrap from 'bootstrap';

import { renderHeader } from "./components/header";
import { renderFooter } from "./components/footer";
import { renderLogin } from "./components/login";
import { showActionsPopup } from "./components/actions"
import { router } from "./router";

document.addEventListener("DOMContentLoaded", () => {
  const appDiv = document.querySelector("#app");
  const header = document.querySelector('#header');
  const footer = document.querySelector('#footer');

  router(window.location.hash, appDiv);
  window.addEventListener("hashchange", () =>{
    router(window.location.hash, appDiv);
  });

  header.innerHTML = renderHeader();
  footer.innerHTML = renderFooter();

  //Modificar valor
  appDiv.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("cellBoard")) {
      const row = target.dataset.row;
      const col = target.dataset.column;
      //Mostramos el popup de acciones
      showActionsPopup(row, col);
    }
  });


});