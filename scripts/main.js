// Constants
const ALL_LETTERS = "ABDEFGHIJKLMNOPQRSTUVWX";

// Variables
let selectedPieceType;
let letterPairButtons = new Map();

// Fill letter pair grid
forEachLetterPair(letterPair => {
    const button = document.createElement("button");
    button.textContent = letterPair;
    //button.id = "dynamic-button";
    button.classList.add("grid-btn");
    button.classList.add("btn");

    // Optional: Add an event listener to the button
    button.addEventListener("click", () => selectLetterPair(letterPair));

    // Step 3: Append the button to a parent element in the DOM
    letterPairContainer.appendChild(button);
    letterPairButtons.set(letterPair, button);
});

btnCorners.addEventListener("click", () => selectPieceType(CORNERS));
btnEdges.addEventListener("click", () => selectPieceType(EDGES));

selectPieceType(CORNERS);
selectLetterPair("AB");

// Functions
function selectPieceType(pieceType) {
    // Set piece button active
    for (let btn of document.getElementsByClassName("piece-btn")) {
        btn.classList.remove("active-btn");
    }
    pieceType.getPieceBtn().classList.add("active-btn");

    // Set letter pair buttons disabled
    forEachLetterPair(letterPair => {
        const button = letterPairButtons.get(letterPair);
        const comm = pieceType.getComm(letterPair);
        button.removeAttribute("disabled");
        if (comm == undefined || comm.length == 0) {
            button.setAttribute("disabled", "disabled");
        }
    });

    // Set variable
    selectedPieceType = pieceType;
}

function selectLetterPair(letterPair) {
    letterPairButtons.forEach((btn, letterPair, map) => btn.classList.remove("active-btn"));
    letterPairButtons.get(letterPair).classList.add("active-btn");
    const commTypeText = document.createTextNode(selectedPieceType.getCommType(letterPair));
    const commutatorText = document.createTextNode(selectedPieceType.getComm(letterPair));
    commTypeOutput.replaceChildren(commTypeText);
    commutatorOutput.replaceChildren(commutatorText);
}

function forEachLetterPair(consumer) {
    for (let letter1 of ALL_LETTERS) {
        for (let letter2 of ALL_LETTERS) {
            const letterPair = letter1 + letter2;
            consumer(letterPair);
        }
    }
}

function commToMoves(comm) {
    console.log(`raw comm: ${comm}`);
    comm = comm.replaceAll(/^ ?\[|]$/g, ''); // remove opening and closing brackts
    comm = comm.replace(/\(([A-Za-z'2 ]+)\)2/, "$1$1"); // expanding (...)2 parenthesis
    console.log(`processed comm: ${comm}`);

    if (/^[A-Za-z' ]+$/.test(comm)) { // pure alg
        return comm;
    } else if (/[A-Za-z2' ]+:/.test(comm)) { // has setup moves
        const matches = comm.match(/^([A-Za-z2' ]+):(.*)$/);
        const A = matches[1];
        const B = matches[2];
        return A + commToMoves(B) + invertMoves(A);
    } else if (/[A-Za-z2' ]+,/.test(comm)) { // is commutator
        const matches = comm.match(/^([A-Za-z2' ]+),(.*)$/);
        const A = matches[1];
        const B = matches[2];
        return A + B + invertMoves(A) + invertMoves(B);
    }
    return "default/fail";
}

function invertMoves(moves) {
    let result = "";
    for (let move of moves.matchAll(/[A-Za-z]['2]?/g)) {
        if (move[0].length == 1) { // clockwise
            result += `${move[0]}'`;
        } else if (/[A-Za-z]'/.test(move[0])) { // anti-clockwise
            result += move[0].charAt(0);
        } else { // 180 degree
            result += move[0];
        }
    }
    return result;
}

// Fill AnimCube
AnimCube3("id=anim-cube&move=RUR'URU2R'&initrevmove=#&edit=0");