// Constants
const ALL_LETTERS = "ABDEFGHIJKLMNOPQRSTUVWX";

// Variables
let currentPieceType;
let letterPairButtons = new Map();

// Fill letter pair grid
forEachLetterPair(letterPair => {
    const button = document.createElement("button");
    button.textContent = letterPair;
    button.classList.add("grid-btn", "btn");
    button.addEventListener("click", () => selectLetterPair(letterPair));
    letterPairContainer.appendChild(button);
    letterPairButtons.set(letterPair, button);
});

// Add event listerners
btnCorners.addEventListener("click", () => selectPieceType(CORNERS));
btnCorners.addEventListener("touchstart", () => selectPieceType(CORNERS));
btnEdges.addEventListener("click", () => selectPieceType(EDGES));
btnEdges.addEventListener("touchstart", () => selectPieceType(EDGES));

// Default setup
selectPieceType(CORNERS);

// Functions
function selectPieceType(pieceType) {
    currentPieceType = pieceType;
    setActivePieceBtn();
    disableCorrectLetterPairBtns();
    selectLetterPair("AB");
}

function disableCorrectLetterPairBtns() {
    forEachLetterPair(letterPair => {
        const button = letterPairButtons.get(letterPair);
        const comm = currentPieceType.getComm(letterPair);
        if (comm == undefined || comm.length < 2) {
            button.setAttribute("disabled", "disabled");
        } else {
            button.removeAttribute("disabled");
        }
    });
}

function setActivePieceBtn() {
    const activePieceBtn = currentPieceType.getPieceBtn();
    for (let btn of document.getElementsByClassName("piece-btn")) {
        if (btn === activePieceBtn) {
            btn.classList.add("active-btn");
        } else {
            btn.classList.remove("active-btn");
        }
    }
}

function selectLetterPair(letterPair) {
    letterPairButtons.forEach((btn, letterPair, map) => btn.classList.remove("active-btn"));
    letterPairButtons.get(letterPair).classList.add("active-btn");
    const commType = currentPieceType.getCommType(letterPair);
    const commutator = currentPieceType.getComm(letterPair);
    const commTypeText = document.createTextNode(commType);
    const commutatorText = document.createTextNode(commutator);
    commTypeOutput.replaceChildren(commTypeText);
    commutatorOutput.replaceChildren(commutatorText);
    addAnimCube(commToMoves(commutator));
}

function forEachLetterPair(callback) {
    for (let letter1 of ALL_LETTERS) {
        for (let letter2 of ALL_LETTERS) {
            const letterPair = letter1 + letter2;
            callback(letterPair);
        }
    }
}

function commToMoves(comm) {
    let result = "default/fail";
    comm = comm.replaceAll(/^ ?\[|]$/g, ''); // remove opening and closing brackts
    comm = comm.replace(/\(([A-Za-z'2 ]+)\)2/, "$1$1"); // expanding (...)2 parenthesis

    if (/^[A-Za-z' ]+$/.test(comm)) { // pure alg
        result = comm;
    } else if (/[A-Za-z2' ]+:/.test(comm)) { // has setup moves
        const matches = comm.match(/^([A-Za-z2' ]+):(.*)$/);
        const A = matches[1];
        const B = matches[2];
        result = "{Setup}" + A + ".{}" + commToMoves(B) + ".{Undo setup}" + invertMoves(A);
    } else if (/[A-Za-z2' ]+,/.test(comm)) { // is commutator
        const matches = comm.match(/^([A-Za-z2' ]+),(.*)$/);
        const A = matches[1];
        const B = matches[2];
        result = A + B + invertMoves(A) + invertMoves(B);
    }
    //console.log(`comm: ${comm} becoms "${result}"`);
    return result;
}

function invertMoves(moves) {
    let result = "";
    for (let move of moves.matchAll(/[A-Za-z]['2]?/g)) {
        if (move[0].length == 1) { // clockwise
            result = `${move[0]}'` + result;
        } else if (/[A-Za-z]'/.test(move[0])) { // anti-clockwise
            result = move[0].charAt(0) + result;
        } else { // 180 degree
            result = move[0] + result;
        }
    }
    return result;
}

function addAnimCube(moves) {
    AnimCube3(`id=anim-cube&bgcolor=ffffff&borderwidth=3&textsize=24&hint=15&scale=6&align=20&position=lluuu&move=${moves}&initrevmove=#&colorscheme=wygbor&edit=0`);
}