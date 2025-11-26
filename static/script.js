document.getElementById("firstButton").addEventListener("click", () => {
    let button = document.getElementById("somePTag");
    
    // Update the display and increment the counter
    button.dataset.kirks = parseInt(button.dataset.kirks) + 1;
    button.innerHTML = button.dataset.kirks + " Kirks"; // Capitalized "Kirks"
    
    console.log(button.dataset.kirks);
});