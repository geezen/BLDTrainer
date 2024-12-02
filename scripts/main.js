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
    letterPairButtons.forEach((btn, letterPair) => {
        const comm = currentPieceType.getComm(letterPair);
        btn.disabled = comm == undefined || comm.length < 2;
    });
}

function setActivePieceBtn() {
    const activePieceBtn = currentPieceType.getPieceBtn();
    for (let btn of document.getElementsByClassName("piece-btn")) {
        btn.classList.toggle("active-btn", btn === activePieceBtn);
    }
}

function selectLetterPair(letterPair) {
    letterPairButtons.forEach((btn, btnLetterPair) => btn.classList.toggle("active-btn", btnLetterPair == letterPair));

    const commType = currentPieceType.getCommType(letterPair);
    const commutator = currentPieceType.getComm(letterPair);
    const commTypeText = document.createTextNode(commType);
    const commutatorText = document.createTextNode(commutator);

    commTypeOutput.replaceChildren(commTypeText);
    commutatorOutput.replaceChildren(commutatorText);

    addAnimCube(commToMoves(commutator));
}

function forEachLetterPair(callback) {
    const allLetters = "ABDEFGHIJKLMNOPQRSTUVWX";
    for (let letter1 of allLetters) {
        for (let letter2 of allLetters) {
            const letterPair = letter1 + letter2;
            callback(letterPair);
        }
    }
}

function commToMoves(rawComm) {
    let result = "";
    const comm = cleanComm(rawComm);

    if (isPureAlg(comm)) {
        result = comm;
    } else if (hasSetupMoves(comm)) {
        const [A, B] = comm.match(/^([A-Za-z2' ]+):(.*)$/).slice(1);
        result = `{Setup}${A}.{}${commToMoves(B)}.{Undo setup}${invertMoves(A)}`;
    } else if (isCommutator(comm)) {
        const [A, B] = comm.match(/^([A-Za-z2' ]+),(.*)$/).slice(1);
        result = `${A}${B}${invertMoves(A)}${invertMoves(B)}`;
    }
    //console.log(`comm: ${comm} becoms "${result}"`);
    return result;
}

function cleanComm(comm) {
    return comm.replaceAll(/^ ?\[|]$/g, '') // remove opening and closing brackts
               .replace(/\(([A-Za-z'2 ]+)\)2/, "$1$1"); // expanding (...)2 parenthesis
}

function isCommutator(comm) {
    return /[A-Za-z2' ]+,/.test(comm);
}

function hasSetupMoves(comm) {
    return /[A-Za-z2' ]+:/.test(comm);
}

function isPureAlg(comm) {
    return /^[A-Za-z2' ]+$/.test(comm);
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