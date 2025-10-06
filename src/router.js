import { renderContent  } from "./components/content"
import { renderLogin  } from "./components/login"

export {router} 

const routes = new Map([
    ['', renderContent],
    ['#/', renderContent],
    ['#game', renderContent],
    ['#login', renderLogin]
])

function router(route, container){
    if(routes.has(route)){
        //Comprobamos si el resultado es un string o un componente
        container.replaceChildren(routes.get(route)());
    } else {
        container.innerHTML = `<h2>404</h2>`;
    }
}