import { renderContent  } from "./components/content"
import { renderLogin  } from "./components/login"
import { renderSignUp } from "./components/signup"

export {router} 

const routes = new Map([
    ['', renderContent],
    ['#/', renderContent],
    ['#game', renderContent],
    ['#login', renderLogin],
    ['#signup', renderSignUp]
])

function router(route, container){
    if(routes.has(route)){
        container.replaceChildren(routes.get(route)());
    } else {
        container.innerHTML = `<h2>404</h2>`;
    }
}