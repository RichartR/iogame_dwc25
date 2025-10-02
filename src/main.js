import "./style.scss";

//eslint-disable-next-line
import * as bootstrap from 'bootstrap';

import {renderHeader} from "./components/header";
import { renderContent } from "./components/content";
import { renderFooter } from "./components/footer";
import { router } from "./router";

document.addEventListener("DOMContentLoaded", () => {
  const appDiv = document.querySelector("#app");
  const header = document.querySelector('#header');
  const footer = document.querySelector('#footer');

  router(window.location.hash, appDiv);
  window.addEventListener("hashchange", () =>{
    router(window.location.hash, appDiv);
  });

  /* appDiv.innerHTML =renderContent(); */
  header.innerHTML = renderHeader();
  footer.innerHTML = renderFooter();
});