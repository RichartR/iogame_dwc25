export { renderContent };

function renderContent(){
    const cells = Array.from({length: 25}, (_, i) => `<div class="cellBoard" id="div${i+1}">${i+1}</div>`);
    return `
    <div id="gameBoard">
        ${cells.join("")}
    </div>
    `;
}
