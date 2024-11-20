// Fill letter pair grid
const ALPHABET = "ABDEFGHIJKLMNOPQRSTUVWX";
for (let letter1 of ALPHABET) {
    for (let letter2 of ALPHABET) {
        const button = document.createElement("button");
        button.textContent = letter1 + letter2;
        //button.id = "dynamic-button";
        button.classList.add("grid-btn");

        // Optional: Add an event listener to the button
        /*button.addEventListener("click", function() {
            alert("Button clicked!");
        });*/

        // Step 3: Append the button to a parent element in the DOM
        letterPairGrid.appendChild(button);
    }
}

// Commutator to moves
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
AnimCube3("id=animcube-container&move=RUR'URU2R'&initrevmove=#");