// fill letter pair grid
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWX";
for(let letter1 of ALPHABET) {
    for(let letter2 of ALPHABET) {
        const button = document.createElement("button");
        button.textContent = letter1 + letter2;
        //button.id = "dynamic-button";
        button.classList.add("small-button");

        // Optional: Add an event listener to the button
        /*button.addEventListener("click", function() {
            alert("Button clicked!");
        });*/

        // Step 3: Append the button to a parent element in the DOM
        letterPairGrid.appendChild(button);
    }
}